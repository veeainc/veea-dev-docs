---
title: VHT 1.x Troubleshooting
icon: lucide/circle-alert
---

# Troubleshooting

There are many things that can go wrong when developing Docker images and applications. This page lists common problems and their solutions. Click a question to expand the answer.

## Installation

??? question "Installation fails because of lack of privileges"

    You will need to have `sudo` privileges to complete the installation. If you do not have these privileges, please talk to your system administrator.

??? question "Permission denied connecting to the Docker daemon socket"

    If you see:

    ```text
    Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/build?
    ```

    when running a `docker image build` command:

    You are not part of the `docker` group. The installation script will add the user to the `docker` group, but these changes will not take effect unless you logout and login again or reboot.

??? question "Tab completion is not working or gives stale results from an older VHT version"

    Try running:

    ```bash
    . /etc/bash_completion.d/vhc
    ```

    This should run the tab completion script in your shell.

    You can also logout and login again or reboot and these changes will take effect in any new shell you open.

## Image Build

??? question "`No partner ID found. Please use --unauth.`"

    Seen when running a `vhc image build` command.

    If you don't have partner credentials, then add the `--unauth` flag to the command.

    If you do have partner credentials, then make sure they have been imported using `vhc partner secure import-credentials`.

??? question "`ERROR: Architecture '<some-architecture>' is not supported.`"

    Seen when running a `vhc image build` command.

    You have specified an architecture that is not supported by any VeeaHub model. You can use the `vhc image config platform list` command to get a list of supported architectures.

??? question "`ERROR! architecture not found: arm32v7 [arm64v8]`"

    Seen when running a `vhc app config add-image` command.

    You have not specified an architecture for your VeeaHub model. You can use the `--arch` flag with either of the following values for your VeeaHub: `arm32v7` and `arm64v8`.

??? question "`ERROR: Architecture '<some-architecture>' is not valid for this image.`"

    Seen when running a `vhc image build` command.

    You have specified an architecture that is not supported by the image. Use `vhc image config show` to display the supported architectures or add the architecture using the `vhc image config platform add` command.

??? question "APKINDEX fetch errors during an image build"

    If you see:

    ```text
    fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/community/aarch64/APKINDEX.tar.gz
    ERROR: http://dl-cdn.alpinelinux.org/alpine/v3.9/community: temporary error (try again later)
    WARNING: Ignoring APKINDEX.737f7e01.tar.gz: No such file or directory
    ```

    when running a `vhc image build` command, the solution is to restart docker using:

    ```bash
    sudo service docker restart
    ```

??? question "`Error: unknown flag: --build-arg MYVAR`"

    Seen when running a `vhc image config docker-opts set` command that uses a docker build option.

    You might need to add a "--" between the `vhc image config docker-opts` command and the string value. For example:

    ```bash
    vhc image config docker-opts set -- "--build-arg MYVAR=MYVALUE"
    ```

??? question "`invalid reference format` on a `FROM` line"

    If you see:

    ```text
    Step 8/28 : FROM "$ARCH/busybox"
    invalid reference format
    exit status 1
    ```

    or something similar when running a `vhc image build compile` command:

    You must place the `ARG` declaration of any argument used in a `FROM` command before the `FROM` line.

??? question "`ERROR: The old #BEGIN/#END construct is no longer supported.`"

    If you see:

    ```text
    ERROR: The old #BEGIN/#END construct is no longer supported.
    It should be replaced with a construct using a Docker ARG.
    For example:
    ARG ARCH
    FROM $ARCH/alpine:3.15
    Please modify your Dockerfile
    ```

    when running a `vhc image build` command:

    You will need to replace the Dockerfile commands that use the old #BEGIN/#END construct with the newer ARG-based mechanism.

    For instance, if the construct is used in the `FROM` line, then you should use:

    ```text
    ARG ARCH
    FROM $ARCH/<package-name>
    ```

    If the construct is used elsewhere (such as to control the GOARCH), then you should use a Docker build argument (see the tutorial on Docker options).

## Image Signing

??? question "`Missing label 'com.veea.authentication.certificates.partner'` when verifying an image"

    If you see:

    ```text
    Verifying unsigned image
    2023-09-16 18:33:47 SDL.elements.VeeaContainer               ERROR    Missing label 'com.veea.authentication.certificates.partner' from container.
          0 warnings
          1 errors
      Failed - please fix errors
    exit status 1
    ```

    It means the partner credentials have not been properly configured and the user needs to run `vhc partner secure import-credentials`.

## Hub Access

??? question "`curl: (56) OpenSSL SSL_read: ... alert certificate expired`"

    If you see:

    ```text
    curl: (56) OpenSSL SSL_read: error:14094415:SSL routines:ssl3_read_bytes:sslv3 alert certificate expired, errno 0
    exit status 56
    ```

    when running a `vhc hub access` command, the solution is to generate a new TLS certificate using:

    ```bash
    vhc partner secure update-tls-credentials
    ```

??? question "`curl: (56) OpenSSL SSL_read: ... alert unknown ca`"

    If you see:

    ```text
    curl: (56) OpenSSL SSL_read: error:14094418:SSL routines:ssl3_read_bytes:tlsv1 alert unknown ca, errno 0
    exit status 56
    ```

    This indicates that there is a mismatch between the configured partner ID in VHT and the partner license that was uploaded to the VeeaHub.

    The solution is to push the correct partner license to the VeeaHub.

