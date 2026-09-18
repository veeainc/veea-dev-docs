---
icon: lucide/file-text
---

# An Example to Demonstrate Volumes

This tutorial show how to work with persistent volumes (container directories).

!!! info
    In this tutorial you will learn:

    *   How to add a persistent volume to an image

    *   How to use the Veea Shell to export the persistent volume using WebDAV

    *   How to mount the WebDAV-exported volume on an Ubuntu development machine

    *   How to share files between the development machine and the container running on the VeeaHub
    

## Creating

The first step is to create an instance of the `vh_persistent_storage` template.

```console
$ vhc image create template vh_persistent_storage 
2023/04/12 07:58:43 Creating app from template vh_persistent_storage.
Using vh_persistent_storage
2023/04/12 07:58:43 Creating container directory: vh_persistent_storage
2023/04/12 07:58:44 vh_persistent_storage.zip downloaded
2023/04/12 07:58:44 Unzipping...
2023/04/12 07:58:44 Unzipped vh_persistent_storage.zip to vh_persistent_storage
```

You can enter the new directory and list the contents.

```console
$ ls
config.yaml  Dockerfile  README.md  src
```

## Configuring

You can view the image Dockerfile using the `cat` utility.

```text
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2020]
################################################################################

ARG ARCH
FROM $ARCH/alpine:3.9

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

CMD ["./main.sh"]
```

You can also view the config.yaml file.

```console
$ cat config.yaml 
app: vh_persistent_storage
app_info:
  description: Sample container that demonstrates usage of a persistent storage volume
  node_types:
  - MEN
  platforms:
    arm32v7:
    - iesv0.5
    - iesv2.5
    arm64v8:
    - iesv0.9
    - iesv1.0
  version: 1.0.0
docker:
  ports:
    publish: []
  secure:
    arg:
      partner_features: []
    label:
      devices: []
      features:
      - DEVELOPER
      unauth_host: true
      uuid: FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350
      volumes:
        offers: []
        persists:
        - persistent-volume
        requests: []
version: 3
```

The interesting part of the config file is the section under `docker` called `volumes`.

```yaml
volumes:
        offers: []
        persists:
        - persistent-volume
        requests: []
```

This indicates that the image is requesting that Docker create a single persistent volume called `persistent-volume`.

## Building

```console
$ vhc image build save --arch arm32v7 --unauth
Saving arm32v7
Generating: /home/joeuser/vh_persistent_storage/build/unauth/Dockerfile
Compiling image: vh_persistent_storage arm32v7
docker build  --build-arg ARCH=arm32v7 -t vh_persistent_storage-arm32v7:1.0.0 -f /home/joeuser/vh_persistent_storage/build/unauth/Dockerfile /home/joeuser/vh_persistent_storage
Sending build context to Docker daemon   25.6kB
Step 1/17 : ARG ARCH
Step 2/17 : FROM $ARCH/alpine:3.9
 ---> 9df0ff5446fc
Step 3/17 : RUN mkdir /app
 ---> Using cache
 ---> a0f644420b71
Step 4/17 : COPY src/ /app/
 ---> 0e8acb5f269d
Step 5/17 : WORKDIR /app
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 50b46eaf3cc2
Removing intermediate container 50b46eaf3cc2
 ---> 91abd9696fc9
Step 6/17 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 534cb64514b7
Removing intermediate container 534cb64514b7
 ---> ede74266e3b9
Step 7/17 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a45f3f28b7c8
Removing intermediate container a45f3f28b7c8
 ---> b7f9b10bc370
Step 8/17 : LABEL com.veea.vhc.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e13b2e030d60
Removing intermediate container e13b2e030d60
 ---> dd11dfc540ba
Step 9/17 : LABEL com.veea.vhc.app.name="vh_persistent_storage"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in c42f7077bb0e
Removing intermediate container c42f7077bb0e
 ---> f9d9e622bd07
Step 10/17 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in bb0c74c2f693
Removing intermediate container bb0c74c2f693
 ---> e5949b71a08c
Step 11/17 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in fbd9e8c8c30c
Removing intermediate container fbd9e8c8c30c
 ---> f34dbd5bea17
Step 12/17 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 473bfeddbfbe
Removing intermediate container 473bfeddbfbe
 ---> 2b3d5ede2975
Step 13/17 : LABEL com.veea.image.persistent_uuid="FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 46e9a2e7bb73
Removing intermediate container 46e9a2e7bb73
 ---> a12628ef05d3
Step 14/17 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="false"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 5676f5a215eb
Removing intermediate container 5676f5a215eb
 ---> f34fca065f65
Step 15/17 : LABEL com.veea.authorisation.feature1="DEVELOPER"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 49bf61aa8058
Removing intermediate container 49bf61aa8058
 ---> efce97c260ee
Step 16/17 : LABEL com.veea.authorisation.volumes.persist1="persistent-volume"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a2eeabdb98d1
Removing intermediate container a2eeabdb98d1
 ---> fcc6b28463c9
Step 17/17 : CMD ["./main.sh"]
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4d9f0dcfe83a
Removing intermediate container 4d9f0dcfe83a
 ---> b6c601652b05
Successfully built b6c601652b05
Successfully tagged vh_persistent_storage-arm32v7:1.0.0
Pruning any dangling instances of the same image
Saving: vh_persistent_storage arm32v7
  Writing vh_persistent_storage-arm32v7:1.0.0.unsigned.tar
```

## Running

### Uploading

Use the `vhc hub access upload-image` command to upload the image archive.

