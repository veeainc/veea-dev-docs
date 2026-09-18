---
title: VHT 2.0 Quickstart
description: Use VHT 2.0 on Ubuntu 24.04 LTS to deploy a first Docker-native application to a prepared VeeaONE target.
icon: lucide/rocket
---

# Quickstart

Use this path to get from a clean Ubuntu 24.04 LTS development host to a running container on a VeeaHub.

!!! warning
    Replace example values such as `192.168.1.36`, `XXXXXXXXXXXXXXXX2341`, `vh-2341`, and registry namespaces with your own values.

## 1. Confirm the Target

Before installing tooling, confirm:

| Item | Required value |
| --- | --- |
| Ubuntu host | Ubuntu 24.04 LTS |
| VeeaHub software | `2.39.0-10` or later |
| Network | Ubuntu host and VeeaHub on the same network |
| Mesh state | Enrolled in Control Center |
| Development mode | Enabled for the mesh |

## 2. Install VHT 2.0

Run on the Ubuntu host:

```bash
wget -O setup-veeahub-dev-env.sh \
  https://c3templates.veeaplatform.net/releases/beta/setup-veeahub-dev-env.sh
chmod +x setup-veeahub-dev-env.sh
./setup-veeahub-dev-env.sh
```

Verify:

```bash
vhc2
```

## 3. Install Docker

```bash
sudo apt update
sudo apt install docker.io docker-buildx docker-compose-v2
sudo usermod --append --groups docker $USER
```

Log out and back in, then verify:

```bash
sudo systemctl status docker
docker version
docker compose version
docker buildx version
docker run --rm --user 1 hello-world
docker ps -a
```

## 4. Add the VeeaHub

```bash
vhc2 hub config add-hub --ip-addr 192.168.1.36 \
  --serial-number XXXXXXXXXXXXXXXX2341 vh-2341
vhc2 hub config show
vhc2 hub access --hub-id vh-2341 ping
```

Expected ping output:

```text
Success
```

## 5. Create a Docker Context

```bash
vhc2 hub access --hub-id vh-2341 context create
vhc2 hub access --hub-id vh-2341 context validate
docker context ls
```

Expected validation output:

```text
Context (vh-2341) working OK
```

!!! warning
    Docker commands run against the selected context. Prefer the explicit `DOCKER_CONTEXT=vh-2341` form below so the target hub is visible in every command.

## 6. Run a Container on the VeeaHub

Prefer explicit context and API version per command:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker run --rm --user 1 hello-world
```

If you want the context to be consistent within this shell session, but not explicitly set per command, you can export the environment variables:
```bash
export DOCKER_API_VERSION=1.39
export DOCKER_CONTEXT=vh-2341 
docker run --rm --user 1 hello-world
```

Expected output includes:

```text
Hello from Docker!
```

## 7. Build and Push an App Image

For a local insecure registry, create an insecure builder first, then build:

```bash
docker buildx build \
  --builder insecure-builder \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t 192.168.1.29:5001/<namespace>/vh_dbus:latest .
```

For a secure registry:

```bash
docker buildx build \
  --builder secure-builder-using-public-trusted-certs \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t docker.io/<namespace>/vh_dbus:latest .
```

## 8. Run with Docker Compose

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker compose \
  -f docker-compose-one-service-insecure.yml up
```

In another terminal:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker ps
```

Stop the Compose app with the same context and file:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker compose \
  -f docker-compose-one-service-insecure.yml down
```

## What to Read Next

- [Docker Context](docker/docker-context.md) for safe target selection.
- [Docker Registries](registries/overview.md) before choosing secure or insecure registries.
- [Compose vs Stack](deployment/compose-vs-stack.md) before mesh deployment testing.
- [Troubleshooting](reference/troubleshooting.md) if a command fails.
