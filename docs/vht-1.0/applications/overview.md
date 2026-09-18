---
icon: lucide/file-text
---

# An Introduction to Applications

This section introduces the VHT 1.x application release workflow. In VHT 1.x, an application is a bundle of one or more signed Secure Docker images that can be released and deployed through Veea systems.

Use these pages when building, testing, or maintaining VHT 1.x applications that use `vhc`, Secure Docker image metadata, application release archives, remote container access, or dynamic configuration/state patterns.

## Application Workflow

| Step | Local page |
| --- | --- |
| Understand Secure Docker and application archives | [Secure Docker](../overview.md#secure-docker) |
| Create and configure the application | [Application Creation and Configuration](creation-and-configuration.md) |
| Build and verify the application archive | [Application Build and Verification](build-and-verification.md) |
| Upload and test the application | [Application Test](test.md) |
| Release the application | [Application Release](release.md) |

The application workflow covers the VHT 1.x command flow:

- `vhc app create`
- `vhc app add-image`
- `vhc app build`
- `vhc app build verify`
- `vhc app run`
- `vhc image upload`
- `vhc container create`
- `vhc container start`
- `vhc container logs`
- `vhc container shell`
- `vhc container stop`
- `vhc container delete`

!!! warning
    This is VHT 1.x content. Use `vhc` commands here. VHT 2.x uses `vhc2`.

## Application Notes

Runtime patterns for deployed applications:

- [Remote Access to Containers](remote-access-to-containers.md)
- [Dynamic Container Configuration and State](dynamic-container-configuration-and-state.md)

## Related Concepts

- [Partner Credential Installation](../signed-images/partner-credential-installation.md)
- [An Introduction to Signed Images](../signed-images/overview.md)
- [Image Release Archives](../signed-images/image-release-archives.md)
