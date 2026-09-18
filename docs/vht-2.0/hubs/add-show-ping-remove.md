---
icon: lucide/terminal
---

# Add, Show, Ping, and Remove Hubs

Add each development VeeaHub to the local VHT configuration before creating Docker contexts or uploading licenses.

## Add a Hub

Run:

```bash
vhc2 hub config add-hub --ip-addr 192.168.1.36 \
  --serial-number XXXXXXXXXXXXXXXX2341 vh-2341
```

The example uses `vh-2341` because the serial number ends in `2341`.

## Show Hubs

Run:

```bash
vhc2 hub config show
```

Expected output:

```yaml
hub:
  hubs:
    - id: vh-2341
      ipv4Addr: 192.168.1.36:9000
      serialnumber: XXXXXXXXXXXXXXXX2341
```

## Ping a Hub

Run:

```bash
vhc2 hub access --hub-id vh-2341 ping
```

Expected output:

```text
Success
```

## Remove a Hub

Run:

```bash
vhc2 hub config remove-hub vh-2341
```

Confirm removal:

```bash
vhc2 hub config show
```

Expected output:

```yaml
hub:
  No hubs configured.
```
