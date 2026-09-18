---
icon: lucide/refresh-cw
---

# Hub Upgrade Compatibility Test

Use this test to compare application behavior before and after a hub software upgrade.

## Use When

- preparing a hub software upgrade
- checking that VHT 1.x applications still run after upgrade
- checking whether VHT 2.0 can be introduced on the upgraded hub
- proving app persistence and UI links survive restart and upgrade events

## Procedure

1. Run the VHT 1.x app baseline test before the upgrade.
2. Export or record app configuration, UI URLs, app version, ports, and deployment method.
3. Upgrade the hub software.
4. Confirm the hub rejoins the expected network or mesh.
5. Confirm existing apps start automatically, if expected.
6. Open each app through the same access paths used before the upgrade.
7. Re-run persistence checks.
8. Re-run uninstall and reinstall checks if this is a development hub.
9. Record differences between pre-upgrade and post-upgrade behavior.

## Pass Criteria

- existing apps remain installable and runnable
- UI links still open
- app data persists as expected
- deployment and uninstall flows remain predictable
- any changed behavior is documented and explainable

## Evidence To Capture

- before and after hub software versions
- screenshots of app UI before and after upgrade
- install or app status command output
- Control Center screenshots, if used
- notes for any changed URL, port, permission, license, or partner behavior
