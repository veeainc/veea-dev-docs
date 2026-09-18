---
title: VeeaONE Runtime Targets
description: Compare VeeaHubs, qualified Linux systems, NVIDIA Jetson devices, and specialized VeeaONE runtime targets.
icon: lucide/server
---

# Runtime Targets

VeeaONE Runtime supports a managed edge environment that can include native VeeaHubs and qualified non-Veea hardware targets.

VeeaHubs provide the full native runtime profile. Additional targets such as Linux / Ubuntu systems, NVIDIA Jetson devices, and specialized hardware can extend the runtime where more compute, storage, acceleration, or device-specific capability is required.

VHT 2.0 is the Docker-native developer toolkit used to deploy applications across this runtime environment.

Runtime capabilities vary by target. Each node must run a supported operating system — the supported hardware and OS combinations are listed in [Supported Platforms](../reference/supported-platforms.md) — and should be validated for networking, storage, container runtime, accelerator support, and hardware-specific services before deployment.

## Target Types

| Target | What It Adds | Best Fit |
| --- | --- | --- |
| VeeaHubs | Native Veea edge services, managed hub runtime, mesh-aware operation, and Control Center visibility. | Standard VeeaONE edge locations. |
| Linux / Ubuntu | General-purpose compute, storage-heavy workloads, connectors, backend services, and site-adjacent capacity. | Sites that need more local compute or storage. |
| NVIDIA Jetson | GPU-backed local inference, vision workloads, video analytics, robotics, and real-time AI services. | AI-enabled edge deployments. |
| Specialized hardware | Device I/O, industrial connectivity, expanded storage, ruggedized deployments, or hardware-specific acceleration. | Workloads with unique physical or operational requirements. Validate support with Veea first. |

## Placement Options

Target type describes **what** runs VeeaONE Runtime. Placement describes **where** it lives.

Today, target enrollment is expected to happen where the runtime target can reach the required VeeaONE services on the local site network or another explicitly routed private network. That can include LAN or VLAN-based deployments when networking is set up for it. Broader near-prem, cloud-adjacent, and regional placement patterns describe the platform direction and should be treated as coming soon until the target topology is validated for enrollment, routing, and operations.

| Placement | Status | Typical Use |
| --- | --- | --- |
| Onsite LAN / VLAN | Current practical path | Runs close to devices, users, machines, cameras, sensors, and local operations. |
| Developer environment | Current practical path | Supports application development and workflow preparation before rollout. |
| Near-prem | Coming soon / validate first | Adds compute close to the customer environment without placing hardware directly in the operational space. |
| Cloud-adjacent | Coming soon / validate first | Provides regional services, shared compute, or cloud-connected edge workloads. |
| Regional edge | Coming soon / validate first | Serves multiple sites from a nearby location. |

The same application environment can include more than one placement. A VeeaHub might run the native site services, a Linux / Ubuntu node might provide local storage or backend processing, and a Jetson device might run AI inference near cameras or sensors.

## Capability-First Planning

Choose runtime targets by the capability they contribute:

| Capability | Target Pattern |
| --- | --- |
| Native hub services | VeeaHub. |
| Web UI, API, and customer app services | VeeaHub or Linux / Ubuntu. |
| Local database, file processing, or storage-heavy app data | Linux / Ubuntu or specialized storage hardware. |
| Local AI inference or video analytics | NVIDIA Jetson or accelerator-backed hardware. |
| Serial, USB, sensor, camera, gateway, or industrial device access | Specialized hardware with a defined runtime profile. |
| Regional aggregation or site-adjacent services | Linux / Ubuntu near-prem or cloud-adjacent target after the topology is validated. |

## Bring a Target Online

1. Choose the role the target will play in the VeeaONE environment.
2. Select the target type and placement.
3. Install or activate VeeaONE Runtime.
4. Register and enroll the target into the intended environment.
5. Describe the target capability profile.
6. Deploy applications with VHT 2.0.

## Next Steps

- [Prepare a runtime target](../prepare-runtime-target.md)
- [VeeaHubs](veeahubs.md)
- [Linux / Ubuntu](linux-ubuntu.md)
- [NVIDIA Jetson](nvidia-jetson.md)
- [Other hardware](other-hardware.md)
- [Capability profiles](runtime-capabilities.md)
