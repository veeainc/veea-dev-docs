---
icon: lucide/rocket
---

# VHT 2.0 First App Test

Use this test to prove that the Docker-native VHT 2.0 workflow works on the target development environment.

## Use When

- validating a new VHT 2.0 install
- confirming a hub can be targeted through Docker Context
- testing Compose or Stack deployment on a supported hub software release
- proving registry access before building real applications

## Procedure

1. Install VHT 2.0 and confirm `vhc2` runs.
2. Add the target hub to VHT configuration.
3. Confirm hub access and development mode.
4. Create or select a Docker context for the hub.
5. Build the sample or first app image.
6. Push the image to the expected registry.
7. Deploy with Docker Compose for node-level testing.
8. Deploy with Docker Stack if testing mesh behavior.
9. Confirm logs, ports, app health, restart behavior, and removal.

## Pass Criteria

- `vhc2` can identify and manage the target hub
- Docker context points at the correct hub
- image builds for the required architecture
- registry push and pull work from the hub
- Compose or Stack deployment starts and can be inspected
- cleanup removes the workload cleanly

## Related Docs

- [VHT 2.0 Quickstart](../quickstart.md)
- [Create a Docker context](../docker/docker-context.md)
- [Deployment options](../deployment/compose-vs-stack.md)
- [Known constraints](../reference/known-constraints.md)
