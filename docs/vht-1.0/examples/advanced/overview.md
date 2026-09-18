---
icon: lucide/file-text
---

# Advanced Template Examples

In addition to basic configuration, there are several special image configuration menus. These can be seen using the `vhc image config --help` command.

```console
$ vhc image config --help
Sets and displays image information.
All image configuration is stored in the config.yaml file.

Usage:
  vhc image config [flags]
  vhc image config [command]

Available Commands:
  device      [menu] Adds/removes devices to/from the image configuration.
  docker-opts [menu] Sets/clears docker options in the image configuration.
  license     [menu] Adds and removes entries to the license portion of the configuration.
  node-type   [menu] Adds/removes node types to/from the image configuration.
  platform    [menu] Adds/removes platforms to/from the image configuration.
  port        [menu] Adds/removes published ports to/from the image configuration.
  set-info    Sets basic image information.
  show        Shows project information.
  uuid        [menu] Generates the image persistent UUID.
  volume      [menu] Adds/removes volume entries to/from the image configuration.

Flags:
  -h, --help   help for config

Global Flags:
  -w, --working-dir string   Sets the image working directory. (default ".")

Use "vhc image config [command] --help" for more information about a command.
```

The `set-info` menu has already been described in some detail in the simple template example, but the advanced Docker build options deserve their own tutorial.

This section presents a set of tutorials that introduce advanced image configuration options.
