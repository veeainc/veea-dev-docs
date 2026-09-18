---
icon: lucide/archive
---

# VHT 1.x App Baseline Test

Use this test to prove that an existing VHT 1.x application works on the current hub software before changing the hub, application, or deployment workflow.

## Use When

- validating VHC25 behavior before an upgrade
- confirming a signed `.tgz` application still installs
- confirming Control Center app cards and local URLs still open
- collecting a known-good baseline before VHT 2.0 testing

## Preconditions

- VHT 1.x app package or image is available
- target hub is reachable
- required partner credentials, licenses, or development mode settings are in place
- expected app port and UI path are known

## Procedure

1. Record hub serial number, hub software version, and VHT CLI version.
2. Install or sideload the VHT 1.x app using the intended workflow.
3. Confirm the container or service is running.
4. Open the app locally by IP and port, if published.
5. Open the app through Control Center, if it registers a UI card.
6. Restart the app or hub and confirm the app returns.
7. Verify persistence by changing an app setting, restarting, and checking that the setting remains.
8. Remove the app and confirm ports, UI cards, and containers are cleaned up.

## Pass Criteria

- app installs without unexpected signing, license, or partner-ID errors
- app starts and remains running
- UI opens through every expected path
- persistence survives restart
- uninstall leaves no stale runtime state that affects reinstall

## Related Docs

- [VHC25 Quickstart For VHT 1.x](../../vht-1.0/quickstart.md)
- [VHT 1.x Validated Workflows](../../vht-1.0/validated-workflows.md)
- [Control Center UI Links](../../vht-1.0/control-center-ui-links.md)
