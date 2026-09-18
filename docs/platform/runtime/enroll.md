---
icon: lucide/network
---

# Enroll onto a Mesh

If a VeeaHub is not enrolled, it is not visible to any users in the Veea cloud — it is essentially invisible and unmanaged.

When you enroll a VeeaHub, you either:

1. Create a new mesh network containing just that VeeaHub, which implicitly makes it the network gateway (the "Mesh Edge Node" or **MEN**), or
2. Add the VeeaHub to an existing mesh network, which implicitly makes it a simple node on the mesh (a "Mesh Node" or **MN**).

The access controls for the VeeaHub in the Veea cloud come from the mesh it is enrolled onto.

!!! note
    You do not need to enroll the VeeaHub using the same Veea account that registered it, although that is the typical workflow.

## Enroll onto a New Mesh

```bash
veea cloud enroll --new --mesh "MESH_NAME"
```

A mesh name can include the characters `A-Z`, `a-z`, `0-9`, `_`, and `-`, and can be up to 32 characters long.

The command automatically attempts to use a public geolocation service to determine the country and region where the VeeaHub is located. If this fails, or you wish to override it, provide a country and timezone explicitly:

```bash
veea cloud enroll --new --mesh "MESH_NAME" --country GB --timezone Europe/London
```

- The country code is an [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
- The timezone is an [IANA TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

As with all cloud operations, you are prompted to authenticate with a URL and authorization code.

## Enroll onto an Existing Mesh

First list the meshes available to you:

```bash
veea cloud meshes
```

Then provide the UUID of the chosen mesh:

```bash
veea cloud enroll --new --mesh MESH_UUID
```

## Wait for Bootstrap

Once the VeeaHub is enrolled, it retrieves its configuration via bootstrap, completes initialisation, starts up, and becomes fully operational.

!!! note "Allow up to 10 minutes"
    The bootstrap code includes a backoff-and-retry algorithm, so it may take up to 10 minutes before the VeeaHub retrieves its configuration and comes into service.

Verify with:

```bash
veea hub status
```

When complete, the output ends with `Hub is fully operational  True`. See [Check Status](check-status.md) for the full field reference.

## Unenroll

Unenrolling a VeeaHub removes it from a mesh and puts it back into the "Bootstrapping" state. Unenroll from the Veea cloud, or run:

```bash
veea cloud unenroll
```

You can only unenroll a VeeaHub if you have administration privileges on the mesh it is enrolled on.
