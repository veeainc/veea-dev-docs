---
icon: lucide/hammer
---

# Buildx Builders

Use Docker Buildx to build multi-architecture images for VeeaHub targets.

Build VHT 2.0 images for the common development host and VeeaHub target architectures:

```text
linux/amd64,linux/arm/v7,linux/arm64/v8
```

## Insecure Registry Builder

Create `buildkit-insecure.toml`:

```toml
# https://docs.docker.com/build/buildkit/toml-configuration/
[registry."192.168.1.29:5001"]
http = true
insecure = true
```

Create the builder:

```bash
docker buildx create \
  --name insecure-builder --driver docker-container \
  --buildkitd-flags '--allow-insecure-entitlement security.insecure' \
  --config buildkit-insecure.toml \
  --use
```

Verify:

```bash
docker buildx ls
```

## Secure Registry Builder

Create `buildkit-config-secure-using-public-trusted-certs.toml`:

```toml
# docker.io uses publicly trusted TLS - no custom certs needed
```

Create the builder:

```bash
docker buildx create \
  --name secure-builder-using-public-trusted-certs \
  --config buildkit-config-secure-using-public-trusted-certs.toml \
  --use
```

Verify:

```bash
docker buildx ls
```

## Example Secure Build Command

```bash
docker buildx build \
  --builder secure-builder-using-public-trusted-certs \
  --platform linux/amd64,linux/arm/v7,linux/arm64/v8 \
  --push -t docker.io/<namespace>/vh_dbus:latest .
```
