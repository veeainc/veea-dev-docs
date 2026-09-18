---
icon: lucide/monitor
---

# x86 Virtual Machine

The easiest way to build a suitable x86 virtual machine running Ubuntu Server 22.04 is from a reference image.

## Download the Image

Download a standard Ubuntu Server 22.04 VM image from [OSBoxes](https://www.osboxes.org/ubuntu-server/). Use the Ubuntu 22.04 Jammy Jellyfish image for either VirtualBox or VMware, at your preference.

## Run the Virtual Machine

Run the image as a virtual machine using VirtualBox, VMware, QEMU, or your preferred VM runner. Provide at least:

- 2 GB RAM
- 2 CPU cores
- a network interface

Log in as `osboxes` with password `osboxes.org`.

## Check the Network

Check what device name your network interface has:

```bash
ip link show
```

Then confirm the interface name in the netplan configuration matches:

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

With a working network, [install the middleware](../runtime/install-middleware.md).
