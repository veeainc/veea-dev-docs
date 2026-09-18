---
icon: lucide/file-text
---

# Remote Access to Containers

Remote container access lets a VHT 1.x application expose a container service through Control Center without publishing that service directly on the local network.

Use this pattern when a container provides a web console, local API, setup UI, diagnostics page, or other operator-facing endpoint that should be reached through the Veea control plane.

## Local Workflow

1. Build the container image with the service listening on an internal container port.
2. Configure the VHT 1.x image or application metadata so the service is exposed as a remote-access endpoint.
3. Upload the image or application to the development VeeaHub.
4. Start the container or application.
5. Open the service through Control Center.

## Related Local Pages

- [An Example to Demonstrate Remote Container Access](../examples/advanced/remote-container-access.md)
- [An Example to Demonstrate Published Ports](../examples/advanced/published-ports.md)
- [Application Creation and Configuration](creation-and-configuration.md)
- [Application Test](test.md)
- [Control Center UI Links](../control-center-ui-links.md)
- [Web UI Proxy Compatibility](../web-ui-proxy-compatibility.md)

!!! warning
    Do not expose administrative services broadly on the local network unless the application explicitly requires it. Prefer the remote-access pattern for operator UI and diagnostics.
