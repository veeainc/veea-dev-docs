---
icon: lucide/file-text
---

# An Example to Demonstrate Published Ports

This tutorial explains how to expose and publish ports for a Secure Docker image.

!!! info
    In this tutorial you will learn:

    *   How to use Docker `EXPOSE` to expose ports in a container

    *   How to add port publish directives to the image configuration

    *   How to publish all ports when creating a container from an image

    *   How to change the port mapping when creating a container from an image
    

## Creating

The first step is to create an instance of the `vh_nodejs_web` template.

```console
$ vhc image create template vh_nodejs_web
Creating image directory vh_nodejs_web
Downloaded vh_nodejs_web.zip
Unzipped vh_nodejs_web.zip into vh_nodejs_web
```

You can enter the new directory and list the contents.

```console
$ cd vh_nodejs_web
$ ls
config.yaml  Dockerfile  README.md  src
```

## Configuring

You can view the image Dockerfile using the `cat` utility.

```console
$ cat Dockerfile
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2022]
################################################################################

ARG ARCH
FROM $ARCH/alpine:3.15

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

ENV WELCOME_MESSAGE Welcome to the VeeaHub platform!
ENV PORT 9500

RUN apk update && apk add --no-cache nodejs npm
RUN npm install
EXPOSE 9500

CMD ["npm","start"]
```

The Dockerfile exposes port 9500 for web access using the Docker `EXPOSE` command.

```console
$ cat config.yaml
app: vh_nodejs_web
app_info:
  description: Sample container that demonstrates a Node.js web server
  node_types:
  - MEN
  platforms:
    arm32v7:
    - iesv2.5
    arm64v8:
    - iesv0.9
    - iesv1.0
  version: 1.0.0
docker:
  ports:
    publish:
    - 9500:9500
  secure:
    label:
      devices: []
      features:
      - DEVELOPER
      unauth_host: true
      uuid: FFFFFFFF-52CB-4550-AE04-9EB9AB338E14
      volumes:
        offers: []
        persists: []
        requests: []
version: 3
```

The `config.yaml` file specifies that container port 9500 should be published on host port 9500. This is done via

```yaml
docker:
  ports:
    publish:
    - 9500:9500
```

The publishing of a port can be removed using

```console
$ vhc image config port remove 9500:9500
Project configuration modified. Please rebuild image(s).
```

The `vhc` command to configure this is

```console
$ vhc image config port add 9500:9500
Project configuration modified. Please rebuild image(s).
```

A UDP port can be published by appending `/udp` after the port pair

```console
$ vhc image config port add 9500:9500/udp
Project configuration modified. Please rebuild image(s).
```

You can view the published ports

```console
$ vhc image config port show
Published Ports:
ports:
  - 9500:9500/tcp
  - 9500:9500/udp
```

## Building

