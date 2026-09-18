---
title: VHT 1.x Legacy Quickstart
description: Build and deploy an existing VHT 1.x signed application to a development VeeaHub using the legacy workflow.
icon: lucide/rocket
---

# Quickstart

This quickstart takes an existing VHT 1.x workspace from build to a verified deployment on a development VeeaHub.

!!! note
    This quickstart is for maintaining existing VHT 1.x applications. For new application development, use the [VHT 2.0 Quickstart](../vht-2.0/quickstart.md).

## Before You Start

This quickstart assumes a working VHT 1.x setup. If you are starting fresh, complete these first:

1. [Install VHT](toolkit/installation.md) on an Ubuntu development machine.
2. [Prepare a development VeeaHub](development-hubs/hub-preparation.md) and [add it to VHC](development-hubs/hubs-in-vhc.md).
3. For the signed application path, [install your partner credentials](signed-images/partner-credential-installation.md).
4. Generate the app or image workspace the build steps below use, via [template instantiation](examples/templates/instantiation.md) or [application creation](applications/creation-and-configuration.md).

For the fuller command walkthrough with hub-mode checks, see [VHT 1.x Validated Workflows](validated-workflows.md).

## Identify Your Target

Every VeeaHub model maps to a build architecture and platform. List the supported combinations and note the architecture for your hub model — it is the `<arch>` value used in the build steps below:

```bash
vhc image config platform list
```

Two ports matter throughout: the sideload REST API on port `9000` and the VeeaHub Shell over SSH on port `9010`.

!!! note
    Build for the hub's architecture even if local development happens on x86_64.

## Verify Tooling

```bash
vhc version
docker --version
docker ps
vhc image config platform list
```

## Configure and Check the Hub

```bash
vhc hub config add-hub --ip-addr <hub-ip> --serial-number <hub-serial> <hub-name>
vhc hub access ping --hub-id <hub-name>
vhc hub access get-info --hub-id <hub-name>
vhc hub access get-partner-id --hub-id <hub-name>
vhc hub access get-licenses --hub-id <hub-name>
```

If VeeaHub Shell commands are needed:

```bash
ssh-keyscan -T 5 -p 9010 -H <hub-ip> >> ~/.ssh/known_hosts
vhc hub access upload-public-key --hub-id <hub-name> ~/.ssh/id_ed25519.pub
vhc hub access shell --hub-id <hub-name> --command "help"
```

## Build a Signed Application Archive

```bash
cd <generated-vhc-app-workspace>
vhc app build release
vhc app build verify build/<AppName>-<version>.tgz
```

Upload the `.tgz` through Control Center using **Upload / VHT1.x**.

## Build and Sideload an Unsigned Image

```bash
cd <generated-vhc-image-workspace>
vhc image build save --arch <arch> --unauth --force
vhc hub access upload-image --hub-id <hub-name> \
  'build/unauth/<arch>/<image-name>-<arch>:<version>.unsigned.tar'
```

Create and start the container:

```bash
vhc hub access shell --hub-id <hub-name> --command "docker image ls"
vhc hub access shell --hub-id <hub-name> --command \
  "docker image create <image-id> --detach --publish <host-port>:<container-port> --restart unless-stopped"
vhc hub access shell --hub-id <hub-name> --command "docker container start <container-id>"
```

## Verify the App

```bash
vhc hub access shell --hub-id <hub-name> --command "docker container ls --all"
curl -sS --max-time 8 http://<hub-ip>:<published-port>/health
curl -sS --max-time 8 -I http://<hub-ip>:<published-port>/
```

For a Control Center UI app, also open the `UI:HTTP` card and confirm browser requests stay inside the Control Center proxy path.

## Good Practices

- Keep the edge workload small. VeeaHub models are constrained ARM targets.
- Avoid full cloud/database/UI stacks unless there is a strong reason.
- Put durable app data in persistent volumes.
- Keep secrets out of the image.
- Use unique ports and persistent UUIDs when testing multiple variants.
- Build for the hub's architecture even if local development happens on x86_64.
