---
title: NVIDIA Jetson Runtime Targets
description: Deploy qualified AI inference, video analytics, and containerized workloads on supported NVIDIA Jetson Orin targets.
icon: lucide/cpu
---

# NVIDIA Jetson

NVIDIA Jetson devices provide accelerator-backed edge compute for AI-enabled workloads such as local inference, video analytics, and real-time decisioning.

VeeaONE Runtime currently supports NVIDIA Jetson Orin devices running **JetPack 6.2.1**. Later JetPack releases (6.2.2 and 7.x) are not currently supported. The tested devices are listed in [Supported Platforms](../reference/supported-platforms.md).

VeeaHub-specific radios and services should not be assumed on Jetson-class targets unless explicitly validated.

## What It Adds

| Capability | Example |
| --- | --- |
| Local inference | Run models near the data source without waiting on cloud round trips. |
| Vision processing | Analyze camera streams, frames, images, or event clips close to the site. |
| Real-time automation | Support robotics, inspection, quality control, safety, and operational loops. |
| Accelerator capacity | Expose GPU or other acceleration to containerized workloads. |
| Edge autonomy | Keep AI-enabled workflows operating even when cloud connectivity is constrained. |

## Runtime Profile

| Area | Profile Detail |
| --- | --- |
| Device class | NVIDIA Jetson Orin or supported Jetson-class hardware. |
| OS image | JetPack 6.2.1 (SeeedStudio devices: Linux_for_Tegra `r36.4.4`). |
| Drivers | GPU and accelerator access available to containerized workloads. |
| Container runtime | Docker and NVIDIA runtime behavior aligned with the application profile. |
| Middleware | VeeaONE Runtime registration, enrollment, services, and operations visibility. |
| Workload role | AI service, vision pipeline, camera-adjacent processing, automation service, or accelerated backend. |

## Bring It Online

A typical bring-online flow:

1. Prepare the Jetson with JetPack 6.2.1 — see [NVIDIA Jetson Developer Kits](../prepare/nvidia-jetson.md) or [SeeedStudio reComputer / reServer](../prepare/seeedstudio-jetson.md).
2. [Install the middleware](../runtime/install-middleware.md).
3. [Register the target with Veea services](../runtime/register.md).
4. [Enroll the target into the intended mesh](../runtime/enroll.md).
5. Confirm accelerator access from the application container profile.
6. Deploy the workload with VHT 2.0.

```bash
wget https://repo.veeaplatform.net/tools/setup.sh
chmod a+x setup.sh
sudo ./setup.sh --easy
sudo veea wizard register
veea cloud enroll --new --mesh "my-ai-edge-site"
```

## Workload Examples

Jetson targets are a strong fit for:

- video analytics
- computer vision inspection
- local object detection
- AI gateways for camera or sensor systems
- robotics or automation support services
- local inference APIs consumed by other VeeaONE applications

## Capability Notes

Record the Jetson profile in terms of device model, OS image, JetPack version, Docker runtime, accelerator runtime, available storage, network placement, and app lifecycle behavior. That makes it clear which AI and accelerated workloads should land on the target.

## Next Steps

- [Capability profiles](runtime-capabilities.md)
- [Linux / Ubuntu](linux-ubuntu.md)
- [Prepare a runtime target](../prepare-runtime-target.md)
