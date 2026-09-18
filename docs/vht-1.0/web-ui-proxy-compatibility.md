---
icon: lucide/globe
---

# Web UI Proxy Compatibility

Control Center does not open a VHT 1.x web app at the VeeaHub LAN root URL.

It opens the app through a nested cloud proxy path:

```text
https://controlcenter.veea.co/node/v2/proxy/<hub-serial>/<app-or-image-uuid>/http/<service-name>/
```

The same app may also need to work directly on the local network:

```text
http://<hub-ip>:<published-port>/
```

Design and test web apps for both paths.

## Common Failure Pattern

Root-absolute browser paths work locally but escape the Control Center tunnel.

Problem examples:

```text
/_next/static/...
/assets/app.css
/api/status
/devices
/settings
```

Through Control Center, those paths resolve against `https://controlcenter.veea.co/` instead of the app's nested proxy path.

Symptoms:

- Page partially renders but scripts or styles return `404`.
- Browser console shows failed requests to `https://controlcenter.veea.co/_next/...`.
- Client navigation jumps to Control Center root paths.
- Same-origin API calls go to Control Center instead of the app.

## Safer Browser Paths

Prefer paths that stay under the current app mount:

| Use | Avoid |
| --- | --- |
| `./assets/app.css` | `/assets/app.css` |
| `./api/status` | `/api/status` |
| `./devices` | `/devices` |
| URL helpers based on `window.location.pathname` | hard-coded Control Center URLs |

Do not hard-code the Control Center hostname. The app should work under LAN direct access and the Control Center tunnel.

## Local Emulator Recommendation

Before packaging a browser-heavy app, test it under a local fake Control Center path:

```text
http://127.0.0.1:<port>/node/v2/proxy/<hub-serial>/<app-uuid>/http/<service-name>/
```

The emulator should:

- forward requests under the nested service path
- redirect slashless service roots to the slash form
- preserve query strings
- fail root escapes such as `/_next`, `/api`, `/devices`, and `/assets`
- test deep links, not only the home page

## Deployment Debug Endpoint

For web apps, add a tiny version endpoint or response header so support can prove which container build is serving traffic.

Useful examples:

```text
/health
/version
/__app-proxy-version
```

Then verify after deployment:

```bash
curl -sS http://<hub-ip>:<published-port>/health
curl -sS http://<hub-ip>:<published-port>/version
```

## Related Pages

- [Control Center UI Links](control-center-ui-links.md)
- [io.veea.VeeaHub.ReverseProxy](api-reference/io-veea-veeahub-reverseproxy.md)
