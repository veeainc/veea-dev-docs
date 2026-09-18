---
icon: lucide/activity
---

# Check Status

Query the status of the machine and the middleware at any time.

## Hub Status

```bash
veea hub status
```

Example output for a fully operational, enrolled VeeaHub:

```text
Field                         Value
----------------------------  ----------------------------------------------------------------
Date                          2026-06-17T16:51:54.260016
Uptime                        1d 0h 43m 48.240s
Middleware version            2.39.5-veea1
VeeaHub identity              Issued
Serial number                 XXXXXXXXXXXXXXXX0011
VeeaHub registration          Generated
Bootstrap requested           No
Bootstrap downloaded          Yes
Owner assigned                Yes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
Mesh assigned                 Yes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
Initialisation complete       Yes
Middleware                    Running
WAN connection                Ethernet (192.168.1.36)
Middleware restart required   No
Backhaul operational          True
Internet accessible           True
Veea cloud agent operational  True
NTP operational               True
NTP sync established          True
Network ports operational     True
Default LAN operational       True
LAN DNS operational           True
Local mesh operational        True
Hub is fully operational      True
```

The status fields are mostly self-explanatory. Some fields are not present if the machine has not been registered, has not been enrolled, or the middleware is not running.

A VeeaHub in this state should show green in Control Center.

!!! note "Owner and Mesh UUIDs"
    The "Owner assigned" and "Mesh assigned" fields show internal UUIDs for the user and mesh, and are only present once the unit is enrolled. They are mainly useful to Veea Support, who may ask you for the output of `veea hub status` during a support activity.

## Mesh Topology

Show an ASCII diagram of the wired mesh configuration:

```bash
veea hub topology
```

Example output:

```text
 ┌──────────────────────────────────────┐
 │      MEN: XXXXXXXXXXXXXXXX0011       │
 │                                      │
 │             ┌────────────┐           │                   ┌─────────────────┐
 │             │Port Port 1 │─────────────WAN─1─────────────│WAN 1 (Internet) │
 │             │            │           │                   │                 │
 │             └────────────┘           │                   └─────────────────┘
 │                                      │
 └──────────────────────────────────────┘
```

## Middleware Status

```bash
veea middleware status
```

This reports minimal status information for the middleware service. Prefer `veea hub status`, which provides much more complete information.
