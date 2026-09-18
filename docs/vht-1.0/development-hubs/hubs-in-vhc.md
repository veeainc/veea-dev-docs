---
icon: lucide/file-text
---

# Development VeeaHubs in VHC

The first step is to tell `vhc` about the VeeaHubs you plan to interact with. This is done using the set of commands under `vhc hub config`.

```console
$ vhc hub config --help
Add, remove, and configure VeeaHub information.
All hub configuration is stored in ~/.vhc/config.yaml.

Usage:
  vhc hub config [flags]
  vhc hub config [command]

Available Commands:
  add-hub        Adds a hub to the configuration.
  remove-hub     Removes a hub from the configuration.
  set-active-hub Sets the hub to be used for all subsequent operations.
  show           Shows hub information.
  update-hub     Updates the IPv4 address for a configured hub.

Flags:
  -h, --help   help for config

Use "vhc hub config [command] --help" for more information about a command.
```

To add a new VeeaHub, run the command

`vhc hub config add-hub --ip-addr <your-hub-ip> --serial-number <your-hub-serial> <your-hub-name>`

but substitute the appropriate IP address, Serial Number, and a Nickname for each VeeaHub.

For example:

`vhc hub config add-hub --ip-addr 192.168.10.176 --serial-number C25CTW00000000001567 vhc25`

When you’re done, you can use the `vhc hub config show` command to show the configured VeeaHubs

```console
$ vhc hub config show
hub:
  active: vhc25
  hubs:
  - id: vhc05
    ipv4Addr: 10.20.1.141
    serialnumber: C05BCB00C0A000000886
  - id: vhe09
    ipv4Addr: 10.20.4.50
    serialnumber: E09BCWA0C0B000000627
  - id: vhe10
    ipv4Addr: 10.20.0.49
    serialnumber: E10CUW0C80C000000001
  - id: vhc25
    ipv4Addr: 192.168.10.176
    serialnumber: C25CTW00000000001567
```

Entries can be modified using `vhc hub config update-hub` or removed using `vhc hub config remove-hub`.

You can also set a default hub with the `vhc hub config set-default-hub <hub-name>` command. For example:

```bash
vhc hub config set-default-hub vhc25
```

As with most other commands, hitting the `tab` key after the command will provide you with a list of configured hubs to choose.
