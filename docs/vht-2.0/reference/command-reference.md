---
title: VHT 2.0 Command Reference
icon: lucide/list
---

# Command Reference

This page collects the main VHT 2.0 and Docker commands used across the docs.

## VHT 2.0 CLI

| Task | Command |
| --- | --- |
| Show VHT help | `vhc2` |
| Show partner details | `vhc2 partner config show` |
| Import partner credentials | `vhc2 partner secure import-credentials veea-partner-<partnerID>.tgz` |
| Add feature license path | `vhc2 partner secure add-license-path <directory>` |
| Show secure partner config | `vhc2 partner secure show` |
| Add a hub | `vhc2 hub config add-hub --ip-addr <ip-address> --serial-number <serial-number> <hub-id>` |
| Show hubs | `vhc2 hub config show` |
| Ping a hub | `vhc2 hub access --hub-id <hub-id> ping` |
| Remove a hub | `vhc2 hub config remove-hub <hub-id>` |
| Upload feature licenses | `vhc2 hub access upload-feature-licenses --hub-id <hub-id>` |
| Delete feature licenses | `vhc2 hub access delete-all-feature-licenses --hub-id <hub-id>` |
| Create Docker context | `vhc2 hub access --hub-id <hub-id> context create` |
| Validate Docker context | `vhc2 hub access --hub-id <hub-id> context validate` |
| Reboot hub | `vhc2 hub access --hub-id <hub-id> reboot` |

## Insecure Registry Commands

| Task | Command |
| --- | --- |
| Add registry | `vhc2 hub access --hub-id <hub-id> insecure-registry add <IP:port>` |
| List registries | `vhc2 hub access --hub-id <hub-id> insecure-registry list` |
| Remove registry | `vhc2 hub access --hub-id <hub-id> insecure-registry remove <IP:port>` |

## Docker Context Commands

| Task | Command |
| --- | --- |
| List contexts | `docker context ls` |
| Set default context | `docker context use <context-name>` |
| Return to local Docker | `docker context use default` |
| Run one command on a context | `DOCKER_CONTEXT=<context-name> docker <command>` |
| Run one command with API version | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<context-name> docker <command>` |

## Docker Build and Deployment Commands

| Task | Command |
| --- | --- |
| Create Buildx builder | `docker buildx create ...` |
| List builders | `docker buildx ls` |
| Build and push multi-arch image | `docker buildx build --platform linux/amd64,linux/arm/v7,linux/arm64/v8 --push -t <image> .` |
| Inspect insecure manifest | `docker manifest inspect --insecure <image>` |
| Inspect secure manifest | `docker manifest inspect <image>` |
| Run Compose app | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker compose -f <file> up` |
| Show containers | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker ps` |
| Deploy stack | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker stack deploy -c <file> <stack-name>` |
| Show stack services | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker stack services <stack-name>` |
| Remove stack | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker stack rm <stack-name>` |
