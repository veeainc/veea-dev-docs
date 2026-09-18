---
icon: lucide/git-compare
---

# VHT 1.x + VHT 2.0 Coexistence Test

Use this test when a hub or mesh must support an existing VHT 1.x application while also testing or running a VHT 2.0 workload.

## Use When

- preserving a signed VHT 1.x application during VHT 2.0 validation
- testing migration strategy without removing current apps
- checking port, service, registry, and UI-link conflicts

## Procedure

1. Install and validate the VHT 1.x app first.
2. Record app name, ports, UI links, persistent storage paths, and service names.
3. Deploy the VHT 2.0 test workload using a different app name and port.
4. Confirm both applications run at the same time.
5. Open both UIs locally and through Control Center if applicable.
6. Restart one app and confirm the other is not affected.
7. Restart the hub and confirm both apps return as expected.
8. Remove the VHT 2.0 workload and confirm the VHT 1.x app remains healthy.
9. Remove the VHT 1.x app and confirm the VHT 2.0 workload remains healthy, if safe to do so.

## Pass Criteria

- no port collisions
- no stale Control Center service cards
- no shared persistent storage conflicts
- app lifecycle actions do not break the other workload
- both workflows remain explainable and repeatable

## Notes

Use explicit names and versions. Avoid generic app names such as `test`, `default`, or `demo` when running coexistence checks.
