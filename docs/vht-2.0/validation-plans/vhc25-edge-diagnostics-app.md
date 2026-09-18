---
icon: lucide/activity
---

# VHC25 Edge Diagnostics App

Use the VHC25 edge diagnostics app as an operational smoke test for VHT 1.x behavior, hub runtime visibility, local persistence, UI access, and upgrade comparison.

## What It Proves

The diagnostics app is useful because it exercises more than a static web page. It can validate:

- app UI access from the browser
- VHT 1.x packaging behavior
- Control Center UI link behavior
- local persistent storage
- app restart behavior
- basic hub runtime visibility
- background-job behavior
- image/file upload behavior

## Recommended Baseline

Before a hub upgrade, record:

- app package version
- app URL or Control Center card URL
- hub serial number and software version
- VHT 1.x build and package command used
- visible app status indicators
- persistence test results
- any unavailable runtime probes

After the upgrade, open the same app and compare the same evidence.

## Pass Criteria

- app opens on desktop, tablet, and mobile widths
- app can write and reload persistent data
- background job can start, write heartbeat events, and stop
- image upload stores metadata and file bytes
- UI links remain reachable through the intended access path
- runtime probes are either OK or clearly explained

## Related Docs

- [VHT 1.x Validated Workflows](../../vht-1.0/validated-workflows.md)
- [Control Center UI Links](../../vht-1.0/control-center-ui-links.md)
- [Web UI Proxy Compatibility](../../vht-1.0/web-ui-proxy-compatibility.md)
