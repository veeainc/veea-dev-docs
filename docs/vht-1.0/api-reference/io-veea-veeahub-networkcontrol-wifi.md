---
icon: lucide/file-text
---

# io.veea.VeeaHub.NetworkControl.WiFi

## Name

io.veea.VeeaHub.NetworkControl.WiFi

## Methods

```text
CreateMeshWideWiFiAccessPoint    (IN  s           alias,
                                  IN  s           ssid,
                                  IN  s           passphrase,
                                  OUT i           status,
                                  OUT s           error_msg);
CreateHubLocalWiFiAccessPoint    (IN  s           alias,
                                  IN  s           ssid,
                                  IN  s           passphrase,
                                  OUT i           status,
                                  OUT s           error_msg);
DeleteMeshWideWiFiAccessPoint    (IN  s           alias,
                                  IN  s           ssid,
                                  OUT i           status,
                                  OUT s           error_msg);
DeleteHubLocalWiFiAccessPoint    (IN  s           alias,
                                  IN  s           ssid,
                                  OUT i           status,
                                  OUT s           error_msg);
CreateMeshWideWiFiAccessPointExt (IN  s           alias,
                                  IN  s           ssid,
                                  IN  s           passphrase,
                                  IN  a{sv}       options,
                                  OUT i           status,
                                  OUT s           error_msg);
CreateHubLocalWiFiAccessPointExt (IN  s           alias,
                                  IN  s           ssid,
                                  IN  s           passphrase,
                                  IN  a{sv}       options,
                                  OUT i           status,
                                  OUT s           error_msg);
ListMeshWideWiFiAccessPoints     (IN  s           alias,
                                  OUT i           status,
                                  OUT s           error_msg,
                                  OUT a(sssa{sv}) info);
ListHubLocalWiFiAccessPoints     (IN  s           alias,
                                  OUT i           status,
                                  OUT s           error_msg,
                                  OUT a(sssa{sv}) info);
CreateContainerVxlanEndpoint     (IN  s           name,
                                  IN  i           vxid,
                                  IN  as          peers,
                                  OUT i           status,
                                  OUT s           error_msg);
RemoveContainerVxlanEndpoint     (IN  s           name,
                                  OUT i           status,
                                  OUT s           error_msg);
```

## Description

## Method Details

### The CreateMeshWideWiFiAccessPoint() method

```text
CreateMeshWideWiFiAccessPoint (IN  s alias,
                               IN  s ssid,
                               IN  s passphrase,
                               OUT i status,
                               OUT s error_msg);
```

Create a Wi-Fi Access Point for an owner LAN that is distributed across the mesh. The owner of the LAN (container UUID) is found using D-Bus introspection and Docker. An example owner UUID for the LAN is vMenu, '00000000-BA5E-5EED-C0DE-00000000000A'.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`IN s passphrase`:

Passphrase for the Access Point

`OUT i status`:

The return status

`OUT s error_msg`:

The error message (for failure case)

### The CreateHubLocalWiFiAccessPoint() method

```text
CreateHubLocalWiFiAccessPoint (IN  s alias,
                               IN  s ssid,
                               IN  s passphrase,
                               OUT i status,
                               OUT s error_msg);
```

Create a Wi-Fi Access Point for an owner LAN that is configured on the local hub. The owner of the LAN (container UUID) is found using D-Bus introspection and Docker. An example owner UUID for the LAN is vMenu, '00000000-BA5E-5EED-C0DE-00000000000A'.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`IN s passphrase`:

Passphrase for the Access Point

`OUT i status`:

The return status

`OUT s error_msg`:

The error message (for failure case)

### The DeleteMeshWideWiFiAccessPoint() method

```text
DeleteMeshWideWiFiAccessPoint (IN  s alias,
                               IN  s ssid,
                               OUT i status,
                               OUT s error_msg);
```

Delete a Wi-Fi Access Point for an owner LAN that is distributed across the mesh. The owner of the LAN (container UUID) is found using D-Bus introspection and Docker. An example owner UUID for the LAN is vMenu, '00000000-BA5E-5EED-C0DE-00000000000A'.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`OUT i status`:

