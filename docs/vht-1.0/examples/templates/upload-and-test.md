---
icon: lucide/file-text
---

# Template Upload and Test

!!! note
    For a concise flow covering hub mode checks, SSH shell setup, and post-deploy HTTP verification, see the [Quickstart](../../quickstart.md).

Once you have an image that has been built and saved, you can move on to testing that image on a VeeaHub that has been set up for application development.

## Uploading the Image Archive

The first step is to upload the image archive to the VeeaHub.

```console
$ vhc hub access upload-image build/unauth/arm32v7/vh_dbus-arm32v7\:1.0.1.unsigned.tar 
Creating image push for file [build/unauth/arm32v7/vh_dbus-arm32v7:1.0.1.unsigned.tar] on C25CTW00000000001567:9000 (images/push)...
#################################################################################################################################################### 100.0%
```

The next step is to log into the Veea Shell using the `vhc hub access shell` command.

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

## Listing Images

You can verify that the image archive was uploaded and imported successfully using the `docker image ls` command.

```text
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY                        | TAG      | ID             | P-UUID                                 | CREATED             | SIZE      
vh_dbus-arm32v7                   | 1.0.1    | a5f77d7d8b6f   | FFFFFFFF-2996-4A15-9C64-8DBFDC01B87D   | 6 minutes ago       | 64.40MB   
[VHC25000001567-FFFFFFFF] 
```

Upon upload, each image is assigned a name, a tag (which also functions as the version), and an ID, as detailed in the listing above. If you rebuild and re-upload an image without changing its version, a new entry with the same tag but a new ID will be created. This ID is actually part of the 64 byte SHA256 digest of the image’s configuration and layers. The older image will no longer have a valid version tag and instead the tag will be seen as ‘<none>’ like in the example below. An image that has a tag other than ‘<none>’ is always the most recently uploaded image.

```text
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY        | TAG      | ID             | P-UUID                                 | CREATED        | SIZE     
vh_dbus-arm32v7   | 1.0.1    | c005fa16fe31   | FFFFFFFF-2996-4A15-9C64-8DBFDC01B87D   | 14 hours ago   | 64.40MB  
<none>            | <none>   | a5f77d7d8b6f   | FFFFFFFF-2996-4A15-9C64-8DBFDC01B87D   | 17 hours ago   | 64.40MB  
[VHC25000001567-FFFFFFFF]
```

### Creating a Container

The `docker image` commands can be used to work with images such as creating a container as show below.

!!! info
    Images can be referenced by their name, tag and ID (e.g., `vh_dbus:1.0.1:c005fa16fe31`) or the full SHA256 digest ID (e.g., `sha256:c005fa16fe311880a84e27e8d55793b4d0bc0bd7c9718f401528fd26990db75b`).

```text
[VHC25000001567-FFFFFFFF] docker image create vh_dbus:1.0.1:c005fa16fe31 --detach
9cc5dca4d03ef3bdcc613bfea5ff5b82284339a7d16ad4a32ade587d3e6b6db5
[VHC25000001567-FFFFFFFF]
```

The `docker image` command takes the image name:tag:ID or full SHA256 digest ID as the first argument, followed by the sub-command (e.g., `create`). Tab completion can be used to suggest or complete image names, tag and IDs.

For the create command the `--detach` flag tells Docker to detach the container. The VeeaHub does not support attached containers without special licenses, so `--detach` should almost always be used.

!!! warning
    If you see this error message:

    `Error response from daemon: params.Config.AttachStdout is not supported`

    It means that you forgot to use the `--detach` flag with the `create` command.

If you would like to have the container start automatically when the VeeaHub reboots, then you can use the `--restart-policy` flag. This flag takes one argument with possible values:

*   `no` - Do not restart the container.
    
*   `unless-stopped` - Restart the container unless it has be explicitly stopped.
    
*   `always` - Always restart the container.
    

!!! info
    You can use tab-completion to choose the image name. If you type in the first couple of characters in the name and then hit `<tab>`, you would see a name such as

    `vh_dbus:1.0.1:c005fa16fe31`

    This is a concatenation of the name, the tag and the Image ID. This is done to disambiguate in the case where there are multiple instances of the same image.

    This concept also applies to container names and Container IDs.

!!! warning
    If you see this message:

    `Invalid or ambiguous image ID, UUID, or name specified`

    It means that you need to disambiguate the name by specifying part of the ID (as explained above).

## Listing Containers

You can verify that the container was created successfully using the `docker container ls --all` command which lists all containers running or not.

