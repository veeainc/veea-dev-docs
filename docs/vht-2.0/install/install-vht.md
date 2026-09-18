---
icon: lucide/download
---

# Install VHT

Install VeeaHub Toolkit 2.0 on the Ubuntu 24.04 LTS development host.

VHT 2.0 is installed as the Ubuntu package `veeahubtoolkit2`. The command-line client is `vhc2`.

!!! note
    VHT 2.0 configuration is stored under `~/.vhc` (for example, `~/.vhc/user-config.yaml`). Partner credentials and feature licenses are also written there by default. Include this directory when copying credentials, backing up a host, or cleaning a development environment.

## Install the Package

Run these commands on the Ubuntu development host:

```bash
wget -O setup-veeahub-dev-env.sh \
  https://c3templates.veeaplatform.net/releases/beta/setup-veeahub-dev-env.sh
chmod +x setup-veeahub-dev-env.sh
./setup-veeahub-dev-env.sh
```

## Verify the CLI

Run:

```bash
vhc2
```

The command should show the VeeaHub Client banner and available commands such as `compose`, `example`, `hub`, `partner`, and `version`.

Show the installed partner configuration:

```bash
vhc2 partner config show
```

## Success Check

Installation is good enough to continue when:

- `vhc2` runs without a shell `command not found` error.
- The VeeaHub Client help text appears.
- `vhc2 partner config show` prints the partner details entered during setup.

## Next Step

If this is the first install, enter partner details when prompted.
