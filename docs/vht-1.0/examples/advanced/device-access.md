---
icon: lucide/file-text
---

# An Example to Demonstrate Device Access

This tutorial shows how to request access to a VeeaHub device – in this case the Bluetooth Low Energy device.

!!! info
    In this tutorial you will learn:

    *   How to display the list of supported hardware devices

    *   How to add hardware device support to an image

    *   The difference between `SHARED` and `EXCLUSIVE` device access
    

## Device Listing

There are many hardware devices that can be accessed by 3rd party images, but not all devices are available on all platforms. To get a list of devices and supported platforms, run:

```console
$ vhc image config device list
Available Secure Devices:
+-----------------------+-------------------------+
|         NAME          |       PLATFORM(S)       |
+-----------------------+-------------------------+
| audio:EXCLUSIVE       |           all           |
| bluetooth:EXCLUSIVE   |           all           |
| bluetooth:SHARED      |           all           |
| ext-serial0:EXCLUSIVE |     iesv0.9,iesv1.0     |
| lorawan:EXCLUSIVE     |     iesv0.9,iesv1.0     |
| lorawan:SHARED        |     iesv0.9,iesv1.0     |
| video:EXCLUSIVE       |         iesv0.5         |
| webcam:EXCLUSIVE      | iesv0.5,iesv0.9,iesv1.0 |
| webcam:SHARED         | iesv0.5,iesv0.9,iesv1.0 |
| zigbee:EXCLUSIVE      |           all           |
| zigbee:SHARED         |           all           |
| zwave:EXCLUSIVE       |         iesv0.5         |
| zwave:SHARED          |         iesv0.5         |
+-----------------------+-------------------------+
```

## Creating

The first step is to create an instance of the `vh_bluetooth_sensortag_cc2650` template.

```console
$ vhc image create template vh_bluetooth_sensortag_cc2650
Creating image directory vh_bluetooth_sensortag_cc2650
Downloaded vh_bluetooth_sensortag_cc2650.zip
Unzipped vh_bluetooth_sensortag_cc2650.zip into vh_bluetooth_sensortag_cc2650
```

You can enter the new directory and list the contents.

```console
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
## Proprietary and confidential. [2019-2020]
################################################################################

ARG ARCH
FROM $ARCH/alpine:3.10 as build 

RUN mkdir /app
COPY src/ /app/
WORKDIR /app

RUN apk update && \
	apk add python3 py3-gobject3 bluez && \
	pip3 install pydbus

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["python3", "-u", "./ble_test.py"]
```

The `loop.sh` script will run a Python script that searches for, connects to, and reads data from a SensorTag device.

```console
$ cat config.yaml
app: vh_bluetooth_sensortag_cc2650
app_info:
  description: Sample container that demonstrates communication with SensorTag cc2650
    over bluetooth
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
  secure:
    arg:
      licenses: []
    label:
      devices:
      - DEV:SHARED:bluetooth
      features:
      - DEVELOPER
      unauth_host: true
      uuid: FFFFFFFF-A84D-4C37-A19A-DE166F72624C
      volumes:
        offers: []
        persists: []
        requests: []
version: 3
```

The `config.yaml` has a new `devices:` section that enumerates the devices used by the container

```yaml
devices:
      - DEV:SHARED:bluetooth
```

In this case it is requesting shared access to the Bluetooth device. This gives the image access to the Bluez DBus APIs and also allows other containers on the same VeeaHub to access the APIs.

The device request can be removed using

```console
$ vhc image config device remove bluetooth SHARED
Project configuration modified. Please rebuild image(s).
```

The `vhc` command to add it back, this time with exclusive access

```console
$ vhc image config device add bluetooth EXCLUSIVE 
Project configuration modified. Please rebuild image(s).
```

Exclusive access ensures that no other containers on the same VeeaHub can access the APIs if this image is running.

You can view the devices that have been requested using

```console
$ vhc image config device show
Secure Devices:
  -  DEV:EXCLUSIVE:bluetooth
```

## Building

