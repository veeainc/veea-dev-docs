---
icon: lucide/package-open
---

# Docker Registries

VHT 2.0 uses Docker registries to distribute application images.

Use secure registries for production and team workflows. Use insecure registries only for local development, testing, or isolated networks.

| Feature | Secure registry | Insecure registry |
| --- | --- | --- |
| Protocol | HTTPS | HTTP, or HTTPS with untrusted certificates |
| Encryption | TLS encrypts traffic in transit | No encryption |
| Authentication | Registry identity validated with certificates | Server identity is not validated |
| Docker behavior | Works as-is for most public/private registries | Must be configured in Docker daemon settings |
| Best use | Production, cloud registries, team environments | Local development, testing, isolated networks |

!!! warning
    Insecure registries do not encrypt traffic or verify server identity. Use only for local development, testing, or isolated networks.

## Current VeeaHub Pull Requirement

The development host needs credentials to push images to a secure registry.

For VeeaHub application runtime, the secure registry must currently allow image pulls without authentication. Later releases are expected to support authenticated registry pulls.

## Registry Workflow

1. Build the image on the Ubuntu development host.
2. Push the image to an insecure local registry or a secure public registry.
3. Configure the VeeaHub to trust or use that registry when required.
4. Run the application from the registry using Docker Compose or Docker Stack.

## Which Registry Should I Use?

| Situation | Registry choice |
| --- | --- |
| Local one-person testing on an isolated LAN | Insecure local registry |
| Demo with repeatable image pulls | Secure public registry |
| Team development | Secure registry |
| Production or customer environment | Secure registry with an approved pull model |

!!! warning
    Do not use an insecure registry as a shortcut for production. It removes transport encryption and server identity verification.
