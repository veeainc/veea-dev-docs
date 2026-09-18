---
icon: lucide/hard-drive
---

# x86 Physical Hardware

Install Ubuntu Server 22.04 LTS on the target machine before installing the VeeaONE Runtime middleware.

## Install Ubuntu Server

Follow the standard Ubuntu [installation instructions](https://ubuntu.com/server/docs/tutorial/basic-installation/) and install the Ubuntu Server 22.04 LTS (Jammy Jellyfish) release. A minimal installation is sufficient.

!!! warning "Ubuntu Server only"
    Do not install the Desktop edition of Ubuntu. Its networking is very different, and only the Ubuntu Server versions are currently supported.

## Minimum Requirements

| Resource | Minimum |
| --- | --- |
| RAM | 2 GB |
| CPUs | 2 |
| Disk | 20 GB |

If the underlying hardware is fully supported by Ubuntu 22.04, the middleware should run without issue.

## Check the Network

Check what device name your network interface has:

```bash
ip link show
```

Then confirm the interface name in the netplan configuration matches (the file name may differ, for example `00-installer-config.yaml`):

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

If it does not match, fix the interface name, save the file, and apply it:

```bash
sudo netplan apply
```

Verify the network works:

```bash
ping google.com
```

## Next Step

Once the install is complete and the network is working, [install the middleware](../runtime/install-middleware.md).
