---
icon: lucide/archive
---

# VHT 1.x

VHT 1.x is the original VeeaHub application toolkit, built around the `vhc` command-line client. It takes normal application code, wraps it as a secure Docker image, packages it as a Veea application, and runs it on a VeeaHub through Veea's application model.

If Docker is the engine, VHT 1.x is the set of rails around that engine: identity, signing, licenses, VeeaHub hardware permissions, persistent storage, application packaging, and Control Center integration.

Use this section when you need to maintain existing VHT 1.x applications, compare VHT 1.x with VHT 2.0, or reference the legacy VeeaHub Developer Guide material. The section is self-contained and does not require access to the Veea developer portal.

!!! note "Use VHT 2.0 for new development"
    Use the [VHT 2.0 workflow](../vht-2.0/overview.md) for all new application development. Use VHT 1.x only if you are maintaining an existing application built with the VHT 1.x workflow and are unable to migrate it to VHT 2.0 at this time.

| Area | Content |
| --- | --- |
| Quickstart and validated workflows | Practical VHT 1.x deployment, sideload, Control Center UI, and web proxy guidance |
| Toolkit and development hubs | VHT installation, the `vhc` client, and development VeeaHub setup |
| Examples | Template, advanced, and mesh-enabled example walkthroughs |
| Signed images and applications | Partner credentials, signing, packaging, testing, and release |
| D-Bus API | Platform service documentation and the `io.veea.VeeaHub.*` interface reference |
| Reference | Troubleshooting, glossary, and release notes |

## VHT 1.x vs VHT 2.0

| Area | VHT 1.x | VHT 2.0 |
| --- | --- | --- |
| CLI | `vhc` | `vhc2` |
| Packaging | Veea-specific image/template workflow | Docker-native build and registry workflow |
| Deployment config | Veea-specific application/template model | Standard Docker Compose and Stack model |
| Identity model | VHT secure metadata and partner signatures | Docker-native flow with VeeaHub integration |
| Primary workflow | Legacy VeeaHub Developer Guide / VHT 1.2 workflow | Ubuntu 24.04 LTS Docker-native VHT 2.0 workflow |

VHT 1.x is Veea-specific: it uses `vhc`, secure image metadata, Veea application archives, and the legacy Control Center VHT 1.x upload path. VHT 2.0 moves to a Docker-native workflow using `vhc2`, Docker contexts, Compose, Stack, and registries.

VHT 1.x applications and VHT 2.0 applications can run side by side on the same VeeaHub Mesh. This lets existing VHT 1.x applications keep running while new development happens on VHT 2.0 and migrations are planned.

!!! warning
    Keep VHT 1.x commands separate from VHT 2.0 commands. VHT 1.x uses `vhc`; VHT 2.0 uses `vhc2`.

## Development Model

VHT 1.x development is built around a local Ubuntu development host, the `vhc` command-line tool, and one or more VeeaHubs configured for development.

| Concept | Meaning |
| --- | --- |
| VHT | VeeaHub Toolkit, the development environment for VeeaHub applications. |
| VHC | VeeaHub Client, the VHT 1.x CLI. |
| Development VeeaHub | A hub configured to accept development images and allow developer interaction. |
| Template | A sample VHT workspace used to demonstrate a specific device, service, or container pattern. |
| Secure Docker | Veea's signed/annotated image workflow for controlling what runs on VeeaHub. |
| Application | A VHT 1.x release bundle containing one or more signed images. |

The development flow is:

1. Install VHT on the Ubuntu development host.
2. Configure a VeeaHub for development.
3. Add the VeeaHub to `vhc`.
4. Build or instantiate a template.
5. Build an unsigned image for local development, or a signed image for release.
6. Upload, run, and inspect the container or application.

## Architecture

A VeeaHub can run containerized applications at the edge, but VeeaHubs are not generic Linux boxes where every Docker command is wide open. They are managed edge devices. Applications may need to:

