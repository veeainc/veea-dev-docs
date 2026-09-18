---
icon: lucide/shield-alert
---

# Insecure Registry

Use an insecure registry for local development only.

!!! warning
    Insecure registries do not encrypt traffic or verify server identity. Do not use this pattern for production deployments.

## Create the Compose File

Create `docker-compose-registry-insecure.yml`:

```yaml
version: '3.8'

services:
  registry-ui:
    image: joxit/docker-registry-ui:main
    restart: always
    ports:
      - 80:80
    environment:
      - SINGLE_REGISTRY=true
      - REGISTRY_TITLE=Docker Registry UI
      - DELETE_IMAGES=true
      - SHOW_CONTENT_DIGEST=true
      - NGINX_PROXY_PASS_URL=http://registry:5000
      - SHOW_CATALOG_NB_TAGS=true
      - CATALOG_MIN_BRANCHES=1
      - CATALOG_MAX_BRANCHES=1
      - TAGLIST_PAGE_SIZE=100
      - REGISTRY_SECURED=false
      - CATALOG_ELEMENTS_LIMIT=1000
    container_name: registry-ui

  registry:
    image: registry:2
    ports:
      - 5001:5000
    volumes:
      - ./data:/var/lib/registry
    environment:
      REGISTRY_LOG_LEVEL: info
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /var/lib/registry
      REGISTRY_STORAGE_DELETE_ENABLED: true
      OTEL_TRACES_EXPORTER: none
      OTEL_METRICS_EXPORTER: none
```

## Start the Registry

Open a dedicated terminal and run:

```bash
docker compose -f docker-compose-registry-insecure.yml up
```

Open a second terminal and check containers:

```bash
docker ps
```

Open the registry UI:

```text
http://localhost:80
```

From another host on the same network, use:

```text
http://<VM IP address>:80
```

## Add the Registry to a VeeaHub

Run:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry add 192.168.1.29:5001
```

Expected output:

```text
Name '192.168.1.29:5001' added
```

If the selected VeeaHub is a gateway node, the mesh units are updated.

## List Insecure Registries

Run:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry list
```

Expected output:

```text
Insecure Registries
-------------------
192.168.1.29:5001
```

## Remove an Insecure Registry

Run:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry remove 192.168.1.29:5001
```

Confirm removal:

```bash
vhc2 hub access --hub-id vh-2341 insecure-registry list
```

Expected output:

```text
No Insecure Registries Configured
```
