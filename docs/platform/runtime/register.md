---
icon: lucide/key-round
---

# Register with the Veea Cloud

All machines must be registered with Veea before the middleware can operate correctly. Registration provides your machine with a Veea-issued serial number and certificate. This turns it into a full VeeaHub, allowing it to authenticate to the Veea cloud and to other VeeaHubs.

## Requirements

- A Veea account. You cannot register a machine without one.
- Once you have an account, you can register up to five 3rd party machines. If you need to register more, contact Veea Support.

## Run the Registration Wizard

```bash
sudo veea wizard register
```

The wizard prompts you to go to a specific URL that is part of the Veea cloud and enter an authorization code. Do this, logging in to your Veea account if required. Once authorized, the wizard requests an identity for your machine from Veea and completes the registration process.

!!! note "Authentication caching"
    Authentications are cached, so you may not need to authenticate every `veea` command if commands are repeated while the cached authentication is still valid (typically around 10–15 minutes).

## Verify the Registration

```bash
veea hub status
```

Expected output:

```text
Field                         Value
----------------------------  ----------------------------------------------------------------
Date                          2026-06-17T14:45:03.552271
Uptime                        0d 0h 36m 57.530s
Middleware version            2.39.5-veea1
VeeaHub identity              Issued
Serial number                 XXXXXXXXXXXXXXXX0011
VeeaHub registration          Generated
Bootstrap requested           No
Bootstrap downloaded          No
Initialisation complete       No
Middleware                    Bootstrapping
```

The VeeaHub now has a serial number assigned, and the middleware is "Bootstrapping" — connecting to the Veea cloud to obtain configuration.

!!! warning "Bootstrapping is a limited state"
    While bootstrapping, the VeeaHub is essentially a dumb device on the network. It cannot route traffic, run containers, or perform any other advanced functionality. It remains in this state until it is enrolled onto a mesh.

## Next Step

[Enroll the VeeaHub onto a mesh](enroll.md).
