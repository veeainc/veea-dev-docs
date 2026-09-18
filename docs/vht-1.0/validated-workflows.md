---
icon: lucide/route
---

# VHT 1.x Validated Workflows

Use this page when you need to build, upload, run, and verify a VHT 1.x application on a development VeeaHub.

The converted VHT 1.2 guide pages remain the reference for individual commands. This page is the practical support flow: what to check first, which deployment path to choose, and how to verify that the app is really running. For the condensed command sequence, see the [Quickstart](quickstart.md).

## Before You Build

Confirm the target shape before touching the app:

| Check | Why it matters |
| --- | --- |
| Target VeeaHub model | VHC25 uses `arm32v7` and platform `iesv2.5`. |
| App package name | This is the Control Center application/package name. |
| Container/image name | This is the runtime container identity. It can differ from the package name. |
| Published port | Required for LAN access and often used by the Control Center UI service. |
| Control Center service name | Created at runtime through ReverseProxy, not by the package name alone. |
| Persistent UUID | Used by VHT/Secure Docker identity and can affect stale Control Center behavior. |
| Persistent volumes | Must be unique when running multiple variants side by side. |

!!! warning
    Do not reuse versions casually. If a package or image has already been uploaded, bump the application version. If Control Center still shows stale container/service identity, rotate the image persistent UUID as well.

## Identify The Hub Mode

Always check the hub before choosing signed app sideload or unsigned image sideload.

```bash
vhc hub access ping --hub-id <hub-name>
vhc hub access get-info --hub-id <hub-name>
vhc hub access get-partner-id --hub-id <hub-name>
vhc hub access get-licenses --hub-id <hub-name>
```

Interpret `get-partner-id`:

| Partner ID | Meaning | Best next step |
| --- | --- | --- |
| `FFFFFFFF` | Unsigned/unauthenticated development mode | Use unsigned image sideload. |
| Partner prefix, for example `00000046` | Authorized partner mode | Signed app sideload may work if the package matches the partner. |

!!! note
    A hub can show a `PARTNER-DEVELOPER` license while `get-partner-id` still returns `FFFFFFFF`. In that state, a signed app archive can fail with `Non-authorized partner id found`, while unsigned image sideload can still work.

## Control Center Signed App Flow

Use this when you want a VHT 1.x application package uploaded through Control Center.

1. Build and verify the application archive.

   ```bash
   cd <generated-vhc-app-workspace>
   vhc app build release
   vhc app build verify build/<AppName>-<version>.tgz
   ```

2. Upload through Control Center:

   - Open **Applications**.
   - Create or edit the application.
   - Use **Upload / VHT1.x**.
   - Upload `build/<AppName>-<version>.tgz`.
   - Enable the version.
   - Subscribe the target mesh.

3. Verify on the hub or in Control Center:

   ```bash
   vhc hub access shell --hub-id <hub-name> --command "docker service list"
   vhc hub access shell --hub-id <hub-name> --command "docker container ls --all"
   curl -sS --max-time 8 http://<hub-ip>:<published-port>/health
   curl -sS --max-time 8 -I http://<hub-ip>:<published-port>/
   ```

Control Center deployment installs an application service. The VeeaHub shell usually manages it with `docker service ...`.

## Direct Signed App Sideload

Use this only when the hub accepts the matching partner ID.

```bash
vhc hub access upload-app --hub-id <hub-name> build/<AppName>-<version>.tgz
vhc hub access shell --hub-id <hub-name> --command "docker service list"
vhc hub access shell --hub-id <hub-name> --command "docker service start <service-name>"
```

If upload reaches `100.0%` and then fails with `Non-authorized partner id found`, stop and check `get-partner-id`. If it returns `FFFFFFFF`, switch to unsigned image sideload or fix the hub partner license state and reboot before retrying.

## Unsigned Image Sideload

Use this for development hubs running in unauthenticated mode.

1. Build an unsigned image archive.

   ```bash
   cd <generated-vhc-image-workspace>
   vhc image build save --arch arm32v7 --unauth --force
   ```

2. Upload the image archive.

   ```bash
   vhc hub access upload-image --hub-id <hub-name> \
     'build/unauth/arm32v7/<image-name>-arm32v7:<version>.unsigned.tar'
   ```

3. Create and start a container through VeeaHub Shell.

   ```bash
   vhc hub access shell --hub-id <hub-name> --command "docker image ls"
   vhc hub access shell --hub-id <hub-name> --command \
     "docker image create <image-id> --detach --publish <host-port>:<container-port> --restart unless-stopped"
   vhc hub access shell --hub-id <hub-name> --command "docker container ls --all"
   vhc hub access shell --hub-id <hub-name> --command "docker container start <container-id>"
   ```

`docker image create` accepts either `<image-name>:<tag>:<image-id>` or just `<image-id>`. In support sessions, using the image ID alone is often less fragile.

## Verify A Running Web App

Use direct LAN checks even when the app is primarily opened through Control Center.

```bash
vhc hub access shell --hub-id <hub-name> --command "docker container ls --all"
curl -sS --max-time 8 http://<hub-ip>:<published-port>/health
curl -sS --max-time 8 http://<hub-ip>:<published-port>/version
curl -sS --max-time 8 -I http://<hub-ip>:<published-port>/
```

For browser apps, verify both:

- Direct LAN URL: `http://<hub-ip>:<published-port>/`
- Control Center `UI:HTTP` card URL, if the app registers one

## VeeaHub Shell Access

`vhc hub access shell` uses SSH to the VeeaHub Shell, not the REST sideload port.

Observed VHC 1.x shell command shape:

```bash
ssh -o SendEnv=VHC_ENV_CONTEXT -p 9010 -o ControlMaster=no -o ConnectTimeout=10 vhc@<hub-ip>
```

If host key verification fails:

```bash
ssh-keyscan -T 5 -p 9010 -H <hub-ip> >> ~/.ssh/known_hosts
vhc hub access shell --hub-id <hub-name> --command "help"
```

If the shell then fails with `Permission denied (publickey,keyboard-interactive)`:

```bash
vhc hub access upload-public-key --hub-id <hub-name> ~/.ssh/id_ed25519.pub
vhc hub access shell --hub-id <hub-name> --command "docker image ls"
```

## Validated VHC25 Example

One VHC25 was successfully used to run a signed Control Center app and an unsigned CLI sideload app at the same time.

| Variant | Container | Persistent UUID prefix | Port | Volume |
| --- | --- | --- | --- | --- |
| Signed Control Center app | `thomas-edge-diagnostics` | `00000046` | `31957` | `edge-diag-data` |
| Unsigned CLI sideload app | `thomas-edge-diagnostics-sideload` | `FFFFFFFF` | `31958` | `edge-diag-data-sideload` |

This works because the app/container names, persistent UUIDs, published ports, and persistent volumes are all distinct.