```text
[VHC25000001567-FFFFFFFF] docker container ls --all
ID             | P-UUID                                 | NAME                     | STATUS                         | IMAGE          | CREATED              | PORTS  
9cc5dca4d03e   | FFFFFFFF-2996-4A15-9C64-8DBFDC01B87D   | vh_dbus                  | Created                        | a5f77d7d       | About a minute ago   |        
[VHC25000001567-FFFFFFFF] 
```

### Starting a Container

The `docker container` commands can be used to work with containers as show below.

```text
[VHC25000001567-FFFFFFFF] docker container start vh_dbus:9cc5dca4
9cc5dca4d03ef3bdcc613bfea5ff5b82284339a7d16ad4a32ade587d3e6b6db5
[VHC25000001567-FFFFFFFF]
```

!!! info
    As with images, you can always use tab complete to suggest or complete container names and IDs.

### Viewing Container Logs

The `logging` commands can be used to work with container logs. You can stream logs to a remote `syslog-ng` server using `logging server` commands or view logs directly on the VeeaHub using `logging logfile` commands. The logfile commands are simpler, so those are show below.

```text
[VHC25000001567-FFFFFFFF] logging logfile enable
[VHC25000001567-FFFFFFFF] logging logfile stream
2023-04-05T18:00:38.873+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: io.veea.VeeaHub.Info.SerialNumberDecode:
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: {  'country_of_origin': 'Taiwan',
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'hardware_revision': 'C',
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'model': 'C25',
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'serial_number': 'C25CTW00000000001567',
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'sku': 'W000',
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'unique_id': '000001567'}
2023-04-05T18:00:38.874+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: Sleeping for 5 seconds...
2023-04-05T18:00:43.902+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: io.veea.VeeaHub.Info.SerialNumberDecode:
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: {  'country_of_origin': 'Taiwan',
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'hardware_revision': 'C',
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'model': 'C25',
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'serial_number': 'C25CTW00000000001567',
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'sku': 'W000',
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]:    'unique_id': '000001567'}
2023-04-05T18:00:43.903+00:00 C25CTW00000000001567 b98ec86a79ba/vh_dbus-1.0.1[10576]: Sleeping for 5 seconds...
```

The `logging logfile enable` command enables container logfile logging.

The `logging logfile stream` command performs the equivalent of a `tail -F` command.

The complete logs can be viewed using `logging logfile display` (not shown).

!!! warning
    Logging must be enabled before a container is started or the logs with not be available to the `stream` or `display` commands.

### Getting a Container Shell

```text
[VHC25000001567-FFFFFFFF] docker container exec vh_dbus:9cc5dca4
/app $
```

!!! info
    Remember you can always use tab complete to suggest or complete container names and IDs.

As with most Linux shells, up-arrow command history and tab completion should work. Some sample shell commands are show below.

```text
/app $ ls
dbus.py
/app $ 
```

```text
/app $ ps
PID   USER     TIME  COMMAND
    1 u7777775  0:05 python3 -u ./dbus.py
    9 u7777775  0:00 /bin/sh
   16 u7777775  0:00 ps
/app $
```

To exit a container shell, use `ctrl-d` or type `exit`.

```text
/app $ exit
[VHC25000001567-FFFFFFFF]
```

## Stopping a Container

```text
[VHC25000001567-FFFFFFFF] docker container stop vh_dbus:9cc5dca4
9b55151236b72d3678d5dc2070a7a755d88de9c596efea9b14ff51a92c083753
[VHC25000001567-FFFFFFFF]
```

## Deleting a Container

```text
[VHC25000001567-FFFFFFFF] docker container rm vh_dbus:9cc5dca4
9b55151236b72d3678d5dc2070a7a755d88de9c596efea9b14ff51a92c083753
[VHC25000001567-FFFFFFFF]
```

## Deleting an Image

```text
[VHC25000001567-FFFFFFFF] docker image rm vh_dbus:1.0.1:c005fa16fe31
Untagged: vh_dbus-arm32v7:1.0.1
Deleted: sha256:af9cf2ec79df76c3ca00b636aed8782bcecbdfe075454d2c3f362c35ebb8ebf6
Deleted: sha256:b09d3a0b4ba0fe470912d53a87c9b0292720d565b98f84d5f1ff82f0b1a33bf0
Deleted: sha256:3b2a43a29f5104f166e324943328bd69563db4ac8626b0dbf60f04c50aef23bb
Deleted: sha256:c7dd597b82a0eaef170721242f2cb7c6460a416b136b2ab9df0fb9347a3ca8d0
Deleted: sha256:7c3b23d01a6c22c3befca139ab0976a7b6330594f533e8e33d9667843f8f075a
Deleted: sha256:799aa7236df0e1cabc347acc529c915cfb9f05432f8799255345fda5f6d51ec0
[VHC25000001567-FFFFFFFF]
```
