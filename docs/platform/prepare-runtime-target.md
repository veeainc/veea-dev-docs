---
icon: lucide/route
---

# Prepare a Runtime Target

Use this workflow when you are bringing new capacity into VeeaONE infrastructure.

A runtime target can be a VeeaHub, a Linux / Ubuntu system, an NVIDIA Jetson device, or [validated specialized hardware](runtime-targets/other-hardware.md) that adds a useful capability at the edge. The platform step is to bring that target online with VeeaONE Runtime. The developer step is to use VHT 2.0 to deploy applications into the managed runtime environment.

## Bring-Online Model

| Step | Purpose |
| --- | --- |
| Choose the role | Decide what the target adds: native Veea edge services, compute, storage, AI acceleration, device access, or site-adjacent processing. |
| Choose the target type | Select VeeaHubs, Linux / Ubuntu, NVIDIA Jetson, or specialized hardware. |
| Choose the placement | Put the runtime onsite, in a developer environment, or in a planned placement after the network topology is validated. |
| Install runtime | Install the VeeaONE Runtime middleware on the target. |
| Register | Establish the runtime identity with Veea services. |
| Enroll | Attach the runtime to the intended mesh, site, or operational environment. |
| Describe capabilities | Record compute, storage, networking, acceleration, device access, lifecycle, and operations behavior. |
| Deploy app | Use VHT 2.0 for Docker-native application deployment. |

## Choose the Target

Start with the role you want this node to play in the environment:

- Use **VeeaHubs** for native Veea edge locations and managed hub services.
- Use **Linux / Ubuntu** for flexible compute, local storage, integrations, site-adjacent services, and planned near-prem or cloud-adjacent capacity.
- Use **NVIDIA Jetson** for local inference, computer vision, video analytics, and other accelerator-backed workloads.
- Use **specialized hardware** when the deployment needs device I/O, industrial connectivity, ruggedized systems, expanded storage, or hardware-specific acceleration — confirm support with Veea first; see [Other hardware](runtime-targets/other-hardware.md).

## Choose the Placement

Placement is separate from target type.

Current bring-online workflows assume the target can reach the required VeeaONE services on the local site network or another explicitly routed private network. LAN and VLAN-based deployments can fit that model when routing, discovery, and service access are configured. Near-prem, cloud-adjacent, and regional placements are platform direction and should be validated before they are treated as supported enrollment patterns.

| Placement | Status | Use When |
| --- | --- | --- |
| Onsite LAN / VLAN | Current practical path | The workload benefits from proximity to users, devices, machines, cameras, sensors, or local networks. |
| Developer environment | Current practical path | The team is building, debugging, or preparing application workflows before rollout. |
| Near-prem | Coming soon / validate first | The workload should be close to the customer environment without living directly in the operational space. |
| Cloud-adjacent | Coming soon / validate first | The workload needs regional reach, shared services, or cloud connectivity while remaining part of the managed edge environment. |
| Regional edge | Coming soon / validate first | Multiple sites need shared compute, storage, or application services nearby. |

## Bring-Online Checklist

Before assigning production workloads, capture the target profile:

- target type and placement
- runtime identity and enrollment state
- OS, architecture, and container runtime
- network reachability and expected routes
- persistent storage paths and available capacity
- app lifecycle behavior: start, stop, restart, redeploy, upgrade, uninstall
- operations visibility in VeeaONE tooling
- hardware capabilities such as GPU, camera, serial, USB, sensor, radio, or local bus access
- workload role and ownership notes

## Bring-Online Commands

Prepare the operating system first: [x86 Virtual Machine](prepare/x86-virtual-machine.md), [x86 Physical Hardware](prepare/x86-physical.md), [NVIDIA Jetson Developer Kits](prepare/nvidia-jetson.md), or [SeeedStudio reComputer / reServer](prepare/seeedstudio-jetson.md).

On Linux / Ubuntu and Jetson targets, install and enroll the runtime with:

```bash
wget https://repo.veeaplatform.net/tools/setup.sh
chmod a+x setup.sh
sudo ./setup.sh --easy
sudo veea wizard register
veea cloud enroll --new --mesh "my-edge-site"
```

For the full walkthrough of each step, see [Install the Middleware](runtime/install-middleware.md), [Register](runtime/register.md), and [Enroll](runtime/enroll.md).

## Handoff to VHT 2.0

After the runtime target is online:

1. Install VHT 2.0 on the development host.
2. Add or select the runtime target.
3. Create or verify the Docker context.
4. Build the application image.
5. Push the image to the selected registry.
6. Deploy with Docker Compose or Docker Stack.
7. Confirm logs, lifecycle, UI access, persistence, and cleanup.

## Related Docs

- [VeeaONE Runtime](veeone-runtime.md)
- [Quickstart](quickstart.md)
- [Supported platforms](reference/supported-platforms.md)
- [Runtime targets](runtime-targets/overview.md)
- [Linux / Ubuntu](runtime-targets/linux-ubuntu.md)
- [NVIDIA Jetson](runtime-targets/nvidia-jetson.md)
- [VHT 2.0 overview](../vht-2.0/overview.md)