```console
$ vhc image build save --arch arm32v7
Saving arm32v7
Generating: /home/joeuser/vh_nodejs_web/build/unauth/Dockerfile
/home/joeuser/vh_nodejs_web/build/unauth/Dockerfile is newer than the vh_nodejs_web-arm32v7:1.0.0 docker image.
Compiling image: vh_nodejs_web arm32v7
docker build  --no-cache --build-arg ARCH=arm32v7 -t vh_nodejs_web-arm32v7:1.0.0 -f /home/joeuser/vh_nodejs_web/build/unauth/Dockerfile /home/joeuser/vh_nodejs_web
Sending build context to Docker daemon  27.14kB
Step 1/25 : ARG ARCH
Step 2/25 : FROM $ARCH/alpine:3.15
 ---> b78d22fb00fb
Step 3/25 : RUN mkdir /app
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1f1e99a0913c
Removing intermediate container 1f1e99a0913c
 ---> a709a13b15f9
Step 4/25 : COPY src/ /app/
 ---> c54944537031
Step 5/25 : WORKDIR /app
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e00cc04b9a9b
Removing intermediate container e00cc04b9a9b
 ---> eb3c4a746a44
Step 6/25 : ENV WELCOME_MESSAGE Welcome to the VeeaHub platform!
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7eb3307fe5ab
Removing intermediate container 7eb3307fe5ab
 ---> b8d689354e46
Step 7/25 : ENV PORT 9500
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e9b5484a8f65
Removing intermediate container e9b5484a8f65
 ---> 02f64a7bfe9b
Step 8/25 : RUN apk update && apk add --no-cache nodejs npm
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in eac6567bbf04
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/armv7/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/armv7/APKINDEX.tar.gz
v3.15.8-23-g7171652cc96 [https://dl-cdn.alpinelinux.org/alpine/v3.15/main]
v3.15.8-24-g754c6dd1eca [https://dl-cdn.alpinelinux.org/alpine/v3.15/community]
OK: 15434 distinct packages available
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/armv7/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/armv7/APKINDEX.tar.gz
(1/8) Installing ca-certificates (20220614-r0)
(2/8) Installing nghttp2-libs (1.46.0-r0)
(3/8) Installing brotli-libs (1.0.9-r5)
(4/8) Installing c-ares (1.18.1-r0)
(5/8) Installing libgcc (10.3.1_git20211027-r0)
(6/8) Installing libstdc++ (10.3.1_git20211027-r0)
(7/8) Installing nodejs (16.20.0-r0)
(8/8) Installing npm (8.1.3-r0)
Executing busybox-1.34.1-r7.trigger
Executing ca-certificates-20220614-r0.trigger
OK: 51 MiB in 22 packages
Removing intermediate container eac6567bbf04
 ---> bbf94287cad3
Step 9/25 : RUN npm install
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7d60af53a442
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
added 94 packages, and audited 95 packages in 24s7 packages are looking for funding
  run `npm fund` for detailsfound 0 vulnerabilities
Removing intermediate container 7d60af53a442
 ---> 0d806e52dd65
Step 10/25 : EXPOSE 9500
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 806309838e24
Removing intermediate container 806309838e24
 ---> 265fadcb5e4c
Step 11/25 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in be8fb0d56df4
Removing intermediate container be8fb0d56df4
 ---> c96446df74ae
Step 12/25 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in bbce0bb6775b
Removing intermediate container bbce0bb6775b
 ---> efd01f851fed
Step 13/25 : LABEL com.veea.vhc.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1ad4af361611
Removing intermediate container 1ad4af361611
 ---> 438584dff649
Step 14/25 : LABEL com.veea.vhc.app.name="vh_nodejs_web"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 3a94f8261f35
Removing intermediate container 3a94f8261f35
 ---> 4ec4f9aed587
Step 15/25 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 6cfdb3461bc0
Removing intermediate container 6cfdb3461bc0
 ---> 784b92f1b5bd
Step 16/25 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 0252a4c14d70
Removing intermediate container 0252a4c14d70
 ---> eab5ef8ef186
Step 17/25 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 25efba2bb9df
Removing intermediate container 25efba2bb9df
 ---> 933c04f7394d
Step 18/25 : LABEL com.veea.authentication.identifier="PARTNER;FFFFFFFF;1632209646,1947569646;k5B6h9FPRSv7RgEJP1lBb40MfAejcFI48ju3wmnnOng=;sha256;veeahub_license_server;MEUCIFmgzx1aJYu9gmqOFEUgKICGTKL+2/yUY9ocp3bFWhVgAiEAtrlOf6Ke/yGzVyMF9uOPajhG9Qf2SN/KB8hYxv5r9bQ="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 146007d99038
Removing intermediate container 146007d99038
 ---> a6b395143044
Step 19/25 : LABEL com.veea.image.persistent_uuid="FFFFFFFF-546E-4E3F-95F8-0903D6EF503B"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 642550b020ff
Removing intermediate container 642550b020ff
 ---> ea808aaa8430
Step 20/25 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 438dd83ef869
Removing intermediate container 438dd83ef869
 ---> f4ac161fb628
Step 21/25 : LABEL com.veea.authorisation.feature1="DEVELOPER"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e5a717701c57
Removing intermediate container e5a717701c57
 ---> 25690685b3c1
Step 22/25 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAItFm370meWPMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMzMgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDZaFw0zMTA5MTkwNzM0MDZaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMzMgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABE+MWTLrVyhEZppqGil0RYU5Uks3lNROqepxDAeXeXqDSpO9YM0gMJXoDtjzJlDkBjPbkIU2ceGG3Z7m8Sx1/l6jgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAzMyBTaWduaW5nIENlcnRpZmljYXRlggkAi0WbfvSZ5Y8wHQYDVR0OBBYEFMBWFw/tkOSeF9DpgJvAVAGaQIO6MA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIgK5IpAsX9vjBFS7vBw6/f+CsBhT5KABf7MNZpcatFDUECIQDTzvmbg9tr3pKeW6upz1ZTmbepPUjq0vlq2LTm5IK6PQ=="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 3f4370a084fc
Removing intermediate container 3f4370a084fc
 ---> add4710adef7
Step 23/25 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in c8ebe6f09f9e
Removing intermediate container c8ebe6f09f9e
 ---> ecdbb576d813
Step 24/25 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 0a7b3aa88218
Removing intermediate container 0a7b3aa88218
 ---> 73713cb3d386
Step 25/25 : CMD ["npm","start"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1642fcd22325
Removing intermediate container 1642fcd22325
 ---> 4bcc8395631d
Successfully built 4bcc8395631d
Successfully tagged vh_nodejs_web-arm32v7:1.0.0
Pruning any dangling instances of the same image
Saving: vh_nodejs_web arm32v7
  Writing vh_nodejs_web-arm32v7:1.0.0.unsigned.tar
```