The return status

`OUT s error_msg`:

The error message (for failure case)

### The DeleteHubLocalWiFiAccessPoint() method

```text
DeleteHubLocalWiFiAccessPoint (IN  s alias,
                               IN  s ssid,
                               OUT i status,
                               OUT s error_msg);
```

Delete a Wi-Fi Access Point for an owner LAN that is configured on the local hub. The owner of the LAN (container UUID) is found using D-Bus introspection and Docker. An example owner UUID for the LAN is vMenu, '00000000-BA5E-5EED-C0DE-00000000000A'.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`OUT i status`:

The return status

`OUT s error_msg`:

The error message (for failure case)

### The CreateMeshWideWiFiAccessPointExt() method

```text
CreateMeshWideWiFiAccessPointExt (IN  s     alias,
                                  IN  s     ssid,
                                  IN  s     passphrase,
                                  IN  a{sv} options,
                                  OUT i     status,
                                  OUT s     error_msg);
```

SecureMode : 'Open' 'PSK' WPAMode : 'WPA2only' 'WPA3only' 'WPA2andWPA3' 802.11r : true false 802.11w : 'Disabled' 'Required' 'Optional' `status`: The return status `error_msg`: The error message (for failure case)

Create and configure a Wi-Fi Access Point for an owner LAN.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`IN s passphrase`:

Passphrase for the Access Point

`IN a{sv} options`:

List of options to configure the additional WiFi functionality as dict

`OUT i status`:

`OUT s error_msg`:

### The CreateHubLocalWiFiAccessPointExt() method

```text
CreateHubLocalWiFiAccessPointExt (IN  s     alias,
                                  IN  s     ssid,
                                  IN  s     passphrase,
                                  IN  a{sv} options,
                                  OUT i     status,
                                  OUT s     error_msg);
```

SecureMode : 'Open' 'PSK' WPAMode : 'WPA2only' 'WPA3only' 'WPA2andWPA3' 802.11r : true false 802.11w : 'Disabled' 'Required' 'Optional' `status`: The return status `error_msg`: The error message (for failure case)

Create and configure a Wi-Fi Access Point for an owner LAN that is configured on the local hub.

**Allow**: context=default

`IN s alias`:

The alias assigned to the LAN, e.g. 'shared:trusted'

`IN s ssid`:

SSID for the Access Point

`IN s passphrase`:

Passphrase for the Access Point

`IN a{sv} options`:

List of options to configure the additional WiFi functionality as dict

`OUT i status`:

`OUT s error_msg`:

### The ListMeshWideWiFiAccessPoints() method

```text
ListMeshWideWiFiAccessPoints (IN  s           alias,
                              OUT i           status,
                              OUT s           error_msg,
                              OUT a(sssa{sv}) info);
```

`IN s alias`:

`OUT i status`:

`OUT s error_msg`:

`OUT a(sssa{sv}) info`:

### The ListHubLocalWiFiAccessPoints() method

```text
ListHubLocalWiFiAccessPoints (IN  s           alias,
                              OUT i           status,
                              OUT s           error_msg,
                              OUT a(sssa{sv}) info);
```

`IN s alias`:

`OUT i status`:

`OUT s error_msg`:

`OUT a(sssa{sv}) info`:

### The CreateContainerVxlanEndpoint() method

```text
CreateContainerVxlanEndpoint (IN  s  name,
                              IN  i  vxid,
                              IN  as peers,
                              OUT i  status,
                              OUT s  error_msg);
```

`IN s name`:

`IN i vxid`:

`IN as peers`:

`OUT i status`:

`OUT s error_msg`:

### The RemoveContainerVxlanEndpoint() method

```text
RemoveContainerVxlanEndpoint (IN  s name,
                              OUT i status,
                              OUT s error_msg);
```

`IN s name`:

`OUT i status`:

`OUT s error_msg`:
