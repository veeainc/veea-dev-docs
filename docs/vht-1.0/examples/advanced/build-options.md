---
icon: lucide/file-text
---

# An Example to Demonstrate Build Options

This tutorial explains how to customize the Docker build options for an image.

!!! info
    In this tutorial you will learn:

    *   How to set architecture-specific Docker build options

    *   How to set architecture-independent Docker build options
    

## Default Build Arguments

The `vhc` tool can build images for 32-bit and 64-bit ARM devices. It will always specify a Docker build argument to set a variable called `ARCH` to either `arm32v7` or `arm64v8`. The main use of this argument is to specify an architecture-specific `FROM` command. For example:

```text
ARG ARCH
FROM $ARCH/alpine:3.15
```

or

```text
ARCH ARCH
FROM $ARCH/busybox
```

When `vhc` invokes `docker build` it will also emit a `--build-arg ARCH=arm32v7` or `--build-arg ARCH=arm64v8` based on the `--arch` flag.

## Custom Build Options

Sometimes it is necessary to pass additional build arguments to Docker. The `vhc image config docker-opts set-build-opts` command can be used to specify Docker build options.

### Architecture-independent Build Options

By default, the build options apply to all architectures.

```bash
vhc image config docker-opts set -- "--build-arg MYVAR=myValue"
```

!!! warning
    The extra “--” between the `set-build-opts` command and the value is not a typo. It is needed to tell the command parser that the value is not a flag. If you forget to add it, you will get a warning such as:

    `Error: unknown flag: --build-arg MYVAR`

After running the commands, the following lines should appear in the image `config.yaml` file

```yaml
docker:
  docker-opts: --build-arg MYVAR=myValue"
```

### Architecture-specific Build Options

In some cases, the `ARCH` variable is insufficient for targeting multiple architectures. For instance, the `golang` cross-compiler takes a `GOARCH` variable to specify the target architecture. The variable values for ARM targets are `arm` and `arm64`. In this case, architecture-specific build options are needed.

The `--arch arm32v7` and `--arch arm64v8` flags are used to specify that the build options apply only to the specified architecture. The example below shows how to set a `GOARCH` variable to a different value for each architecture.

```console
$ vhc image config docker-opts set --arch arm32v7 -- "--build-arg GOARCH=arm"
$ vhc image config docker-opts set --arch arm64v8 -- "--build-arg GOARCH=arm64"
```

After running the commands, the following lines should appear in the image `config.yaml` file.

```yaml
docker:
   build_opts_arm32v7: --build-arg GOARCH=arm
  build_opts_arm64v8: --build-arg GOARCH=arm64
```

## Testing the Build Options

The `vh_golang_web` template is a good example of how to use architecture-specific options.

```bash
vhc image create template vh_golang_web
Creating image directory vh_golang_web
Downloaded vh_golang_web.zip
Unzipped vh_golang_web.zip into vh_golang_web
```

You can enter the new directory and list the contents.

```console
$ cd vh_golang_web
$ ls
config.yaml  Dockerfile  README.md  src
```

You can examine the Dockerfile using the `cat` utility.

```console
$ cat Dockerfile
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2020]
################################################################################

## ARCH is not used in the first FROM command below, but Docker insists that
## the variable be defined before the first FROM command, even if it is only
## used in a later FROM command.
ARG ARCH
FROM golang:1.8-alpine as build

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

ARG GOARCH
RUN CGO_ENABLED=0 GOOS=linux GOARCH=$GOARCH go build -a -o goapp

## ARCH is declared above, but used here
FROM $ARCH/busybox

EXPOSE 9500
ENV PORT 9500
ENV WELCOME_MESSAGE Welcome to the VeeaHub platform!

WORKDIR /app/bin
COPY --from=build /app/goapp .

CMD ["/app/bin/goapp"]
```

The comment before the line declaring the `ARCH` argument makes it clear that and argument used in a `FROM` command must be declared before the first `FROM` command.

!!! warning
    Failure to place the `ARG` declaration of any argument used in a `FROM` command will result in an error similar to the one below:

    `Step 8/28 : FROM "$ARCH/busybox"`  
    `invalid reference format`  
    `exit status 1`

The `config.yaml` file containing the architecture-specific build options is show below.

```console
$ cat config.yaml 
app: vh_golang_web
app_info:
  description: Sample golang web server created using multistage build pattern to
    keep image small i.e. ~6MB
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
      uuid: FFFFFFFF-2688-4D11-AAE2-FD8019D66FF5
      volumes:
        offers: []
        persists: []
        requests: []
version: 3
```

The image is built and saved using `vhc image build` command below.

