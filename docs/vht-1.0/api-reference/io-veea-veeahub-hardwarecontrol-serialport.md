---
icon: lucide/file-text
---

# io.veea.VeeaHub.HardwareControl.SerialPort

## Name

io.veea.VeeaHub.HardwareControl.SerialPort

## Methods

```text
GetSerialPorts    (OUT a(sssas) portInfo);
GetSerialPortMode (IN  s        externalPortName,
                   OUT i        returnCode,
                   OUT s        portMode);
SetSerialPortMode (IN  s        externalPortName,
                   IN  s        portMode,
                   OUT i        returnCode,
                   OUT s        errorString);
```

## Description

## Method Details

### The GetSerialPorts() method

```text
GetSerialPorts (OUT a(sssas) portInfo);
```

Returns the list of available serial ports. This list can be empty, which indicates that no serial ports are available.

**Allow**: group=ext-serial0

**Allow**: context=default

`OUT a(sssas) portInfo`:

The serial port configuration information

### The GetSerialPortMode() method

```text
GetSerialPortMode (IN  s externalPortName,
                   OUT i returnCode,
                   OUT s portMode);
```

Returns a status code and the serial port mode for the specified port. The status code is 0 for success and or an error value if the port cannot be accessed. If the status code is non-zero, the mode string contains a description of the error.

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | The specified serial port does not exist |
| 2 | The hardware operation failed |

**Allow**: group=ext-serial0

**Allow**: context=default

`IN s externalPortName`:

The external port name

`OUT i returnCode`:

The status of the method call

`OUT s portMode`:

The serial port mode

### The SetSerialPortMode() method

```text
SetSerialPortMode (IN  s externalPortName,
                   IN  s portMode,
                   OUT i returnCode,
                   OUT s errorString);
```

Configures the serial port information with the dictionary of attributes. This caller must be a member of the group with the same name as the serial port in order for the operation to succeed.

Returns a status code and an error string (when the status code is non-zero). The status code is 0 for success or an error value for errors.

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | The specified serial port does not exist |
| 2 | The caller is not authorized |
| 3 | The specified port mode is invalid |
| 4 | The hardware operation failed |

**Allow**: group=ext-serial0

`IN s externalPortName`:

The external port name

`IN s portMode`:

The external port mode

`OUT i returnCode`:

The status of the method call

`OUT s errorString`:

An error message in the case of failure