- run on ARM hardware
- access local devices like Bluetooth, Zigbee, serial, or radios
- publish HTTP ports
- store data across restarts
- expose a UI in Control Center
- prove who built the application
- prove which licenses and features it is allowed to use
- run safely beside other applications on the same hub or mesh

VHT 1.x exists to solve those packaging and trust problems. It has three layers:

| Layer | What it means |
| --- | --- |
| Image | One secure Docker image built for a VeeaHub architecture. |
| Application | A Veea package that can contain one or more signed images and service definitions. |
| Hub runtime | The VeeaHub-side shell, secure Docker runtime, licenses, D-Bus services, ports, and volumes that actually run the application. |

Keeping these layers distinct makes the rest of the documentation easier to follow.

## Secure Docker

VeeaHubs run applications that are based on the open **containerd** format. The most well-known example of containerd is Docker. If you are not familiar with Docker, there are many tutorials, such as https://docker-curriculum.com/.

The Veea implementation of Docker, known as **Secure Docker**, enforces a secure environment. Veea uses enterprise-level cryptography to protect the integrity of applications.

The security restrictions will:

- Use developer credentials (licenses) to create signed applications.
- Ensure application integrity.
- Ensure that applications are only run in the ways intended by the application developer.
- Ensure that applications share only the data that is intended to be shared (including running processes, environment, data stored on disk, and networked data).
- Block unauthorized access to the applications.

The security restrictions will not:

- Prevent reasonable operation of applications.
- Prevent authorized access to devices and services.
- Prevent a developer from debugging applications.

Part of the security model on the VeeaHub is a system of licenses. These licenses are provided by Veea for specific purposes, and relate to:

- Permissions for device and service access.
- Permissions for elevated execution privileges and capabilities.

### Annotated Dockerfile

Secure Docker uses **Labels** to annotate both the Dockerfile and the generated image. This allows extra information to be embedded in the image without breaking backwards compatibility with the existing Docker image format. This Dockerfile with labels is referred to as an **Annotated Dockerfile**.

For example:

```text
LABEL com.veea.vhc.architecture="$ARCH"
LABEL com.veea.vhc.version="1.0.0"
LABEL com.veea.vhc.app.name="vh_golang_web"
LABEL com.veea.vhc.app.version="1.0.0"
LABEL com.veea.vhc.config.proj.version="3"
LABEL com.veea.vhc.config.user.version="3"
```

These label details are discussed in the sections on configuring, building, and running images.

### Image Metadata

A VHT 1.x image starts with a normal Dockerfile, and VHT adds secure metadata that describes:

- application/container name and version
- target architecture and platform
- published ports
- persistent volumes
- device access
- requested feature licenses
- partner identity
- persistent image UUID

The source file that drives most of this is usually `config.yaml` in the image workspace.

### Universally Unique Identifiers

Veea relies on Universally Unique Identifiers (UUID) to uniquely identify Partners and Images. Each signed image must have a UUID that uniquely identifies it in the Veea Cloud.

## Unsigned and Signed Images

**Unsigned images** are for local development on hubs that allow unsigned applications. They use the reserved partner prefix `FFFFFFFF`, which appears in image UUIDs, shell prompts, and volume names. It means "unauthenticated development identity", not a real partner.

A typical unsigned build and upload:

```bash
vhc image build save --arch <arch> --unauth
vhc hub access upload-image --hub-id <hub-name> \
  'build/unauth/<arch>/<image-name>-<arch>:<version>.unsigned.tar'
```

**Signed images** are for authorized partner development, controlled testing, and release. Instead of `FFFFFFFF`, signed images use a real partner prefix such as `00000046`. The signature and metadata tell the hub:

- who built the image
- whether the image is allowed to run
- which devices, capabilities, and features it may use
- whether the application matches the hub's active partner/license state

A signed application archive is built with:

```bash
vhc app build release
vhc app build verify build/<AppName>-<version>.tgz
```

That `.tgz` is the artifact uploaded to Control Center using the VHT 1.x upload path.

## Applications

