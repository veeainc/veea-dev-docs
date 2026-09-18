---
icon: lucide/list-checks
---

# Prerequisites

Prepare the development host, VeeaHub, network, and accounts before installing VHT 2.0.

## Required Environment

| Requirement | Details |
| --- | --- |
| Development host | Ubuntu 24.04 LTS. |
| VeeaHub software | `2.39.0-10` or later for development hubs. |
| Network | The Ubuntu host must be on the same network as the VeeaHub used for development. |
| VirtualBox | Use a bridged network adapter so the Ubuntu VM is on the same LAN as the VeeaHub. |
| Docker | Install `docker.io`, `docker-buildx`, and `docker-compose-v2` later in the workflow. |
| Control Center | Required to enable development mode for the VeeaHub Mesh. |
| Developer portal | Used for developer registration and Veea account creation when required. |

## VeeaHub Options

Applications can be developed on VeeaHub hardware and on supported third-party platforms, including VMs configured as VeeaHubs.

For a physical VeeaHub, enroll the unit through the Veea support flow. For a VM VeeaHub, use the supported VM VeeaHub setup procedure provided for your development environment.

!!! note
    If the development host runs inside VirtualBox, configure the VM network adapter in bridged mode. NAT-only networking prevents the Ubuntu host from appearing on the same LAN as the VeeaHub.

## Before You Continue

Confirm these items:

- You can access [Control Center](https://controlcenter.veea.co/).
- The target VeeaHub or mesh is enrolled.
- You know the VeeaHub IP address.
- You know the VeeaHub serial number.
- The hub is running `2.39.0-10` or later.
- The Ubuntu host can reach the VeeaHub on the local network.

## Readiness Check

You are ready to install VHT 2.0 when you can answer these questions:

| Question | Expected answer |
| --- | --- |
| Which hub am I targeting? | You have the hub ID convention, IP address, and serial number. |
| Which mesh is affected? | You know whether the hub is standalone or part of a mesh. |
| Can I restart the mesh? | You have permission to restart the affected VeeaHubs after enabling development mode and creating Docker context. |
| Do I need licensed features? | If yes, you have partner credentials and feature licenses from Veea Support. |
| Am I using a VM? | The VM network adapter is bridged, not NAT-only. |
