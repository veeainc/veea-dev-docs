---
icon: lucide/file-text
---

# io.veea.VeeaHub.ContainerControl

## Name

io.veea.VeeaHub.ContainerControl

## Methods

```text
BackupStatus (IN  i returnCode,
              IN  s statusMsg);
```

## Signals

```text
BackupRequest  ();
BackupStart    (s archive_filename);
BackupComplete ();
```

## Description

Provides methods and signals for container backup and restore.

## Method Details

### The BackupStatus() method

```text
BackupStatus (IN  i returnCode,
              IN  s statusMsg);
```

This method will set the container status.

The status codes for this method are:

*   UNKNOWN_ERROR = -1
    
*   NO_SUPPORT = 0
    
*   NOT_READY = 1
    
*   BACKUP_INIT = 2
    
*   BACKUP_READY = 3
    
*   BACKUP_BUSY = 4
    
*   BACKUP_COMPLETE = 5
    

When a container uses this method, the container ID will be stored within an internal database which will be accessed by the mesh backup software to determine which containers support backup, and to report any problems.

**Allow**: context=default

`IN i returnCode`:

Returns the container backup status code

`IN s statusMsg`:

The container backup status message

## Signal Details

### The "BackupRequest" signal

```text
BackupRequest ();
```

Containers should listen on this signal at the start of mesh backup. On receipt of this signal, the container must send a BackupStatus message immediately to register with the mesh backup client.

The mesh backup client will issue this signal at the start of a mesh backup. All containers must report within 10 seconds or else they will not be backed up as part of the mesh config.

### The "BackupStart" signal

```text
BackupStart (s archive_filename);
```

Containers should listen on this signal during a mesh backup. On receipt of this signal, the configuration data must be written to the named file specified. On completion, set the status message to complete to indicate that the backup is completed.

The mesh backup client will issue this signal when all containers are ready to begin the backup. All containers must respond with their status within 60 seconds to have their backup included as part of the mesh config.

Note that a container is allowed more than 60 seconds to complete its backup process. It should initially respond with a: BackupStatus(BACKUP_BUSY, "...") then later with a: BackupStatus(BACKUP_COMPLETE, "...")

`s archive_filename`:

The filename to write to the config directory.

### The "BackupComplete" signal

```text
BackupComplete ();
```

Containers should listen on this signal for the end of the backup. On receipt of this signal, the configuration data can be unlocked such that user changes can be made by once more.

The mesh backup client will issue this signal at the end of the backup process.
