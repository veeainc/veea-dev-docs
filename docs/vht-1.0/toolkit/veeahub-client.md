---
icon: lucide/file-text
---

# The VeeaHub Client (VHC)

After installing the VeeaHub Toolkit (VHT), you can run the VeeaHub Client (VHC) utility. The first time this command is run you will be prompted to enter some information about yourself and your company.

```console
$ vhc
Welcome to the VeeaHub Client.  Please fill in some basic information to get started.
Developer name: Joe Developer
Developer email: joe@developer.com
Company address: Address of Joe
Company URL: http://joe.developer

                            VeeaHub Client

                  **      **  **      **    ******
                 /**     /** /**     /**   **////**
                 /**     /** /**     /**  **    //
                 //**    **  /********** /**
                  //**  **   /**//////** /**
                   //****    /**     /** //**    **
                    //**     /**     /**  //******
                     //      //      //    //////

  Using vhc you can easily create new applications for the VeeaHub.

Usage:
  vhc [command]

Available Commands:
  app         [menu] Manage applications, which are collections of images.
  example     [menu] Use example image templates and assets.
  help        Help about any command
  hub         [menu] Commands to configure and interact with VeeaHubs.
  image       [menu] Create, configure, and display images.
  partner     [menu] Configure and display partner information.
  version     Print out the version of vhc.

Flags:
  -h, --help   help for vhc

Use "vhc [command] --help" for more information about a command.
```

The information is stored in a new configuration file called `~/.vhc/user-config.yaml`. If you check the contents of this file, it should contain the information that was entered as well as some auto-generated content.

```console
$ cat ~/.vhc/user-config.yaml 
vendor:
  address: Address of Joe
  email: joe@developer.com
  name: Joe Developer
  uri: http://joe.developer
  uuid: 81E3FECC-2E56-4256-828F-99DA7BE4D1F1
version: 3
```

You can also view the configure by running the `vhc partner config show` command:

```console
$ vhc partner config show
address: Address of Joe
email: joe@developer.com
name: Joe Developer
uri: http://joe.developer
uuid: 81E3FECC-2E56-4256-828F-99DA7BE4D1F1
```

## Commands

The `vhc help` command provides usage information:

```console
$ vhc help

                            VeeaHub Client

                  **      **  **      **    ******
                 /**     /** /**     /**   **////**
                 /**     /** /**     /**  **    //
                 //**    **  /********** /**
                  //**  **   /**//////** /**
                   //****    /**     /** //**    **
                    //**     /**     /**  //******
                     //      //      //    //////

  Using vhc you can easily create new applications for the VeeaHub.

Usage:
  vhc [command]

Available Commands:
  app         [menu] Manage applications, which are collections of images.
  example     [menu] Use example image templates and assets.
  help        Help about any command
  hub         [menu] Commands to configure and interact with VeeaHubs.
  image       [menu] Create, configure, and display images.
  partner     [menu] Configure and display partner information.
  version     Print out the version of vhc.

Flags:
  -h, --help   help for vhc

Use "vhc [command] --help" for more information about a command.
```

The `Available Commands` section shows the list of top-level commands. The term `[menu]` in the description of a command means that there are sub-commands associated with the command.

## Command Flags

The `Flags` section shows the list of optional flags that can be used for the commands. For example, running `vhc version --help` produce help for the `version` command:

```console
$ vhc version --help
Print out the version of vhc.

Usage:
  vhc version [flags]

Flags:
  -h, --help   help for version
```

Some flags are used to enable/disable optional functionality. For example, the `--help` flag does not require any additional information.

Other flags are used to specify values, and therefore require additional information after the flag name. For example, the `--hub-id` flag requires a hub identifier:

```console
$ vhc hub access ping --hub-id my-veeahub
```

For some commands there are Global Flags. Theses are flags that apply to the command and all of its sub-commands. For example, the `vhc hub access` commands all accept a `--hub-id` flag. Asking for help on any of the sub-commands shows `--hub-id` as a Global Flag.

```console
$ vhc hub access ping --help
Pings the hub specified by serial number or Ipv4 address.

Usage:
  vhc hub access ping [flags]

Examples:
  vhc hub access ping --hub-id my-vhc25

Flags:
  -h, --help   help for ping

Global Flags:
  -H, --hub-id string   Specifies the hub ID. Required for most commands.
```

## Tab Completion

If you’ve ever used the `bash` shell on Linux, you probably have experience with tab completion of commands. If you type the first few characters of a command and then hit the tab key, the command will be automatically completed. If the letters you typed are not unique, it will automatically complete as much as it can, but then you need to type more characters to disambiguate it.

The `vhc` utility supports the same type of tab completion. Just type the first few characters of a command or flag, and `vhc` will automatically complete it.

Tab completion also works for values. For example, the `vhc hub config upload-public-key` command requires a public key filename. Tab completion can be used to suggest possible files to use.

Flags with values also support tab completion. For example, the `--hub-id` flag takes a VeeaHub identifier as an argument. You only need to type a few characters and then hit tab to fill in the value.

It is also possible to hit tab before typing any command or flag characters. For example, typing the command and flag below and hitting the tab key twice produces a list of VeeaHubs:

```console
$ vhc hub access ping --hub-id 
vhc05            vhc25            vhe09            vhe10   
```

Type some of the characters for one of the values and hit the tab key again to select it.

If there is only one possible value, hitting the tab key will result in that value being selected without having to type any characters.

!!! warning
    If you have just installed the VHT and tab completion is not working, try running:

    `. /etc/bash_completion.d/vhc`

    This should run the tab completion script in your shell.

Required flags are always shown. Optional flags are only shown if you put a dash first.  For example, to see the `--command` flag for the `vhc hub access shell` command, you need to do:

`vhc hub access shell -` then hit `<tab>`

An example of a command with required flags is `vhc hub config add-hub`.  If you hit tab after the command you will see the required flags `--ip-addr` and `--serial-number`.

## New Version Check

The `vhc` app will check for a new version whenever:

*   The `vhc version` command is run
    
*   Once a day when any command is run
