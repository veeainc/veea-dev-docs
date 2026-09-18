---
icon: lucide/file-text
---

# An Introduction to Signed Images

This set of tutorials explain the process of configuring, building, and running signed images.

Signed images are the production-oriented VHT 1.x packaging path. They are built by authorized developers with partner credentials and can be traced back to the partner that produced them.

## When to Use Signed Images

Use signed images when an application is intended for controlled testing, release, or deployment beyond a local unsigned development hub.

Unsigned images are useful while developing on a hub configured for development. Signed images are required when the target environment expects authenticated Secure Docker images.

## Signed Image Flow

1. Install or import partner credentials.
2. Configure the image metadata and supported architectures.
3. Build the signed image archive.
4. Verify the archive.
5. Upload or package the image for application release.
6. Run and test the image on a development VeeaHub.

## Local Pages

- [Partner Credential Installation](partner-credential-installation.md)
- [A Simple Signed Image Example](simple-signed-image.md)
- [A Signed Image with Feature Licenses](feature-licenses.md)
- [Image Release Archives](image-release-archives.md)

!!! warning
    Signed image workflows require partner credentials. Do not commit credentials, signing material, or generated release archives to the docs repo.
