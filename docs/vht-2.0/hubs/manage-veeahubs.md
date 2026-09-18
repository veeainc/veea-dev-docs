---
icon: lucide/server
---

# Manage VeeaHubs

Use `vhc2 hub` commands to add, inspect, ping, and remove VeeaHubs from the VHT configuration.

Enable development mode on the target VeeaHub Mesh before using these commands.

## Command Groups

| Task | Command group |
| --- | --- |
| Configure known hubs | `vhc2 hub config` |
| Interact with a hub | `vhc2 hub access` |
| Manage insecure registries | `vhc2 hub access --hub-id <hub-id> insecure-registry` |
| Manage feature licenses | `vhc2 hub access --hub-id <hub-id> upload-feature-licenses` |

## Hub IDs

Use a convention that makes the target obvious. For physical VeeaHubs, use the VeeaHub serial number so the hub ID is easy to recognize:

```text
vh-<last-four-serial-digits>
```

For VM VeeaHubs, use a prefix such as:

```text
vm-<last-four-serial-digits>
```

Clear hub IDs matter because the same development host can manage multiple Docker contexts.

## Safe Naming

Use names that are obvious at the command line:

| Target type | Example |
| --- | --- |
| Physical VeeaHub | `vh-2341` |
| VM VeeaHub | `vm-2341` |
| Lab mesh gateway | `lab-gw-2341` |

Avoid names such as `test`, `hub`, or `default`. They make it too easy to run Docker commands against the wrong target.