```console
$ vhc image build save --arch arm32v7
Saving arm32v7
Generating: /home/joeuser/vh_golang_web/build/auth/Dockerfile
/home/joeuser/vh_golang_web/build/auth/Dockerfile is newer than the vh_golang_web-arm32v7:1.0.0 docker image.
Compiling image: vh_golang_web arm32v7
docker build  --build-arg ARCH=arm32v7 --build-arg GOARCH=arm -t vh_golang_web-arm32v7:1.0.0 -f /home/joeuser/vh_golang_web/build/auth/Dockerfile /home/joeuser/vh_golang_web
Sending build context to Docker daemon  23.55kB
Step 1/28 : ARG ARCH
Step 2/28 : FROM golang:1.8-alpine as build
 ---> 4cb86d3661bf
Step 3/28 : RUN mkdir /app
 ---> Running in 3b4f742ff7e3
Removing intermediate container 3b4f742ff7e3
 ---> 8bbae0491e1f
Step 4/28 : COPY src/ /app/
 ---> f5820981611a
Step 5/28 : WORKDIR /app
 ---> Running in 761a947795da
Removing intermediate container 761a947795da
 ---> c163a9c77157
Step 6/28 : ARG GOARCH
 ---> Running in 5315ceb6d0b8
Removing intermediate container 5315ceb6d0b8
 ---> 8cadd486cba2
Step 7/28 : RUN CGO_ENABLED=0 GOOS=linux GOARCH=$GOARCH go build -a -o goapp
 ---> Running in 210c13849daf
Removing intermediate container 210c13849daf
 ---> 554501062c2a
Step 8/28 : FROM $ARCH/busybox
 ---> 451d98dc262d
Step 9/28 : EXPOSE 9500
 ---> Using cache
 ---> c4ee5a301f3e
Step 10/28 : ENV PORT 9500
 ---> Using cache
 ---> 594e42562991
Step 11/28 : ENV WELCOME_MESSAGE Welcome to the VeeaHub platform!
 ---> Using cache
 ---> 8549df1d695d
Step 12/28 : WORKDIR /app/bin
 ---> Using cache
 ---> 5f8cf44b5616
Step 13/28 : COPY --from=build /app/goapp .
 ---> Using cache
 ---> d4d5cea89aa5
Step 14/28 : ARG ARCH
 ---> Using cache
 ---> eb715dc001c3
Step 15/28 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> Using cache
 ---> 7a60b37e4a9f
Step 16/28 : LABEL com.veea.vhc.version="1.0.0"
 ---> Using cache
 ---> 397f65d7db8e
Step 17/28 : LABEL com.veea.vhc.app.name="vh_golang_web"
 ---> Using cache
 ---> ab098f5278e9
Step 18/28 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> Using cache
 ---> 853afb228c17
Step 19/28 : LABEL com.veea.vhc.config.proj.version="3"
 ---> Using cache
 ---> 4c151f20dcf0
Step 20/28 : LABEL com.veea.vhc.config.user.version="3"
 ---> Using cache
 ---> 59cd8824d3f9
Step 21/28 : LABEL com.veea.authentication.identifier="PARTNER;00000033;1632209646,1947569646;k5B6h9FPRSv7RgEJP1lBb40MfAejcFI48ju3wmnnOng=;sha256;veeahub_license_server;MEUCIFmgzx1aJYu9gmqOFEUgKICGTKL+2/yUY9ocp3bFWhVgAiEAtrlOf6Ke/yGzVyMF9uOPajhG9Qf2SN/KB8hYxv5r9bQ="
 ---> Using cache
 ---> 83adbf4e4085
Step 22/28 : LABEL com.veea.image.persistent_uuid="00000033-2688-4D11-AAE2-FD8019D66FF5"
 ---> Using cache
 ---> 6387a3eacc05
Step 23/28 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> Using cache
 ---> 517ad6200ab2
Step 24/28 : LABEL com.veea.authorisation.feature1="DEVELOPER"
 ---> Using cache
 ---> f115f5cb9cdf
Step 25/28 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAItFm370meWPMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMzMgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDZaFw0zMTA5MTkwNzM0MDZaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMzMgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABE+MWTLrVyhEZppqGil0RYU5Uks3lNROqepxDAeXeXqDSpO9YM0gMJXoDtjzJlDkBjPbkIU2ceGG3Z7m8Sx1/l6jgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAzMyBTaWduaW5nIENlcnRpZmljYXRlggkAi0WbfvSZ5Y8wHQYDVR0OBBYEFMBWFw/tkOSeF9DpgJvAVAGaQIO6MA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIgK5IpAsX9vjBFS7vBw6/f+CsBhT5KABf7MNZpcatFDUECIQDTzvmbg9tr3pKeW6upz1ZTmbepPUjq0vlq2LTm5IK6PQ=="
 ---> Using cache
 ---> a7831290a1a5
Step 26/28 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> Using cache
 ---> 706a0eb41c5b
Step 27/28 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> Using cache
 ---> cd9a00a18db4
Step 28/28 : CMD ["/app/bin/goapp"]
 ---> Using cache
 ---> 6ebb793258b4
Successfully built 6ebb793258b4
Successfully tagged vh_golang_web-arm32v7:1.0.0
Pruning any dangling instances of the same image
Saving: vh_golang_web arm32v7
  Writing vh_golang_web-arm32v7:1.0.0.unsigned.tar
```

The important line to notice in the output is the call to `docker build`:

```bash
docker build  --build-arg ARCH=arm32v7 --build-arg GOARCH=arm -t vh_golang_web-arm32v7:1.0.0 -f /home/joeuser/vh_golang_web/build/auth/Dockerfile /home/joeuser/vh_golang_web
```

The `ARCH` and `GOARCH` variables are defined appropriately.