## Running

### Upload the Image

```console
$ vhc hub access upload-image build/unauth/arm32v7/vh_nodejs_web-arm32v7\:1.0.0.unsigned.tar 
Creating image push for file [build/unauth/arm32v7/vh_nodejs_web-arm32v7:1.0.0.unsigned.tar] on C25CTW00000000001567:9000 (images/push)...
##################################################################################################################################### 100.0%
```

### Check the Uploaded Image

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
            
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY              | TAG     | ID             | P-UUID                                 | CREATED          | SIZE     
vh_nodejs_web-arm32v7   | 1.0.0   | 272850b4b1d2   | FFFFFFFF-F9DE-4663-B68E-6AC14F429805   | 12 minutes ago   | 59.09MB  

[VHC25000001567-FFFFFFFF]
```

### Create a Container

```text
[VHC25000001567-FFFFFFFF] docker image create vh_nodejs_web:1.0.0:272850b4 --detach --publish-all
acf8fb36c64e571a66554216676e96246dee91eed7b93bd0fab7d56adecfbcda
[VHC25000001567-FFFFFFFF] 
```

Notice the `--publish-all` flag in the `create` command. This instructs `vsh` to map all of the exposed ports in the container to the same port on the VeeaHub.

### Start the Container

```text
[VHC25000001567-FFFFFFFF] docker container start vh_nodejs_web:1da0ec3a
acf8fb36c64e571a66554216676e96246dee91eed7b93bd0fab7d56adecfbcda
[VHC25000001567-FFFFFFFF] 
```

### Test the Published Port

On your development machine run

```console
$ curl http://192.168.10.176:9500
<h1>Welcome to the VeeaHub platform!</h1>
```

Substitute the IP address of your VeeaHub in place of the one above.

## Publish on a Different Port

Alternatively, exposed ports can be mapped to different ports on the VeeaHub using individual `--publish <host-port>:<container-port>` flags.

### Stop the Container

```text
[VHC25000001567-FFFFFFFF] docker container stop vh_nodejs_web:1da0ec3a
acf8fb36c64e571a66554216676e96246dee91eed7b93bd0fab7d56adecfbcda
[VHC25000001567-FFFFFFFF]
```

### Delete the Container

```text
[VHC25000001567-FFFFFFFF] docker container rm vh_nodejs_web:1da0ec3a
acf8fb36c64e571a66554216676e96246dee91eed7b93bd0fab7d56adecfbcda
[VHC25000001567-FFFFFFFF] 
```

### Create a New Container

This time we use the `--publish` flag to map container port 9500 to host port 9600.

```text
[VHC25000001567-FFFFFFFF] docker image create vh_nodejs_web:1.0.0:272850b4 --detach --publish 9600:9500 
5d473015bd6dfcd83a971ffc427743fa1286a09e86116da3b9b936a2b10b5f5e
[VHC25000001567-FFFFFFFF] 
```

### Start the Container

```text
[VHC25000001567-FFFFFFFF] docker container start vh_nodejs_web:5d473015
5d473015bd6dfcd83a971ffc427743fa1286a09e86116da3b9b936a2b10b5f5e
[VHC25000001567-FFFFFFFF] 
```

### Test the Published Port

From your development machine, run:

```console
$ curl http://192.168.10.176:9600
<h1>Welcome to the VeeaHub platform!</h1>
```
