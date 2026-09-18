---
title: VeeaONE Runtime
description: Understand the VeeaONE middleware, runtime targets, VHT developer workflow, and managed edge operating model.
icon: lucide/layers
---

# VeeaONE Runtime

VeeaONE Runtime brings native VeeaHubs and qualified Linux / Ubuntu and NVIDIA Jetson targets into one managed edge runtime environment. Specialized hardware can extend the environment after validation with Veea.

VeeaHubs provide the native Veea edge profile. Additional runtime targets add the capacity your deployment needs: general compute, local storage, accelerator-backed AI, industrial device access, site-adjacent services, and workload-specific hardware.

VHT is the developer path into that managed edge runtime environment. Developers build and package containerized applications with VHT 2.0, then deploy those applications onto the VeeaONE Runtime targets that match the workload.

!!! note "Runtime, not OS"
    VeeaONE Runtime is the Veea middleware, services, enrollment model, and application runtime layer installed on supported targets. It runs on the target's own supported operating system — it is not a replacement operating system.

## Infrastructure Model

Think about VeeaONE in three layers:

| Layer | Role |
| --- | --- |
| VeeaONE | Platform and operations layer for distributed edge environments. |
| VeeaONE Runtime | Runtime and middleware layer installed on VeeaHubs and qualified edge nodes. |
| VHT | Developer toolkit for building, packaging, and deploying applications into the runtime environment. |

That split keeps the platform story clean:

- **VeeaONE** is the managed edge environment you operate.
- **VeeaONE Runtime** is what brings a node into that environment.
- **Runtime targets** are the places where the runtime can add capability.
- **VHT 2.0** is how developers ship Docker-native software to those targets.
- **VHT 1.x** is the legacy signed package and VeeaHub D-Bus workflow, used to maintain existing applications that have not yet migrated to VHT 2.0.

## Extend the Runtime

Runtime targets are not just places to run containers. They are ways to extend what the edge can do.

| Need | Runtime target pattern |
| --- | --- |
| Native Veea edge services | VeeaHubs. |
| More local compute or storage | Linux / Ubuntu systems near the site or inside the customer environment. |
| AI, vision, and accelerated inference | NVIDIA Jetson devices or other accelerator-backed nodes. |
| Industrial, sensor, gateway, or device-specific workflows | Specialized hardware with a defined runtime profile — validate support with Veea first. |
| Cloud-adjacent or near-prem operations | Planned Linux / Ubuntu target patterns after enrollment, routing, and operations are validated. |

## Targets and Placement

Target type describes **what** the runtime runs on. Placement describes **where** that runtime lives.

| Dimension | Meaning | Examples |
| --- | --- | --- |
| Target type | The hardware or software profile that runs VeeaONE Runtime. | VeeaHub, Linux / Ubuntu, NVIDIA Jetson, specialized hardware (validate first). |
| Placement | Where that target sits relative to sites, systems, people, and data. | Current: onsite LAN / VLAN and developer environments. Planned: near-prem, cloud-adjacent, and regional edge. |
| Capability profile | What that target contributes to the environment. | Compute, storage, network access, accelerator access, device I/O, app lifecycle, operations visibility. |

This lets a team add the right capacity in the right place: native VeeaHubs for managed edge sites, Linux / Ubuntu for flexible compute, Jetson for accelerated AI, and specialized nodes for hardware-specific workloads.

## Runtime Target Principle

VeeaHubs are the native edge target. Qualified nodes extend the runtime.

Each target should be described by what it contributes: compute, storage, network placement, accelerator access, local device access, lifecycle behavior, and operational visibility. That capability profile is what helps developers and operators decide where an application belongs.

## Next Steps

- [Quickstart](quickstart.md)
- [Prepare a runtime target](prepare-runtime-target.md)
- [Supported platforms](reference/supported-platforms.md)
- [veea command reference](reference/veea-command-reference.md)
- [Runtime targets](runtime-targets/overview.md)
- [VeeaHubs](runtime-targets/veeahubs.md)
- [Linux / Ubuntu](runtime-targets/linux-ubuntu.md)
- [NVIDIA Jetson](runtime-targets/nvidia-jetson.md)
- [Other hardware](runtime-targets/other-hardware.md)
- [Capability profiles](runtime-targets/runtime-capabilities.md)
