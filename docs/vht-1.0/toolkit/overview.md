---
icon: lucide/wrench
---

# The VeeaHub Toolkit (VHT)

The VeeaHub Toolkit (VHT) 1.2 is the VHT 1.x toolkit used to build, sign, verify, upload, and test VeeaHub applications with the `vhc` command-line client.

VHT is a development environment that enables developers to build secure Docker applications for VeeaHubs. With VHT, developers can quickly create applications, access demonstration apps for learning, and update software and manage application licensing. The toolkit includes several powerful features, including the VeeaHub Client, custom installations of OpenSC and PKCS11, and scripts for securely signing and verifying containers. Additionally, the VHT provides the Veea root certificate authority, along with 32- and 64-bit Qemu ARM tools for cross-compiling applications for the VeeaHub. Overall, VHT provides a streamlined development experience that simplifies the process of building and deploying custom applications.

This guide is self-contained and does not require access to the Veea developer portal. This section covers VHT installation and an overview of the VHT components.

## Toolkit Components

| Component | Purpose |
| --- | --- |
| VHC | Command-line client for building, configuring, uploading, and testing VHT 1.x images and applications. |
| Secure Docker tools | Build, annotate, sign, and verify VeeaHub-compatible container images. |
| Templates | Example workspaces for common VeeaHub services and device-access patterns. |
| Partner credential tools | Import and refresh credentials needed for signed images and applications. |
| Cross-build support | Qemu and architecture support for VeeaHub targets. |
| VeeaHub shell access | Shell access to development hubs for testing and interaction. |

## Recommended Reading Order

1. [Install VHT](installation.md)
2. [Set up development VeeaHubs](../development-hubs/overview.md) — [prepare a hub](../development-hubs/hub-preparation.md) and [add it to VHC](../development-hubs/hubs-in-vhc.md)
3. [Learn the VeeaHub Client (VHC)](veeahub-client.md)
4. Browse the [template catalog](template-catalog.md) and work through the [template examples](../examples/templates/overview.md)
5. [Understand Secure Docker and applications](../overview.md#secure-docker)
6. [Create](../applications/creation-and-configuration.md), [build](../applications/build-and-verification.md), and [release](../applications/release.md) an application

## Key Concepts

| Concept | Local page |
| --- | --- |
| Development hub setup | [Development Hubs](../development-hubs/overview.md) |
| VHC command-line workflow | [The VeeaHub Client (VHC)](veeahub-client.md) |
| Templates | [Template Catalog](template-catalog.md) |
| Signed images | [An Introduction to Signed Images](../signed-images/overview.md) |
| Applications | [Application Creation and Configuration](../applications/creation-and-configuration.md) |

## VHT 1.x Command Name

VHT 1.x uses:

```bash
vhc
```

VHT 2.x uses:

```bash
vhc2
```

!!! warning
    This is VHT 1.x documentation. Use `vhc`, not `vhc2`. Keep these workflows separate when moving between VHT versions.
