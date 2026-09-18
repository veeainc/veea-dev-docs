---
icon: lucide/server
---

# VeeaHubs

VeeaHubs are the native edge target for VeeaONE infrastructure.

They provide the managed Veea runtime profile at the site: hub identity, mesh-aware operation, application deployment, local services, persistent app data, Control Center visibility, and the Veea platform services that make VeeaONE deployments operational.

## What VeeaHubs Add

| Capability | Role |
| --- | --- |
| Native runtime | First-class VeeaONE Runtime target for Veea hardware. |
| Site presence | Runs close to local users, networks, devices, and operational systems. |
| Managed operations | Control Center visibility, app lifecycle, logs, health, and platform status. |
| Local services | Runtime services available to Veea applications on the hub. |
| Persistent app data | Local storage for application state and edge workflows. |

## When to Use VeeaHubs

Use VeeaHubs when the workload belongs directly at a Veea site:

- site-local application services
- native Veea hardware integration
- managed edge application deployment
- local UI and backend services
- persistent edge app data
- Control Center-managed app operations

## Typical Flow

1. Prepare the development host.
2. Confirm hub access and feature licenses.
3. Enable development mode when required for the workflow.
4. Add the hub to VHT configuration.
5. Confirm reachability.
6. Deploy the application.
7. Observe app lifecycle, logs, UI links, persistence, and hub software behavior.

## Related Docs

- [Manage VeeaHubs](../../vht-2.0/hubs/manage-veeahubs.md)
- [Add, show, ping, and remove hubs](../../vht-2.0/hubs/add-show-ping-remove.md)
- [VHT 1.x app baseline](../../vht-2.0/validation-plans/vht-1x-app-baseline.md)
- [Hub upgrade compatibility](../../vht-2.0/validation-plans/hub-upgrade-compatibility.md)
