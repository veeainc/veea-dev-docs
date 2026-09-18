---
icon: lucide/file-text
---

# A Signed Image with Feature Licenses

The signed image example in the previous tutorial did not request any licensed devices or services. This example describes the how licenses are used to ensure that images cannot access devices and capabilities without authorization.

!!! info
    In this tutorial you will learn:

    *   How device and capability requests result in feature licenses being added to the Annotated Dockerfile

    *   What happens when a feature license doesn’t exist for the requested device and capability
    

## Feature License Overview

As demonstrated in the previous tutorial explaining signed images, an image that does not require device access or capabilities can be built with default partner credentials. If device access or capabilities are requested, then Feature Licenses are required. These Feature Licenses must be requested from Veea and are tied to a specific partner. The feature licenses should be placed in the `~/.vhc` directory, which is where all of the partner credentials are placed.

For example, a complete set of partner features is show below.

```console
$ ls -1 ~/.vhc/partner-feature*
/home/jimsienicki/.vhc/partner-feature10.txt
/home/jimsienicki/.vhc/partner-feature1.txt
/home/jimsienicki/.vhc/partner-feature2.txt
/home/jimsienicki/.vhc/partner-feature3.txt
/home/jimsienicki/.vhc/partner-feature4.txt
/home/jimsienicki/.vhc/partner-feature5.txt
/home/jimsienicki/.vhc/partner-feature6.txt
/home/jimsienicki/.vhc/partner-feature7.txt
/home/jimsienicki/.vhc/partner-feature8.txt
/home/jimsienicki/.vhc/partner-feature9.txt
```

Most partners will have a subset of these licenses.

## Feature License Example

The `vh_bluetooth_sensortag_cc2650` template requests exclusive access to the `bluetooth` device, making it a good example of feature licenses.

By default, an Annotated Dockerfile for an authorized (signed) image will fail.

```console
$ vhc image build generate --arch arm32v7 
Generating: /home/joeuser/vh_bluetooth_sensortag_cc2650/build/auth/Dockerfile
ERROR: Unable to find a license for DEV:EXCLUSIVE:bluetooth
ERROR: Missing licenses...aborting
```

The Annotated Dockerfile could not be generated because there is no feature license available for the `bluetooth` device.

Once the proper feature license is obtained from Veea support, the Annotated Docker can be created.

```console
$ vhc image build generate --arch arm32v7 
Generating: /home/joeuser/vh_bluetooth_sensortag_cc2650/build/auth/Dockerfile
  - Adding contents of license file /home/joeuser/.vhc/partner-feature2.txt
```

You can view the Annotated Dockerfile to see that a new label has been added.

```console
$ cat build/auth/Dockerfile 
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2020]
################################################################################

ARG ARCH
FROM $ARCH/alpine:3.10 as build 

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

RUN apk update && \
	apk add python3 py3-gobject3 bluez dumb-init && \
	pip3 install pydbus

#BEGIN AUTO-GENERATED - DO NOT EDIT!!!
ARG ARCH
LABEL com.veea.vhc.architecture="$ARCH"
LABEL com.veea.vhc.version="1.0.0"
LABEL com.veea.vhc.app.name="vh_bluetooth_sensortag_cc2650"
LABEL com.veea.vhc.app.version="1.0.0"
LABEL com.veea.vhc.config.proj.version="3"
LABEL com.veea.vhc.config.user.version="3"
LABEL com.veea.authorisation.device1="DEV:EXCLUSIVE:bluetooth"
LABEL com.veea.authentication.identifier="PARTNER;00000000;1632209644,1947569644;<redacted>"
LABEL com.veea.image.persistent_uuid="00000000-A84D-4C37-A19A-DE166F72624C"
LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
LABEL com.veea.authorisation.feature1="DEVELOPER"
LABEL com.veea.authorisation.license1="LICENSE;DEV:EXCLUSIVE:audio,DEV:EXCLUSIVE:bluetooth,DEV:EXCLUSIVE:cellular,DEV:EXCLUSIVE:serial,DEV:EXCLUSIVE:usb:microphone,DEV:EXCLUSIVE:usb:speaker,DEV:EXCLUSIVE:usb:storage,DEV:EXCLUSIVE:usb:webcam,DEV:EXCLUSIVE:video,DEV:EXCLUSIVE:wifi,DEV:EXCLUSIVE:zigbee,DEV:EXCLUSIVE:zwave,DEV:SHARED:bluetooth,DEV:SHARED:cellular,DEV:SHARED:usb:microphone,DEV:SHARED:usb:speaker,DEV:SHARED:usb:storage,DEV:SHARED:usb:webcam,DEV:SHARED:wifi,DEV:SHARED:zigbee,DEV:SHARED:zwave;1552521600,1867881600;00000000;sha256;veeahub_license_server;<redacted>"
LABEL com.veea.authentication.certificates.partner="<redacted>"
LABEL com.veea.authentication.certificates.veeahub_license_server="<redacted>"
LABEL com.veea.authentication.certificates.veeahub_license_authority="<redacted>"
#END AUTO-GENERATED - DO NOT EDIT!!!

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["python3", "-u", "./ble_test.py"]
```

As you can see, there is a new label with a key of `com.veea.authorisation.license1` that adds a license for several devices. In this case, only the `bluetooth` device is used, as specified by the `com.veea.authorisation.device1` label.

## Alternate License File Paths

You can set different paths for the license files using the `vhc image config license` commands.

```console
$ vhc image config license --help
Adds and removes entries to the license portion of the configuration.

Usage:
  vhc image config license [flags]
  vhc image config license [command]

Available Commands:
  add-path     Adds the license path to the project configuration.
  remove-path  Removes the license path from the project configuration.
  show         Shows the configured license information.

Flags:
  -h, --help   help for license

Global Flags:
  -w, --working-dir string   Sets the image working directory. (default ".")

Use "vhc image config license [command] --help" for more information about a command.
```

A new path can be added using the `vhc image config license add-path` command.

```console
$ vhc image config license add-path /home/joeuser/licenses
Project configuration modified. Please rebuild image(s).
```

The `vhc image config license show` command shows the new path.

```console
$ vhc image config license show
License Paths:
  - /home/joeuser/licenses
```

!!! warning
    If the license path does not exist, then you will get the following warning:

    `$ vhc image config license add-path /home/joeuser/licenses`  
    `ERROR: /home/joeuser/licenses does not exist.`

Alternatively, the  --license-path flag is supported to define an alternate license path.
