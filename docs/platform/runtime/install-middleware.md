---
icon: lucide/download
---

# Install the Middleware

Install the VeeaONE Runtime middleware on a prepared platform. If the operating system is not set up yet, start with the [platform preparation pages](../prepare/x86-virtual-machine.md).

## Run the Setup Script

Download the setup script from the Veea repository and run it in easy mode:

```bash
wget https://repo.veeaplatform.net/tools/setup.sh
chmod a+x setup.sh
sudo ./setup.sh --easy
```

The script will:

1. Check that your hardware is compatible.
2. Configure the appropriate Veea repository.
3. Install the Veea middleware.
4. **Reboot the machine.**

## Verify the Install

Once the machine has rebooted, check the status:

```bash
veea hub status
```

Expected output:

```text
Field                         Value
----------------------------  ----------------------------------------------------------------
Date                          2026-06-17T14:35:03.552271
Uptime                        0d 0h 26m 57.530s
Middleware version            2.39.5-veea1
VeeaHub identity              Not issued
VeeaHub registration          Not generated
Bootstrap requested           No
Bootstrap downloaded          No
Initialisation complete       No
Middleware                    Waiting for identity details
```

"VeeaHub identity: Not issued" and "Middleware: Waiting for identity details" show that the machine has not yet been registered with Veea.

## Next Step

[Register the machine with the Veea cloud](register.md).
