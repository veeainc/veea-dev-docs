---
title: VHT 2.0 Troubleshooting
icon: lucide/circle-alert
---

# Troubleshooting

Use this page when a VHT 2.0 setup or deployment step fails.

## Docker API Version Is Too New

Symptom:

```text
client version 1.52 is too new. Maximum supported API version is 1.39
```

Cause: the development host Docker client is using a newer API than the VeeaHub supports.

Fix:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker node ls
```

Or set it for the current shell:

```bash
export DOCKER_API_VERSION=1.39
```

## Docker Command Ran Against the Wrong Target

Symptom: a container, image, or stack appears on the development host instead of the VeeaHub, or on the wrong VeeaHub.

Check the active context:

```bash
docker context ls
docker context show
```

Prefer explicit per-command context:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker ps
```

## VeeaHub Context Does Not Work

Recreate and validate the context:

```bash
vhc2 hub access --hub-id vh-2341 context create
vhc2 hub access --hub-id vh-2341 context validate
```

Confirm the context exists:

```bash
docker context ls
```

## Hub Ping Fails

Check:

- Development mode is enabled for the mesh.
- The VeeaHub is enrolled and online in Control Center.
- The Ubuntu host is on the same network as the VeeaHub.
- The VeeaHub IP address in VHT config is correct.
- The hub software is `2.39.0-10` or later.

Show configured hubs:

```bash
vhc2 hub config show
```

Ping again:

```bash
vhc2 hub access --hub-id vh-2341 ping
```

## Insecure Registry Pull Fails

Check that the registry is running:

```bash
docker ps
```

Check that the VeeaHub has the registry configured:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry list
```

Add it if missing:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry add 192.168.1.29:5001
```

## Secure Registry Pull Fails

Current VeeaHub runtime pulls require the image to be pullable without VeeaHub-side authentication.

Check:

- The image exists in the registry.
- The repository visibility or registry policy allows unauthenticated pulls.
- The image tag in the Compose file matches the pushed image.
- The VeeaHub can resolve and reach the registry over the network.

## Docker Stack Ignores Build Instructions

This is expected. Docker Stack requires pre-built images and ignores Compose `build` instructions.

Build and push first:

```bash
docker buildx build \
  --builder insecure-builder \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t 192.168.1.29:5001/<namespace>/vh_dbus:latest .
```

Then deploy the stack.
