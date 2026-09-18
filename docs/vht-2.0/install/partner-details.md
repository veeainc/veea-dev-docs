---
icon: lucide/id-card
---

# Partner Details

On first run, `vhc2` may prompt for basic partner or developer details.

## Enter Details

Run:

```bash
vhc2
```

If prompted, enter:

- Developer name
- Developer email
- Company address
- Company URL

Example:

```text
Developer name: Joe Developer
Developer email: joed@yourcompany.com
Company address: 1234 Rolling Hills, Anytown, Anystate
Company URL: https://yourcompany.com
```

These details are stored in `~/.vhc/user-config.yaml`. If the configuration file already exists, `vhc2` does not prompt again.

## Show Partner Details

Run:

```bash
vhc2 partner config show
```

Expected output:

```yaml
address: 1234 Rolling Hills, Anytown, AnyState
email: joed@yourcompany.com
name: Joe Developer
url: https://yourcompany.com
uuid: 55DF674F-2553-459B-A9F2-CE71DD28BDDA
```
