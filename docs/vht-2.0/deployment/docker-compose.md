---
icon: simple/docker
---

# Docker Compose Deployment

Use Docker Compose to run an application on a single VeeaHub node through Docker context.

## Insecure Registry Compose File

Create `docker-compose-one-service-insecure.yml` and update the registry IP address and namespace.

```yaml
services:
  vh_dbus:
    environment:
      DEBUG: "true"
      label.com.veea.authorisation.allowExternalStorage: "true"
      label.com.veea.authorisation.allowOnUnauthenticatedHost: "true"
      label.com.veea.image.persistent_uuid: "0000000D-1BED-41EC-8717-8CAA428DA430"
    build:
      context: .
      dockerfile: Dockerfile
    image: 192.168.1.29:5001/<namespace>/vh_dbus:latest
    labels:
      com.veea.authorisation.allowExternalStorage: "true"
      com.veea.authorisation.allowOnUnauthenticatedHost: "true"
      com.veea.image.persistent_uuid: "0000000D-1BED-41EC-8717-8CAA428DA430"
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
```

Run the application:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker compose \
  -f docker-compose-one-service-insecure.yml up
```

The image is pulled from the registry and container logs appear in the terminal.

In another terminal, check running containers:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker ps
```

Success means the `vh_dbus` container is listed and remains running.

## Secure Registry Compose File

Copy the insecure Compose file:

```bash
cp docker-compose-one-service-insecure.yml docker-compose-one-service-secure.yml
```

Replace the image:

```yaml
image: docker.io/<namespace>/vh_dbus:latest
```

Run:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker compose \
  -f docker-compose-one-service-secure.yml up
```

!!! note
    The VeeaHub does not authenticate to the registry in this workflow because it only pulls the image. The registry must allow unauthenticated pulls.

## Stop the Compose App

Use the same file and context:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker compose \
  -f docker-compose-one-service-insecure.yml down
```
