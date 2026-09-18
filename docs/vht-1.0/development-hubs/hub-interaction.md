---
icon: lucide/file-text
---

# Development VeeaHub Interaction

The `vhc` tool can be used to interact with configured VeeaHubs by using the set of commands under `vhc hub access`.

```console
$ vhc hub access --help
Commands to interact with VeeaHubs.

Usage:
  vhc hub access [flags]
  vhc hub access [command]

Available Commands:
  get-info          Returns hub software information.
  get-licenses      Displays the licenses on a hub.
  get-partner-id    Gets the partner ID
  ping              Pings the hub specified by serial number or Ipv4 address.
  reboot            Reboots the VeeaHub.
  shell             Specify command to be remotely executed (requires a public key).
  upload-app        Uploads an app to the hub via push.
  upload-image      Uploads an image to the hub via push.
  upload-license    Uploads a license to a hub.
  upload-public-key Uploads a public key to enable remote hub shell commands.

Flags:
  -h, --help            help for access
  -H, --hub-id string   Specifies the hub ID. Required for most commands.

Use "vhc hub access [command] --help" for more information about a command.
```

## Verifying Correct VeeaHub Configuration

```console
$ vhc hub access --hub-id vhc25 ping
Pinging C25CTW00000000001567:9000 (ping)...
Located hub 192.168.10.176 via IP address.
Success
```

If an active VeeaHub is set, then the `--hub-id` flag can be omitted.

```console
$ vhc hub access ping
Pinging C25CTW00000000001567:9000 (ping)...
Located hub 192.168.10.176 via IP address.
Success
```

## Retrieving VeeaHub Platform Information

```console
$ vhc hub access get-info 
Retrieving software information from C25CTW00000000001567:9000 (software/info)...
{
  "build_time": "April 02, 2023 01:42:07",
  "running_system": "Preferred system (A/B)",
  "version": "2.29.1-7.7.gce8afbdb+jsienicki.20230402.092006"
}
```

## Using the Veea Shell

Note: The Veea Shell is replacing the functionality of attaching to STDIO. The deprecated information can be found on the Creating and Running Containers page, under the Attaching to STDIO heading.

### Uploading an SSH public key

To use VSH, a public key must be uploaded to the VeeaHub. Using a public/private key pair allows access to the Veea Shell without the need for a username and password. If you don't have a public key, one can be generated using a tool such as ssh-keygen.

!!! warning
    If you choose to enter a passphrase when creating a key-pair, you will be prompted to enter it for every shell operation.

To upload your public key, run:

```console
$ vhc hub access upload-public-key ~/.ssh/id_rsa.pub 
File exists:/home/joeuser/.ssh/id_rsa.pub
Setting Ssh Public Key for file [/home/joeuser/.ssh/id_rsa.pub] on C25CTW00000000001567:9000 (hub/sshkey)...
####################################################################################################### 100.0
```

### Using the Veea Shell in Interactive Mode

Interactive mode provides an environment for running commands that also supports tab completion and command history (up arrow). Interactive mode is entered by running the `vhc hub access shell` command with no additional arguments.

```console
$ vhc hub access shell

                  **      **   ********  **      **
                 /**     /**  **//////  /**     /**
                 /**     /** /**        /**     /**
                 //**    **  /********* /**********
                  //**  **   ////////** /**//////**
                   //****           /** /**     /**
                    //**      ********  /**     /**
                     //      ////////   //      //

    Welcome to the Veea shell.   Type help or ? to list commands.
            
[VHC25000001567-FFFFFFFF] 
```

You can get a list of top-level commands using the `help` command:

```text
[VHC25000001567-FFFFFFFF] help

Commands to interact with Docker, manage logging, display system information, and reboot the VeeaHub.

Available Commands:
  docker       [menu] Manage Docker containers, images, and volumes
  exit         Exit the VeeaHub Shell
  help         Provide help for VHC top-level commands
  info         Display system info
  licenses     Display active VeeaHub licenses
  logging      [menu] Manage logfiles and servers
  partnerid    Display the active Partner ID
  quit         Exit the shell
  reboot       Reboot the VeeaHub

Flags:
  --help       display command help

Use "[command] --help" for more information about a command.

[VHC25000001567-FFFFFFFF] 
```

!!! info
    It is also possible to access the VeeaHub Shell using the `ssh` utility:

    `$ ssh -p 9010 vhc@<hub-ip-address>`

    If your private key is not the default of `~/.ssh/id_rsa`, then you will need to specify the file:

    `ssh -p 9010 -i <path-to-identity-file> vhc@<hub-ip-address>`

## Command Overview

The `docker` commands are used to work with Docker images, containers, and volumes.

The `exit` and `quit` commands are used to exit the shell. Hitting `ctrl-d` has the same effect.

The `help` command is used to display the top-level help information.

The `info` command is used to display system information (similar to the `vhc hub access get-info` command.

The `licenses` command is used to display all licenses installed on the VeeaHub.

The `logging` commands are used to enable and disable logging to a logfile or to a remote server.

The `partnerid` command is used to display the Partner ID (similar to the `vhc hub access get-partner-id` command).

The `reboot` command is used to reboot the VeeaHub (similar to the `vhc hub access reboot` command).

## Using the Veea Shell in Command Mode

You can also run individual shell commands by using the `--command` flag as show below.

```console
$ vhc hub access shell --command "help"

Commands to interact with Docker, manage logging, display system information, and reboot the VeeaHub.

Available Commands:
  docker       [menu] Manage Docker containers, images, and volumes
  exit         Exit the VeeaHub Shell
  help         Provide help for VHC top-level commands
  info         Display system info
  licenses     Display active VeeaHub licenses
  logging      [menu] Manage logfiles and servers
  partnerid    Display the active Partner ID
  quit         Exit the shell
  reboot       Reboot the VeeaHub

Flags:
  --help       display command help

Use "[command] --help" for more information about a command.
```
