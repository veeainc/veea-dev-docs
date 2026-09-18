---
icon: lucide/box
---

# SeeedStudio reComputer / reServer

Prepare a SeeedStudio reComputer or reServer with the supported JetPack release before installing the VeeaONE Runtime middleware.

## Upgrade to JetPack 6.2.1

Follow the instructions on the SeeedStudio [Getting Started](https://wiki.seeedstudio.com/reComputer_Industrial_Getting_Started/) page and their [Linux_for_Tegra GitHub repository](https://github.com/Seeed-Studio/Linux_for_Tegra/tree/r36.4.4) to set up your workstation and upgrade the SeeedStudio product to JetPack 6.2.1, including the SeeedStudio updates.

!!! warning "Use the r36.4.4 tag"
    You must use the `r36.4.4` tag in the GitHub repository. Do not use the more recent `r36.5.0` (which corresponds to JetPack 6.2.2) — it is not currently supported by Veea.

## Supported Devices

The tested SeeedStudio models are listed in [Supported Platforms](../reference/supported-platforms.md). Do not assume an untested model works without explicit testing.

## Next Step

With JetPack 6.2.1 installed and the network working, [install the middleware](../runtime/install-middleware.md).
