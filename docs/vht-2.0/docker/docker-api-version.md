---
icon: lucide/cable
---

# Docker API Version

VeeaHub currently supports Docker API version `1.39`. The Docker version on the development host may default to a newer API version.

If Docker returns an error such as `client version 1.52 is too new. Maximum supported API version is 1.39`, set `DOCKER_API_VERSION`.

## Set the API Version for the Shell

Run:

```bash
export DOCKER_API_VERSION=1.39
```

All later Docker commands in that shell use API version `1.39`.

## Set the API Version for One Command

Prefer this form when writing examples because it is explicit:

```bash
DOCKER_API_VERSION=1.39 docker node ls
```

You can combine it with Docker context:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker node ls
```

!!! note
    Use `1.39` for VHT 2.0 examples targeting VeeaHub software `2.39.0-10` or later. If a future hub release reports a different maximum API version, use the version reported by the Docker error message for that hub.
