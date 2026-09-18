---
icon: lucide/cpu
---

# NVIDIA Jetson Developer Kits

Prepare an NVIDIA Jetson Orin developer kit with the supported JetPack release before installing the VeeaONE Runtime middleware.

## Install JetPack 6.2.1

Follow the instructions in the [JetPack SDK](https://developer.nvidia.com/embedded/jetpack-sdk-62) documentation to set up your workstation and install JetPack 6.2.1. With that installation complete, use the NVIDIA SDK Manager to install JetPack 6.2.1 onto the developer kit.

!!! warning "JetPack 6.2.1 only"
    Do not install the more recent JetPack 6.2.2 or 7.x releases. These are not currently supported by Veea.

## Supported Devices

The tested developer kits are listed in [Supported Platforms](../reference/supported-platforms.md). Carrier-board hardware varies widely, and some platforms require custom software changes — do not assume an untested platform works without explicit testing.

## Next Step

With JetPack 6.2.1 installed and the network working, [install the middleware](../runtime/install-middleware.md).

For SeeedStudio reComputer and reServer devices, see [SeeedStudio reComputer / reServer](seeedstudio-jetson.md) instead.
