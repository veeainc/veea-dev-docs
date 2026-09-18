---
icon: lucide/map
---

# Workflow Guide

Use this page to choose the right path through the VHT 2.0 docs.

VHT 2.0 work usually moves through three stages:

1. Prepare the development environment.
2. Prove that Docker can target the VeeaHub safely.
3. Build, push, and run an application from a registry.

You do not need to read every page before running your first container. Start with the path that matches what you are trying to do.

## Choose a Path

| Goal | Start with | Then read |
| --- | --- | --- |
| First successful setup | [Quickstart](quickstart.md) | [Docker Context](docker/docker-context.md), [Troubleshooting](reference/troubleshooting.md) |
| Prepare a new development host | [Prerequisites](prerequisites.md) | [Install VHT](install/install-vht.md), [Install Docker](docker/install-docker.md) |
| Configure a target VeeaHub | [Enable Development Mode](developer-onboarding/enable-development-mode.md) | [Add, Show, Ping, and Remove Hubs](hubs/add-show-ping-remove.md) |
| Build an application image | [Docker Registries](registries/overview.md) | [Buildx Builders](registries/buildx-builders.md), [Example Build](deployment/example-build.md) |
| Run on one VeeaHub | [Docker Compose Deployment](deployment/docker-compose.md) | [Run Containers on a VeeaHub](docker/run-containers-on-veeahub.md) |
| Test mesh deployment behavior | [Compose vs Stack](deployment/compose-vs-stack.md) | [Docker Stack Deployment](deployment/docker-stack.md) |
| Work with licensed capabilities | [Partner Credentials](install/partner-credentials.md) | [Feature Licenses](install/feature-licenses.md), [Upload and Remove Feature Licenses](hubs/upload-remove-feature-licenses.md) |

## Recommended Milestones

Work in small, verifiable milestones. Each milestone leaves the environment in a known state.

| Milestone | Success signal |
| --- | --- |
| VHT is installed | `vhc2` shows command help and `vhc2 partner config show` prints configuration. |
| Docker works locally | `docker run hello-world` prints `Hello from Docker!`. |
| The hub is reachable | `vhc2 hub access --hub-id <hub-id> ping` prints `Success`. |
| Docker context works | `vhc2 hub access --hub-id <hub-id> context validate` prints `Context (<hub-id>) working OK`. |
| Docker targets the hub | `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker node ls` shows the target node or mesh. |
| Registry flow works | `docker manifest inspect <image>` shows the target platforms. |
| Compose app runs | `docker ps` against the VeeaHub context shows the application container. |
| Stack deployment works | `docker stack ps <stack-name>` shows a running task on the expected node. |

## Positive Path

Most problems in this workflow are normal setup issues: the wrong Docker context, a missing Docker API version, a registry pull rule, or a hub that has not restarted after configuration. The docs are organized so each step gives you a command, an expected output, and the next page to open when the output is different.

When in doubt, return to these three checks:

```bash
vhc2 hub access --hub-id <hub-id> ping
vhc2 hub access --hub-id <hub-id> context validate
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker ps
```

If all three pass, the development path is healthy enough to continue.

## What to Keep Separate

Keep these boundaries clear:

- VHT 2.0 commands use `vhc2`.
- VHT 1.x commands use `vhc`.
- Docker Compose is for development and single-node testing.
- Docker Stack is for Swarm and VeeaHub Mesh deployment testing.
- Secure registries are the normal path for team and production workflows.
- Insecure registries are local development tools only.

## Next Step

For a new setup, continue with [Quickstart](quickstart.md). For an existing setup, use the table above to jump directly to the task you need.
