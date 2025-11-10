/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/docker/docker/client"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel/trace"

	apiclient "github.com/daytonaio/apiclient"
	"github.com/daytonaio/runner-service/internal/config"
	"github.com/daytonaio/runner-service/internal/daemon"
	"github.com/daytonaio/runner-service/internal/executor"
	"github.com/daytonaio/runner-service/internal/healthcheck"
	"github.com/daytonaio/runner-service/internal/logger"
	"github.com/daytonaio/runner-service/internal/metrics"
	"github.com/daytonaio/runner-service/internal/poller"
	"github.com/daytonaio/runner-service/internal/telemetry"
)

func main() {
	// Setup structured logger with pretty printing
	log := logger.NewPrettyLogger()

	log.Info("Starting Daytona Runner",
		slog.String("version", "3"),
		slog.String("type", "job-based"))

	// Load configuration
	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Error("Failed to load configuration", slog.Any("error", err))
		os.Exit(1)
	}

	// Initialize OpenTelemetry tracing (sets up global propagator)
	tp, err := telemetry.InitTracer()
	if err != nil {
		log.Error("Failed to initialize tracer", "error", err)
	}
	defer telemetry.ShutdownTracer(tp)

	log.Info("Configuration loaded",
		slog.String("api_url", cfg.APIURL),
		slog.Duration("poll_timeout", cfg.PollTimeout),
		slog.Int("poll_limit", cfg.PollLimit),
		slog.Duration("healthcheck_interval", cfg.HealthcheckInterval),
		slog.Bool("metrics_enabled", cfg.MetricsEnabled))

	// Create API client with OpenTelemetry instrumentation
	// The otelhttp.NewTransport automatically propagates trace context via HTTP headers
	apiCfg := apiclient.NewConfiguration()
	apiCfg.HTTPClient = &http.Client{
		Transport: otelhttp.NewTransport(
			http.DefaultTransport,
			otelhttp.WithSpanNameFormatter(func(operation string, r *http.Request) string {
				return fmt.Sprintf("%s %s", r.Method, r.URL.Path)
			}),
			otelhttp.WithSpanOptions(trace.WithSpanKind(trace.SpanKindClient)),
		),
	}
	apiCfg.Servers = apiclient.ServerConfigurations{
		{
			URL: cfg.APIURL,
		},
	}
	// Add API key as Bearer token (passport-http-bearer)
	apiCfg.AddDefaultHeader("Authorization", "Bearer "+cfg.APIKey)

	log.Debug("API client configured",
		slog.String("api_url", cfg.APIURL),
		slog.String("auth_header", "Bearer "+cfg.APIKey[:8]+"..."))

	apiClient := apiclient.NewAPIClient(apiCfg)

	// Create Docker client
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation(), client.WithTraceProvider(tp))
	if err != nil {
		log.Error("Failed to create Docker client", slog.Any("error", err))
		os.Exit(1)
	}
	defer dockerClient.Close()

	log.Info("Docker client initialized")

	// Extract daemon binary on startup
	daemonPath, err := daemon.WriteStaticBinary("daemon-amd64")
	if err != nil {
		log.Error("Failed to write daemon binary", slog.Any("error", err))
		os.Exit(1)
	}
	log.Info("Daemon binary extracted", slog.String("path", daemonPath))

	// Create metrics collector
	metricsCollector := metrics.NewCollector(log)

	// Create executor with Docker client and daemon path
	jobExecutor := executor.NewExecutor(apiClient, dockerClient, metricsCollector, daemonPath, log)

	// Create services
	healthcheckService := healthcheck.NewService(cfg, apiClient, metricsCollector, log)
	pollerService := poller.NewService(cfg, apiClient, jobExecutor, log)

	// Setup graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle shutdown signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		log.Info("Received shutdown signal", slog.String("signal", sig.String()))
		log.Info("Initiating graceful shutdown")
		cancel()
	}()

	// Start healthcheck loop
	go healthcheckService.Start(ctx)

	// Start job poller (blocks until context is cancelled)
	log.Info("Runner started successfully")
	pollerService.Start(ctx)

	log.Info("Runner shutdown complete")
}
