---
icon: lucide/file-text
---

# An Example to Demonstrate Container Configuration

This tutorial show how to work with container configuration.

!!! info
    In this tutorial you will learn:

    *   How to use the Veea Shell to export container configuration using WebDAV

    *   How to mount the WebDAV-exported configuration on an Ubuntu development machine

    *   How to share configuration files between the development machine and the container running on the VeeaHub
    

All images on the VeeaHub have access to an image-specific configuration directory that can be populated with files that can be read by your application.

Within the container, the directory is mapped to `/usr/local/config/defaults`. This example presents an application that reads a file from this directory, and also show how to populate this directory from your development machine.

## Creating

The first step is to create an instance of the `vh_config` template.

```console
$ vhc image create template vh_config
Creating image directory vh_config
Downloaded vh_config.zip
Unzipped vh_config.zip into vh_config
```

You can view the Dockerfile using the `cat` utility.

```console
$ cat Dockerfile
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2020]
################################################################################

ARG ARCH
FROM golang:1.8-alpine as build

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

ARG GOARCH
RUN CGO_ENABLED=0 GOOS=linux GOARCH=$GOARCH go build -a -o goapp
FROM $ARCH/busybox

EXPOSE 9500
ENV PORT 9500

WORKDIR /app/bin
COPY --from=build /app/goapp .

CMD ["/app/bin/goapp"]
```

You can also view the `config.yaml` file using `cat`.

```console
$ cat config.yaml 
app: vh_config
app_info:
  description: Sample golang web server that demostrates using the configuration volume
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
  build_opts_arm32v7: --build-arg GOARCH=arm
  build_opts_arm64v8: --build-arg GOARCH=arm64
  ports:
    publish:
    - 9500:9500
  secure:
    arg:
      partner_features: []
    label:
      devices: []
      features:
      - DEVELOPER
      unauth_host: true
      uuid: FFFFFFFF-B819-44D0-8AB5-96992EDD8AA5
      volumes:
        offers: []
        persists: []
        requests: []
version: 3
```

Notice the architecture-specific Docker build options.

## Building

```console
$ vhc image build save --arch arm32v7 --unauth
Saving arm32v7
Generating: /home/joeuser/vh_config/build/unauth/Dockerfile
/home/joeuser/vh_config/build/unauth/Dockerfile is newer than the vh_config-arm32v7:1.0.0 docker image.
Compiling image: vh_config arm32v7
docker build  --build-arg ARCH=arm32v7 --build-arg GOARCH=arm -t vh_config-arm32v7:1.0.0 -f /home/joeuser/vh_config/build/unauth/Dockerfile /home/joeuser/vh_config
Sending build context to Docker daemon  26.11kB
Step 1/22 : ARG ARCH GOARCH
Step 2/22 : FROM golang:1.8-alpine as build
 ---> 4cb86d3661bf
Step 3/22 : RUN mkdir /app
 ---> Running in 12882e544a11
Removing intermediate container 12882e544a11
 ---> acc0fe3d4152
Step 4/22 : COPY src/ /app/
 ---> cb145adf4d07
Step 5/22 : WORKDIR /app
 ---> Running in c2d0f1519c11
Removing intermediate container c2d0f1519c11
 ---> f58fed56113e
Step 6/22 : RUN CGO_ENABLED=0 GOOS=linux GOARCH=$GOARCH go build -a -o goapp
 ---> Running in d45a61daad4d
Removing intermediate container d45a61daad4d
 ---> 9f4c060e50a5
Step 7/22 : FROM $ARCH/busybox
 ---> 451d98dc262d
Step 8/22 : EXPOSE 9500
 ---> Using cache
 ---> c4ee5a301f3e
Step 9/22 : ENV PORT 9500
 ---> Using cache
 ---> 594e42562991
Step 10/22 : WORKDIR /app/bin
 ---> Using cache
 ---> 67bcadfe7592
Step 11/22 : COPY --from=build /app/goapp .
 ---> 4abc5875609d
Step 12/22 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in d194f2d98f9b
Removing intermediate container d194f2d98f9b
 ---> e7aad4770de3
Step 13/22 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 0ae26cdd7d14
Removing intermediate container 0ae26cdd7d14
 ---> b275a2e4f830
Step 14/22 : LABEL com.veea.vhc.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7b1182734bc7
Removing intermediate container 7b1182734bc7
 ---> 4bd482243c4c
Step 15/22 : LABEL com.veea.vhc.app.name="vh_config"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7740be9b0b6a
Removing intermediate container 7740be9b0b6a
 ---> bd1a29bbf410
Step 16/22 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 5fbe396ffc76
Removing intermediate container 5fbe396ffc76
 ---> d29ba3d4e635
Step 17/22 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 2054c1077bfd
Removing intermediate container 2054c1077bfd
 ---> defed1c509d6
Step 18/22 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a26c2d297016
Removing intermediate container a26c2d297016
 ---> 32f4fdd9ef2e
Step 19/22 : LABEL com.veea.image.persistent_uuid="FFFFFFFF-B819-44D0-8AB5-96992EDD8AA5"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1aef156296b3
Removing intermediate container 1aef156296b3
 ---> 9bfdc4cddf2b
Step 20/22 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a78c1aebcc76
Removing intermediate container a78c1aebcc76
 ---> 52fb5390265f
Step 21/22 : LABEL com.veea.authorisation.feature1="DEVELOPER"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4df6bff65827
Removing intermediate container 4df6bff65827
 ---> cb7a67c6c50e
Step 22/22 : CMD ["/app/bin/goapp"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in c05b3163889e
Removing intermediate container c05b3163889e
 ---> 2b6636e08a38
Successfully built 2b6636e08a38
Successfully tagged vh_config-arm32v7:1.0.0
Pruning any dangling instances of the same image
Saving: vh_config arm32v7
  Writing vh_config-arm32v7:1.0.0.unsigned.tar
```

