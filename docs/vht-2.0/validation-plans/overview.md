---
icon: lucide/list-checks
---

# Validation Plans

Use these plans when you need evidence that Veea edge application workflows still work across VHT versions, hub software releases, and deployment paths.

The goal is not to test every feature in isolation. The goal is to prove the workflows that matter:

- VHT 1.x applications still run after hub changes.
- VHT 2.0 Docker-native workflows work on the target hub release.
- VHT 1.x and VHT 2.0 can coexist when both are required.
- Control Center, local access, app UI links, persistence, and restart behavior are understood before rollout.

## Recommended Order

1. Run the [VHT 1.x app baseline test](vht-1x-app-baseline.md) on the current hub software.
2. Run the [hub upgrade compatibility test](hub-upgrade-compatibility.md) before and after a hub upgrade.
3. Run the [VHT 2.0 first app test](vht-2-first-app.md) on the target VHT 2.0 release.
4. Run the [VHT 1.x + VHT 2.0 coexistence test](coexistence-test.md) if both workflows will be used on the same mesh.
5. Use the [VHC25 edge diagnostics app](vhc25-edge-diagnostics-app.md) as an operational smoke test.

## Capture Evidence

For every run, capture:

- hub serial number and software version
- VHT CLI version
- app package or image version
- deployment path used
- local URL or Control Center URL used
- screenshots of app UI and status
- command output for install, start, stop, and inspection commands
- pass/fail notes and follow-up actions

## Pass Criteria

A workflow passes when the app can be deployed, opened, restarted, inspected, and removed using the intended path without unexplained errors.

If a test passes only with a workaround, record the workaround. That distinction matters when comparing VHT 1.x behavior against VHT 2.0 behavior.
