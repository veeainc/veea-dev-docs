---
icon: lucide/cpu
---

# Linux / Ubuntu

Linux / Ubuntu targets provide general-purpose edge compute for local services, storage-heavy workloads, and site-adjacent application capacity.

Use this path to validate VeeaONE Runtime installation, node registration, mesh enrollment, and VHT 2.0 application deployment on qualified VM or physical x86 hardware.

The required operating system is **Ubuntu Server 22.04 LTS** (a minimal install is sufficient). The Desktop edition of Ubuntu is not supported. Minimum resources: 2 GB RAM, 2 CPUs, 20 GB disk — see [Supported Platforms](../reference/supported-platforms.md).

## What It Adds

| Capability | Example |
| --- | --- |
| General compute | API services, local workers, data processing, rules engines, customer app backends. |
| Persistent storage | Local databases, image uploads, logs, event archives, site-specific files. |
| Integration capacity | Connectors for local systems, OT networks, enterprise services, or cloud gateways. |
| Site-adjacent services | Processing close to the customer environment on reachable private networks. |
| Deployment flexibility | Standard Linux hardware, small servers, industrial PCs, developer systems, or planned near-prem targets. |

## Runtime Profile

| Area | Starting Profile |
| --- | --- |
| OS | Ubuntu Server 22.04 LTS. The Desktop edition is not supported. |
| Architecture | x86_64, physical or virtual machine. |
| Placement | Current: onsite LAN / VLAN or developer environment. Planned: near-prem, cloud-adjacent, or regional edge after topology validation. |
| Network | Able to reach the VeeaONE environment and the services required by deployed applications. |
| Storage | Persistent local storage sized for images, app data, logs, and backups. |
| Container runtime | Docker runtime aligned with the VHT 2.0 workflow. |

## Bring It Online

Prepare the OS ([virtual machine](../prepare/x86-virtual-machine.md) or [physical hardware](../prepare/x86-physical.md)), then activate the runtime:

```bash
wget https://repo.veeaplatform.net/tools/setup.sh
chmod a+x setup.sh
sudo ./setup.sh --easy
sudo veea wizard register
veea cloud enroll --new --mesh "my-edge-site"
```

For the full walkthrough, see [Install the Middleware](../runtime/install-middleware.md), [Register](../runtime/register.md), and [Enroll](../runtime/enroll.md).

## Good Fit

Linux / Ubuntu is a strong target when you need:

- a customer application backend near the site
- local data retention or file processing
- additional CPU or memory capacity
- integration services for local systems
- a bridge between onsite operations and cloud services
- a standard hardware footprint for site-adjacent workloads

Near-prem, cloud-adjacent, and regional Linux / Ubuntu placements are part of the runtime target direction. Treat them as topology-specific until enrollment, routing, service reachability, and operations visibility are validated for the environment.

## Capability Notes

Linux / Ubuntu targets should be described by their actual profile: OS, architecture, CPU, memory, storage, network placement, Docker runtime, and any attached devices. This makes it clear what the target contributes to the VeeaONE environment and which applications belong there.

## Next Steps

- [Supported platforms](../reference/supported-platforms.md)
- [Capability profiles](runtime-capabilities.md)
- [Other hardware](other-hardware.md)
- [Prepare a runtime target](../prepare-runtime-target.md)
