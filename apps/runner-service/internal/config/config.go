/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

package config

import (
	"fmt"
	"os"
	"time"
)

// Config holds the runner configuration
type Config struct {
	// API Configuration
	APIURL string
	APIKey string

	// Job Polling Configuration
	PollTimeout time.Duration
	PollLimit   int

	// Healthcheck Configuration
	HealthcheckInterval time.Duration
	HealthcheckTimeout  time.Duration

	// Metrics Configuration
	MetricsEnabled bool
}

// LoadFromEnv loads configuration from environment variables
func LoadFromEnv() (*Config, error) {
	cfg := &Config{
		// Required
		APIURL: getEnv("API_URL", ""),
		APIKey: getEnv("API_KEY", ""),

		// Job Polling
		PollTimeout: getDurationEnv("POLL_TIMEOUT", 30*time.Second),
		PollLimit:   getIntEnv("POLL_LIMIT", 10),

		// Healthcheck
		HealthcheckInterval: getDurationEnv("HEALTHCHECK_INTERVAL", 30*time.Second),
		HealthcheckTimeout:  getDurationEnv("HEALTHCHECK_TIMEOUT", 10*time.Second),

		// Metrics
		MetricsEnabled: getBoolEnv("METRICS_ENABLED", true),
	}

	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	return cfg, nil
}

// Validate checks if the configuration is valid
func (c *Config) Validate() error {
	if c.APIURL == "" {
		return fmt.Errorf("API_URL is required")
	}
	if c.APIKey == "" {
		return fmt.Errorf("API_KEY is required")
	}
	if c.PollLimit < 1 || c.PollLimit > 100 {
		return fmt.Errorf("POLL_LIMIT must be between 1 and 100")
	}
	if c.PollTimeout < time.Second || c.PollTimeout > 60*time.Second {
		return fmt.Errorf("POLL_TIMEOUT must be between 1s and 60s")
	}
	if c.HealthcheckInterval < 10*time.Second {
		return fmt.Errorf("HEALTHCHECK_INTERVAL must be at least 10s")
	}

	return nil
}

// Helper functions

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getIntEnv(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		var intVal int
		if _, err := fmt.Sscanf(value, "%d", &intVal); err == nil {
			return intVal
		}
	}
	return defaultValue
}

func getBoolEnv(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		return value == "true" || value == "1" || value == "yes"
	}
	return defaultValue
}

func getDurationEnv(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		if duration, err := time.ParseDuration(value); err == nil {
			return duration
		}
	}
	return defaultValue
}