```console
$ vhc hub access upload-image build/unauth/arm32v7/vh_persistent_storage-arm32v7\:1.0.0.unsigned.tar 
Creating image push for file [build/unauth/arm32v7/vh_persistent_storage-arm32v7:1.0.0.unsigned.tar] on C25CTW00000000001567:9000 (images/push)...
##################################################################################################################################### 100.0%
```

Next, login to the Veea Shell using the `vhc hub access shell` command.

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

You can verify that the image was imported by using the `docker image ls` command.

```text
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY                      | TAG     | ID             | P-UUID                                 | CREATED          | SIZE     
vh_persistent_storage-arm32v7   | 1.0.0   | 272850b4b1d2   | FFFFFFFF-F9DE-4663-B68E-6AC14F429805   | 45 minutes ago   | 59.09MB  
[VHC25000001567-FFFFFFFF] 
```

### Create the Container

```text
[VHC25000001567-FFFFFFFF] docker image create --detach vh_persistent_storage:1.0.0:272850b4
4789cc41e2dcd50c3f8e6a01c21c7b5bb91b9ed01aaf70c9f4d40f3110199853
[VHC25000001567-FFFFFFFF] 
```

### Start the Container

```text
[VHC25000001567-FFFFFFFF] docker container start vh_persistent_storage:4789cc41
4789cc41e2dcd50c3f8e6a01c21c7b5bb91b9ed01aaf70c9f4d40f3110199853
[VHC25000001567-FFFFFFFF] 
```

## Exporting the Persistent Volume

### List the Persistent Volumes

```text
[VHC25000001567-FFFFFFFF] docker volume ls
Volume                                                           | Port 
persistent-volume:FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350           |       
[VHC25000001567-FFFFFFFF] 
```

The `persistent-volume` volume is shown prefixed with the image persistent UUID. Only persistent volumes matching the partner ID (FFFFFFFF in this case) will be show.

You can find the volumes in the container by running:

```text
[VHC25000001567-FFFFFFFF] docker container exec vh_persistent_storage:4789cc41 /bin/sh
/app $ ls /var/lib/veea
_backup_restore    persistent-volume
/app $ 
```

All persistent volumes are in `/var/lib/veea`.

The `_backup_restore` directory will be explained in the tutorial on Backup and Restore.

### Export the Volume

This volume can be exported via WebDAV using:

```text
[VHC25000001567-FFFFFFFF] docker volume export persistent-volume:FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350
Volume exported on https://<ip-address>:9002
[VHC25000001567-FFFFFFFF] 
```

The output message indicates that the volume is mounted on port 9002. This will be important to remember when mounting the volume on the development machine.

If you run the `docker volume ls` command, you can see that the WebDAV port now appears.

```text
[VHC25000001567-FFFFFFFF] docker volume ls
Volume                                                           | Port 
persistent-volume:FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350           | 9002    
[VHC25000001567-FFFFFFFF] 
```

### Mount the Volume

On the development Ubuntu machine, run:

```console
$ sudo mount -t davfs https://192.168.10.176:9002 /mnt
Please enter the username to authenticate with server
https://192.168.10.176:9002 or hit enter for none.
  Username: 
Please enter the password to authenticate user  with server
https://192.168.10.176:9002 or hit enter for none.
  Password:  
/sbin/mount.davfs: the server certificate does not match the server name
/sbin/mount.davfs: the server certificate is not trusted
  issuer:      0, Veea Inc
  subject:     0, Veea Inc
  identity:    C25CTW00000000001567.devices.veea.io
  fingerprint: 4b:28:a8:78:a1:b1:a8:e6:5c:15:59:b1:e2:04:7a:ce:85:c8:fe:40
You only should accept this certificate, if you can
verify the fingerprint! The server might be faked
or there might be a man-in-the-middle-attack.
Accept certificate for this session? [y,N] y
/sbin/mount.davfs: warning: the server does not support locks
```

This will mount the persistent volume in `/mnt`.

!!! warning
    If the mount fails with the following message:

    `mount: /mnt: unknown filesystem type 'davfs'.`

    then you need to install the `davfs2` package using:

    `sudo apt-get install davfs2`

Create a file using:

```console
$ sudo touch /mnt/my-file
[sudo] password for joeuser: 
$ ls /mnt
lost+found  my-file
```

Make sure that the buffers are flushed using:

```console
$ sync; sync
```

### Verifying the File

In the Veea Shell, run:

```text
[VHC25000001567-FFFFFFFF] docker container exec vh_persistent_storage:4789cc41 /bin/sh
/app $ 
```

This will bring you into a container shell.

You can verify that the file exists using:

```text
/app $ ls /var/lib/veea/persistent-volume/
my-file
/app $ 
```

### Unmount the Volume

On the development machine run:

```console
$ sudo umount /mnt
/sbin/umount.davfs: waiting while mount.davfs (pid 25501) synchronizes the cache .. OK
```

### Unexport the Volume

In the Veea Shell run:

```text
[VHC25000001567-FFFFFFFF] docker volume unexport persistent-volume:FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350
[VHC25000001567-FFFFFFFF]
```

Verify that the volume is no longer exported.

```text
[VHC25000001567-FFFFFFFF] docker volume ls
Volume                                                           | Port 
persistent-volume:FFFFFFFF-DEC0-46D8-8D0B-3509FFA73350           |      
my_volume:FFFFFFFF-A180-4F25-B6F9-F9439C533890                   |      
[VHC25000001567-FFFFFFFF]
```
