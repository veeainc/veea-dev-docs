---
icon: lucide/toggle-right
---

# Enable Development Mode

Enable development mode before using VHT 2.0 to manage a VeeaHub.

Development mode is enabled for a mesh and applies to all units in that mesh.

!!! warning
    Development mode is a mesh-level setting. Confirm you selected the intended mesh before enabling it or restarting VeeaHubs.

## Open the Mesh

1. Sign in to Control Center:

    ```text
    https://controlcenter.veea.co/
    ```

2. Select **Meshes** in the left menu.
3. Select the mesh you want to manage.
4. Scroll to the bottom of the mesh view.

## Enable the Toggle

Slide the development mode toggle to the right.

Control Center prompts for a restart to activate development mode. Select **Restart VeeaHubs**.

## Wait for Restart

Track restart progress from the mesh page. When restart completes, the units in the mesh can be managed with VHT 2.0.

## Validate Before Continuing

Before moving to installation and hub management, confirm:

- The mesh is back online.
- The target unit has a reachable IP address.
- You have the unit serial number.
- Your Ubuntu host is on the same network.