```console
$ vhc image build save --arch arm32v7 --unauth
Saving arm32v7
/media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/Dockerfile is newer than /media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/build/unauth/Dockerfile.
Generating: /media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/build/unauth/Dockerfile
/media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/build/unauth/Dockerfile is newer than the vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0 docker image.
Compiling image: vh_bluetooth_sensortag_cc2650 arm32v7
docker build  --build-arg ARCH=arm32v7 -t vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0 -f /media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/build/unauth/Dockerfile /media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650
Sending build context to Docker daemon  111.6MB
Step 1/19 : ARG ARCH
Step 2/19 : FROM $ARCH/alpine:3.10 as build
 ---> 1ddebb93cc2a
Step 3/19 : RUN mkdir /app
 ---> Using cache
 ---> b2646abed54f
Step 4/19 : COPY src/ /app/
 ---> 8aadb78dd317
Step 5/19 : WORKDIR /app
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in aeab3ec28fba
Removing intermediate container aeab3ec28fba
 ---> 27c0f608ea69
Step 6/19 : RUN apk update && 	apk add python3 py3-gobject3 bluez && 	pip3 install pydbus
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 6d310dc4b8e4
fetch http://dl-cdn.alpinelinux.org/alpine/v3.10/main/armv7/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.10/community/armv7/APKINDEX.tar.gz
v3.10.9-43-g3feb769ea3 [http://dl-cdn.alpinelinux.org/alpine/v3.10/main]
v3.10.6-10-ged79a86de3 [http://dl-cdn.alpinelinux.org/alpine/v3.10/community]
OK: 10072 distinct packages available
(1/47) Installing libgcc (8.3.0-r0)
(2/47) Installing expat (2.2.8-r0)
(3/47) Installing libffi (3.2.1-r6)
(4/47) Installing libintl (0.19.8.1-r4)
(5/47) Installing libuuid (2.33.2-r0)
(6/47) Installing libblkid (2.33.2-r0)
(7/47) Installing libmount (2.33.2-r0)
(8/47) Installing pcre (8.43-r1)
(9/47) Installing glib (2.60.4-r0)
(10/47) Installing libstdc++ (8.3.0-r0)
(11/47) Installing icu-libs (64.2-r1)
(12/47) Installing nspr (4.20-r0)
(13/47) Installing ncurses-terminfo-base (6.1_p20190518-r2)
(14/47) Installing ncurses-libs (6.1_p20190518-r2)
(15/47) Installing readline (8.0.0-r0)
(16/47) Installing mozjs60 (60.8.0-r0)
(17/47) Installing linux-pam (1.3.0-r1)
(18/47) Installing polkit (0.116-r0)
Executing polkit-0.116-r0.pre-install
(19/47) Installing udev-init-scripts (32-r2)
Executing udev-init-scripts-32-r2.post-install
(20/47) Installing eudev-libs (3.2.8-r0)
(21/47) Installing xz-libs (5.2.4-r0)
(22/47) Installing kmod (24-r1)
(23/47) Installing eudev (3.2.8-r0)
(24/47) Installing libxau (1.0.9-r0)
(25/47) Installing libbsd (0.9.1-r1)
(26/47) Installing libxdmcp (1.1.3-r0)
(27/47) Installing libxcb (1.13.1-r0)
(28/47) Installing libx11 (1.6.12-r1)
(29/47) Installing dbus-libs (1.12.16-r1)
(30/47) Installing consolekit2 (1.2.1-r1)
(31/47) Installing dbus (1.12.16-r1)
Executing dbus-1.12.16-r1.pre-install
Executing dbus-1.12.16-r1.post-install
(32/47) Installing bluez (5.50-r5)
(33/47) Installing libxext (1.3.4-r0)
(34/47) Installing libxrender (0.9.10-r3)
(35/47) Installing libbz2 (1.0.6-r7)
(36/47) Installing libpng (1.6.37-r1)
(37/47) Installing freetype (2.10.0-r1)
(38/47) Installing fontconfig (2.13.1-r0)
(39/47) Installing pixman (0.38.4-r0)
(40/47) Installing cairo (1.16.0-r3)
(41/47) Installing gdbm (1.13-r1)
(42/47) Installing sqlite-libs (3.28.0-r3)
(43/47) Installing python3 (3.7.10-r0)
(44/47) Installing py3-cairo (1.16.3-r1)
(45/47) Installing cairo-gobject (1.16.0-r3)
(46/47) Installing gobject-introspection (1.60.2-r0)
(47/47) Installing py3-gobject3 (3.32.1-r0)
Executing busybox-1.30.1-r5.trigger
Executing dbus-1.12.16-r1.trigger
OK: 113 MiB in 61 packages
Collecting pydbus
  Downloading pydbus-0.6.0-py2.py3-none-any.whl (19 kB)
Installing collected packages: pydbus
Successfully installed pydbus-0.6.0
WARNING: You are using pip version 20.1.1; however, version 23.0.1 is available.
You should consider upgrading via the '/usr/bin/python3.7 -m pip install --upgrade pip' command.
Removing intermediate container 6d310dc4b8e4
 ---> c3abb0d06043
Step 7/19 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in fa46fe563825
Removing intermediate container fa46fe563825
 ---> 3d33f7cbaabc
Step 8/19 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 53fe7680194c
Removing intermediate container 53fe7680194c
 ---> aef41011981e
Step 9/19 : LABEL com.veea.vhc.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 5df44959084f
Removing intermediate container 5df44959084f
 ---> 9a8611071e81
Step 10/19 : LABEL com.veea.vhc.app.name="vh_bluetooth_sensortag_cc2650"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1142c524306f
Removing intermediate container 1142c524306f
 ---> 54a312d555b4
Step 11/19 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4b956d07aa15
Removing intermediate container 4b956d07aa15
 ---> 9d1de0af0819
Step 12/19 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7b629ac089c8
Removing intermediate container 7b629ac089c8
 ---> d104f645e0c0
Step 13/19 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 3390ffd99f9c
Removing intermediate container 3390ffd99f9c
 ---> b7242d97121f
Step 14/19 : LABEL com.veea.authorisation.device1="DEV:EXCLUSIVE:bluetooth"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 88e3c10d68cd
Removing intermediate container 88e3c10d68cd
 ---> 5ff344a9ff35
Step 15/19 : LABEL com.veea.image.persistent_uuid="FFFFFFFF-A84D-4C37-A19A-DE166F72624C"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7371105ed7fd
Removing intermediate container 7371105ed7fd
 ---> 164c594dfa78
Step 16/19 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a3315fbf68da
Removing intermediate container a3315fbf68da
 ---> 44102069e81d
Step 17/19 : LABEL com.veea.authorisation.feature1="DEVELOPER"
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 266edfd4779f
Removing intermediate container 266edfd4779f
 ---> 15b762002fb4
Step 18/19 : ENTRYPOINT ["/usr/bin/dumb-init", "--"]
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 03e9680a2020
Removing intermediate container 03e9680a2020
 ---> 3c87fb9132ca
Step 19/19 : CMD ["python3", "-u", "./ble_test.py"]
 ---> [Warning] The requested image's platform (linux/arm) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1f43f9c85782
Removing intermediate container 1f43f9c85782
 ---> 1ccbf9a1a3ed
Successfully built 1ccbf9a1a3ed
Successfully tagged vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0
Pruning any dangling instances of the same image
Docker image vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0 is newer than /media/psf/Home/vh-developer-toolkit/vhc/my_app/vh_bluetooth_sensortag_cc2650/build/unauth/arm32v7/vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0.unsigned.tar.
Saving: vh_bluetooth_sensortag_cc2650 arm32v7
  Writing vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0.unsigned.tar
```

