---
icon: lucide/file-text
---

# Mesh-enabled Template Example Build

## Working with the Mesh Side

As I mentioned we are done with preparing the cloud side and now it's time to work on building the mesh broker and client images, deploy our application with VHC, and configure the deployment with the generated user-config.json. Start both mesh broker and mesh client services. Use the partner logs to either debug any issues that arise or ensure the services are up and running ok. Finally we will use the cloud side web client to show the data collected from the mesh clients and even interact with a mesh client.

### Build the application which includes the mesh broker and mesh client services.

To build the signed image, run:

```bash
$ vhc app build release
```

Example output below. Please note that many of these messages are normal but discarded from the output below for brevity 'qemu: Unsupported syscall: xxx'

```bash
jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt$ vhc app build clean
Removing release /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/build/vh_dmqtt-1.0.0.tgz
+ vhc app build release
Building application: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/build/vh_dmqtt-1.0.0.tgz
Processing: vh_dmqtt_mesh_client /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client
Building: arm32v7
Generating: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/Dockerfile
/home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/Dockerfile is newer than the vh_dmqtt_client-arm32v7:1.0.0 docker image.
Compiling image: vh_dmqtt_client arm32v7
Pruning previous instance of the same image
docker build  --build-arg ARCH=arm32v7 -t vh_dmqtt_client-arm32v7:1.0.0 -f /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/Dockerfile /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client
Sending build context to Docker daemon  26.11kB
Step 1/21 : ARG ARCH
Step 2/21 : FROM $ARCH/alpine:3.19 as builder
 ---> 30c69795e46b
Step 3/21 : WORKDIR /app
 ---> Using cache
 ---> f3f0c7c4e055
Step 4/21 : RUN set -x &&     apk --no-cache add jq      python3 py3-gobject3 tini dbus bind-tools openssl      mosquitto cmd:pip3 &&     python3 -m venv --system-site-packages /app/venv &&     . /app/venv/bin/activate &&     pip3 install pydbus paho-mqtt dnspython
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a949984ff5e4
+ apk --no-cache add jq python3 py3-gobject3 tini dbus bind-tools openssl mosquitto cmd:pip3
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/armv7/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/armv7/APKINDEX.tar.gz
(1/74) Upgrading libcrypto3 (3.1.4-r5 -> 3.1.4-r6)
(2/74) Upgrading libssl3 (3.1.4-r5 -> 3.1.4-r6)
(3/74) Installing fstrm (0.6.1-r4)
(4/74) Installing krb5-conf (1.0-r2)
(5/74) Installing libcom_err (1.47.0-r5)
(6/74) Installing keyutils-libs (1.6.3-r3)
(7/74) Installing libverto (0.3.2-r2)
(8/74) Installing krb5-libs (1.21.2-r0)
(9/74) Installing json-c (0.17-r0)
(10/74) Installing nghttp2-libs (1.58.0-r0)
(11/74) Installing protobuf-c (1.4.1-r7)
(12/74) Installing libuv (1.47.0-r0)
(13/74) Installing xz-libs (5.4.5-r0)
(14/74) Installing libxml2 (2.11.7-r0)
(15/74) Installing bind-libs (9.18.24-r1)
(16/74) Installing bind-tools (9.18.24-r1)
(17/74) Installing libgcc (13.2.1_git20231014-r0)
(18/74) Installing libexpat (2.6.2-r0)
(19/74) Installing libbz2 (1.0.8-r6)
(20/74) Installing libffi (3.4.4-r3)
(21/74) Installing gdbm (1.23-r1)
(22/74) Installing libstdc++ (13.2.1_git20231014-r0)
(23/74) Installing mpdecimal (2.5.1-r2)
(24/74) Installing ncurses-terminfo-base (6.4_p20231125-r0)
(25/74) Installing libncursesw (6.4_p20231125-r0)
(26/74) Installing libpanelw (6.4_p20231125-r0)
(27/74) Installing readline (8.2.1-r2)
(28/74) Installing sqlite-libs (3.44.2-r0)
(29/74) Installing python3 (3.11.9-r0)
(30/74) Installing python3-pycache-pyc0 (3.11.9-r0)
(31/74) Installing pyc (3.11.9-r0)
(32/74) Installing py3-setuptools-pyc (68.2.2-r0)
(33/74) Installing py3-pip-pyc (23.3.1-r0)
(34/74) Installing py3-parsing (3.1.1-r0)
(35/74) Installing py3-parsing-pyc (3.1.1-r0)
(36/74) Installing py3-packaging-pyc (23.2-r0)
(37/74) Installing python3-pyc (3.11.9-r0)
(38/74) Installing py3-packaging (23.2-r0)
(39/74) Installing py3-setuptools (68.2.2-r0)
(40/74) Installing py3-pip (23.3.1-r0)
(41/74) Installing dbus-libs (1.14.10-r0)
(42/74) Installing dbus (1.14.10-r0)
Executing dbus-1.14.10-r0.pre-install
Executing dbus-1.14.10-r0.post-install
(43/74) Installing dbus-daemon-launch-helper (1.14.10-r0)
(44/74) Installing oniguruma (6.9.9-r0)
(45/74) Installing jq (1.7.1-r0)
(46/74) Installing cjson (1.7.17-r0)
(47/74) Installing c-ares (1.27.0-r0)
(48/74) Installing mosquitto-libs (2.0.18-r0)
(49/74) Installing libwebsockets (4.3.3-r0)
(50/74) Installing mosquitto (2.0.18-r0)
Executing mosquitto-2.0.18-r0.pre-install
(51/74) Installing openssl (3.1.4-r6)
(52/74) Installing libxau (1.0.11-r3)
(53/74) Installing libmd (1.1.0-r0)
(54/74) Installing libbsd (0.11.7-r3)
(55/74) Installing libxdmcp (1.1.4-r3)
(56/74) Installing libxcb (1.16-r0)
(57/74) Installing libx11 (1.8.7-r0)
(58/74) Installing libxext (1.3.5-r3)
(59/74) Installing libxrender (0.9.11-r4)
(60/74) Installing brotli-libs (1.1.0-r1)
(61/74) Installing libpng (1.6.40-r0)
(62/74) Installing freetype (2.13.2-r0)
(63/74) Installing fontconfig (2.14.2-r4)
(64/74) Installing pixman (0.42.2-r2)
(65/74) Installing cairo (1.18.0-r0)
(66/74) Installing libintl (0.22.3-r0)
(67/74) Installing libblkid (2.39.3-r0)
(68/74) Installing libmount (2.39.3-r0)
(69/74) Installing pcre2 (10.42-r2)
(70/74) Installing glib (2.78.4-r0)
(71/74) Installing cairo-gobject (1.18.0-r0)
(72/74) Installing gobject-introspection (1.78.1-r0)
(73/74) Installing py3-gobject3 (3.46.0-r1)
(74/74) Installing tini (0.19.0-r2)
Executing busybox-1.36.1-r15.trigger
Executing dbus-1.14.10-r0.trigger
Executing glib-2.78.4-r0.trigger
OK: 91 MiB in 87 packages
+ python3 -m venv --system-site-packages /app/venv
+ . /app/venv/bin/activate
+ deactivate nondestructive
+ '[' -n  ]
+ '[' -n  ]
+ hash -r
+ '[' -n  ]
+ unset VIRTUAL_ENV
+ unset VIRTUAL_ENV_PROMPT
+ '[' '!' nondestructive '=' nondestructive ]
+ VIRTUAL_ENV=/app/venv
+ export VIRTUAL_ENV
+ _OLD_VIRTUAL_PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ PATH=/app/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ export PATH
+ '[' -n  ]
+ '[' -z  ]
+ _OLD_VIRTUAL_PS1='\w \$ '
+ PS1='(venv) \w \$ '
+ export PS1
+ VIRTUAL_ENV_PROMPT='(venv) '
+ export VIRTUAL_ENV_PROMPT
+ hash -r
+ pip3 install pydbus paho-mqtt dnspython
Collecting pydbus
  Downloading pydbus-0.6.0-py2.py3-none-any.whl.metadata (3.8 kB)
Collecting paho-mqtt
  Downloading paho_mqtt-2.0.0-py3-none-any.whl.metadata (23 kB)
Collecting dnspython
  Downloading dnspython-2.6.1-py3-none-any.whl.metadata (5.8 kB)
Downloading pydbus-0.6.0-py2.py3-none-any.whl (19 kB)
Downloading paho_mqtt-2.0.0-py3-none-any.whl (66 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 66.9/66.9 kB 621.6 kB/s eta 0:00:00
Downloading dnspython-2.6.1-py3-none-any.whl (307 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 307.7/307.7 kB 5.4 MB/s eta 0:00:00
Installing collected packages: pydbus, paho-mqtt, dnspython
Successfully installed dnspython-2.6.1 paho-mqtt-2.0.0 pydbus-0.6.0
Removing intermediate container a949984ff5e4
 ---> 4d2cf755e0a7
Step 5/21 : COPY src/ /app/
 ---> 3ced6bee6503
Step 6/21 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1a2231f6c60c
Removing intermediate container 1a2231f6c60c
 ---> 1f964ce014ca
Step 7/21 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 8599c4e09c41
Removing intermediate container 8599c4e09c41
 ---> 95ac92d36ee3
Step 8/21 : LABEL com.veea.vhc.version="1.2.1-1"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in f66b977747a2
Removing intermediate container f66b977747a2
 ---> 7e2b6b34002b
Step 9/21 : LABEL com.veea.vhc.app.name="vh_dmqtt_client"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 871c9a4eee0e
Removing intermediate container 871c9a4eee0e
 ---> 323da2174d0a
Step 10/21 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4912ef0192e1
Removing intermediate container 4912ef0192e1
 ---> 702e764865e1
Step 11/21 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in f5f3c60e2f2c
Removing intermediate container f5f3c60e2f2c
 ---> 42a3e69c737f
Step 12/21 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in ff191640ce6b
Removing intermediate container ff191640ce6b
 ---> ab9bb767729f
Step 13/21 : LABEL com.veea.authentication.identifier="PARTNER;0000000D;1632209644,1947569644;79E/jb0cEwOekGlfRD+M6YXgGLkuHaeeklX2nN5QeGo=;sha256;veeahub_license_server;MEYCIQDWL5lXKhNaYnIClus0rzTAr2s7CAWimspDjO/qq1hKBwIhAItYRwS7FaYt1UW3tI4PLSf4gGZ98yCLERPKzYukD1Gj"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 468e45469847
Removing intermediate container 468e45469847
 ---> 32323bc520b3
Step 14/21 : LABEL com.veea.image.persistent_uuid="0000000D-183A-4415-B476-BFFA3BFF0B2C"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in efab825cdfb1
Removing intermediate container efab825cdfb1
 ---> 505260f75882
Step 15/21 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 9e4e6a733647
Removing intermediate container 9e4e6a733647
 ---> ea8eb2a15949
Step 16/21 : LABEL com.veea.authorisation.volumes.persist1="persistent-volume"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e5c665d042be
Removing intermediate container e5c665d042be
 ---> 0a990693758f
Step 17/21 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAL3vKQdknJVtMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDRaFw0zMTA5MTkwNzM0MDRaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIjA9Lqlw+2BF7kfUa0bjs2ucITEH7DkbGECXL6m57iFmYb8WE8N4H/X5tahNb8ivq1oCQqoD81vZC9k6Ar8g3WjgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAwRCBTaWduaW5nIENlcnRpZmljYXRlggkAve8pB2SclW0wHQYDVR0OBBYEFF6xVNAwqerRl3eiml1vTEF6wOKpMA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAI9kBqOFcb+iZdhJ4MNQGZmVVuv/fZ55V5hGtv7pkmiqAiBnMiON8hHyEvO47ElB9m/wFLucCC7aHddzMw37R4Ex3w=="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in f5c33b0d898d
Removing intermediate container f5c33b0d898d
 ---> 79aff996da24
Step 18/21 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in af2b085fbd4d
Removing intermediate container af2b085fbd4d
 ---> 40861d582e28
Step 19/21 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 96da9ff5d077
Removing intermediate container 96da9ff5d077
 ---> e50dc4989368
Step 20/21 : CMD ["/app/start-client.sh"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 81cd762e3199
Removing intermediate container 81cd762e3199
 ---> 36b189b7a532
Step 21/21 : ENTRYPOINT ["tini", "--"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4dbfc74b9568
Removing intermediate container 4dbfc74b9568
 ---> 19078b43beb4
Successfully built 19078b43beb4
Successfully tagged vh_dmqtt_client-arm32v7:1.0.0
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
Saving: vh_dmqtt_client arm32v7
  Writing vh_dmqtt_client-arm32v7:1.0.0.unsigned.tar
Signing: vh_dmqtt_client arm32v7
INFO: Sending auth request to https://qa-auth.veea.co/auth/
INFO: Sending Partner ID request to https://qa.veea.co/enrollment/partner/user/
INFO: Success
  Processing: vh_dmqtt_client-arm32v7:1.0.0
    Docker TAG:      vh_dmqtt_client-arm32v7:1.0.0
    Feature Set:     /opt/veea/vht/bin/config/features.json
    Rule Set:        /opt/veea/vht/bin/config/verify.json
    Working folder:  /tmp/tmp97uxldma
    Signing Server   https://signing.qa.veea.co/
    Signing Key      None
    Signing Cert     None
    Partner Cert     /home/jstrain/.vhc/veea-partner-0000000D-cert.pem
    OpenSSL Arguments:
      -engine=pkcs11
      -keyform=engine
  Verifying unsigned image
  Signing unsigned image
    Writing /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm32v7/vh_dmqtt_client-arm32v7:1.0.0.signed.tar
Verifying: vh_dmqtt_client arm32v7
  Verifying signed image
Generating: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/swarm.conf
Building metadata: vh_dmqtt_client arm32v7
Releasing:  vh_dmqtt_client arm32v7
  Reading metadata: vh_dmqtt_client arm32v7
  Reading manifest: vh_dmqtt_client arm32v7
  Creating metadata CMS: vh_dmqtt_client arm32v7
  Signing metadata
  Creating release archive: vh_dmqtt_client arm32v7
Release complete: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm32v7/vh_dmqtt_client-arm32v7-release-1.0.0.tgz
Building: arm64v8
No need to re-generate Dockerfile....skipping
/home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/Dockerfile is newer than the vh_dmqtt_client-arm64v8:1.0.0 docker image.
Compiling image: vh_dmqtt_client arm64v8
Pruning previous instance of the same image
docker build  --build-arg ARCH=arm64v8 -t vh_dmqtt_client-arm64v8:1.0.0 -f /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/Dockerfile /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client
Sending build context to Docker daemon  281.2MB
Step 1/21 : ARG ARCH
Step 2/21 : FROM $ARCH/alpine:3.19 as builder
 ---> ace17d5d883e
Step 3/21 : WORKDIR /app
 ---> Using cache
 ---> 57f22c25afe6
Step 4/21 : RUN set -x &&     apk --no-cache add jq      python3 py3-gobject3 tini dbus bind-tools openssl      mosquitto cmd:pip3 &&     python3 -m venv --system-site-packages /app/venv &&     . /app/venv/bin/activate &&     pip3 install pydbus paho-mqtt dnspython
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in facdc75eb53b
+ apk --no-cache add jq python3 py3-gobject3 tini dbus bind-tools openssl mosquitto cmd:pip3
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/aarch64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/aarch64/APKINDEX.tar.gz
(1/74) Upgrading libcrypto3 (3.1.4-r5 -> 3.1.4-r6)
(2/74) Upgrading libssl3 (3.1.4-r5 -> 3.1.4-r6)
(3/74) Installing fstrm (0.6.1-r4)
(4/74) Installing krb5-conf (1.0-r2)
(5/74) Installing libcom_err (1.47.0-r5)
(6/74) Installing keyutils-libs (1.6.3-r3)
(7/74) Installing libverto (0.3.2-r2)
(8/74) Installing krb5-libs (1.21.2-r0)
(9/74) Installing json-c (0.17-r0)
(10/74) Installing nghttp2-libs (1.58.0-r0)
(11/74) Installing protobuf-c (1.4.1-r7)
(12/74) Installing libuv (1.47.0-r0)
(13/74) Installing xz-libs (5.4.5-r0)
(14/74) Installing libxml2 (2.11.7-r0)
(15/74) Installing bind-libs (9.18.24-r1)
(16/74) Installing bind-tools (9.18.24-r1)
(17/74) Installing libexpat (2.6.2-r0)
(18/74) Installing libbz2 (1.0.8-r6)
(19/74) Installing libffi (3.4.4-r3)
(20/74) Installing gdbm (1.23-r1)
(21/74) Installing libgcc (13.2.1_git20231014-r0)
(22/74) Installing libstdc++ (13.2.1_git20231014-r0)
(23/74) Installing mpdecimal (2.5.1-r2)
(24/74) Installing ncurses-terminfo-base (6.4_p20231125-r0)
(25/74) Installing libncursesw (6.4_p20231125-r0)
(26/74) Installing libpanelw (6.4_p20231125-r0)
(27/74) Installing readline (8.2.1-r2)
(28/74) Installing sqlite-libs (3.44.2-r0)
(29/74) Installing python3 (3.11.9-r0)
(30/74) Installing python3-pycache-pyc0 (3.11.9-r0)
(31/74) Installing pyc (3.11.9-r0)
(32/74) Installing py3-setuptools-pyc (68.2.2-r0)
(33/74) Installing py3-pip-pyc (23.3.1-r0)
(34/74) Installing py3-parsing (3.1.1-r0)
(35/74) Installing py3-parsing-pyc (3.1.1-r0)
(36/74) Installing py3-packaging-pyc (23.2-r0)
(37/74) Installing python3-pyc (3.11.9-r0)
(38/74) Installing py3-packaging (23.2-r0)
(39/74) Installing py3-setuptools (68.2.2-r0)
(40/74) Installing py3-pip (23.3.1-r0)
(41/74) Installing dbus-libs (1.14.10-r0)
(42/74) Installing dbus (1.14.10-r0)
Executing dbus-1.14.10-r0.pre-install
Executing dbus-1.14.10-r0.post-install
(43/74) Installing dbus-daemon-launch-helper (1.14.10-r0)
(44/74) Installing oniguruma (6.9.9-r0)
(45/74) Installing jq (1.7.1-r0)
(46/74) Installing cjson (1.7.17-r0)
(47/74) Installing c-ares (1.27.0-r0)
(48/74) Installing mosquitto-libs (2.0.18-r0)
(49/74) Installing libwebsockets (4.3.3-r0)
(50/74) Installing mosquitto (2.0.18-r0)
Executing mosquitto-2.0.18-r0.pre-install
(51/74) Installing openssl (3.1.4-r6)
(52/74) Installing libxau (1.0.11-r3)
(53/74) Installing libmd (1.1.0-r0)
(54/74) Installing libbsd (0.11.7-r3)
(55/74) Installing libxdmcp (1.1.4-r3)
(56/74) Installing libxcb (1.16-r0)
(57/74) Installing libx11 (1.8.7-r0)
(58/74) Installing libxext (1.3.5-r3)
(59/74) Installing libxrender (0.9.11-r4)
(60/74) Installing brotli-libs (1.1.0-r1)
(61/74) Installing libpng (1.6.40-r0)
(62/74) Installing freetype (2.13.2-r0)
(63/74) Installing fontconfig (2.14.2-r4)
(64/74) Installing pixman (0.42.2-r2)
(65/74) Installing cairo (1.18.0-r0)
(66/74) Installing libintl (0.22.3-r0)
(67/74) Installing libblkid (2.39.3-r0)
(68/74) Installing libmount (2.39.3-r0)
(69/74) Installing pcre2 (10.42-r2)
(70/74) Installing glib (2.78.4-r0)
(71/74) Installing cairo-gobject (1.18.0-r0)
(72/74) Installing gobject-introspection (1.78.1-r0)
(73/74) Installing py3-gobject3 (3.46.0-r1)
(74/74) Installing tini (0.19.0-r2)
Executing busybox-1.36.1-r15.trigger
Executing dbus-1.14.10-r0.trigger
Executing glib-2.78.4-r0.trigger
OK: 113 MiB in 87 packages
+ python3 -m venv --system-site-packages /app/venv
+ . /app/venv/bin/activate
+ deactivate nondestructive
+ '[' -n  ]
+ '[' -n  ]
+ hash -r
+ '[' -n  ]
+ unset VIRTUAL_ENV
+ unset VIRTUAL_ENV_PROMPT
+ '[' '!' nondestructive '=' nondestructive ]
+ VIRTUAL_ENV=/app/venv
+ export VIRTUAL_ENV
+ _OLD_VIRTUAL_PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ PATH=/app/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ export PATH
+ '[' -n  ]
+ '[' -z  ]
+ _OLD_VIRTUAL_PS1='\w \$ '
+ PS1='(venv) \w \$ '
+ export PS1
+ VIRTUAL_ENV_PROMPT='(venv) '
+ export VIRTUAL_ENV_PROMPT
+ hash -r
+ pip3 install pydbus paho-mqtt dnspython
Collecting pydbus
  Downloading pydbus-0.6.0-py2.py3-none-any.whl.metadata (3.8 kB)
Collecting paho-mqtt
  Downloading paho_mqtt-2.0.0-py3-none-any.whl.metadata (23 kB)
Collecting dnspython
  Downloading dnspython-2.6.1-py3-none-any.whl.metadata (5.8 kB)
Downloading pydbus-0.6.0-py2.py3-none-any.whl (19 kB)
Downloading paho_mqtt-2.0.0-py3-none-any.whl (66 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 66.9/66.9 kB 1.1 MB/s eta 0:00:00
Downloading dnspython-2.6.1-py3-none-any.whl (307 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 307.7/307.7 kB 7.3 MB/s eta 0:00:00
Installing collected packages: pydbus, paho-mqtt, dnspython
Successfully installed dnspython-2.6.1 paho-mqtt-2.0.0 pydbus-0.6.0
Removing intermediate container facdc75eb53b
 ---> b40f2a0c6cf9
Step 5/21 : COPY src/ /app/
 ---> 3461bca14d03
Step 6/21 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in aa3214459714
Removing intermediate container aa3214459714
 ---> 13ffdc977f54
Step 7/21 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a4db710bb573
Removing intermediate container a4db710bb573
 ---> 33985a13d265
Step 8/21 : LABEL com.veea.vhc.version="1.2.1-1"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a3941d6f9c89
Removing intermediate container a3941d6f9c89
 ---> 9bc2a244c19a
Step 9/21 : LABEL com.veea.vhc.app.name="vh_dmqtt_client"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e069cc4b94ed
Removing intermediate container e069cc4b94ed
 ---> 9f2849a9f692
Step 10/21 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a030923781d0
Removing intermediate container a030923781d0
 ---> 1bec6c0fca06
Step 11/21 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in bb05f38284ce
Removing intermediate container bb05f38284ce
 ---> af6010e337b7
Step 12/21 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 78eb8c103f03
Removing intermediate container 78eb8c103f03
 ---> f3862525e863
Step 13/21 : LABEL com.veea.authentication.identifier="PARTNER;0000000D;1632209644,1947569644;79E/jb0cEwOekGlfRD+M6YXgGLkuHaeeklX2nN5QeGo=;sha256;veeahub_license_server;MEYCIQDWL5lXKhNaYnIClus0rzTAr2s7CAWimspDjO/qq1hKBwIhAItYRwS7FaYt1UW3tI4PLSf4gGZ98yCLERPKzYukD1Gj"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7f54357276bd
Removing intermediate container 7f54357276bd
 ---> 505690ac538d
Step 14/21 : LABEL com.veea.image.persistent_uuid="0000000D-183A-4415-B476-BFFA3BFF0B2C"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 742ccfdb9031
Removing intermediate container 742ccfdb9031
 ---> 624df7ed0965
Step 15/21 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 51f1dfaa7cb4
Removing intermediate container 51f1dfaa7cb4
 ---> 820962b0cacc
Step 16/21 : LABEL com.veea.authorisation.volumes.persist1="persistent-volume"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 8f7798b28a06
Removing intermediate container 8f7798b28a06
 ---> fe83319bb230
Step 17/21 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAL3vKQdknJVtMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDRaFw0zMTA5MTkwNzM0MDRaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIjA9Lqlw+2BF7kfUa0bjs2ucITEH7DkbGECXL6m57iFmYb8WE8N4H/X5tahNb8ivq1oCQqoD81vZC9k6Ar8g3WjgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAwRCBTaWduaW5nIENlcnRpZmljYXRlggkAve8pB2SclW0wHQYDVR0OBBYEFF6xVNAwqerRl3eiml1vTEF6wOKpMA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAI9kBqOFcb+iZdhJ4MNQGZmVVuv/fZ55V5hGtv7pkmiqAiBnMiON8hHyEvO47ElB9m/wFLucCC7aHddzMw37R4Ex3w=="
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in cb5d7a24dd50
Removing intermediate container cb5d7a24dd50
 ---> c38c33d87f88
Step 18/21 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 77bd0a14524b
Removing intermediate container 77bd0a14524b
 ---> c2fc76bbc79c
Step 19/21 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 5b06a359e957
Removing intermediate container 5b06a359e957
 ---> 83cc7571894e
Step 20/21 : CMD ["/app/start-client.sh"]
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in d19ac3d4caca
Removing intermediate container d19ac3d4caca
 ---> 042364d932f3
Step 21/21 : ENTRYPOINT ["tini", "--"]
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in c81fcca81cf8
Removing intermediate container c81fcca81cf8
 ---> 76780808e563
Successfully built 76780808e563
Successfully tagged vh_dmqtt_client-arm64v8:1.0.0
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
Saving: vh_dmqtt_client arm64v8
  Writing vh_dmqtt_client-arm64v8:1.0.0.unsigned.tar
Signing: vh_dmqtt_client arm64v8
INFO: Sending auth request to https://qa-auth.veea.co/auth/
INFO: Sending Partner ID request to https://qa.veea.co/enrollment/partner/user/
INFO: Success
  Processing: vh_dmqtt_client-arm64v8:1.0.0
    Docker TAG:      vh_dmqtt_client-arm64v8:1.0.0
    Feature Set:     /opt/veea/vht/bin/config/features.json
    Rule Set:        /opt/veea/vht/bin/config/verify.json
    Working folder:  /tmp/tmpc8sy08hj
    Signing Server   https://signing.qa.veea.co/
    Signing Key      None
    Signing Cert     None
    Partner Cert     /home/jstrain/.vhc/veea-partner-0000000D-cert.pem
    OpenSSL Arguments:
      -engine=pkcs11
      -keyform=engine
  Verifying unsigned image
  Signing unsigned image
    Writing /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm64v8/vh_dmqtt_client-arm64v8:1.0.0.signed.tar
Verifying: vh_dmqtt_client arm64v8
  Verifying signed image
No need to re-generate swarm file....skipping
Building metadata: vh_dmqtt_client arm64v8
Releasing:  vh_dmqtt_client arm64v8
  Reading metadata: vh_dmqtt_client arm64v8
  Reading manifest: vh_dmqtt_client arm64v8
  Creating metadata CMS: vh_dmqtt_client arm64v8
  Signing metadata
  Creating release archive: vh_dmqtt_client arm64v8
Release complete: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm64v8/vh_dmqtt_client-arm64v8-release-1.0.0.tgz
Processing: vh_dmqtt_mesh_broker /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker
Building: arm32v7
Generating: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/Dockerfile
/home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/Dockerfile is newer than the vh_dmqtt_broker-arm32v7:1.0.0 docker image.
Compiling image: vh_dmqtt_broker arm32v7
Pruning previous instance of the same image
docker build  --build-arg ARCH=arm32v7 -t vh_dmqtt_broker-arm32v7:1.0.0 -f /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/Dockerfile /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker
Sending build context to Docker daemon  30.21kB
Step 1/25 : ARG ARCH
Step 2/25 : FROM $ARCH/alpine:3.19 as builder
 ---> 30c69795e46b
Step 3/25 : WORKDIR /app
 ---> Using cache
 ---> f3f0c7c4e055
Step 4/25 : RUN set -x &&     apk --no-cache add jq      python3 py3-gobject3 tini dbus bind-tools openssl      mosquitto cmd:pip3 &&     python3 -m venv --system-site-packages /app/venv &&     . /app/venv/bin/activate &&     pip3 install pydbus paho-mqtt dnspython jinja2
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 82d25a86017c
+ apk --no-cache add jq python3 py3-gobject3 tini dbus bind-tools openssl mosquitto cmd:pip3
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/armv7/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/armv7/APKINDEX.tar.gz
(1/74) Upgrading libcrypto3 (3.1.4-r5 -> 3.1.4-r6)
(2/74) Upgrading libssl3 (3.1.4-r5 -> 3.1.4-r6)
(3/74) Installing fstrm (0.6.1-r4)
(4/74) Installing krb5-conf (1.0-r2)
(5/74) Installing libcom_err (1.47.0-r5)
(6/74) Installing keyutils-libs (1.6.3-r3)
(7/74) Installing libverto (0.3.2-r2)
(8/74) Installing krb5-libs (1.21.2-r0)
(9/74) Installing json-c (0.17-r0)
(10/74) Installing nghttp2-libs (1.58.0-r0)
(11/74) Installing protobuf-c (1.4.1-r7)
(12/74) Installing libuv (1.47.0-r0)
(13/74) Installing xz-libs (5.4.5-r0)
(14/74) Installing libxml2 (2.11.7-r0)
(15/74) Installing bind-libs (9.18.24-r1)
(16/74) Installing bind-tools (9.18.24-r1)
(17/74) Installing libgcc (13.2.1_git20231014-r0)
(18/74) Installing libexpat (2.6.2-r0)
(19/74) Installing libbz2 (1.0.8-r6)
(20/74) Installing libffi (3.4.4-r3)
(21/74) Installing gdbm (1.23-r1)
(22/74) Installing libstdc++ (13.2.1_git20231014-r0)
(23/74) Installing mpdecimal (2.5.1-r2)
(24/74) Installing ncurses-terminfo-base (6.4_p20231125-r0)
(25/74) Installing libncursesw (6.4_p20231125-r0)
(26/74) Installing libpanelw (6.4_p20231125-r0)
(27/74) Installing readline (8.2.1-r2)
(28/74) Installing sqlite-libs (3.44.2-r0)
(29/74) Installing python3 (3.11.9-r0)
(30/74) Installing python3-pycache-pyc0 (3.11.9-r0)
(31/74) Installing pyc (3.11.9-r0)
(32/74) Installing py3-setuptools-pyc (68.2.2-r0)
(33/74) Installing py3-pip-pyc (23.3.1-r0)
(34/74) Installing py3-parsing (3.1.1-r0)
(35/74) Installing py3-parsing-pyc (3.1.1-r0)
(36/74) Installing py3-packaging-pyc (23.2-r0)
(37/74) Installing python3-pyc (3.11.9-r0)
(38/74) Installing py3-packaging (23.2-r0)
(39/74) Installing py3-setuptools (68.2.2-r0)
(40/74) Installing py3-pip (23.3.1-r0)
(41/74) Installing dbus-libs (1.14.10-r0)
(42/74) Installing dbus (1.14.10-r0)
Executing dbus-1.14.10-r0.pre-install
Executing dbus-1.14.10-r0.post-install
(43/74) Installing dbus-daemon-launch-helper (1.14.10-r0)
(44/74) Installing oniguruma (6.9.9-r0)
(45/74) Installing jq (1.7.1-r0)
(46/74) Installing cjson (1.7.17-r0)
(47/74) Installing c-ares (1.27.0-r0)
(48/74) Installing mosquitto-libs (2.0.18-r0)
(49/74) Installing libwebsockets (4.3.3-r0)
(50/74) Installing mosquitto (2.0.18-r0)
Executing mosquitto-2.0.18-r0.pre-install
(51/74) Installing openssl (3.1.4-r6)
(52/74) Installing libxau (1.0.11-r3)
(53/74) Installing libmd (1.1.0-r0)
(54/74) Installing libbsd (0.11.7-r3)
(55/74) Installing libxdmcp (1.1.4-r3)
(56/74) Installing libxcb (1.16-r0)
(57/74) Installing libx11 (1.8.7-r0)
(58/74) Installing libxext (1.3.5-r3)
(59/74) Installing libxrender (0.9.11-r4)
(60/74) Installing brotli-libs (1.1.0-r1)
(61/74) Installing libpng (1.6.40-r0)
(62/74) Installing freetype (2.13.2-r0)
(63/74) Installing fontconfig (2.14.2-r4)
(64/74) Installing pixman (0.42.2-r2)
(65/74) Installing cairo (1.18.0-r0)
(66/74) Installing libintl (0.22.3-r0)
(67/74) Installing libblkid (2.39.3-r0)
(68/74) Installing libmount (2.39.3-r0)
(69/74) Installing pcre2 (10.42-r2)
(70/74) Installing glib (2.78.4-r0)
(71/74) Installing cairo-gobject (1.18.0-r0)
(72/74) Installing gobject-introspection (1.78.1-r0)
(73/74) Installing py3-gobject3 (3.46.0-r1)
(74/74) Installing tini (0.19.0-r2)
Executing busybox-1.36.1-r15.trigger
Executing dbus-1.14.10-r0.trigger
Executing glib-2.78.4-r0.trigger
OK: 91 MiB in 87 packages
+ python3 -m venv --system-site-packages /app/venv
+ . /app/venv/bin/activate
+ deactivate nondestructive
+ '[' -n  ]
+ '[' -n  ]
+ hash -r
+ '[' -n  ]
+ unset VIRTUAL_ENV
+ unset VIRTUAL_ENV_PROMPT
+ '[' '!' nondestructive '=' nondestructive ]
+ VIRTUAL_ENV=/app/venv
+ export VIRTUAL_ENV
+ _OLD_VIRTUAL_PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ PATH=/app/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ export PATH
+ '[' -n  ]
+ '[' -z  ]
+ _OLD_VIRTUAL_PS1='\w \$ '
+ PS1='(venv) \w \$ '
+ export PS1
+ VIRTUAL_ENV_PROMPT='(venv) '
+ export VIRTUAL_ENV_PROMPT
+ hash -r
+ pip3 install pydbus paho-mqtt dnspython jinja2
Collecting pydbus
  Downloading pydbus-0.6.0-py2.py3-none-any.whl.metadata (3.8 kB)
Collecting paho-mqtt
  Downloading paho_mqtt-2.0.0-py3-none-any.whl.metadata (23 kB)
Collecting dnspython
  Downloading dnspython-2.6.1-py3-none-any.whl.metadata (5.8 kB)
Collecting jinja2
  Downloading Jinja2-3.1.3-py3-none-any.whl.metadata (3.3 kB)
Collecting MarkupSafe>=2.0 (from jinja2)
  Downloading MarkupSafe-2.1.5.tar.gz (19 kB)
  Installing build dependencies: started
  Installing build dependencies: finished with status 'done'
  Getting requirements to build wheel: started
  Getting requirements to build wheel: finished with status 'done'
  Installing backend dependencies: started
  Installing backend dependencies: finished with status 'done'
  Preparing metadata (pyproject.toml): started
  Preparing metadata (pyproject.toml): finished with status 'done'
Downloading pydbus-0.6.0-py2.py3-none-any.whl (19 kB)
Downloading paho_mqtt-2.0.0-py3-none-any.whl (66 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 66.9/66.9 kB 558.7 kB/s eta 0:00:00
Downloading dnspython-2.6.1-py3-none-any.whl (307 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 307.7/307.7 kB 3.3 MB/s eta 0:00:00
Downloading Jinja2-3.1.3-py3-none-any.whl (133 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.2/133.2 kB 2.1 MB/s eta 0:00:00
Building wheels for collected packages: MarkupSafe
  Building wheel for MarkupSafe (pyproject.toml): started
  Building wheel for MarkupSafe (pyproject.toml): finished with status 'done'
  Created wheel for MarkupSafe: filename=MarkupSafe-2.1.5-py3-none-any.whl size=9888 sha256=b523ec76844c7da7b3129a52d810261ef8b706ee03827d4d5deca9e63f05b585
  Stored in directory: /root/.cache/pip/wheels/6d/eb/a5/82b178b683b6dc068c2eb7b38fc35ebc7ea378b5faad3d1326
Successfully built MarkupSafe
Installing collected packages: pydbus, paho-mqtt, MarkupSafe, dnspython, jinja2
Successfully installed MarkupSafe-2.1.5 dnspython-2.6.1 jinja2-3.1.3 paho-mqtt-2.0.0 pydbus-0.6.0
Removing intermediate container 82d25a86017c
 ---> 92e5784acc39
Step 5/25 : COPY src/ /app/
 ---> 58c3f3e6c18e
Step 6/25 : COPY etc/ /etc/
 ---> 43a0abec8929
Step 7/25 : RUN chmod -R 777 /etc/mosquitto
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in feff29d4c27f
Removing intermediate container feff29d4c27f
 ---> ee19ce633be5
Step 8/25 : EXPOSE 1883
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e99c79905189
Removing intermediate container e99c79905189
 ---> d19e1ba6be91
Step 9/25 : EXPOSE 5678
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 36267470a0ed
Removing intermediate container 36267470a0ed
 ---> 53e4fbf81b6b
Step 10/25 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 65dea9fddeee
Removing intermediate container 65dea9fddeee
 ---> ea17be7d05f6
Step 11/25 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in ddfa7b42e218
Removing intermediate container ddfa7b42e218
 ---> 2ad0bed4da38
Step 12/25 : LABEL com.veea.vhc.version="1.2.1-1"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 245df638ce38
Removing intermediate container 245df638ce38
 ---> 516592b12935
Step 13/25 : LABEL com.veea.vhc.app.name="vh_dmqtt_broker"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 966d4328c59c
Removing intermediate container 966d4328c59c
 ---> b699a937391d
Step 14/25 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 0f460cee26d3
Removing intermediate container 0f460cee26d3
 ---> 099e49e34865
Step 15/25 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in cabf412865d1
Removing intermediate container cabf412865d1
 ---> ed8d5927deec
Step 16/25 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 0455a5edba6d
Removing intermediate container 0455a5edba6d
 ---> 9c08940ff66d
Step 17/25 : LABEL com.veea.authentication.identifier="PARTNER;0000000D;1632209644,1947569644;79E/jb0cEwOekGlfRD+M6YXgGLkuHaeeklX2nN5QeGo=;sha256;veeahub_license_server;MEYCIQDWL5lXKhNaYnIClus0rzTAr2s7CAWimspDjO/qq1hKBwIhAItYRwS7FaYt1UW3tI4PLSf4gGZ98yCLERPKzYukD1Gj"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 212cc392eaf9
Removing intermediate container 212cc392eaf9
 ---> 453b04f01ac0
Step 18/25 : LABEL com.veea.image.persistent_uuid="0000000D-C34F-4E1A-9E57-EB59F9762DF1"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 829a364be83b
Removing intermediate container 829a364be83b
 ---> f72ecb9799d5
Step 19/25 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 212c29658bcc
Removing intermediate container 212c29658bcc
 ---> 10d9f4a542c1
Step 20/25 : LABEL com.veea.authorisation.volumes.persist1="persistent-volume"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in a479ac7ab618
Removing intermediate container a479ac7ab618
 ---> fbfcaaaf3cf7
Step 21/25 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAL3vKQdknJVtMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDRaFw0zMTA5MTkwNzM0MDRaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIjA9Lqlw+2BF7kfUa0bjs2ucITEH7DkbGECXL6m57iFmYb8WE8N4H/X5tahNb8ivq1oCQqoD81vZC9k6Ar8g3WjgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAwRCBTaWduaW5nIENlcnRpZmljYXRlggkAve8pB2SclW0wHQYDVR0OBBYEFF6xVNAwqerRl3eiml1vTEF6wOKpMA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAI9kBqOFcb+iZdhJ4MNQGZmVVuv/fZ55V5hGtv7pkmiqAiBnMiON8hHyEvO47ElB9m/wFLucCC7aHddzMw37R4Ex3w=="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 5e5db5dd93be
Removing intermediate container 5e5db5dd93be
 ---> 558b0d10010f
Step 22/25 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4052479da737
Removing intermediate container 4052479da737
 ---> b34265ee2295
Step 23/25 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in b4351838b703
Removing intermediate container b4351838b703
 ---> e93f313e315b
Step 24/25 : CMD ["/app/start-broker.sh"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in f3afd21336c8
Removing intermediate container f3afd21336c8
 ---> 809719d6221d
Step 25/25 : ENTRYPOINT ["tini", "--"]
 ---> [Warning] The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in ed5fbe8918f6
Removing intermediate container ed5fbe8918f6
 ---> 20942e36dadb
Successfully built 20942e36dadb
Successfully tagged vh_dmqtt_broker-arm32v7:1.0.0
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
Saving: vh_dmqtt_broker arm32v7
  Writing vh_dmqtt_broker-arm32v7:1.0.0.unsigned.tar
Signing: vh_dmqtt_broker arm32v7
INFO: Sending auth request to https://qa-auth.veea.co/auth/
INFO: Sending Partner ID request to https://qa.veea.co/enrollment/partner/user/
INFO: Success
  Processing: vh_dmqtt_broker-arm32v7:1.0.0
    Docker TAG:      vh_dmqtt_broker-arm32v7:1.0.0
    Feature Set:     /opt/veea/vht/bin/config/features.json
    Rule Set:        /opt/veea/vht/bin/config/verify.json
    Working folder:  /tmp/tmpuqo0cd5r
    Signing Server   https://signing.qa.veea.co/
    Signing Key      None
    Signing Cert     None
    Partner Cert     /home/jstrain/.vhc/veea-partner-0000000D-cert.pem
    OpenSSL Arguments:
      -engine=pkcs11
      -keyform=engine
  Verifying unsigned image
  Signing unsigned image
    Writing /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm32v7/vh_dmqtt_broker-arm32v7:1.0.0.signed.tar
Verifying: vh_dmqtt_broker arm32v7
  Verifying signed image
Generating: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/swarm.conf
Building metadata: vh_dmqtt_broker arm32v7
Releasing:  vh_dmqtt_broker arm32v7
  Reading metadata: vh_dmqtt_broker arm32v7
  Reading manifest: vh_dmqtt_broker arm32v7
  Creating metadata CMS: vh_dmqtt_broker arm32v7
  Signing metadata
  Creating release archive: vh_dmqtt_broker arm32v7
Release complete: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm32v7/vh_dmqtt_broker-arm32v7-release-1.0.0.tgz
Building: arm64v8
No need to re-generate Dockerfile....skipping
/home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/Dockerfile is newer than the vh_dmqtt_broker-arm64v8:1.0.0 docker image.
Compiling image: vh_dmqtt_broker arm64v8
Pruning previous instance of the same image
docker build  --build-arg ARCH=arm64v8 -t vh_dmqtt_broker-arm64v8:1.0.0 -f /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/Dockerfile /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker
Sending build context to Docker daemon  288.5MB
Step 1/25 : ARG ARCH
Step 2/25 : FROM $ARCH/alpine:3.19 as builder
 ---> ace17d5d883e
Step 3/25 : WORKDIR /app
 ---> Using cache
 ---> 57f22c25afe6
Step 4/25 : RUN set -x &&     apk --no-cache add jq      python3 py3-gobject3 tini dbus bind-tools openssl      mosquitto cmd:pip3 &&     python3 -m venv --system-site-packages /app/venv &&     . /app/venv/bin/activate &&     pip3 install pydbus paho-mqtt dnspython jinja2
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 6026eb5488ca
+ apk --no-cache add jq python3 py3-gobject3 tini dbus bind-tools openssl mosquitto cmd:pip3
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/aarch64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/aarch64/APKINDEX.tar.gz
(1/74) Upgrading libcrypto3 (3.1.4-r5 -> 3.1.4-r6)
(2/74) Upgrading libssl3 (3.1.4-r5 -> 3.1.4-r6)
(3/74) Installing fstrm (0.6.1-r4)
(4/74) Installing krb5-conf (1.0-r2)
(5/74) Installing libcom_err (1.47.0-r5)
(6/74) Installing keyutils-libs (1.6.3-r3)
(7/74) Installing libverto (0.3.2-r2)
(8/74) Installing krb5-libs (1.21.2-r0)
(9/74) Installing json-c (0.17-r0)
(10/74) Installing nghttp2-libs (1.58.0-r0)
(11/74) Installing protobuf-c (1.4.1-r7)
(12/74) Installing libuv (1.47.0-r0)
(13/74) Installing xz-libs (5.4.5-r0)
(14/74) Installing libxml2 (2.11.7-r0)
(15/74) Installing bind-libs (9.18.24-r1)
(16/74) Installing bind-tools (9.18.24-r1)
(17/74) Installing libexpat (2.6.2-r0)
(18/74) Installing libbz2 (1.0.8-r6)
(19/74) Installing libffi (3.4.4-r3)
(20/74) Installing gdbm (1.23-r1)
(21/74) Installing libgcc (13.2.1_git20231014-r0)
(22/74) Installing libstdc++ (13.2.1_git20231014-r0)
(23/74) Installing mpdecimal (2.5.1-r2)
(24/74) Installing ncurses-terminfo-base (6.4_p20231125-r0)
(25/74) Installing libncursesw (6.4_p20231125-r0)
(26/74) Installing libpanelw (6.4_p20231125-r0)
(27/74) Installing readline (8.2.1-r2)
(28/74) Installing sqlite-libs (3.44.2-r0)
(29/74) Installing python3 (3.11.9-r0)
(30/74) Installing python3-pycache-pyc0 (3.11.9-r0)
(31/74) Installing pyc (3.11.9-r0)
(32/74) Installing py3-setuptools-pyc (68.2.2-r0)
(33/74) Installing py3-pip-pyc (23.3.1-r0)
(34/74) Installing py3-parsing (3.1.1-r0)
(35/74) Installing py3-parsing-pyc (3.1.1-r0)
(36/74) Installing py3-packaging-pyc (23.2-r0)
(37/74) Installing python3-pyc (3.11.9-r0)
(38/74) Installing py3-packaging (23.2-r0)
(39/74) Installing py3-setuptools (68.2.2-r0)
(40/74) Installing py3-pip (23.3.1-r0)
(41/74) Installing dbus-libs (1.14.10-r0)
(42/74) Installing dbus (1.14.10-r0)
Executing dbus-1.14.10-r0.pre-install
Executing dbus-1.14.10-r0.post-install
(43/74) Installing dbus-daemon-launch-helper (1.14.10-r0)
(44/74) Installing oniguruma (6.9.9-r0)
(45/74) Installing jq (1.7.1-r0)
(46/74) Installing cjson (1.7.17-r0)
(47/74) Installing c-ares (1.27.0-r0)
(48/74) Installing mosquitto-libs (2.0.18-r0)
(49/74) Installing libwebsockets (4.3.3-r0)
(50/74) Installing mosquitto (2.0.18-r0)
Executing mosquitto-2.0.18-r0.pre-install
(51/74) Installing openssl (3.1.4-r6)
(52/74) Installing libxau (1.0.11-r3)
(53/74) Installing libmd (1.1.0-r0)
(54/74) Installing libbsd (0.11.7-r3)
(55/74) Installing libxdmcp (1.1.4-r3)
(56/74) Installing libxcb (1.16-r0)
(57/74) Installing libx11 (1.8.7-r0)
(58/74) Installing libxext (1.3.5-r3)
(59/74) Installing libxrender (0.9.11-r4)
(60/74) Installing brotli-libs (1.1.0-r1)
(61/74) Installing libpng (1.6.40-r0)
(62/74) Installing freetype (2.13.2-r0)
(63/74) Installing fontconfig (2.14.2-r4)
(64/74) Installing pixman (0.42.2-r2)
(65/74) Installing cairo (1.18.0-r0)
(66/74) Installing libintl (0.22.3-r0)
(67/74) Installing libblkid (2.39.3-r0)
(68/74) Installing libmount (2.39.3-r0)
(69/74) Installing pcre2 (10.42-r2)
(70/74) Installing glib (2.78.4-r0)
(71/74) Installing cairo-gobject (1.18.0-r0)
(72/74) Installing gobject-introspection (1.78.1-r0)
(73/74) Installing py3-gobject3 (3.46.0-r1)
(74/74) Installing tini (0.19.0-r2)
Executing busybox-1.36.1-r15.trigger
Executing dbus-1.14.10-r0.trigger
Executing glib-2.78.4-r0.trigger
OK: 113 MiB in 87 packages
+ python3 -m venv --system-site-packages /app/venv
+ . /app/venv/bin/activate
+ deactivate nondestructive
+ '[' -n  ]
+ '[' -n  ]
+ hash -r
+ '[' -n  ]
+ unset VIRTUAL_ENV
+ unset VIRTUAL_ENV_PROMPT
+ '[' '!' nondestructive '=' nondestructive ]
+ VIRTUAL_ENV=/app/venv
+ export VIRTUAL_ENV
+ _OLD_VIRTUAL_PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ PATH=/app/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
+ export PATH
+ '[' -n  ]
+ '[' -z  ]
+ _OLD_VIRTUAL_PS1='\w \$ '
+ PS1='(venv) \w \$ '
+ export PS1
+ VIRTUAL_ENV_PROMPT='(venv) '
+ export VIRTUAL_ENV_PROMPT
+ hash -r
+ pip3 install pydbus paho-mqtt dnspython jinja2
Collecting pydbus
  Downloading pydbus-0.6.0-py2.py3-none-any.whl.metadata (3.8 kB)
Collecting paho-mqtt
  Downloading paho_mqtt-2.0.0-py3-none-any.whl.metadata (23 kB)
Collecting dnspython
  Downloading dnspython-2.6.1-py3-none-any.whl.metadata (5.8 kB)
Collecting jinja2
  Downloading Jinja2-3.1.3-py3-none-any.whl.metadata (3.3 kB)
Collecting MarkupSafe>=2.0 (from jinja2)
  Downloading MarkupSafe-2.1.5-cp311-cp311-musllinux_1_1_aarch64.whl.metadata (3.0 kB)
Downloading pydbus-0.6.0-py2.py3-none-any.whl (19 kB)
Downloading paho_mqtt-2.0.0-py3-none-any.whl (66 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 66.9/66.9 kB 751.9 kB/s eta 0:00:00
Downloading dnspython-2.6.1-py3-none-any.whl (307 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 307.7/307.7 kB 5.2 MB/s eta 0:00:00
Downloading Jinja2-3.1.3-py3-none-any.whl (133 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.2/133.2 kB 3.9 MB/s eta 0:00:00
Downloading MarkupSafe-2.1.5-cp311-cp311-musllinux_1_1_aarch64.whl (33 kB)
Installing collected packages: pydbus, paho-mqtt, MarkupSafe, dnspython, jinja2
Successfully installed MarkupSafe-2.1.5 dnspython-2.6.1 jinja2-3.1.3 paho-mqtt-2.0.0 pydbus-0.6.0
Removing intermediate container 6026eb5488ca
 ---> b0739fa494c0
Step 5/25 : COPY src/ /app/
 ---> 1f63947f4e82
Step 6/25 : COPY etc/ /etc/
 ---> 1891110b2b57
Step 7/25 : RUN chmod -R 777 /etc/mosquitto
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 9abd6db6a099
Removing intermediate container 9abd6db6a099
 ---> 17b62547bb5c
Step 8/25 : EXPOSE 1883
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 186ca009707f
Removing intermediate container 186ca009707f
 ---> 06f386cd7d03
Step 9/25 : EXPOSE 5678
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 59bd20df68ad
Removing intermediate container 59bd20df68ad
 ---> 0964798cbeac
Step 10/25 : ARG ARCH
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 3fa094ced218
Removing intermediate container 3fa094ced218
 ---> 18ef8bd46011
Step 11/25 : LABEL com.veea.vhc.architecture="$ARCH"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 9251f409980f
Removing intermediate container 9251f409980f
 ---> cdf4806023c6
Step 12/25 : LABEL com.veea.vhc.version="1.2.1-1"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e46410e2aebb
Removing intermediate container e46410e2aebb
 ---> 0578eb0e6836
Step 13/25 : LABEL com.veea.vhc.app.name="vh_dmqtt_broker"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in d7a65a5dbada
Removing intermediate container d7a65a5dbada
 ---> ac46412b0f1c
Step 14/25 : LABEL com.veea.vhc.app.version="1.0.0"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 8a5fc99f8b52
Removing intermediate container 8a5fc99f8b52
 ---> 814537445472
Step 15/25 : LABEL com.veea.vhc.config.proj.version="3"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 7543bf16e0db
Removing intermediate container 7543bf16e0db
 ---> bdea1cbbb436
Step 16/25 : LABEL com.veea.vhc.config.user.version="3"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 3bc539116878
Removing intermediate container 3bc539116878
 ---> 2df5adcd8f3f
Step 17/25 : LABEL com.veea.authentication.identifier="PARTNER;0000000D;1632209644,1947569644;79E/jb0cEwOekGlfRD+M6YXgGLkuHaeeklX2nN5QeGo=;sha256;veeahub_license_server;MEYCIQDWL5lXKhNaYnIClus0rzTAr2s7CAWimspDjO/qq1hKBwIhAItYRwS7FaYt1UW3tI4PLSf4gGZ98yCLERPKzYukD1Gj"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in bf8d3455a304
Removing intermediate container bf8d3455a304
 ---> d5f99727c743
Step 18/25 : LABEL com.veea.image.persistent_uuid="0000000D-C34F-4E1A-9E57-EB59F9762DF1"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 98bb09ad25d0
Removing intermediate container 98bb09ad25d0
 ---> 65b2f41d4ff6
Step 19/25 : LABEL com.veea.authorisation.allowOnUnauthenticatedHost="true"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in ce627ce22888
Removing intermediate container ce627ce22888
 ---> 00f38f5016c1
Step 20/25 : LABEL com.veea.authorisation.volumes.persist1="persistent-volume"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 69132e33303b
Removing intermediate container 69132e33303b
 ---> bb60a5bbd4d1
Step 21/25 : LABEL com.veea.authentication.certificates.partner="MIICHDCCAcKgAwIBAgIJAL3vKQdknJVtMAoGCCqGSM49BAMCMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTAeFw0yMTA5MjEwNzM0MDRaFw0zMTA5MTkwNzM0MDRaMEcxETAPBgNVBAoMCFZlZWEgSW5jMTIwMAYDVQQDDClWZWVhIFBhcnRuZXIgMDAwMDAwMEQgU2lnbmluZyBDZXJ0aWZpY2F0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIjA9Lqlw+2BF7kfUa0bjs2ucITEH7DkbGECXL6m57iFmYb8WE8N4H/X5tahNb8ivq1oCQqoD81vZC9k6Ar8g3WjgZYwgZMwYQYDVR0jBFowWKFLpEkwRzERMA8GA1UECgwIVmVlYSBJbmMxMjAwBgNVBAMMKVZlZWEgUGFydG5lciAwMDAwMDAwRCBTaWduaW5nIENlcnRpZmljYXRlggkAve8pB2SclW0wHQYDVR0OBBYEFF6xVNAwqerRl3eiml1vTEF6wOKpMA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAI9kBqOFcb+iZdhJ4MNQGZmVVuv/fZ55V5hGtv7pkmiqAiBnMiON8hHyEvO47ElB9m/wFLucCC7aHddzMw37R4Ex3w=="
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 4129c7c66eb6
Removing intermediate container 4129c7c66eb6
 ---> 158571bc1fef
Step 22/25 : LABEL com.veea.authentication.certificates.veeahub_license_server="MIIB0jCCATSgAwIBAgIBATAKBggqhkjOPQQDAjBAMREwDwYDVQQKDAhWZWVhIEluYzEfMB0GA1UEAwwWVmVlYSBMaWNlbnNlIEF1dGhvcml0eTEKMAgGA1UELAwBMDAeFw0xODEyMDcxODE3NTlaFw0zMzEyMDMxODE3NTlaMEIxETAPBgNVBAoMCFZlZWEgSW5jMSEwHwYDVQQDDBhWZWVhIE1haW4gTGljZW5zZSBTZXJ2ZXIxCjAIBgNVBCwMATAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQqVnzlrPYomV3ZRVZaGxRv4xJPhKnkNa+PALfw8Xc/MemlcoLZmAKWWNRPjIyW2sOlYKr0+FpGIvZVZ4u/6iAFox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwICtDAKBggqhkjOPQQDAgOBiwAwgYcCQgCXFl2jBWtVp7H6ELCxLUs0tl4wFycLW4ANoKErrTcmv8TxlcsD0lUq6iBPQAmtlUW00QeVwNG2Ffavvli6Cvq+0AJBT8R4+UMqL6PKs2Dle3S6LwyEjmtAYwLv685LwPOTMzR4FiQoUmT1DVnR9rjudO18p5Uqzufwr3SABYv0FFtpVvM="
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 990e92ef21a7
Removing intermediate container 990e92ef21a7
 ---> 637b904bb924
Step 23/25 : LABEL com.veea.authentication.certificates.veeahub_license_authority="MIICJDCCAYagAwIBAgIBBDAKBggqhkjOPQQDAjBLMQowCAYDVQQsDAEwMREwDwYDVQQKDAhWZWVhIEluYzEMMAoGA1UECwwDUEtJMRwwGgYDVQQDDBNWZWVhIFJvb3QgQXV0aG9yaXR5MB4XDTE4MTIwNzE4MTI1NVoXDTM4MTIwMjE4MTI1NVowQDERMA8GA1UECgwIVmVlYSBJbmMxHzAdBgNVBAMMFlZlZWEgTGljZW5zZSBBdXRob3JpdHkxCjAIBgNVBCwMATAwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAE2fGY0fpdvS1moPN/3iTc5F9mTnEYtFeyj325dNpcT9OJPfYx/ORV0dMXY7OLXN87+0pR0a6gOnIAj5Ozlw0xBoQAyuPxDdmWKVAzg9g2+d01JqDQRyHUZdDzdtlGMh0JRvX2RHgtB+3jVvMVmzNdxmjJP0lsoJC26Io3K4WKjB+wNz6MjMCEwEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAoQwCgYIKoZIzj0EAwIDgYsAMIGHAkEWk3a6EgOknqIQbDSoIGtczfq7LNmPegHyKg7WEodpT0PnRhB/pXctWOPA3k0i1BSuPCCa+5mKGhjTxDaUVbNNUwJCAYHfHkIaEkMeceloA7NmB85XBY6+ftnBEumzPth5C5QQ3RyoU4ktZ8A8PYjDbGGYD8l7V5Jl5yUd1w7Nl7Budqyf"
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in e6778a4085a6
Removing intermediate container e6778a4085a6
 ---> 80ea2d8c72af
Step 24/25 : CMD ["/app/start-broker.sh"]
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 1164e25583d6
Removing intermediate container 1164e25583d6
 ---> bf032242c377
Step 25/25 : ENTRYPOINT ["tini", "--"]
 ---> [Warning] The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
 ---> Running in 189c70f7ec92
Removing intermediate container 189c70f7ec92
 ---> 99397cb4f342
Successfully built 99397cb4f342
Successfully tagged vh_dmqtt_broker-arm64v8:1.0.0
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
Saving: vh_dmqtt_broker arm64v8
  Writing vh_dmqtt_broker-arm64v8:1.0.0.unsigned.tar
Signing: vh_dmqtt_broker arm64v8
INFO: Sending auth request to https://qa-auth.veea.co/auth/
INFO: Sending Partner ID request to https://qa.veea.co/enrollment/partner/user/
INFO: Success
  Processing: vh_dmqtt_broker-arm64v8:1.0.0
    Docker TAG:      vh_dmqtt_broker-arm64v8:1.0.0
    Feature Set:     /opt/veea/vht/bin/config/features.json
    Rule Set:        /opt/veea/vht/bin/config/verify.json
    Working folder:  /tmp/tmp2odl82ze
    Signing Server   https://signing.qa.veea.co/
    Signing Key      None
    Signing Cert     None
    Partner Cert     /home/jstrain/.vhc/veea-partner-0000000D-cert.pem
    OpenSSL Arguments:
      -engine=pkcs11
      -keyform=engine
  Verifying unsigned image
  Signing unsigned image
    Writing /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm64v8/vh_dmqtt_broker-arm64v8:1.0.0.signed.tar
Verifying: vh_dmqtt_broker arm64v8
  Verifying signed image
No need to re-generate swarm file....skipping
Building metadata: vh_dmqtt_broker arm64v8
Releasing:  vh_dmqtt_broker arm64v8
  Reading metadata: vh_dmqtt_broker arm64v8
  Reading manifest: vh_dmqtt_broker arm64v8
  Creating metadata CMS: vh_dmqtt_broker arm64v8
  Signing metadata
  Creating release archive: vh_dmqtt_broker arm64v8
Release complete: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm64v8/vh_dmqtt_broker-arm64v8-release-1.0.0.tgz
Packaging application /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/build/vh_dmqtt-1.0.0.tgz
Combining release TGZ files
Unpacking: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm32v7/vh_dmqtt_client-arm32v7-release-1.0.0.tgz
Unpacking: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-client/build/auth/arm64v8/vh_dmqtt_client-arm64v8-release-1.0.0.tgz
Unpacking: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm32v7/vh_dmqtt_broker-arm32v7-release-1.0.0.tgz
Unpacking: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/mesh-broker/build/auth/arm64v8/vh_dmqtt_broker-arm64v8-release-1.0.0.tgz
Packing: /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/build/vh_dmqtt-1.0.0.tgz
Verifying application /home/jstrain/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/build/vh_dmqtt-1.0.0.tgz
  Verifying metadata
Application complete
```
