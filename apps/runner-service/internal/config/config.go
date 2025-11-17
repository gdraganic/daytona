/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

package config

import (
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/kelseyhightower/envconfig"
)

// Config holds the runner configuration
type Config struct {
	// API Configuration
	APIURL string `envconfig:"DAYTONA_API_URL" validate:"required"`
	APIKey string `envconfig:"DAYTONA_RUNNER_TOKEN" validate:"required"`

	// Job Polling Configuration
	PollTimeout time.Duration `envconfig:"POLL_TIMEOUT" default:"30s"`
	PollLimit   int           `envconfig:"POLL_LIMIT" default:"10" validate:"min=1,max=100"`

	// Healthcheck Configuration
	HealthcheckInterval time.Duration `envconfig:"HEALTHCHECK_INTERVAL" default:"30s" validate:"min=10s"`
	HealthcheckTimeout  time.Duration `envconfig:"HEALTHCHECK_TIMEOUT" default:"10s"`

	// Metrics Configuration
	MetricsEnabled bool `envconfig:"METRICS_ENABLED" default:"false"`

	// Telemetry Configuration
	OtelEnabled bool `envconfig:"OTEL_ENABLED" default:"false"`
}

var config *Config

// LoadFromEnv loads configuration from environment variables
func LoadFromEnv() (*Config, error) {
	if config != nil {
		return config, nil
	}

	config = &Config{}

	err := envconfig.Process("", config)
	if err != nil {
		return nil, err
	}

	var validate = validator.New()
	err = validate.Struct(config)
	if err != nil {
		return nil, err
	}

	return config, nil
}