## Running

### Upload the Image

```console
$ vhc hub access upload-image build/unauth/arm32v7/vh_bluetooth_sensortag_cc2650-arm32v7\:1.0.0.unsigned.tar 
Creating image push for file [build/unauth/arm32v7/vh_bluetooth_sensortag_cc2650-arm32v7:1.0.0.unsigned.tar] on C25CTW00000000001567:9000 (images/push)...
##################################################################################################################################### 100.0%
```

### Check the Uploaded Image

Log into the Veea Shell

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

Run the `docker images` command

```text
[VHC25000001567-FFFFFFFF] docker image ls
REPOSITORY                              | TAG     | ID             | P-UUID                                 | CREATED          | SIZE     
vh_bluetooth_sensortag_cc2650-arm32v7   | 1.0.0   | 272850b4b1d2   | FFFFFFFF-F9DE-4663-B68E-6AC14F429805   | 23 minutes ago   | 59.09MB  
[VHC25000001567-FFFFFFFF] 
```

### Create a Container

```text
[VHC25000001567-FFFFFFFF] docker image create vh_bluetooth_sensortag_cc2650:1.0.0:272850b4b1d2 --detach
9d697f845ff4cfd6c7e07f5d3837d8dfb6a7e062043ac625556872e36efb2cef
[VHC25000001567-FFFFFFFF] 
```

### Start the Container

Turn on the SensorTag and look for the blinking green light. This means that the device is ready to be discovered.

Then start the container.

```text
[VHC25000001567-FFFFFFFF] docker container start vh_bluetooth_sensortag_cc2650:9d697f84
9d697f845ff4cfd6c7e07f5d3837d8dfb6a7e062043ac625556872e36efb2cef
[VHC25000001567-FFFFFFFF] 
```

### Test the Device

On your development machine run:

```text
[VHC25000001567-FFFFFFFF] logging logfile enable 
[VHC25000001567-FFFFFFFF] logging logfile display 
2023-04-12T01:37:12.272+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Starting discovery
2023-04-12T01:37:12.274+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Starting discovery
2023-04-12T01:37:12.691+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTag device found at /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:12.692+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  SensorTag device found at /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:17.331+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Stopping discovery
2023-04-12T01:37:17.331+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Stopping discovery
2023-04-12T01:37:17.379+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Connecting device
2023-04-12T01:37:17.381+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Connecting device
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: properties_changed: {}
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: ServicesResolved None
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: properties_changed: {'Connected': True}
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Device connected
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: ServicesResolved None
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  properties_changed: {}
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  ServicesResolved None
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  properties_changed: {'Connected': True}
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Device connected
2023-04-12T01:37:17.686+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  ServicesResolved None
2023-04-12T01:37:23.572+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: properties_changed: {'UUIDs': ['00001800-0000-1000-8000-00805f9b34fb', '00001801-0000-1000-8000-00805f9b34fb', '0000180a-0000-1000-8000-00805f9b34fb', '0000180f-0000-1000-8000-00805f9b34fb', '0000ffe0-0000-1000-8000-00805f9b34fb', 'f000aa00-0451-4000-b000-000000000000', 'f000aa20-0451-4000-b000-000000000000', 'f000aa40-0451-4000-b000-000000000000', 'f000aa64-0451-4000-b000-000000000000', 'f000aa70-0451-4000-b000-000000000000', 'f000aa80-0451-4000-b000-000000000000', 'f000ac00-0451-4000-b000-000000000000', 'f000ccc0-0451-4000-b000-000000000000', 'f000ffc0-0451-4000-b000-000000000000'], 'ServicesResolved': True}
2023-04-12T01:37:23.572+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  properties_changed: {'UUIDs': ['00001800-0000-1000-8000-00805f9b34fb', '00001801-0000-1000-8000-00805f9b34fb', '0000180a-0000-1000-8000-00805f9b34fb', '0000180f-0000-1000-8000-00805f9b34fb', '0000ffe0-0000-1000-8000-00805f9b34fb', 'f000aa00-0451-4000-b000-000000000000', 'f000aa20-0451-4000-b000-000000000000', 'f000aa40-0451-4000-b000-000000000000', 'f000aa64-0451-4000-b000-000000000000', 'f000aa70-0451-4000-b000-000000000000', 'f000aa80-0451-4000-b000-000000000000', 'f000ac00-0451-4000-b000-000000000000', 'f000ccc0-0451-4000-b000-000000000000', 'f000ffc0-0451-4000-b000-000000000000'], 'ServicesResolved': True}
2023-04-12T01:37:23.572+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: ServicesResolved True
2023-04-12T01:37:23.574+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Services resolved
2023-04-12T01:37:23.574+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  ServicesResolved True
2023-04-12T01:37:23.575+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Services resolved
2023-04-12T01:37:23.576+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Getting services
2023-04-12T01:37:23.577+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  Getting services
2023-04-12T01:37:24.065+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ffc4-0451-4000-b000-000000000000
2023-04-12T01:37:24.066+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ffc4-0451-4000-b000-000000000000
2023-04-12T01:37:24.086+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ffc3-0451-4000-b000-000000000000
2023-04-12T01:37:24.086+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ffc3-0451-4000-b000-000000000000
2023-04-12T01:37:24.107+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ffc2-0451-4000-b000-000000000000
2023-04-12T01:37:24.107+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ffc2-0451-4000-b000-000000000000
2023-04-12T01:37:24.131+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ffc1-0451-4000-b000-000000000000
2023-04-12T01:37:24.132+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ffc1-0451-4000-b000-000000000000
2023-04-12T01:37:24.147+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ccc3-0451-4000-b000-000000000000
2023-04-12T01:37:24.147+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ccc3-0451-4000-b000-000000000000
2023-04-12T01:37:24.163+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ccc2-0451-4000-b000-000000000000
2023-04-12T01:37:24.163+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ccc2-0451-4000-b000-000000000000
2023-04-12T01:37:24.177+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ccc1-0451-4000-b000-000000000000
2023-04-12T01:37:24.177+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ccc1-0451-4000-b000-000000000000
2023-04-12T01:37:24.192+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ac03-0451-4000-b000-000000000000
2023-04-12T01:37:24.192+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ac03-0451-4000-b000-000000000000
2023-04-12T01:37:24.210+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ac02-0451-4000-b000-000000000000
2023-04-12T01:37:24.215+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ac02-0451-4000-b000-000000000000
2023-04-12T01:37:24.239+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000ac01-0451-4000-b000-000000000000
2023-04-12T01:37:24.242+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000ac01-0451-4000-b000-000000000000
2023-04-12T01:37:24.262+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa66-0451-4000-b000-000000000000
2023-04-12T01:37:24.267+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa66-0451-4000-b000-000000000000
2023-04-12T01:37:24.295+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa65-0451-4000-b000-000000000000
2023-04-12T01:37:24.296+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa65-0451-4000-b000-000000000000
2023-04-12T01:37:24.323+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 0000ffe1-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.330+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 0000ffe1-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.363+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa73-0451-4000-b000-000000000000
2023-04-12T01:37:24.363+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa73-0451-4000-b000-000000000000
2023-04-12T01:37:24.417+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa72-0451-4000-b000-000000000000
2023-04-12T01:37:24.417+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa72-0451-4000-b000-000000000000
2023-04-12T01:37:24.434+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa71-0451-4000-b000-000000000000
2023-04-12T01:37:24.435+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa71-0451-4000-b000-000000000000
2023-04-12T01:37:24.453+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa83-0451-4000-b000-000000000000
2023-04-12T01:37:24.453+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa83-0451-4000-b000-000000000000
2023-04-12T01:37:24.474+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa82-0451-4000-b000-000000000000
2023-04-12T01:37:24.474+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa82-0451-4000-b000-000000000000
2023-04-12T01:37:24.492+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa81-0451-4000-b000-000000000000
2023-04-12T01:37:24.493+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa81-0451-4000-b000-000000000000
2023-04-12T01:37:24.515+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa44-0451-4000-b000-000000000000
2023-04-12T01:37:24.516+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa44-0451-4000-b000-000000000000
2023-04-12T01:37:24.543+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa42-0451-4000-b000-000000000000
2023-04-12T01:37:24.544+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa42-0451-4000-b000-000000000000
2023-04-12T01:37:24.575+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa41-0451-4000-b000-000000000000
2023-04-12T01:37:24.576+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa41-0451-4000-b000-000000000000
2023-04-12T01:37:24.604+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa23-0451-4000-b000-000000000000
2023-04-12T01:37:24.604+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa23-0451-4000-b000-000000000000
2023-04-12T01:37:24.629+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa22-0451-4000-b000-000000000000
2023-04-12T01:37:24.630+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa22-0451-4000-b000-000000000000
2023-04-12T01:37:24.648+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa21-0451-4000-b000-000000000000
2023-04-12T01:37:24.649+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa21-0451-4000-b000-000000000000
2023-04-12T01:37:24.672+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa03-0451-4000-b000-000000000000
2023-04-12T01:37:24.672+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa03-0451-4000-b000-000000000000
2023-04-12T01:37:24.699+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa02-0451-4000-b000-000000000000
2023-04-12T01:37:24.699+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa02-0451-4000-b000-000000000000
2023-04-12T01:37:24.717+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic f000aa01-0451-4000-b000-000000000000
2023-04-12T01:37:24.719+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic f000aa01-0451-4000-b000-000000000000
2023-04-12T01:37:24.739+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a19-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.740+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a19-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.754+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a50-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.754+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a50-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.769+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a2a-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.770+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a2a-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.785+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a29-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.785+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a29-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.812+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a28-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.814+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a28-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.826+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a27-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.828+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a27-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.845+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a26-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.845+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a26-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.869+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a25-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.870+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a25-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.890+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a24-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.890+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a24-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.907+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: Found characteristic 00002a23-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.908+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  Found characteristic 00002a23-0000-1000-8000-00805f9b34fb
2023-04-12T01:37:24.910+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTagHumidityListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:24.910+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTagHumidityListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:24.910+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTag::humidity_enable
2023-04-12T01:37:24.913+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTag::humidity_enable
2023-04-12T01:37:24.914+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: humidity period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char0030
2023-04-12T01:37:24.918+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  humidity period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char0030
2023-04-12T01:37:25.233+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: humidity config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char002e
2023-04-12T01:37:25.233+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  humidity config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char002e
2023-04-12T01:37:25.331+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: humidity data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char002b
2023-04-12T01:37:25.331+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  humidity data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service002a/char002b
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTagBarometricListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTag::barometric_enable
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: barometric pressure period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0038
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTagBarometricListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTag::barometric_enable
2023-04-12T01:37:25.415+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  barometric pressure period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0038
2023-04-12T01:37:25.502+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: barometric pressure config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0036
2023-04-12T01:37:25.503+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  barometric pressure config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0036
2023-04-12T01:37:25.637+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: barometric pressure data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0033
2023-04-12T01:37:25.638+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  barometric pressure data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0032/char0033
2023-04-12T01:37:25.728+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTagMovementListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.729+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTag::movement_enable
2023-04-12T01:37:25.729+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: movement period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char0040
2023-04-12T01:37:25.729+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTagMovementListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.729+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTag::movement_enable
2023-04-12T01:37:25.730+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  movement period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char0040
2023-04-12T01:37:25.818+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: movement config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char003e
2023-04-12T01:37:25.818+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  movement config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char003e
2023-04-12T01:37:25.907+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: movement data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char003b
2023-04-12T01:37:25.908+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  movement data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service003a/char003b
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTagOpticalListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: SensorTag::optical_enable
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: optical period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0048
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTagOpticalListener /org/bluez/hci0/dev_54_6C_0E_52_C9_81
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  SensorTag::optical_enable
2023-04-12T01:37:25.999+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  optical period path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0048
2023-04-12T01:37:26.088+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: optical config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0046
2023-04-12T01:37:26.088+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  optical config path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0046
2023-04-12T01:37:26.177+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: optical data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0043
2023-04-12T01:37:26.179+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  optical data path: /org/bluez/hci0/dev_54_6C_0E_52_C9_81/service0042/char0043
2023-04-12T01:37:26.315+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: properties_changed: {'Modalias': 'bluetooth:v000Dp0000d0110'}
2023-04-12T01:37:26.316+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: ServicesResolved None
2023-04-12T01:37:26.316+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [INFO   ]  properties_changed: {'Modalias': 'bluetooth:v000Dp0000d0110'}
2023-04-12T01:37:26.316+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  ServicesResolved None
2023-04-12T01:37:26.322+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is  0.0]
2023-04-12T01:37:26.323+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.0]
2023-04-12T01:37:26.323+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  0.0]
2023-04-12T01:37:26.323+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is  0.0]
2023-04-12T01:37:26.323+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.0]
2023-04-12T01:37:26.324+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  0.0]
2023-04-12T01:37:26.340+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.0]
2023-04-12T01:37:26.341+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:26.341+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 0.0]
2023-04-12T01:37:26.341+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.0]
2023-04-12T01:37:26.341+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:26.341+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is  0.0]
2023-04-12T01:37:26.342+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 0.0]
2023-04-12T01:37:26.343+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is  0.0]
2023-04-12T01:37:26.343+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is  0.0]
2023-04-12T01:37:26.344+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is  0.0]
2023-04-12T01:37:26.345+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is  0.0]
2023-04-12T01:37:26.346+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is  0.0]
2023-04-12T01:37:26.720+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.6 F]
2023-04-12T01:37:26.720+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:37:26.720+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.6 F]
2023-04-12T01:37:26.720+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.8]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.7]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  0.8]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.1]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 1.1]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 288.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 482.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 313.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.8]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.7]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  0.8]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.1]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 1.1]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 288.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 482.0]
2023-04-12T01:37:27.129+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 313.0]
2023-04-12T01:37:27.169+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 7.1 L]
2023-04-12T01:37:27.169+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 7.1 L]
2023-04-12T01:37:27.709+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.6 F]
2023-04-12T01:37:27.709+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.6 F]
2023-04-12T01:37:27.709+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:37:27.710+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:37:28.163+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.9]
2023-04-12T01:37:28.163+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.9]
2023-04-12T01:37:28.163+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.6]
2023-04-12T01:37:28.164+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  1.0]
2023-04-12T01:37:28.164+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.1]
2023-04-12T01:37:28.164+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.6]
2023-04-12T01:37:28.165+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:28.166+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  1.0]
2023-04-12T01:37:28.166+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.1]
2023-04-12T01:37:28.166+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:37:28.167+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 1.0]
2023-04-12T01:37:28.168+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 296.0]
2023-04-12T01:37:28.168+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 1.0]
2023-04-12T01:37:28.168+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 481.0]
2023-04-12T01:37:28.169+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 312.0]
2023-04-12T01:37:28.169+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 296.0]
2023-04-12T01:37:28.169+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 481.0]
2023-04-12T01:37:28.170+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 312.0]
2023-04-12T01:37:28.181+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 7.1 L]
2023-04-12T01:37:28.182+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 7.1 L]
```

