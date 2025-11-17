# Runner Service Packaging

This directory contains packaging configuration for the Daytona Runner Service.

## Building the DEB Package

To build the Debian package, run:

```bash
VERSION=1.0.0 nx run runner-service:package-deb
```

This will create a `.deb` file at:

```
dist/apps/runner-service/daytona-runner_1.0.0_amd64.deb
```

## Installing the Package

### Standard Installation

```bash
# 1. Install the package
sudo dpkg -i dist/apps/runner-service/daytona-runner_1.0.0_amd64.deb

# 2. Configure environment variables
sudo nano /etc/daytona/runner.env

# 3. Enable and start the service
sudo systemctl enable --now daytona-runner
```

The installation will:

- Install the binary to `/opt/daytona/runner`
- Install the systemd service to `/etc/systemd/system/daytona-runner.service`
- Create directories at `/var/lib/daytona/runner` and `/var/log/daytona`
- Create an environment file at `/etc/daytona/runner.env`

**Note:** The service is NOT started automatically. You must configure environment variables first, then enable and start it manually.

## Configuring Environment Variables

Edit the environment file to configure the service:

```bash
sudo nano /etc/daytona/runner.env
```

Add your environment variables in the format:

```bash
# Required
DAYTONA_API_URL=https://api.daytona.io
DAYTONA_RUNNER_TOKEN=your-token-here

# Optional - Job Polling
POLL_TIMEOUT=30s
POLL_LIMIT=10

# Optional - Healthcheck
HEALTHCHECK_INTERVAL=30s
HEALTHCHECK_TIMEOUT=10s

# Optional - Features
METRICS_ENABLED=false
OTEL_ENABLED=false
```

After making changes, restart the service:

```bash
sudo systemctl restart daytona-runner
```

## Cloud-Init Example

For automated deployment with cloud-init:

```yaml
#cloud-config
packages:
  - dpkg

write_files:
  - path: /tmp/daytona-runner.deb
    permissions: '0644'
    encoding: b64
    content: |
      <base64-encoded-deb-file>

  - path: /etc/daytona/runner.env
    permissions: '0600'
    content: |
      DAYTONA_API_URL=https://api.daytona.io
      DAYTONA_RUNNER_TOKEN=your-token-here
      POLL_TIMEOUT=30s
      POLL_LIMIT=10
      OTEL_ENABLED=false

runcmd:
  - dpkg -i /tmp/daytona-runner.deb
  - systemctl enable --now daytona-runner
```

## Managing the Service

Check service status:

```bash
sudo systemctl status daytona-runner
```

View logs:

```bash
sudo journalctl -u daytona-runner -f
```

Stop the service:

```bash
sudo systemctl stop daytona-runner
```

Start the service:

```bash
sudo systemctl start daytona-runner
```

Disable auto-start:

```bash
sudo systemctl disable daytona-runner
```

## Uninstalling

To remove the package but keep configuration:

```bash
sudo dpkg -r daytona-runner
```

To completely remove including configuration and data:

```bash
sudo dpkg -P daytona-runner
```

## Package Contents

- **Binary**: `/opt/daytona/runner`
- **Systemd Service**: `/etc/systemd/system/daytona-runner.service`
- **Environment File**: `/etc/daytona/runner.env`
- **Data Directory**: `/var/lib/daytona/runner`
- **Log Directory**: `/var/log/daytona`

## Security Notes

- The service runs as `root` user (required for container/sandbox operations)
- The environment file at `/etc/daytona/runner.env` has restricted permissions (600)
- All logs are sent to systemd journal
