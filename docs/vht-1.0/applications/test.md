---
icon: lucide/file-text
---

# Application Test

!!! note
    For modern VHC25 support workflows, including the choice between signed app sideload and unsigned image sideload, see [VHT 1.x Validated Workflows](../validated-workflows.md).

## Uploading an application

The application is uploaded using the `vhc hub access upload-app` command.

```console
$ vhc hub access upload-app build/MyApp_arm32v7-1.2.3.tgz 
Creating app push for file [build/MyApp_arm32v7-1.2.3.tgz] on C25CTADSR00000001134:9000 (app/push)...
############################################################################################################################################################################################################# 100.0%
```

## Running an Application

The VSH `docker service` commands can be used to manage applications.

```text
[VHC25000001134-0000000D] docker service --help

Commands to manage Docker services.

Usage:
  docker service [command]

Available Commands:
  inspect      Display service information
  list         Display the list of services
  ps           Display the task state of a service
  remove       Remove a service
  start        Start a new service
  stop         Stop a service

Flags:
  --help       display command help

Use "docker service [command] --help" for more information about a command.
```

The new service can be seen to be in the `Uploaded` state using `docker service list`.

```text
[VHC25000001134-0000000D] docker service list
ID   | NAME      | STATE      | MODE   | REPLICAS   | IMAGE  
-    | vh_dbus   | Uploaded   | -      | -          | -
```

The application has a single image that can be seen using `docker image ls`.

```text
[VHC25000001134-0000000D] docker image ls
REPOSITORY        | TAG     | ID             | P-UUID                                 | NAME      | CREATED       | SIZE     
vh_dbus-arm32v7   | 1.0.0   | fdd6425614a6   | 0000000D-2E88-456C-9629-0532AA68B1F1   | vh_dbus   | 2 hours ago   | 64.39MB
```

The application can be started using `docker service start`.

```text
[VHC25000001134-0000000D] docker service start vh_dbus
Starting service (vh_dbus) now, please be patient it can take up to 30 seconds to complete.
```

The new status should be `Starting`, as can be seen by re-running `docker service list`.

```text
[VHC25000001134-0000000D] docker service list
ID                          | NAME      | STATE       | MODE         | REPLICAS   | IMAGE                  
sc1l108oht5qxe8v63sxpfhyf   | vh_dbus   | Starting    | Replicated   | 1/1        | vh_dbus-arm32v7:1.0.0
```

The detailed status can be obtained using `docker service ps`.

```text
[VHC25000001134-0000000D] docker service ps vh_dbus
ID                          | NAME        | IMAGE                   | NODE                   | DESIRED STATE   | CURRENT STATE           | ERROR   | PORTS  
iwzk13n4iuucml12ggw7ttvjo   | vh_dbus.1   | vh_dbus-arm32v7:1.0.0   | C25CTADSR00000001134   | Running         | Running 9 seconds ago   |         |
```

Once the application has started, the state will change to `Running`.

```text
[VHC25000001134-0000000D] docker service list
ID                          | NAME      | STATE      | MODE         | REPLICAS   | IMAGE                  
sc1l108oht5qxe8v63sxpfhyf   | vh_dbus   | Running    | Replicated   | 1/1        | vh_dbus-arm32v7:1.0.0
```

## Stopping an Application

The `docker service stop` command can be used to shut down the application.

```text
[VHC25000001134-0000000D] docker service stop vh_dbus
Service (vh_dbus) stopped
```

The state should return to `Uploaded`.

```bash
[VHC25000001134-0000000D] docker service list
ID   | NAME      | STATE      | MODE   | REPLICAS   | IMAGE  
-    | vh_dbus   | Uploaded   | -      | -          | -      
```

## Removing an Application

The application can be removed from the VeeaHub with the `docker service remove` command.

```text
[VHC25000001134-0000000D] docker service remove vh_dbus
Service (vh_dbus) removed
```

The application should no longer be present in the list.

```text
[VHC25000001134-0000000D] docker service list
ID   | NAME   | STATE   | MODE   | REPLICAS   | IMAGE
```
