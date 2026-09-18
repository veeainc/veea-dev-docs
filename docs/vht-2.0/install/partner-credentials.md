---
icon: lucide/key-round
---

# Partner Credentials

Import partner credentials when you have registered as a developer and received a partner credential package.

You do not need to register or import partner credentials for simple applications that do not require specific VeeaHub features.

## Import Credentials

Run:

```bash
vhc2 partner secure import-credentials veea-partner-<partnerID>.tgz
```

Example:

```bash
vhc2 partner secure import-credentials veea-partner-00000000.tgz
```

During import, `vhc2` extracts the credential package, validates credentials, requests Keycloak credentials, downloads TLS credentials, and writes partner TLS files.

Expected files include:

```text
partner_tls_private.pem
partner_tls_public.pem
partner_tls_cert.pem
partner_tls_stack.pem
```

!!! note
    VHT 1.x uses `vhc`; VHT 2.0 uses `vhc2`. If credential tooling prints older `vhc` upload guidance, keep the commands in this documentation as the VHT 2.0 baseline and use `vhc2` for VHT 2.0 environments.

## Default Credentials

If you have not registered as a developer, default credentials are used. Default credentials allow applications that do not require partner-specific VeeaHub features.

Examples of features that may require partner credentials or feature licenses include Zigbee, Bluetooth, and networking capabilities.
