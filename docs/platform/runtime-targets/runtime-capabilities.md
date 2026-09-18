---
icon: lucide/list-checks
---

# Capability Profiles

Capability profiles describe what each enrolled target contributes to VeeaONE infrastructure.

A VeeaHub, Linux / Ubuntu system, NVIDIA Jetson device, and specialized hardware node (after validation with Veea) may all run containerized applications, but they add different value to the managed edge environment. Capability profiles make that value clear so developers can deploy each workload to the right place.

## Capability Profile

Use a capability profile to describe the target in operational terms:

| Capability | What It Means |
| --- | --- |
| Identity | Runtime ID, serial number, displayed model, site, mesh, and ownership. |
| Compute | CPU, memory, architecture, and expected workload class. |
| Storage | Persistent app data, image storage, logs, backups, and available capacity. |
| Networking | IP addressing, DNS, routing, firewall posture, local network access, and cloud reachability. |
| App lifecycle | Install, start, stop, restart, redeploy, upgrade, rollback, and uninstall behavior. |
| Operations | VeeaONE visibility, logs, health, events, alerts, and support paths. |
| Device access | Serial, USB, camera, sensor, radio, industrial bus, or local hardware access. |
| Acceleration | GPU, NPU, TPU, FPGA, or other accelerator access from containers. |
| Security | Credentials, certificates, registry access, permissions, and privilege boundaries. |

## Match Workloads to Targets

| Workload Need | Capability to Look For |
| --- | --- |
| Customer web app or API | App lifecycle, networking, persistent storage, operations visibility. |
| Local database or file workflow | Storage capacity, backup behavior, disk performance, lifecycle behavior. |
| AI inference or video analytics | Accelerator access, camera or stream access, compute, thermal profile. |
| Industrial integration | Device I/O, local network reachability, permissions, ruggedized placement. |
| Site-adjacent aggregation | Network placement, storage, compute, cloud connectivity, operational visibility. |

## Operational Readiness

Before placing a workload on a target, confirm the capability profile covers:

1. runtime identity and enrollment
2. VeeaONE operations visibility
3. container runtime behavior
4. storage persistence
5. network reachability
6. application lifecycle
7. workload-specific hardware access
8. support and ownership notes

## Terminology

- A **native VeeaHub target** is Veea hardware with the full managed runtime profile.
- A **qualified edge node** is a non-hub target with a defined runtime profile.
- A **runtime target** is any node that can run VeeaONE Runtime.
- A **capability profile** describes what a target contributes to the edge environment.

## Related Docs

- [Runtime targets](overview.md)
- [Linux / Ubuntu](linux-ubuntu.md)
- [NVIDIA Jetson](nvidia-jetson.md)
- [Other hardware](other-hardware.md)
