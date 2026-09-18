---
icon: lucide/layers
---

# Docker Stack Deployment

Use Docker Stack when you need to test the deployment model used for VeeaHub Mesh and Control Center deployment.

Docker Stack runs pre-built images. It does not build application images.

## Build First

Build and push the image before deploying the stack:

```bash
docker buildx build \
  --builder insecure-builder \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t 192.168.1.29:5001/<namespace>/vh_dbus:latest .
```

## Deploy the Stack

Use a Compose file compatible with legacy Compose file format `3.0` through `3.8`. Do not use options introduced in format `3.8` (`credential_spec`, `max_replicas_per_node`, and the `configs` driver options); they are not supported on all VeeaHub software releases.

Run the stack deploy command against the VeeaHub Docker context:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker stack deploy \
  -c docker-compose-one-service-insecure.yml vh-dbus
```

Check services:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker stack services vh-dbus
```

Check tasks:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker stack ps vh-dbus
```

Success means the service has a running task on the expected mesh node.

Remove the stack:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker stack rm vh-dbus
```

!!! note
    Run this workflow on a development mesh before using the same Compose file for wider deployment. Docker Stack requires pre-built images and ignores `build` instructions in Compose files.
