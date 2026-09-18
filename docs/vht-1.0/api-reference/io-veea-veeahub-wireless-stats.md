---
icon: lucide/file-text
---

# io.veea.VeeaHub.Wireless.Stats

## Name

io.veea.VeeaHub.Wireless.Stats

## Methods

```text
UpdateStats                         (OUT i         status);
GetInterfaceFrequencyHertz          (OUT i         status,
                                     OUT a(sd)     ListOfRadios);
GetStationBeaconLossTotal           (OUT i         status,
                                     OUT a(ssu)    ListOfStations);
GetStationConnectedSecondsTotal     (OUT i         status,
                                     OUT a(sst)    ListOfStations);
GetStationConnectedSecondsTotalInfo (OUT i         status,
                                     OUT a(ssssst) ListOfStations);
GetStationInactiveSeconds           (OUT i         status,
                                     OUT a(ssd)    ListOfStations);
GetStationInfo                      (OUT i         status,
                                     OUT a(ssssi)  ListOfStations);
GetStationRateCapRx                 (OUT i         status,
                                     OUT a(ssd)    ListOfStations);
GetStationRateCapTx                 (OUT i         status,
                                     OUT a(ssd)    ListOfStations);
GetStationReceiveBitsPerSecond      (OUT i         status,
                                     OUT a(ssd)    ListOfStations);
GetStationReceiveBytesTotal         (OUT i         status,
                                     OUT a(sst)    ListOfStations);
GetStationSignalDbm                 (OUT i         status,
                                     OUT a(ssi)    ListOfStations);
GetStationTransmitBitsPerSecond     (OUT i         status,
                                     OUT a(ssd)    ListOfStations);
GetStationTransmitBytesTotal        (OUT i         status,
                                     OUT a(sst)    ListOfStations);
GetStationTransmitFailedTotal       (OUT i         status,
                                     OUT a(ssu)    ListOfStations);
GetStationTransmitRetriesTotal      (OUT i         status,
                                     OUT a(ssu)    ListOfStations);
```

## Description

## Method Details

### The UpdateStats() method

```text
UpdateStats (OUT i status);
```

`OUT i status`:

### The GetInterfaceFrequencyHertz() method

```text
GetInterfaceFrequencyHertz (OUT i     status,
                            OUT a(sd) ListOfRadios);
```

`OUT i status`:

`OUT a(sd) ListOfRadios`:

### The GetStationBeaconLossTotal() method

```text
GetStationBeaconLossTotal (OUT i      status,
                           OUT a(ssu) ListOfStations);
```

`OUT i status`:

`OUT a(ssu) ListOfStations`:

### The GetStationConnectedSecondsTotal() method

```text
GetStationConnectedSecondsTotal (OUT i      status,
                                 OUT a(sst) ListOfStations);
```

`OUT i status`:

`OUT a(sst) ListOfStations`:

### The GetStationConnectedSecondsTotalInfo() method

```text
GetStationConnectedSecondsTotalInfo (OUT i         status,
                                     OUT a(ssssst) ListOfStations);
```

`OUT i status`:

`OUT a(ssssst) ListOfStations`:

### The GetStationInactiveSeconds() method

```text
GetStationInactiveSeconds (OUT i      status,
                           OUT a(ssd) ListOfStations);
```

`OUT i status`:

`OUT a(ssd) ListOfStations`:

### The GetStationInfo() method

```text
GetStationInfo (OUT i        status,
                OUT a(ssssi) ListOfStations);
```

`OUT i status`:

`OUT a(ssssi) ListOfStations`:

### The GetStationRateCapRx() method

```text
GetStationRateCapRx (OUT i      status,
                     OUT a(ssd) ListOfStations);
```

`OUT i status`:

`OUT a(ssd) ListOfStations`:

### The GetStationRateCapTx() method

```text
GetStationRateCapTx (OUT i      status,
                     OUT a(ssd) ListOfStations);
```

`OUT i status`:

`OUT a(ssd) ListOfStations`:

### The GetStationReceiveBitsPerSecond() method

```text
GetStationReceiveBitsPerSecond (OUT i      status,
                                OUT a(ssd) ListOfStations);
```

`OUT i status`:

`OUT a(ssd) ListOfStations`:

### The GetStationReceiveBytesTotal() method

```text
GetStationReceiveBytesTotal (OUT i      status,
                             OUT a(sst) ListOfStations);
```

`OUT i status`:

`OUT a(sst) ListOfStations`:

### The GetStationSignalDbm() method

```text
GetStationSignalDbm (OUT i      status,
                     OUT a(ssi) ListOfStations);
```

`OUT i status`:

`OUT a(ssi) ListOfStations`:

### The GetStationTransmitBitsPerSecond() method

```text
GetStationTransmitBitsPerSecond (OUT i      status,
                                 OUT a(ssd) ListOfStations);
```

`OUT i status`:

`OUT a(ssd) ListOfStations`:

### The GetStationTransmitBytesTotal() method

```text
GetStationTransmitBytesTotal (OUT i      status,
                              OUT a(sst) ListOfStations);
```

`OUT i status`:

`OUT a(sst) ListOfStations`:

### The GetStationTransmitFailedTotal() method

```text
GetStationTransmitFailedTotal (OUT i      status,
                               OUT a(ssu) ListOfStations);
```

`OUT i status`:

`OUT a(ssu) ListOfStations`:

### The GetStationTransmitRetriesTotal() method

```text
GetStationTransmitRetriesTotal (OUT i      status,
                                OUT a(ssu) ListOfStations);
```

`OUT i status`:

`OUT a(ssu) ListOfStations`:
