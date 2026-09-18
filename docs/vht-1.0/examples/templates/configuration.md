---
icon: lucide/file-text
---

# Template Configuration

This tutorial explains how to use the `vhc` tool to configure an image.

## Creating a vh_dbus Template Instance

```console
$ vhc image create template vh_dbus
Creating image directory vh_dbus
Downloaded vh_dbus.zip
Unzipped vh_dbus.zip into vh_dbus
```

## Viewing the Template Components

The contents of the new template instance can be viewed by running

```console
$ cd vh_dbus
$ ls
config.yaml  Dockerfile  README.md  src
```

### Configuration File

Secure Docker image configuration is contained in the `config.yaml` file. You can view this file directly with the `vhc image config show` command.

```console
$ vhc image config show
app: vh_dbus
description: Sample Python container that demonstrates a simple DBus interaction
version: 1.0.1
platforms:
  - arm32v7:
    - iesv0.5
    - iesv2.5
  - arm64v8:
    - iesv0.9
    - iesv1.0
node_type:
  - MEN
uuid: FFFFFFFF-FAF5-4651-A635-338F23567991
Project configuration modified. Please rebuild image(s).
```

Let’s go through the basic image configuration items in the order shown.

*   `app` - indicates the image name
    
*   `description` - a short description of the image
    
*   `version` - the version of the image
    
*   `platforms` - a list of the supported VeeaHub platforms that can run the image
    
*   `node_type` - a list of the mesh nodes that can run the image (MEN and/or MN)
    
*   `uuid` - a unique identifier for the image
    

The last line indicates that the image configuration was modified. This happened because `vhc` generated a new random `uuid` to uniquely identify the image instance. Notice, however, that the first 8 characters of the uuid are `FFFFFFFF`. This is the partner identifier for unauthorized images. These characters are replaced by the actual partner identifier when building authorized, signed images.

### Dockerfile

The Dockerfile can be examined directly using the `cat` utility.

```console
$ cat Dockerfile
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

RUN apk update
RUN apk -U --allow-untrusted add python3 py3-gobject3
RUN pip3 install pydbus

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["python3", "-u", "./dbus.py"]
```

It’s a simple set of rules to install Alpine Linux 3.9, install Python, install some additional packages, and then run the `dbus.py` script using `dumb-init`. The `dumb-init` utility ensures that the `CMD` script properly handles signals and shuts down properly. It is recommended that you use `dumb-init` or similar utilities (e.g., `tini`) for your own images.

One thing that should stand out is the `ARG ARCH` and use of `$ARCH` in the `FROM` statement. The proper architecture value is substituted by Docker using a `--build-arg` directive from `vhc`. More information about build arguments can be found in the tutorial An Example to Demonstrate Build Options .

### Source Code

For information about D-Bus APIs, please click D-Bus API Documentation.

```console
$ cat src/dbus.py 
#!/usr/bin/python3
################################################################################
## Copyright (C) Veea Systems Limited - All Rights Reserved.
## Unauthorised copying of this file, via any medium is strictly prohibited.
## Proprietary and confidential. [2019-2020]
################################################################################
"""Example usage of Veea DBus Info API"""

import pprint
import signal
import sys
import time
from pydbus import SystemBus

SLEEP_TIME = 5

if __name__ == '__main__':
    BUS = SystemBus()
    PP = pprint.PrettyPrinter(indent=3)
    while True:
        try:
            SN_INFO = BUS.get('io.veea.VeeaHub.Info').SerialNumberDecode()
            print("io.veea.VeeaHub.Info.SerialNumberDecode:")
            PP.pprint(SN_INFO)
            print("Sleeping for {} seconds...".format(SLEEP_TIME), flush=True)
            time.sleep(SLEEP_TIME)
        except KeyboardInterrupt:
            break
```

The source code for this image is a single Python script that retrieves the decoded VeeaHub serial number information and displays it. It does so in an infinite loop, sleeping for 5 seconds between iterations. It uses the Python `pprint` package to pretty-print the output. It catches `ctrl-c`, which is a way to break out of the infinite loop when the script is run from a shell.
