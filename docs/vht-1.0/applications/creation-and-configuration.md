---
icon: lucide/file-text
---

# Application Creation and Configuration

Applications are bundles of one or more images along with signed meta-data that can be used to authenticate and control the instantiation of the images on a VeeaHub.

!!! info
    In this tutorial you will learn:

    *   How to create an application

    *   How to add images to an application

    *   How to specify target platforms for an application

    *   How to create and edit a Swarm service file
    

## Structuring an Application

Applications exist to bundle one or more Docker images. These images can each provide a different service, or they can be different builds of the same service for different architectures. The recommended layout of an application is:

```text
my_app/
   my_service1/
   my_service2/
   .
   .
   my_serviceN/
```

These services can be part of the same code repository or the application can pull together services from different repositories (i.e., git submodules).

## Creating an Application

Use the `vhc app create` command to create a bare application. Calling the command without any flags enter interactive mode, where you can enter the application name and version.

```console
$ mkdir my_app
$ cd my_app
Application name: MyApp
Application version: 1.2.3
```

You can also specify the name and version directly using the `--name` and `--version` flags:

```console
$ vhc app create --name MyApp --version 1.2.3
```

You can view the contents of the newly created application using the `vhc app config show` command:

```console
$ vhc app config show
pkg: MyApp
pkg_info:
  version: 1.2.3
```

## Configuring an Application

### Adding Images

An application without images is not very interesting, so the next step is to add some.

If you already have an instance of the `vh_dbus` template, you can use that directly. If not, run `vhc image create template vh_dbus` to create one.

Next, add this image to the application using the `vhc app config add-image` command. The single argument to the command is the directory of the `vh_dbus` template.

```console
$ vhc app config add-image vh_dbus
Adding container: vh_dbus arm32v7 vh_dbus
Adding architecture to container: vh_dbus arm64v8 vh_dbus
```

As you can see, both the `arm32v7` and `arm64v8` architectures were added. You can verify this by running the `show` command again:

```console
$ vhc app config show
pkg: MyApp
pkg_info:
  containers:
  - name: vh_dbus
    path: vh_dbus
    architectures:
    - arm32v7
    - arm64v8
  version: 1.2.3
```

### Selecting Individual Architectures

!!! warning
    If you have an image that is only supported for a single architecture, then you need to specify the `--arch` flag for that architecture. If you don’t you get something like this:

```console
$ vhc app config add-image my_app
ERROR! architecture not found: arm32v7 [arm64v8]
```

You can prevent both architectures from being added by explicitly choosing an architecture using the `--arch` flag:

```console
$ vhc app config add-image --arch arm32v7 vh_dbus
Adding container: vh_dbus arm32v7 vh_dbus
```

If you decide to add the other architecture later, you can re-run the command with the other architecture:

```console
$ vhc app config add-image --arch arm64v8 vh_dbus
Adding architecture to container: vh_dbus arm64v8 vh_dbus
```

### Renaming an Image

By default, the image name in the application will be the same as the image name in the image configuration (not the directory name). If you have multiple images that have the same name, or you prefer to change the name of an image that you didn’t create, then you can override the name using the `--name` flag:

```console
$ vhc app config add-image --name MyImage vh_dbus
Adding container: MyImage arm32v7 vh_dbus
Adding architecture to container: MyImage arm64v8 vh_dbus
```

!!! warning
    Two containers inside an application can’t have the same name. If you encounter this situation, you will need to use the `--name` flag to rename at one of them.

Use the `show` command to display the results:

```console
$ vhc app config show
pkg: MyApp
pkg_info:
  containers:
  - name: MyImage
    path: vh_dbus
    architectures:
    - arm32v7
    - arm64v8
  version: 1.2.3
```

### Removing an Image

You can remove an image from an application using the `vhc app config remove-image` command:

```console
$ vhc app config add-image vh_dbus
Adding container: vh_dbus arm32v7 vh_dbus
Adding architecture to container: vh_dbus arm64v8 vh_dbus
```

The single argument is the name of the image as displayed using the `show` command.

The default behavior is to remove the image for all architectures. To remove a specific architecture instance, you can use the same `--arch` flag as the `add-image` command.
