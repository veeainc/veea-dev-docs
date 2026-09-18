---
icon: lucide/box
---

# Other Hardware

Specialized hardware lets VeeaONE extend into deployments where a generic node is not enough.

Use this target family when a deployment needs a specific physical capability: expanded storage, industrial connectivity, serial or USB access, camera-adjacent processing, ruggedized operation, custom accelerators, gateway hardware, or specialized network placement.

!!! warning "Validate before assuming support"
    The currently supported 3rd party platforms are x86-64 systems running Ubuntu Server 22.04 LTS and NVIDIA Jetson Orin devices running JetPack 6.2.1 — see [Supported Platforms](../reference/supported-platforms.md). Other hardware may work, but this should not be assumed without explicit testing. Confirm specialized hardware with Veea before planning a deployment around it.

## What Specialized Hardware Adds

| Capability | Example |
| --- | --- |
| Device access | Serial, USB, CAN, GPIO, cameras, sensors, radios, or industrial buses. |
| Storage capacity | Local media retention, site data archives, image storage, logs, and batch processing. |
| Industrial fit | Ruggedized systems, environmental tolerance, DIN-rail devices, or field-ready gateway hardware. |
| Specialized acceleration | GPU, NPU, TPU, FPGA, or workload-specific hardware. |
| Network placement | Gateways near OT networks, private networks, restricted zones, or site equipment. |

## Good Candidates

Specialized hardware can make sense for:

- manufacturing and industrial sites
- camera-heavy locations
- energy, utilities, or field operations
- transportation and logistics environments
- retail or venue deployments with local analytics
- storage-heavy edge applications
- AI or sensor workloads that require a specific hardware interface

## Enrollment Model

The target joins VeeaONE infrastructure through the same high-level runtime path:

1. Choose the hardware role.
2. Install or activate the VeeaONE Runtime profile.
3. Register the target with Veea services.
4. Enroll it into the intended site, mesh, or operational environment.
5. Describe the capabilities the hardware contributes.
6. Deploy applications with VHT 2.0.

## Capability Profile

Specialized targets should be documented by what they add to the environment:

| Area | What to Capture |
| --- | --- |
| Hardware identity | Vendor, model, architecture, serial, and intended placement. |
| Compute | CPU, memory, accelerator hardware, and container constraints. |
| Storage | Capacity, persistence path, write endurance, backup model, and app data policy. |
| Network | Interfaces, routing, DNS, firewall posture, and site reachability. |
| Device I/O | Attached devices, buses, permissions, drivers, and container access model. |
| Operations | Logs, health, restart behavior, updates, and VeeaONE visibility. |

## Related Docs

- [Capability profiles](runtime-capabilities.md)
- [Linux / Ubuntu](linux-ubuntu.md)
- [Prepare a runtime target](../prepare-runtime-target.md)
