---
title: VeeaONE Runtime Quickstart
description: Prepare, register, enroll, and validate a supported VeeaONE Runtime target for VHT 2.0 application deployment.
icon: lucide/rocket
---

# Quickstart

Use this path to get from a clean Ubuntu Server 22.04 machine to a registered, enrolled VeeaONE Runtime node that is ready for VHT 2.0 application deployment.

!!! warning
    Replace example values such as mesh names and serial numbers with your own values. Registration requires a Veea account.

## 1. Confirm the Target

| Item | Required value |
| --- | --- |
| Operating system | Ubuntu Server 22.04 LTS (not the Desktop edition) |
| Resources | 2 GB RAM, 2 CPUs, 20 GB disk minimum |
| Network | Working network with internet access |
| Account | A Veea account for registration and enrollment |

Physical x86-64 hardware, x86-64 virtual machines, and supported NVIDIA Jetson Orin devices are all valid targets. See [Supported Platforms](reference/supported-platforms.md) for the full list, and the [platform preparation pages](prepare/x86-virtual-machine.md) for OS setup per target.

## 2. Install the Middleware

Run on the target machine:

```bash
wget https://repo.veeaplatform.net/tools/setup.sh
chmod a+x setup.sh
sudo ./setup.sh --easy
```

The script checks hardware compatibility, configures the Veea repository, installs the middleware, and then **reboots the machine**.

## 3. Verify the Install

After the reboot:

```bash
veea hub status
```

Expected output shows the middleware waiting for an identity:

```text
Field                         Value
----------------------------  ----------------------------------------------------------------
Date                          2026-06-17T14:35:03.552271
Uptime                        0d 0h 26m 57.530s
Middleware version            2.39.5-veea1
VeeaHub identity              Not issued
VeeaHub registration          Not generated
Bootstrap requested           No
Bootstrap downloaded          No
Initialisation complete       No
Middleware                    Waiting for identity details
```

## 4. Register with the Veea Cloud

```bash
sudo veea wizard register
```

The wizard prompts you to open a URL and enter an authorization code. Log in with your Veea account and grant access. Registration issues the machine a Veea serial number and certificate, turning it into a full VeeaHub.

## 5. Enroll onto a Mesh

Create a new mesh (this makes the node the mesh gateway):

```bash
veea cloud enroll --new --mesh "my-edge-site"
```

Enrollment triggers a bootstrap that can take up to 10 minutes.

## 6. Confirm the Node Is Operational

```bash
veea hub status
```

When bootstrap completes, the output ends with:

```text
Hub is fully operational      True
```

## Next Step

The node is now a managed VeeaONE Runtime target. Deploy applications to it with the [VHT 2.0 Quickstart](../vht-2.0/quickstart.md).

For the full walkthrough of each step, see [Install the Middleware](runtime/install-middleware.md), [Register](runtime/register.md), and [Enroll](runtime/enroll.md).
