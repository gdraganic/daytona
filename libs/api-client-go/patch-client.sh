#!/bin/bash
# Patch the OpenAPI generated Go client to use NewRequestWithContext
# This ensures trace context is properly propagated through HTTP requests

set -e

CLIENT_FILE="libs/api-client-go/client.go"

echo "Patching ${CLIENT_FILE} to use NewRequestWithContext..."

# Check if already patched
if grep -q "NewRequestWithContext" "${CLIENT_FILE}"; then
    echo "✓ Already patched - client.go uses NewRequestWithContext"
    exit 0
fi

# Patch http.NewRequest to http.NewRequestWithContext
sed -i 's/http\.NewRequest(method, url\.String(), body)/http.NewRequestWithContext(ctx, method, url.String(), body)/g' "${CLIENT_FILE}"
sed -i 's/http\.NewRequest(method, url\.String(), nil)/http.NewRequestWithContext(ctx, method, url.String(), nil)/g' "${CLIENT_FILE}"

echo "✓ Patched ${CLIENT_FILE} successfully"
echo "  - Changed http.NewRequest -> http.NewRequestWithContext"
echo "  - This enables OpenTelemetry trace context propagation"
