---
title: VHT 1.x Command Reference
icon: lucide/list
---

# Command Reference

This page collects the main `vhc` commands used across the VHT 1.x docs. Every command supports `--help`, and tab completion is available after [installation](../toolkit/installation.md).

## General

| Task | Command |
| --- | --- |
| Show VHC help | `vhc help` |
| Show VHC version | `vhc version` |
| List available templates | `vhc example templates` |
| Update template assets | `vhc example update` |

## Partner and Credentials

Documented in [Partner Credential Installation](../signed-images/partner-credential-installation.md).

| Task | Command |
| --- | --- |
| Import partner credentials | `vhc partner secure import-credentials veea-partner-<partner-id>.tgz` |
| Show imported credentials | `vhc partner secure show` |
| Show partner configuration | `vhc partner config show` |
| Refresh TLS keys | `vhc partner secure update-tls-credentials` |
| Add a feature license path | `vhc partner secure add-license-path <directory>` |

## Hub Configuration

Documented in [Hubs in VHC](../development-hubs/hubs-in-vhc.md).

| Task | Command |
| --- | --- |
| Add a hub | `vhc hub config add-hub --ip-addr <hub-ip> --serial-number <hub-serial> <hub-name>` |
| Show configured hubs | `vhc hub config show` |
| Set the default hub | `vhc hub config set-default-hub <hub-name>` (listed as `set-active-hub` in newer `vhc` help output) |
| Remove a hub | `vhc hub config remove-hub <hub-name>` |
| Update a hub's IPv4 address | `vhc hub config update-hub` |

## Hub Access

Documented in [Hub Interaction](../development-hubs/hub-interaction.md) and the [Validated Workflows](../validated-workflows.md).

| Task | Command |
| --- | --- |
| Ping the sideload server | `vhc hub access ping --hub-id <hub-name>` |
| Get hub platform information | `vhc hub access get-info --hub-id <hub-name>` |
| Get the active partner ID | `vhc hub access get-partner-id --hub-id <hub-name>` |
| Get installed licenses | `vhc hub access get-licenses --hub-id <hub-name>` |
| Upload a partner transport license | `vhc hub access upload-license --hub-id <hub-name>` |
| Upload an SSH public key | `vhc hub access upload-public-key --hub-id <hub-name> <public-key-file>` |
| Open VeeaHub Shell | `vhc hub access shell --hub-id <hub-name>` |
| Run one VeeaHub Shell command | `vhc hub access shell --hub-id <hub-name> --command "<command>"` |
| Upload an unsigned image archive | `vhc hub access upload-image --hub-id <hub-name> <archive.tar>` |
| Upload a signed application archive | `vhc hub access upload-app --hub-id <hub-name> <archive.tgz>` |

## Image Workspace and Configuration

Documented in the [Template Examples](../examples/templates/overview.md) and [Advanced Examples](../examples/advanced/overview.md).

| Task | Command |
| --- | --- |
| Create a workspace from a template | `vhc image create template <template-name>` |
| Show the image configuration | `vhc image config show` |
| List platforms and architectures | `vhc image config platform list` |
| Publish a port | `vhc image config port add <host-port>:<container-port>` |
| Remove a published port | `vhc image config port remove <host-port>:<container-port>` |
| Show published ports | `vhc image config port show` |
| List available devices | `vhc image config device list` |
| Add device access | `vhc image config device add <device> <SHARED\|EXCLUSIVE>` |
| Remove device access | `vhc image config device remove <device> <SHARED\|EXCLUSIVE>` |
| Show configured devices | `vhc image config device show` |
| Add a feature license path | `vhc image config license add-path <directory>` |
| Show license configuration | `vhc image config license show` |
| Set Docker build options | `vhc image config docker-opts set -- "<docker-options>"` |

## Image Build

Documented in [Template Build](../examples/templates/build.md) and the [Signed Images](../signed-images/overview.md) pages.

| Task | Command |
| --- | --- |
| Generate the Annotated Dockerfile | `vhc image build generate [--arch <arch>] [--unauth]` |
| Compile the image | `vhc image build compile --arch <arch> [--unauth]` |
| Build and save an image archive | `vhc image build save --arch <arch> [--unauth] [--force]` |
| Sign a compiled image | `vhc image build sign --arch <arch>` |
| Build an image release archive | `vhc image build release` |
| List built images | `vhc image build list` |
| Remove all build output | `vhc image build distclean` |

## Applications

Documented in the [Applications](../applications/overview.md) pages.

| Task | Command |
| --- | --- |
| Create an application workspace | `vhc app create` |
| Add an image to the application | `vhc app config add-image <image-name>` |
| Show the application configuration | `vhc app config show` |
| Build the application release archive | `vhc app build release` |
| Verify the application archive | `vhc app build verify build/<AppName>-<version>.tgz` |

## VeeaHub Shell Commands

Run these inside `vhc hub access shell`. They are Veea-aware Docker commands; see [Hub Interaction](../development-hubs/hub-interaction.md) and [Application Test](../applications/test.md).

| Task | Command |
| --- | --- |
| List images | `docker image ls` |
| Create a container from an image | `docker image create <image-id> --detach --publish <host-port>:<container-port>` |
| List containers | `docker container ls --all` |
| Start a container | `docker container start <container-id>` |
| Show container logs | `docker container logs <container-id>` |
| Stop a container | `docker container stop <container-id>` |
| Remove a container | `docker container rm <container-id>` |
| List application services | `docker service list` |
| Start an application service | `docker service start <service-name>` |
| Stop an application service | `docker service stop <service-name>` |
| List volumes | `docker volume ls` |
