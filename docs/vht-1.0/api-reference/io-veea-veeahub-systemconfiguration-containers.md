---
icon: lucide/file-text
---

# io.veea.VeeaHub.SystemConfiguration.Containers

## Name

io.veea.VeeaHub.SystemConfiguration.Containers

## Methods

```text
AllowUntrustedContainers (OUT b flag);
```

## Description

This allows access to general configuration parameters for how the unit runs containers. Container-specific parameters are not managed here.

## Method Details

### The AllowUntrustedContainers() method

```text
AllowUntrustedContainers (OUT b flag);
```

This indicates whether the unit will allow untrusted containers to be run. The default is False.

**Allow**: context=default

`OUT b flag`:

The value of the allow untrusted containers flag.
