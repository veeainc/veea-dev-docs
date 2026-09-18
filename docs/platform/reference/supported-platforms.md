---
title: Supported VeeaONE Runtime Platforms
description: Review tested operating systems, minimum resources, and supported x86-64 and NVIDIA Jetson Orin target configurations.
icon: lucide/list-checks
---

# Supported Platforms

The VeeaONE Runtime middleware can run on the 3rd party hardware and operating system platforms listed on this page.

!!! note
    Other platforms may work, but this should not be assumed without explicit testing.

## Intel / AMD x86-64

The middleware currently supports **Ubuntu Server 22.04 LTS** as the base operating system. If the underlying hardware is fully supported by Ubuntu 22.04, the middleware should run without issue.

Minimum platform requirements:

| Resource | Minimum |
| --- | --- |
| RAM | 2 GB |
| CPUs | 2 |
| Disk | 20 GB |

As well as physical x86-64 hardware, x86-64 virtual machines are also supported.

## ARM-64: NVIDIA Jetson Orin

The middleware currently supports NVIDIA Jetson Orin running **JetPack 6.2.1**. There is wide variation in the hardware used for carrier boards, and some platforms require custom software changes. The table below lists the tested platforms.

| Vendor | Product | SKU |
| --- | --- | --- |
| NVIDIA | Orin Nano Super Developer Kit | 945-13766-0005-000 |
| NVIDIA | Jetson AGX Orin 64GB Developer Kit | 945-13730-0055-00 |
| SeeedStudio | reComputer Industrial J3010 | 110110192 |
| SeeedStudio | reComputer Industrial J3011 | 110110193 |
| SeeedStudio | reComputer Industrial J4011 | 110110190 |

See the [NVIDIA Jetson modules](https://developer.nvidia.com/embedded/jetson-modules) and [SeeedStudio Jetson products](https://www.seeedstudio.com/NVIDIA-Jetson-c-2425.html) pages for more information on the hardware.

## Preparation Guides

- [x86 Virtual Machine](../prepare/x86-virtual-machine.md)
- [x86 Physical Hardware](../prepare/x86-physical.md)
- [NVIDIA Jetson Developer Kits](../prepare/nvidia-jetson.md)
- [SeeedStudio reComputer / reServer](../prepare/seeedstudio-jetson.md)
