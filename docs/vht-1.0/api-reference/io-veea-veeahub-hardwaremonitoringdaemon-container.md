---
icon: lucide/file-text
---

# io.veea.VeeaHub.HardwareMonitoringDaemon.Container

## Name

io.veea.VeeaHub.HardwareMonitoringDaemon.Container

## Methods

```text
Register          (OUT i status,
                   OUT s bus_path);
Ready             ();
StartKeystoreSave (OUT i status);
GetKeystoreStatus (OUT i status);
```

## Description

This is the API that communicates with the containers. Any container can communicate with HMD. HMD will use the caller user ID and process information to determine which container the call was made from.

## Method Details

### The Register() method

```text
Register (OUT i status,
          OUT s bus_path);
```

This is made by the container to request a DBus namespace to register its callbacks in.

The response is an integer status code and a single string with the name of the bus that the container should register. This will be `io.veea.VeeaHub.HardwareMonitoringAgent.C_$cid` where `$cid` is the Docker Container ID.

The container should offer the object `/io/veea/VeeaHub/HardwareMonitoringAgent/C_$cid` and this should implement the interface `io.veea.VeeaHub.HardwareMonitoringAgent.Events`.

**Allow**: context=default

`OUT i status`:

The return status

`OUT s bus_path`:

The name of the DBus path

### The Ready() method

```text
Ready ();
```

This is made by the container when it is listening on the API indicated in the Register() response and it is ready for HMD to send device insert and remove notifications.

**Allow**: context=default

### The StartKeystoreSave() method

```text
StartKeystoreSave (OUT i status);
```

This is made by the container when it wants the host to save the information that it has written to its keystore directory.

Will return errno.OK if the request has been accepted. Will return errno.EBUSY if a keystore save is in progress Will return errno.EAGAIN if an unexpected fault occurred Will return errno.EFBIG if the keystore is too big to be protected (limit is 128KB total). Will return errno.ENODATA if the container cannot be identified for the caller.

Note that the save operation will take some time. The container should poll GetKeystoreStatus below to check on the progress.

**Allow**: context=default

`OUT i status`:

### The GetKeystoreStatus() method

```text
GetKeystoreStatus (OUT i status);
```

This is made by the container when it wants to check if the host is still saving the keystore contents.

Will return 0 if the keystore save has completed or no keystore save has been done Will return errno.EBUSY if the keystore save is in progress Will return errno.EIO if the last keystore save has failed

**Allow**: context=default

`OUT i status`:
