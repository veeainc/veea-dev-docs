---
icon: lucide/file-text
---

# Dynamic Container Configuration and State

Dynamic configuration and state patterns let a VHT 1.x container read configuration provided by the VeeaHub environment and preserve runtime state across container restarts.

Use this pattern when a container needs site-specific settings, generated credentials, mesh-specific values, service URLs, or persistent application state.

## Local Workflow

1. Define the configuration values the container needs.
2. Store those values in the VHT 1.x configuration model or a mounted configuration volume.
3. Read the configuration from inside the container at runtime.
4. Write mutable state to a persistent volume rather than baking it into the image.
5. Test restart, stop/start, and backup/restore behavior on a development VeeaHub.

## Related Local Pages

- [An Example to Demonstrate Container Configuration](../examples/advanced/container-configuration.md)
- [An Example to Demonstrate Volumes](../examples/advanced/volumes.md)
- [An Example to Demonstrate Container Backup and Restore](../examples/advanced/container-backup-and-restore.md)
- [Mesh-enabled Template Example Configuration](../examples/mesh/configuration.md)

!!! note
    Keep secrets and site-specific values out of the Docker image. Pass them through runtime configuration or generated state.
