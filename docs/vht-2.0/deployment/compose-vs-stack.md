---
icon: lucide/git-compare
---

# Compose vs Stack

Docker Compose and Docker Stack both use Compose files, but they are used differently in the VHT 2.0 workflow.

| Tool | Use for | Target |
| --- | --- | --- |
| `docker compose` | Development and single-node testing | One VeeaHub node through Docker context |
| `docker stack` | Swarm and VeeaHub Mesh deployment | Any or all nodes in a VeeaHub Mesh |

## Docker Compose

Docker Compose is used to deploy to individual nodes from a central host using Docker context.

Compose can interpret `build` instructions, so it can build and run during development.

## Docker Stack

Docker Stack deploys applications across a Docker Swarm. In a VeeaHub Mesh, deployment is managed from the Swarm manager, which is the gateway node.

Use Docker Stack when you need to validate the deployment model used for mesh-wide deployment from Control Center.

For Compose files used with Docker Stack:

- Only legacy Compose file formats `3.0` through `3.8` are supported. Do not use options introduced in format `3.8` (`credential_spec`, `max_replicas_per_node`, and the `configs` driver options).
- Some older Compose `1.x` and `2.x` options are ignored.
- `build` instructions are ignored.
- Pre-built images are required.

!!! warning
    Docker Stack ignores `build` instructions. Build and push images before deploying with Docker Stack.

## Write One Compose File

A Compose file should support both Docker Compose and Docker Stack:

- Keep `build` instructions for local development.
- Include an `image` reference for Stack deployment.
- Use `deploy` placement rules for mesh placement.
- Keep registry image names easy to swap between insecure and secure registries.

## Decision Rule

Use `docker compose` while you are still changing code, images, labels, or environment variables.

Use `docker stack` when you need to test the deployment model that will run across a VeeaHub Mesh.
