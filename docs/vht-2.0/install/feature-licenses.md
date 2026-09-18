---
icon: lucide/badge-check
---

# Feature Licenses

Feature licenses allow applications to access specific VeeaHub capabilities such as Zigbee or Bluetooth.

Feature licenses are provided by Veea Support as a tarball.

## Install Feature Licenses

Extract the feature license tarball into the default license directory:

```bash
tar xzvf partner_<partnerID>_Features_<xxx>.tgz -C ~/.vhc
```

Example:

```bash
tar xzvf partner_00000000_Features_1_9.tgz -C ~/.vhc
```

List installed feature licenses:

```bash
ls ~/.vhc/partner-feat*
```

Expected output:

```text
partner-feature1.txt  partner-feature4.txt  partner-feature7.txt
partner-feature2.txt  partner-feature5.txt  partner-feature8.txt
partner-feature3.txt  partner-feature6.txt  partner-feature9.txt
```

## Add a License Path

You can add another directory for feature licenses:

```bash
vhc2 partner secure add-license-path ~/workspace/vht
```

Show secure partner configuration:

```bash
vhc2 partner secure show
```

The added directory appears under `license_paths`.

!!! warning
    If you change the feature license location, move the existing license files manually. `vhc2 partner secure add-license-path` updates configuration but does not move files.