In VHT 1.x, an application package is not just a Docker image. Applications are a bundle of one or more images along with signed metadata that can be used to authenticate and control the instantiation of the images on a VeeaHub. A package can contain:

- one or more signed image archives
- service metadata
- platform and architecture information
- application version metadata
- Docker service definitions for the hub runtime

These names are distinct and should be chosen deliberately:

| Surface | Example | Where it shows up |
| --- | --- | --- |
| Package/application name | `Edge Diagnostics 1.0` | Control Center app/version |
| Container/image name | `edge-diagnostics` | Docker container/service |
| UI service card name | `Edge Console` | Control Center `UI:HTTP` card |
| Persistent UUID | `00000046-...` or `FFFFFFFF-...` | Secure Docker identity, volumes, stale metadata behavior |

Changing one does not always change the others.

### Docker Swarm

Veea uses Docker **Swarm** to orchestrate applications across a Veea Mesh (vMesh). All images in an application bundle have an associated **service** file, which is used to control:

- The nodes in the mesh that can run the image (MEN and/or MN).
- The mapping of host port to container port for all exposed ports.

### Release Archives

An **Image Release Archive** is a Veea-specific enhanced Image Archive file that has the Swarm service file, plus signed metadata that can be used to authenticate the image. An **Application Release Archive** is a combination of one or more Image Release Archives that can be deployed as a single entity.

## Partner Model

Veea allows two different types of developers: **Unauthorized** and **Authorized**.

### Unauthorized Developers

Unauthorized developers do not have a **Partner ID** or **Partner Credentials**. They can create applications and deploy them to their VeeaHubs, but only as unsigned images.

!!! info
    Unauthorized developers can't create signed images or deploy applications to Veea Cloud.

Unauthorized developers have the following abilities:

- They can create images that use any of the hardware devices in exclusive or shared mode
- They cannot run containers as root
- They cannot run containers in privileged or host networking modes
- Their images will not be hosted on any Veea platforms
- Their images cannot be deployed via bootstrap

!!! warning
    Unsigned images will only run on VeeaHubs that have been configured to allow unsigned images. These VeeaHubs should never be put into production due to the security risk associated with this configuration.

### Authorized Developers

Authorized developers have been assigned a Partner ID and Partner Credentials that allow them to create signed images and applications. In addition to being able to do everything unauthorized developers can do, authorized developers can create signed containers and deploy their applications to Veea Cloud. It is expected that the registered developers will pay for this license which includes an agreed level of support from Veea.

!!! info
    Authorized developers can create signed images and applications, and have them hosted on the Veea Cloud.

Registered developers have the following additional abilities:

- They can create signed images that use hardware devices, subject to the restrictions of their licenses
- They can create containers that have CAP_xxx privileges, subject to the restrictions of their licenses
- Their images will be signed by them and traceable back to them
- Their images are permitted to be hosted on any Veea platforms
- Their images can be deployed via bootstrap

### Partner IDs and Partner Licenses

Every partner is assigned a unique **Partner ID**. The ID is 8 hexadecimal characters where the `FFFFFFFF` ID is reserved for use in building unauthorized images. The unauthorized images can only be run on VeeaHubs that have been specifically configured to allow such images and can never be used in production.

Associated with the Partner ID is a **Partner License**. This license is used to sign applications so that they can be loaded and run on VeeaHubs in a commercial deployment.

A path for feature licenses can be set using `vhc partner secure add-license-path`.

### Checking the Active Partner Identity

The hub checks whether an uploaded image or application is allowed to run. The important command is:

```bash
vhc hub access get-partner-id --hub-id <hub-name>
```

| Value | Meaning |
| --- | --- |
| `FFFFFFFF` | The hub is in unsigned development mode. Use unsigned image sideload. |
| Real partner prefix | The hub is accepting that partner identity for signed sideload. |

Note that `get-licenses` can show developer licenses while the active partner ID is still `FFFFFFFF`. If a signed application upload fails with `Non-authorized partner id found`, check `get-partner-id` before retrying — the hub may require the unsigned path.

## VeeaHub Shell

