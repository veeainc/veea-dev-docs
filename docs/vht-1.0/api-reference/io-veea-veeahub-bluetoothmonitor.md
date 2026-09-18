---
icon: lucide/file-text
---

# io.veea.VeeaHub.BluetoothMonitor

## Name

io.veea.VeeaHub.BluetoothMonitor

## Description

This service provides methods to start and stop btmon instances on HCI interfaces. (This is only available on VeeaHub platform firmware 2.32.3 and newer.)

## Method Details

### The Run() method

```text
JRun (IN  i index,
     IN  i timeout,
     OUT i returnCode,
     OUT s sockname);
```

Output will be sent to an abstract Unix socket with the returned socket name. The output can be streamed using socat. For example:

`socat - abstract-connect:btmon-0`

**Allow**: group=bluetooth

`IN i index:`

`The hci interface index`

`IN i timeout:`

`The amount of time to run btmon (in seconds)`

`OUT i returnCode:`

`The return code (0 for success, non-zero for failure)`

`OUT s sockname:`

### The Stop() method

```text
top (IN  i index,
      OUT i returnCode);
```

Stops the btmon instance on the specified HCI index.

**Allow**: group=bluetooth

`OIN i index:`

`The hci interface index`

`OUT i returnCode:`

`The return code (0 for success, non-zero for failure)`
