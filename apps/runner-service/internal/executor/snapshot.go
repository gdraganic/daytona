/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

package executor

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"

	apiclient "github.com/daytonaio/apiclient"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/api/types/registry"
)

func (e *Executor) buildSnapshot(ctx context.Context, job *apiclient.Job) error {
	payload := job.GetPayload()

	// Extract snapshot ref from payload
	snapshotRef, ok := payload["snapshotRef"].(string)
	if !ok {
		return fmt.Errorf("snapshotRef not found in payload")
	}

	e.log.Debug("Building snapshot", slog.String("snapshot_ref", snapshotRef))

	// TODO: Implement actual snapshot build
	// - Build container image from Dockerfile or spec
	// - Tag with snapshot ref
	// - Store locally

	// Increment snapshot count
	e.collector.IncrementSnapshots()

	e.log.Info("Snapshot built (placeholder)", slog.String("snapshot_ref", snapshotRef))
	return nil
}

func (e *Executor) pullSnapshot(ctx context.Context, job *apiclient.Job) error {
	// Get snapshot ref from resourceId
	snapshotRef := job.GetResourceId()
	if snapshotRef == "" {
		return fmt.Errorf("snapshotRef (resourceId) not found in job")
	}

	e.log.Info("Pulling snapshot", slog.String("snapshot_ref", snapshotRef))

	payload := job.GetPayload()

	// Build image pull options with registry auth
	pullOptions := image.PullOptions{
		Platform: "linux/amd64",
	}

	// Extract registry credentials if present
	if registryPayload, ok := payload["registry"].(map[string]interface{}); ok {
		authConfig := registry.AuthConfig{}

		if username, ok := registryPayload["username"].(string); ok {
			authConfig.Username = username
		}
		if password, ok := registryPayload["password"].(string); ok {
			authConfig.Password = password
		}

		// Encode auth config to base64
		if authConfig.Username != "" || authConfig.Password != "" {
			encodedJSON, err := json.Marshal(authConfig)
			if err != nil {
				return fmt.Errorf("failed to encode registry auth: %w", err)
			}
			pullOptions.RegistryAuth = base64.URLEncoding.EncodeToString(encodedJSON)
		}
	}

	// Pull the image
	reader, err := e.dockerClient.ImagePull(ctx, snapshotRef, pullOptions)
	if err != nil {
		return fmt.Errorf("failed to pull snapshot: %w", err)
	}
	defer reader.Close()

	// Consume the output to wait for pull to complete
	// We need to read the output completely for the pull to finish
	buf := make([]byte, 4096)
	for {
		_, err := reader.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			// Ignore other read errors as the pull might have completed
			break
		}
	}

	// Increment snapshot count
	e.collector.IncrementSnapshots()

	e.log.Info("Snapshot pulled successfully", slog.String("snapshot_ref", snapshotRef))
	return nil
}

func (e *Executor) removeSnapshot(ctx context.Context, job *apiclient.Job) error {
	payload := job.GetPayload()

	// Extract snapshot ref from payload
	snapshotRef, ok := payload["snapshotRef"].(string)
	if !ok {
		return fmt.Errorf("snapshotRef not found in payload")
	}

	e.log.Debug("Removing snapshot", slog.String("snapshot_ref", snapshotRef))

	// TODO: Implement actual snapshot removal
	// - Remove image from local storage

	// Decrement snapshot count
	e.collector.DecrementSnapshots()

	e.log.Info("Snapshot removed (placeholder)", slog.String("snapshot_ref", snapshotRef))
	return nil
}