The local `vhc` CLI talks to the hub's sideload API on port `9000`. For deeper runtime control, it uses VeeaHub Shell over SSH, commonly on port `9010`:

```bash
vhc hub access shell --hub-id <hub-name>
```

Inside VeeaHub Shell, Docker commands are Veea-aware. They show Veea metadata such as `P-UUID`, partner prefixes, service states, and published ports:

```bash
docker image ls
docker container ls --all
docker service list
docker volume ls
```

Use `docker image ...` and `docker container ...` for unsigned image sideload containers. Use `docker service ...` for Veea application services created from signed application packages.

## Sideloading

The `vhc` tool is used to build an image that can be saved as an Image Archive and then uploaded to a VeeaHub via **Sideloading**. Sideloading refers to the act of uploading a Docker image archive to a development VeeaHub using `vhc` for the purpose of testing it — the same term smartphone developers use for loading development builds directly onto a device.

## Ports, Volumes, and Devices

VHT 1.x requires applications to declare what they need, so the runtime can enforce boundaries:

| Need | Where it is represented |
| --- | --- |
| HTTP port | Dockerfile `EXPOSE` and `config.yaml` port publish settings |
| Persistent data | `config.yaml` persistent volume labels |
| Device access | `config.yaml` secure device labels |
| Feature/license access | `config.yaml` feature labels and installed hub licenses |

Access to VeeaHub devices and platform services is controlled via feature licenses, described in the [Partner Model](#partner-model) section.

## Platform Services over D-Bus

VHT 1.x applications can talk to VeeaHub platform services through D-Bus. Useful services include:

- `io.veea.VeeaHub.Info` for serial, model, software, hardware, and mesh identity
- `io.veea.VeeaHub.Networking` for network information
- `io.veea.VeeaHub.MqttControl` for MQTT-related platform settings
- `io.veea.VeeaHub.ReverseProxy` for Control Center service cards
- `io.veea.VeeaHub.ContainerControl` for container/platform control surfaces

This is how an application becomes a full VeeaHub edge application rather than just a web server in a container. See the [D-Bus API documentation](dbus/api-documentation.md).

## Control Center Integration

Publishing a port lets the application answer on the LAN. It does not automatically create a Control Center link. To create a clickable `UI:HTTP` card, the running container must call the ReverseProxy D-Bus API:

1. `RegisterReverseProxy(...)`
2. `ConfigureVeeaCloudAccess(...)`

That registration is runtime state, so applications should perform it on every start and retry until D-Bus is ready. See [Control Center UI Links](control-center-ui-links.md).

Control Center does not open the application at `/`. It opens it under a nested proxy path:

```text
/node/v2/proxy/<hub-serial>/<app-or-image-uuid>/http/<service-name>/
```

Root-absolute browser paths such as `/assets/...` or `/api/...` can therefore escape the application. Production-quality VHT 1.x web applications support both direct LAN access (`http://<hub-ip>:<port>/`) and Control Center nested proxy access. See [Web UI Proxy Compatibility](web-ui-proxy-compatibility.md).

## Where To Go Next

The complete pipeline looks like this:

```text
your code
  -> Docker image
  -> VHT secure image metadata
  -> unsigned dev image or signed partner image
  -> optional Veea application archive
  -> VeeaHub secure Docker runtime
  -> Control Center, D-Bus, ports, volumes, devices, and edge services
```

The documentation follows the same shape:

- [The Toolkit](toolkit/overview.md) covers installation and the `vhc` client.
- [Development Hubs](development-hubs/overview.md) covers preparing and registering development VeeaHubs.
- The [Examples](examples/templates/overview.md) teach how image projects are shaped.
- [Signed Images](signed-images/overview.md) covers trust and partner identity.
- [Applications](applications/overview.md) covers packaging, testing, and release through Control Center.
- The [D-Bus API](dbus/api-documentation.md) pages cover how applications talk to Veea platform services.

For the fastest path to a running application, start with the [Quickstart](quickstart.md) or the [Validated Workflows](validated-workflows.md).
