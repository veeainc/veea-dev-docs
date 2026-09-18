---
icon: lucide/file-text
---

# Image Release Archives

There is one additional step beyond signing an image that is needed to release the image – creating an **Image Release Archive**.

!!! info
    In this tutorial you will learn:

    *   How to create an image release archive

    *   The contents of an image release archive
    

## Creating an Image Release Archive

A release image is created using the `vhc image build release` command:

```console
$ vhc image build release --arch arm32v7
Releasing arm32v7
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
No need to re-save image archive.....skipping
No need to re-sign image archive.....skipping
Generating: /home/joeuser/vh_dbus/build/swarm.conf
Building metadata: vh_dbus arm32v7
Releasing:  vh_dbus arm32v7
  Reading metadata: vh_dbus arm32v7
  Reading manifest: vh_dbus arm32v7
  Creating metadata CMS: vh_dbus arm32v7
  Enter Keycloak Username [joe@user.com]: 
  Enter Keycloak Password: 
  Signing metadata
  Creating release archive: vh_dbus arm32v7
Release complete: /home/joeuser/vh_dbus/build/auth/arm32v7/vh_dbus-arm32v7-release-1.0.1.tgz
```

## Anatomy of an Image Release Archive

\[FIXME - we might want to move this to the tutorial on signed images and extend that to include releases\]

```console
$ tar tf build/auth/arm32v7/vh_dbus-arm32v7-release-1.0.1.tgz 
containers/
containers/config/
containers/config/00000000-BA5E-5EED-C0DE-000000000003/
containers/config/00000000-BA5E-5EED-C0DE-000000000003/services/
containers/config/00000000-BA5E-5EED-C0DE-000000000003/services/00000033-A180-4F25-B6F9-F9439C533890.conf
containers/images/
containers/images/31E85B60-6717-4060-AE17-9E3897DF6F0A.tgz
containers/metadata/
containers/metadata/F31AB2E5-107C-4FD1-AD2A-1FBC213CCD1D.cms
```

The image release archive is composed of:

*   An image archive (.tgz file)
    
*   A Swarm service file (.conf file) used to orchestrate the image
    
*   Signed meta-data (.cms file) used to authenticate the image
    

### Swarm Service Files

Veea uses Swarm service files to tell Secure Docker where and how to run images. All released images must have an associated Swarm service file. You can find more information about swarm in the https://docs.docker.com/engine/swarm/, but it is not necessary to be a Swarm expert to provide the service file. In fact, VHC will automatically generate a Swarm service file based on the image configuration. This auto-generated service file, which is generated as part of the `vhc image build release` command, should be sufficient for most images.

Below is a Swarm service file for the simple `vh_dbus` image that can run on an MEN or MN:

```console
$ cat build/swarm.conf 
docker:
    service:
        vh_dbus:
            tag: 1.0.1
            repo: ''
            name: vh_dbus1.0.1
            mode: replicated
            args:
                --replicas 1
```

### Node Constraints

If the example is modified to only result on an MEN, then the resulting service file looks like:

```console
$ cat build/swarm.conf 
docker:
    service:
        vh_dbus:
            tag: 1.0.1
            repo: ''
            name: vh_dbus1.0.1
            mode: replicated
            args:
                --replicas 1
                --constraint node.hostname==${HOSTNAME}
```

One additional line has been added to constrain the image to only run when `node.hostname==${HOSTNAME}`.

Conversely, if the example is constrained to only run on an MN, then the resulting service file looks like:

```console
$ cat build/swarm.conf 
docker:
    service:
        vh_dbus:
            tag: 1.0.1
            repo: ''
            name: vh_dbus1.0.1
            mode: replicated
            args:
                --replicas 1
                --constraint node.hostname!=${HOSTNAME}
```

The difference is the constraint, which is now `node.hostname!=${HOSTNAME}`.

### Published Ports

Things get more interesting when published ports are added to an image. This is best shown using the `vh_golang_web` example:

```console
$ cat build/swarm.conf 
docker:
    service:
        vh_golang_web:
            tag: 1.0.0
            repo: ''
            name: vh_golang_web1.0.0
            mode: replicated
            args:
                --replicas 1
                --constraint node.hostname==${HOSTNAME}
                --publish mode=host,target=9500,published=9500,protocol=tcp
```

A new line has appeared to publish the exposed port:

`--publish mode=host,target=9500,published=9500,protocol=tcp`

### Customization

Users can create their own Swarm service files, either from scratch or from the auto-generated file. If a file named `swarm.conf` exists in the image directory, then this file will override the auto-generated file.

!!! warning
    Creating a custom Swarm service file is not recommended unless you are an experienced Swarm user. An error in the service file will cause failures when creating and starting containers.

### Signed Meta-Data

The signed meta-data CMS file is generated from the meta-data JSON file in the `build/auth/<arch>` directory. This file should not be modified by developers.