??? question "`Host key verification failed.` when opening VeeaHub Shell"

    The laptop has not yet trusted the VeeaHub Shell SSH host key. The VeeaHub Shell commonly listens on port `9010`, not the sideload REST port `9000`.

    ```bash
    ssh-keyscan -T 5 -p 9010 -H <hub-ip> >> ~/.ssh/known_hosts
    vhc hub access shell --hub-id <hub-name> --command "help"
    ```

??? question "`Permission denied (publickey,keyboard-interactive).` when opening VeeaHub Shell"

    Upload your public key to the hub:

    ```bash
    vhc hub access upload-public-key --hub-id <hub-name> ~/.ssh/id_ed25519.pub
    vhc hub access shell --hub-id <hub-name> --command "docker image ls"
    ```

    Use `vhc hub access ping` to test the sideload server on port `9000`; use `vhc hub access shell` to test the VeeaHub Shell path.

## Applications

??? question "Two images inside an application have the same name"

    You will need to use the `--name` flag when you run the `vhc app config add-image` command to rename one of them.

## VeeaHub Shell

??? question "Your Partner ID is missing from the Veea Shell prompt"

    Check that your Partner CMS file has been loaded onto your development VeeaHub using the `vhc hub access upload-license` command.

??? question "`Error response from daemon: params.Config.AttachStdout is not supported`"

    Seen when running `docker image create`.

    It means that you forgot to use the `--detach` flag with the `create` command.

??? question "`Invalid or ambiguous image ID, UUID, or name specified`"

    Seen when running a `docker image` command.

    It means that you need to disambiguate the image name by specifying part of the ID.

??? question "`The container ID [<partner-id>] and partner ID [FFFFFFFF] do not match.`"

    Seen when running `docker image create`.

    You have built an `auth` image with a partner ID, but have not signed it. Run:

    ```bash
    vhc image build sign
    ```

    to create a signed image.

??? question "`Invalid or ambiguous container ID, UUID, or name specified`"

    Seen when running a `docker container` command.

    It means that you need to disambiguate the container name by specifying part of the ID.

??? question "You can't access a port in your container"

    Make sure to include the `--publish-all` flag or one or more `--publish` flags in the `docker image create` command to publish the exposed ports.

??? question "WebDAV mount fails with `unknown filesystem type 'davfs'`"

    If the host WebDAV mount of an exported volume fails with:

    ```text
    mount: /mnt: unknown filesystem type 'davfs'.
    ```

    You need to install the `davfs2` package using:

    ```bash
    sudo apt-get install davfs2
    ```

## Feature Licenses

??? question "`ERROR: <some-path-name> does not exist.` when adding a license path"

    Seen when running `vhc image config license add-path`.

    It means the license path does not exist and you should check that the path is correct.

## Partner ID Errors

??? question "`Non-authorized partner id found` when uploading an image"

    If you see:

    ```console
    joeuser:~/my_image$ vhc hub access upload-image build/auth/arm64v8/my_image-arm64v8:1.0.0.unsigned.tar
    Creating image push for file [build/auth/arm64v8/my_image-arm64v8:1.0.0.unsigned.tar] on C05BCB00C0A000002089:9000 (images/push)...
    ################################################################### 100.0%
    Non-authorized partner id found
    ```

    This means that the image being uploaded uses a partner ID that does not exist on the VeeaHub. The user needs to upload their partner transport license that matches this partner ID using:

    ```console
    joeuser:~/my_image$ vhc hub access upload-license
    Adding license file [/home/joeuser/.vhc/veea-partner-00000000-transport-license.cms] to C05BCB00C0A000002089:9000 (licenses)...
    ################################################################### 100.0%
    Please reboot your VeeaHub to install the uploaded license
    ```

??? question "`Non-authorized partner id found` after uploading an application archive"

    If the error appears after uploading an application archive with `vhc hub access upload-app`, check the hub mode:

    ```bash
    vhc hub access get-partner-id --hub-id <hub-name>
    vhc hub access get-licenses --hub-id <hub-name>
    ```

    If `get-partner-id` returns `FFFFFFFF`, the hub is currently acting as an unsigned/unauthenticated development hub. In that state, use unsigned image sideload instead of signed app sideload:

    ```bash
    vhc image build save --arch <arch> --unauth --force
    vhc hub access upload-image --hub-id <hub-name> \
      'build/unauth/<arch>/<image-name>-<arch>:<version>.unsigned.tar'
    ```

    Then create and start the container through VeeaHub Shell:

    ```bash
    vhc hub access shell --hub-id <hub-name> --command "docker image ls"
    vhc hub access shell --hub-id <hub-name> --command \
      "docker image create <image-id> --detach --publish <host-port>:<container-port> --restart unless-stopped"
    vhc hub access shell --hub-id <hub-name> --command "docker container start <container-id>"
    ```

    A `PARTNER-DEVELOPER` license in `get-licenses` does not always mean the active partner ID is the signed partner prefix. Trust `get-partner-id` when choosing signed app sideload versus unsigned image sideload.
