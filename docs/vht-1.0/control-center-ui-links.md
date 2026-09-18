---
icon: lucide/external-link
---

# Control Center UI Links

A published Docker port is not enough to create a clickable Control Center card.

For VHT 1.x web apps, the running container must register its web UI with the VeeaHub ReverseProxy D-Bus service.

## Required Runtime Flow

After the app HTTP server starts:

1. Connect to the system D-Bus.
2. Call `io.veea.VeeaHub.ReverseProxy.RegisterReverseProxy`.
3. Use the returned token.
4. Call `io.veea.VeeaHub.ReverseProxy.ConfigureVeeaCloudAccess`.
5. Retry registration until D-Bus and ReverseProxy are ready.

The service card is runtime state. Re-register every time the container starts.

## Minimal Method Shape

Register the local HTTP server:

```text
RegisterReverseProxy(
  "veea_cloud",
  "",
  0,
  "http",
  "",
  "",
  <local-http-port>,
  ""
)
```

Configure the Control Center card:

```text
ConfigureVeeaCloudAccess(
  <token-from-register>,
  "ui:http",
  "<display name>",
  "<description>",
  <access rules>
)
```

Use:

| Field | Value |
| --- | --- |
| Network | `veea_cloud` for Control Center-only access |
| Mode | `http` for a plain HTTP container service |
| Protocol | `ui:http` for a dashboard/UI card |
| Name | Human-readable card label |

Control Center displays `ui:http` as `UI:HTTP`.

## Debug Checklist

If the container is running but the card is missing:

- Confirm the HTTP server is listening on the intended port.
- Confirm the Docker port is published if LAN access is expected.
- Check container logs for ReverseProxy or D-Bus errors.
- Confirm the app retries registration after startup.
- Confirm `ConfigureVeeaCloudAccess` returns success.
- Confirm the service name is the expected display name.

Useful app log lines:

```text
dashboard listening on port <port>
Registered Control Center dashboard service '<name>' on port <port>
```

## Related Reference

- [io.veea.VeeaHub.ReverseProxy](api-reference/io-veea-veeahub-reverseproxy.md)
- [An Example to Demonstrate Remote Container Access](examples/advanced/remote-container-access.md)
- [Web UI Proxy Compatibility](web-ui-proxy-compatibility.md)
