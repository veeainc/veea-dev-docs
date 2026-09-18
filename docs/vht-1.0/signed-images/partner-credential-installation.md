---
icon: lucide/file-text
---

# Partner Credential Installation

!!! info
    In this tutorial you will learn:

    *   How to obtain Partner Credentials

    *   How to import your Partner Credentials into VHT

    *   How to upload a transport TLS license to your development VeeaHub
    

## Obtaining Partner Credentials

The first step is to contact Veea Customer Support to request Partner credentials. You will receive a file with the name `veea-partner-<partner-id>.tgz`, where `<partner-id>` is your Veea-assigned Partner ID. This file should be placed on your Ubuntu development machine so it can be imported as described below.

## Importing Partner Credentials

!!! warning
    The following examples use a Partner ID of `00000033`, but you will be assigned a different ID when you obtain your credentials.

The first step is to import your newly obtained partner credentials.

```console
$ vhc partner secure import-credentials veea-partner-00000033.tgz 
Extracting veea-partner-00000033-transport-license.cms
Extracting veea-partner-00000033-cert.pem
Extracting veea-partner-license-00000033.txt
Validating credentials
Partner ID: 00000033
Copying veea-partner-00000033-cert.pem to /home/joeuser/.vhc
Copying veea-partner-00000033-transport-license.cms to /home/joeuser/.vhc
Copying veea-partner-license-00000033.txt to /home/joeuser/.vhc
Importing license file /home/joeuser/.vhc/veea-partner-license-00000033.txt
Running download-tls-credentials.py
INFO:Starting
INFO:Logging in
Keycloak Username: joe@developer.com
Keycloak Password: 
INFO:Generating key pair
INFO:Generating CSR
INFO:Sending CSR
INFO:Sending request to https://signing.veea.co/signing/1.0/request
INFO:Status: COMPLETED
INFO:Extracting files
INFO:Backup /home/joeuser/.vhc/partner_tls_private.pem -> /home/joeuser/.vhc/partner_tls_private_20230324T151049.pem
INFO:Backup /home/joeuser/.vhc/partner_tls_public.pem -> /home/joeuser/.vhc/partner_tls_public_20230324T151049.pem
INFO:Backup /home/joeuser/.vhc/partner_tls.tgz -> /home/joeuser/.vhc/partner_tls_20230324T151049.tgz
INFO:TLS private key: /home/joeuser/.vhc/partner_tls_private.pem
INFO:TLS public key: /home/joeuser/.vhc/partner_tls_public.pem
INFO:TLS cert: /home/joeuser/.vhc/partner_tls_cert.pem
INFO:TLS stack: /home/joeuser/.vhc/partner_tls_stack.pem
INFO:complete
Developer name [Joe User]: 
Developer email [joe@developer.com]: 
Company address [Address of Joe]: 
Company URL [http://joe.developer]: 

Remember to upload the partner CMS file to your VeeaHub:
  vhc hub access upload-license --hub-id <veea-hub-id>
This will allow you to run signed images.
User configuration modified. Please rebuild image(s).
```

These lines show the contents of the tarball being copied into the `~/.vhc` directory:

```text
Partner ID: 00000033
Copying veea-partner-00000033-cert.pem to /home/joeuser/.vhc
Copying veea-partner-00000033-transport-license.cms to /home/joeuser/.vhc
Copying veea-partner-license-00000033.txt to /home/joeuser/.vhc
```

You will be prompted for your Keycloak username and password. These are used to obtain TLS files from the Veea servers:

```text
INFO:TLS cert: /home/joeuser/.vhc/partner_tls_cert.pem
INFO:TLS stack: /home/joeuser/.vhc/partner_tls_stack.pem
```

These files are used to interact with the VeeaHub using your new Partner ID.

As show below, you will also be prompted to enter developer information. If you have already entered this information, you can just hit return to keep the existing value.

```text
Developer name [Joe User]: 
Developer email [joe@developer.com]: 
Company address [Address of Joe]: 
Company URL [http://joe.developer]:
```

The last few lines are a reminder to upload the transport license to your VeeaHub(s). This will allow the sideload server running on the VeeaHub to recognize the TLS credentials and allow the use of the new Partner ID.

## Uploading TLS Transport License

The newly obtained transport license can be uploaded to your development VeeaHubs using the `vhc hub access upload-license` command.

```console
$ vhc hub access upload-license 
Adding license file [/home/joeuser/.vhc/veea-partner-00000033-transport-license.cms] to C25CTW00000000001567:9000 (licenses)...
##################################################################################################################################### 100.0%

Please reboot your VeeaHub to install the uploaded license
```

The last line is a reminder that the license will not take effect until the VeeaHub is rebooted.

## Viewing Partner Credentials

You can view the imported credentials using the `vhc partner secure show command`.

```console
$ vhc partner secure show
partner:
  cms: /home/joeuser/.vhc/veea-partner-license-00000033.txt
  license: /home/joeuser/.vhc/veea-partner-00000033-transport-license.cms
tls:
  certificate: /home/joeuser/.vhc/partner_tls_cert.pem
  key: /home/joeuser/.vhc/partner_tls_private.pem
signing:
  certificate: /home/joeuser/.vhc/veea-partner-00000033-cert.pem
  url: 
tools:
  auth:
    server: https://auth.veea.co/auth/
  signing:
    server: https://signing.veea.co/
    type: cloud-service
vendor:
    id: 00000033
```

## Refreshing TLS Keys

The TLS keys that are used for secure communication with the VeeaHub will expire in 30 days. To obtain new ones, run the `vhc partner secure update-tls-credentials` command.

```console
$ vhc partner secure update-tls-credentials 
Running download-tls-credentials.py
INFO:Starting
INFO:Logging in
Keycloak Username: joe@developer.com
Keycloak Password: 
INFO:Generating key pair
INFO:Generating CSR
INFO:Sending CSR
INFO:Sending request to https://signing.veea.co/signing/1.0/request
INFO:Status: COMPLETED
INFO:Extracting files
INFO:Backup /home/joeuser/.vhc/partner_tls_private.pem -> /home/joeuser/.vhc/partner_tls_private_20230407T201348.pem
INFO:Backup /home/joeuser/.vhc/partner_tls_public.pem -> /home/joeuser/.vhc/partner_tls_public_20230407T201348.pem
INFO:Backup /home/joeuser/.vhc/partner_tls.tgz -> /home/joeuser/.vhc/partner_tls_20230407T201348.tgz
INFO:TLS private key: /home/joeuser/.vhc/partner_tls_private.pem
INFO:TLS public key: /home/joeuser/.vhc/partner_tls_public.pem
INFO:TLS cert: /home/joeuser/.vhc/partner_tls_cert.pem
INFO:TLS stack: /home/joeuser/.vhc/partner_tls_stack.pem
INFO:complete
```