## Running

### Uploading

Upload the image archive to the VeeaHub using the `vhc hub access upload-image` command.

```console
$ vhc hub access upload-image build/unauth/arm32v7/vh_config-arm32v7\:1.0.0.unsigned.tar 
Creating image push for file [build/unauth/arm32v7/vh_config-arm32v7:1.0.0.unsigned.tar] on C25CTW00000000001567:9000 (images/push)...
##################################################################################################################################### 100.0%
```

Log into the Veea Shell and check that the image was imported correctly.

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

```text
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY          | TAG     | ID             | P-UUID                                 | CREATED          | SIZE     
vh_config-arm32v7   | 1.0.0   | 272850b4b1d2   | FFFFFFFF-F9DE-4663-B68E-6AC14F429805   | 45 minutes ago   | 59.09MB  
[VHC25000001567-FFFFFFFF] 
```

### Create the Container

```text
[VHC25000001567-FFFFFFFF] docker image create vh_config:1.0.0:272850b4 --detach --publish-all
8d4eeea90f81c43de77427413c1ceb1d2d5bff42dd85c45b74cdc23157c11547
[VHC25000001567-FFFFFFFF] 
```

!!! warning
    Don’t forget to include the `--publish-all` flag to publish the exposed TCP port 9500.

### Export the Config Volume

```text
[VHC25000001567-FFFFFFFF] docker container export vh_config:1.0.0:272850b4
Configuration exported on https://<ip-address>:9002
[VHC25000001567-FFFFFFFF] 
```

### Mount the Config Volume

One your development machine, run:

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

!!! warning
    If the mount fails with the following message:

    `mount: /mnt: unknown filesystem type 'davfs'.`

    then you need to install the `davfs2` package using:

    `sudo apt-get install davfs2`

### Update the Configuration

```console
$ sudo cp assets/config.json /mnt
$ sync; sync
```

Look at the contents of the file and notice the values:

```console
$ jq . assets/config.json
{
  "welcome": "Welcome to the VeeaHub platform!",
  "bool_param": true,
  "int_param": 10005200,
  "string_param": "Don't string me along!"
}
```

### Start the Container

In the Veea Shell, run:

```text
[VHC25000001567-FFFFFFFF] docker container start vh_config:1.0.0:272850b4
2587418d75a3067ddd82e0299ad938acc8d5c48eaf56de3db4f27bd36fa78a0d
[VHC25000001567-FFFFFFFF] 
```

### View the Config File

```text
[VHC25000001567-FFFFFFFF] docker container exec vh_config:1.0.0:272850b4 /bin/sh
/app/bin $ cat /usr/local/config/defaults/config.json 
{
  "welcome": "Welcome to the VeeaHub platform!",
  "bool_param" : true,
  "int_param" : 10005200,
  "string_param" : "Don't string me along!"
}
```

### View the Web Server Output

On the development machine, run:

```console
$ curl http://192.168.10.176:9500
<H1>Welcome to the VeeaHub platform!</H1>
<H2>Configuration from '/usr/local/config/defaults/config.json'</H2>
welcome: "Welcome to the VeeaHub platform!"<br>
bool_param: true<br>
int_param: 10005200<br>
string_param: "Don't string me along!"<br>
```

You can see that the values match those of the `config.json` file.

Alternately, you can use a web browser to view the HTML output.

### Unmount the Config Volume

To unmount the config volume, run:

```console
$ sudo umount /mnt
/sbin/umount.davfs: waiting while mount.davfs (pid 28547) synchronizes the cache .. OK
```

### Unexport the Config Volume

In the Veea Shell, run:

```text
[VHC25000001567-00000033] docker container unexport vh_config:1.0.0:272850b4
[VHC25000001567-00000033] 
```

The will shutdown the WebDAV server to stop exporting the config volume.
