---
icon: lucide/download
---

# Installation and Overview

**VeeaHub Toolkit (VHT)** provides a development environment to create applications for VeeaHub and it contains the following:

*   **VeeaHub Client (VHC)** - a command-line utility designed to help developers easily create, build, and deploy containers for the VeeaHub.
    
*   Python scripts for securely signing and verifying containers.
    
*   Veea root certificate authority as well as license authority and server certificates.
    
*   32- and 64-bit Qemu ARM tools for cross-compiling applications for the VeeaHub.
    
*   A suite of demonstration applications called **Templates**.
    

## Hardware Requirements

The table below lists the recommended minimum specs for a development machine. Adding more cores and more memory will help if you are building large applications.

| Hardware | Minimum Specs |
| --- | --- |
| CPU/Cores | 2 Cores |
| RAM | 4 GB |
| HDD | 40 GB |

## Supported Operating Systems

VHT is supported on any Ubuntu Linux release of 18.04 or newer. Ubuntu 22.04 is recommended, but it has been extensively tested on:

*   Ubuntu 18.04
    
*   Ubuntu 20.04
    
*   Ubuntu 22.04
    

## Download

!!! info
    If you already have an older version of VeeaHub Toolkit installed on your host machine, you need not uninstall it and install the latest version. You can simply follow the below instructions and your VHT will be upgraded to the latest version.

To install the development environment, download the installation script. wget, curl, or a similar method would work:

```bash
wget https://c3templates.veeaplatform.net/releases/latest/setup-veeahub-dev-env.sh
```

## Installation

Run the installation script:

```bash
chmod +x setup-veeahub-dev-env.sh
./setup-veeahub-dev-env.sh
Reboot your VM or logout and login
```

!!! warning
    You will need to have `sudo` privileges to complete the installation. If you do not have these privileges, please talk to your system administrator.

With this, all the components of VHT will be installed, including VeeaHub Client. If a previous version of the VHT has already been installed, only the VHC binary will be replaced.

!!! warning
    The script makes changes, such as adding the user to the `docker` group and adding a tab completion script. These changes will not take effect unless you logout and login again or reboot.

### Python Environment  

All python packages are now installed in a Python virtual environment in `/opt/veea/vht_venv`. The allows VHT-specific packages to be installed without affecting packages already installed on the development machine.
