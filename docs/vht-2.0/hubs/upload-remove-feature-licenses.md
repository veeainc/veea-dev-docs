---
icon: lucide/file-check-2
---

# Upload and Remove Feature Licenses

Upload feature licenses to a VeeaHub when applications need licensed VeeaHub capabilities.

## Upload Feature Licenses

Run:

```bash
vhc2 hub access upload-feature-licenses --hub-id <hub-id>
```

Example:

```bash
vhc2 hub access upload-feature-licenses --hub-id vh-2341
```

Expected output includes license discovery and upload progress:

```text
Searching for Partner(00000000) Feature Licenses in: /home/veea/workspace/vht
Searching for Partner(00000000) Feature Licenses in: /home/veea/.vhc
Found Partner Feature Licenses:
/home/veea/.vhc/partner-feature1.txt
/home/veea/.vhc/partner-feature2.txt
Adding these feature license file(s) to XXXXXXXXXXXXXXXX2341:9000 (partner_licenses)...
Success
```

## Remove Feature Licenses

Feature licenses remain on a VeeaHub after a reset and can only be removed manually.

Run:

```bash
vhc2 hub access delete-all-feature-licenses --hub-id <hub-id>
```

Example:

```bash
vhc2 hub access delete-all-feature-licenses --hub-id vh-2341
```

Expected output:

```text
Deleting All Partner Feature licenses from XXXXXXXXXXXXXXXX2341:9000 (partner_licenses)...
All Partner Feature Licenses deleted successfully
```

!!! note
    Use `vhc2` for VHT 2.0 feature-license commands. VHT 1.x examples may use `vhc`; do not mix those commands into a VHT 2.0 environment.

!!! warning
    `delete-all-feature-licenses` removes all partner feature licenses from the target hub. Confirm `--hub-id` before running it.
