---
icon: lucide/file-question
---

# Known Constraints

Use this page to keep the important VHT 2.0 assumptions visible while you work. These are not blockers for the quickstart, but they affect how you move from local testing to repeatable team or production workflows.

| Area | Current guidance | Impact |
| --- | --- | --- |
| Config directories | VHT 2.0 configuration, partner credentials, and feature licenses are stored under `~/.vhc` (for example, `~/.vhc/user-config.yaml`). | Include `~/.vhc` when copying credentials, backing up, or cleaning a host. |
| Package name | The install workflow uses the Ubuntu package `veeahubtoolkit2`. | If the setup script changes package names, follow the package reported by the installer. |
| CLI command | VHT 2.0 uses `vhc2`. VHT 1.x uses `vhc`. | Keep examples separate so commands target the right toolkit. |
| Minimum hub version | Development VeeaHubs require software release `2.39.0-10` or later. | Older hubs should be upgraded before VHT 2.0 development. |
| Docker API | VeeaHub supports Docker API version `1.39`. | Use `DOCKER_API_VERSION=1.39` when targeting VeeaHub contexts. |
| Feature-license cleanup | Use `vhc2 hub access delete-all-feature-licenses --hub-id <hub-id>`. | This is destructive. Confirm the target hub before running it. |
| Partner credentials | Simple apps can use default credentials. Partner credentials and feature licenses are needed for partner-specific capabilities. | Add credentials only when the application needs licensed features such as Zigbee, Bluetooth, or networking. |
| Secure registry pulls | VeeaHub runtime pulls currently need to work without hub-side registry authentication. | Use public images or registry policy that permits unauthenticated pulls for the target image. |
| Example template | The example build uses the `vh_dbus` template from the `c3-templates` repository (`main` branch). | If the branch or path has moved, use the current template location and keep the build commands unchanged. |
| Docker Stack | Stack deployment uses Docker Swarm semantics and Compose file format `3.0` through `3.8`. Options introduced in format `3.8` (`credential_spec`, `max_replicas_per_node`, and the `configs` driver options) are not supported. | Build and push images first; Stack ignores `build` instructions. |

!!! warning
    Docker context is the highest-risk operational detail. Prefer `DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=<hub-id> docker ...` in examples and scripts so each command states its target explicitly.
