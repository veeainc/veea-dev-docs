---
icon: lucide/box
---

# Example Build

This example uses the `vh_dbus` template from the `c3-templates` repository to demonstrate a VHT 2.0 image build and registry push.

## Clone the Example

```bash
git clone git@bitbucket.org:veea/c3-templates.git
git checkout main
cd c3-templates/vh_dbus
```

!!! note
    If the VHT 2.0 template branch or directory layout has moved, use the current `vh_dbus` VHT 2.0 template location. The build and registry commands below stay the same.

## Build for an Insecure Registry

Build and push a multi-architecture image:

```bash
docker buildx build \
  --builder insecure-builder \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t 192.168.1.29:5001/<namespace>/vh_dbus:latest .
```

Inspect the pushed manifest:

```bash
docker manifest inspect --insecure 192.168.1.29:5001/<namespace>/vh_dbus:latest
```

The `--insecure` flag is required for an insecure registry.

## Build for a Secure Registry

Login to Docker Hub:

```bash
docker login
```

Or use a PAT from an environment variable:

```bash
export DOCKER_CONTEXT=default
echo ${PAT} | docker login -u <username> --password-stdin docker.io
```

Build and push:

```bash
docker buildx build \
  --builder secure-builder-using-public-trusted-certs \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t docker.io/<namespace>/vh_dbus:latest .
```

Inspect the pushed manifest:

```bash
docker manifest inspect docker.io/<namespace>/vh_dbus:latest
```

Expected manifest platforms include `linux/amd64`, `linux/arm/v7`, and `linux/arm64`.