There is a lot of information in the output, but it can be broken down into several phases:

*   Scanning for the SensorTag
    
*   Connecting to the SensorTag
    
*   Discovering all of the device services, characteristics, and descriptors
    
*   Polling for sensor value changes in an infinite loop
    

You can see the output for the sensor value loop by running:

```text
[VHC25000001567-00000033] logging logfile stream
2023-04-12T01:42:11.477+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.7 F]
2023-04-12T01:42:11.477+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:42:11.478+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Temperature is 68.7 F]
2023-04-12T01:42:11.478+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Pressure is 29.8 in]
2023-04-12T01:42:12.115+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.9]
2023-04-12T01:42:12.115+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.9]
2023-04-12T01:42:12.115+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  1.1]
2023-04-12T01:42:12.116+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroX is -0.9]
2023-04-12T01:42:12.116+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroY is  0.9]
2023-04-12T01:42:12.116+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 GyroZ is  1.1]
2023-04-12T01:42:12.117+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.0]
2023-04-12T01:42:12.117+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccX is 0.0]
2023-04-12T01:42:12.118+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:42:12.118+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccY is 0.0]
2023-04-12T01:42:12.119+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 0.5]
2023-04-12T01:42:12.120+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 300.0]
2023-04-12T01:42:12.120+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 492.0]
2023-04-12T01:42:12.120+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 AccZ is 0.5]
2023-04-12T01:42:12.120+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagX is 300.0]
2023-04-12T01:42:12.121+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagY is 492.0]
2023-04-12T01:42:12.121+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 313.0]
2023-04-12T01:42:12.122+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 MagZ is 313.0]
2023-04-12T01:42:12.152+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0: [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 6.8 L]
2023-04-12T01:42:12.152+00:00 C25CTW00000000001567 888809fdb085/vh_bluetooth_sensortag_cc2650-1.0.0[7051]: [CRITICAL]  [/org/bluez/hci0/dev_54_6C_0E_52_C9_81 Light is 6.8 L]
```

Hit `ctrl-c` to exit the log streaming.

## Next Steps

If you’re interested in Bluetooth Low Energy, the look at the `ble_test.py` scripts. It is a good example on how to use Bluez in Python.
