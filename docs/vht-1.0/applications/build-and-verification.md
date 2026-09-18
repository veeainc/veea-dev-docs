---
icon: lucide/file-text
---

# Application Build and Verification

!!! info
    In this tutorial you will learn:

    *   How to build an application

    *   The anatomy of an application image

    *   How to run an application
    

## Building an Application

The application is built using the `vhc app build release` command.

```console
$ vhc app build release
Building application: /home/joeuser/my_app/build/MyApp-1.2.3.tgz
Processing: vh_dbus /home/joeuser/my_app/vh_dbus
Building: arm32v7
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
No need to re-save image archive.....skipping
No need to re-sign image archive.....skipping
No need to re-generate swarm file....skipping
No need to re-generate meta-data.....skipping
No need to re-release signed image...skipping
Building: arm64v8
No need to re-generate Dockerfile....skipping
No need to re-compile image..........skipping
No need to re-save image archive.....skipping
No need to re-sign image archive.....skipping
No need to re-generate swarm file....skipping
No need to re-generate meta-data.....skipping
No need to re-release signed image...skipping
Packaging application /home/joeuser/my_app/build/MyApp-1.2.3.tgz
Combining release TGZ files
Unpacking: /home/joeuser/my_app/vh_dbus/build/auth/arm32v7/vh_dbus-arm32v7-release-1.0.1.tgz
Unpacking: /home/joeuser/my_app/vh_dbus/build/auth/arm64v8/vh_dbus-arm64v8-release-1.0.1.tgz
Packing: /home/joeuser/my_app/build/MyApp-1.2.3.tgz
Verifying application /home/joeuser/my_app/build/MyApp-1.2.3.tgz
  Verifying metadata
Application complete
```

You can see that VHC iterates through each image in the app and builds the release for each architecture that is configured. In this case, both the `arm32v7` and `arm64v8` releases were already built, so It skipped those steps.

### Alternate License Path

To specify an alternate license path use the  --license-path flag.

Once the individual Image Release Archives are built, they are combined into a single application `.tgz` file called an Application Release Archive. The final step is to verify the application, which ensures that all necessary information is present.

## Anatomy of an Application Release Archive

The application release archive is a bundle of image release archives.

```console
$ tar tf build/MyApp-1.0.0.tgz ./
./
./containers/
./containers/config/
./containers/config/00000000-BA5E-5EED-C0DE-000000000003/
./containers/config/00000000-BA5E-5EED-C0DE-000000000003/services/
./containers/config/00000000-BA5E-5EED-C0DE-000000000003/services/00000033-A180-4F25-B6F9-F9439C533890.conf
./containers/images/
./containers/images/AFC4E69B-B6F0-4437-8E4F-82F6946CB498.tgz
./containers/images/31E85B60-6717-4060-AE17-9E3897DF6F0A.tgz
./containers/metadata/
./containers/metadata/0B1D21E7-0390-4946-84C0-034ECB3A5EB3.cms
./containers/metadata/F31AB2E5-107C-4FD1-AD2A-1FBC213CCD1D.cms
```

The application archive is composed of:

*   Two images - the same code built for `arm32v7` and `arm64v8`
    
*   Two meta-data CMS files - one for each image
    
*   A single Swarm service file that applies to both images.
    

## Verifying the application

Prior to an application being released, it should be verified to ensure that it has all of the necessary certificates and licenses, and no debug capabilities enabled. Most of this is checked by the `vhc application build release` command, but it is good practice to check the Application Release Archive that you plan to deploy to ensure that it has been properly verified.

Verification is done by using the `vhc app build verify` command.

```console
$ vhc app build verify build/MyApp-1.2.3.tgz 
Verifying application /home/joeuser/my_app/build/MyApp-1.2.3.tgz
  Verifying metadata
```

In this case, no issues were found.
