---
icon: lucide/terminal
---

# veea Command Reference

The `veea` command manages the VeeaONE Runtime node and its relationship with the Veea cloud. Functionality is broken into logical sections, with `veea wizard` commands covering more complex workflows.

## veea cloud

The `veea cloud` commands interact with the Veea cloud to enroll and unenroll VeeaHubs, list meshes and groups, show account information, and check the VeeaHub's status in the cloud.

All `veea cloud` commands must be authenticated. Credentials are cached (typically valid for 10–15 minutes), so you do not need to authenticate every command.

| Command | Purpose |
| --- | --- |
| `veea cloud user` | Show the account information for the user in the Veea cloud. Use `--json` for full details. |
| `veea cloud enroll` | Enroll the VeeaHub into a new mesh, or add it to an existing mesh. See [Enroll onto a Mesh](../runtime/enroll.md). |
| `veea cloud groups` | List all groups available to the user. |
| `veea cloud meshes` | List all meshes available to the user, with the VeeaHubs enrolled on each. |
| `veea cloud status` | Show the progress of the VeeaHub's enroll or unenroll operation. Requires access privileges on the mesh. |
| `veea cloud unenroll` | Remove the VeeaHub from a mesh, returning it to the "Bootstrapping" state. Requires administration privileges on the mesh. |

Example — authenticate and show account information:

```bash
veea cloud user
```

```text
Go to: https://auth.veea.co/auth/realms/veea/device and enter: XXXX-XXXX
After logging in, grant access to 'veea-thirdparty-middleware-deviceflow-client'
Thank you
Field          Value
-------------  ------------------------------------
User ID        xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Name           Joe Developer
Email address  joed@yourcompany.com
```

Example — list meshes (the mesh UUIDs can be passed to `veea cloud enroll --new --mesh`):

```bash
veea cloud meshes
```

```text
Group: joed@yourcompany.com's Group (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
  Mesh: VMESH-2341 (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      VH-2341 (XXXXXXXXXXXXXXXX2341)
  Mesh: my-edge-site (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      XXXXXXXXXXXXXXXX0011 (XXXXXXXXXXXXXXXX0011)
```

## veea hub

The `veea hub` commands work locally to configure and manage the VeeaHub.

| Command | Purpose |
| --- | --- |
| `veea hub bootstrap` | Tell the VeeaHub to perform a bootstrap on the next restart. Add `--now` to restart the middleware immediately, or `--clear` to clear an unapplied bootstrap request. |
| `veea hub identity show` | Report the identity information assigned to the VeeaHub by Veea. |
| `veea hub identity export <file>` | Back up the VeeaHub identity (serial number, keys, and so on). |
| `veea hub identity import <file>` | Restore an identity backup. Refused if the VeeaHub already has identity information present. |
| `veea hub label` | Show the information that would normally be printed on a VeeaHub's manufacturing label. Useful for some diagnostics. |
| `veea hub status` | Show the VeeaHub's current operational status. See [Check Status](../runtime/check-status.md). |
| `veea hub topology` | Show an ASCII diagram of the wired mesh configuration. |

Example — show identity:

```bash
veea hub identity show
```

```text
Field          Value
-------------  ---------------------------------
Description    Generic Ubuntu on x86_64 platform
Model          generic
Platform       ubuntu-x86_64
Revision       A
Serial Number  XXXXXXXXXXXXXXXX0011
```

Example — back up and restore the identity. This is useful if you want to wipe the machine completely, reinstall all the software, and keep its original identity:

```bash
veea hub identity export ~/my-identity.img
veea hub identity import ~/my-identity.img
```

## veea middleware

The `veea middleware` commands stop, start, and restart the middleware. They are essentially wrappers around `systemctl` for the `veea-middleware` service.

| Command | Purpose |
| --- | --- |
| `veea middleware start` | Start the middleware if it is not running. |
| `veea middleware stop` | Stop the middleware if it is running. |
| `veea middleware restart` | Restart the middleware. |
| `veea middleware status` | Report minimal middleware status. Prefer `veea hub status` for complete information. |

## veea tpms

The `veea tpms` commands interact with the service in the Veea cloud that manages 3rd party machine registration.

| Command | Purpose |
| --- | --- |
| `veea tpms client identity` | Show your client account information, including the registration limit (the maximum number of VeeaHubs you can register). |
| `veea tpms whoami` | Equivalent to `veea tpms client identity`. |
| `veea tpms client certificates list` | List certificates registered for certificate-based authentication. |
| `veea tpms client certificates register` | Generate a key and self-signed certificate and register it, so subsequent `veea tpms` commands authenticate with the certificate instead of the interactive cloud login. |
| `veea tpms client certificates unregister <id>` | Remove a registered certificate. |
| `veea tpms client actions` | List all actions performed by the user in the registration service. |
| `veea tpms client events` | List all creation and update actions performed on your account. |
| `veea tpms veeahubs list` | List all VeeaHubs you have registered. |
| `veea tpms veeahubs show <serial>` | Show the registered information for a VeeaHub, including its hardware details. |
| `veea tpms veeahubs events <serial>` | List events for the indicated VeeaHub. |
| `veea tpms config show` | Show the client configuration. You should not need to change configuration under normal operation. |

## veea wizard

The `veea wizard` commands perform more complex workflows that span multiple areas.

| Command | Purpose |
| --- | --- |
| `veea wizard register` | Register a new machine with Veea, issuing it a serial number and certificate. See [Register with the Veea Cloud](../runtime/register.md). |
