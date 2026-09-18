---
icon: lucide/file-text
---

# io.veea.VeeaHub.DateTime

## Name

io.veea.VeeaHub.DateTime

## Methods

```text
GetDate              (OUT i  returnCode,
                      OUT i  dayOfMonth,
                      OUT i  month,
                      OUT i  year);
GetTime              (OUT i  returnCode,
                      OUT i  hour,
                      OUT i  minute,
                      OUT i  second);
GetTimezone          (OUT i  returnCode,
                      OUT s  timezone);
GetNtpServiceStatus  (OUT i  returnCode,
                      OUT b  ntpServiceEnabled);
GetNtpRunningStatus  (OUT i  returnCode,
                      OUT b  running);
GetNtpProcessSummary (OUT i  returnCode,
                      OUT as processSummary);
GetNtpServers        (OUT i  returnCode,
                      OUT as listOfServers);
GetQueryFromAddress  (OUT i  returnCode,
                      OUT s  queryFromAddress);
```

## Description

This interface allows the client to enable/disable the NTP Service (auto start the NTP process at boot), start/stop the NTP Process, set the date/time when the NTP process is not running, and set the timezone.

## Method Details

### The GetDate() method

```text
GetDate (OUT i returnCode,
         OUT i dayOfMonth,
         OUT i month,
         OUT i year);
```

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT i dayOfMonth`:

The current day of the month

`OUT i month`:

The current month

`OUT i year`:

The current year

### The GetTime() method

```text
GetTime (OUT i returnCode,
         OUT i hour,
         OUT i minute,
         OUT i second);
```

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT i hour`:

The current hour

`OUT i minute`:

The current minute

`OUT i second`:

The current second

### The GetTimezone() method

```text
GetTimezone (OUT i returnCode,
             OUT s timezone);
```

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT s timezone`:

The time zone

### The GetNtpServiceStatus() method

```text
GetNtpServiceStatus (OUT i returnCode,
                     OUT b ntpServiceEnabled);
```

`OUT i returnCode`:

`OUT b ntpServiceEnabled`:

### The GetNtpRunningStatus() method

```text
GetNtpRunningStatus (OUT i returnCode,
                     OUT b running);
```

The `running` value will be true if NTP process is running and return false if NTP process is not running.

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT b running`:

The NTP running status

### The GetNtpProcessSummary() method

```text
GetNtpProcessSummary (OUT i  returnCode,
                      OUT as processSummary);
```

If the NTP Process is running `processSummary` will return a string list of process summary information of all NTP peers such as peer IP, peer connected or not, weight, trustlevel, stratum, number of seconds until the next poll, polling interval in seconds, offset, network delay and network jitter in milliseconds. If the NTP process is not running it will return an empty list. This is useful for debugging NTP related connection issues for example.

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT as processSummary`:

The NTP process summary

### The GetNtpServers() method

```text
GetNtpServers (OUT i  returnCode,
               OUT as listOfServers);
```

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT as listOfServers`:

The list of NTP servers

### The GetQueryFromAddress() method

```text
GetQueryFromAddress (OUT i returnCode,
                     OUT s queryFromAddress);
```

| ReturnCode | Description |
| --- | --- |
| 0 | Success |
| 1 | Internal error |

**Allow**: context=default

`OUT i returnCode`:

The return code (see table above for possible values)

`OUT s queryFromAddress`:

The host IP address from which to query remote NTP servers
