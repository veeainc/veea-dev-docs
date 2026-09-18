---
icon: lucide/file-text
---

# io.veea.VeeaHub.Networking

## Name

io.veea.VeeaHub.Networking

## Methods

```text
GetMeshIPAddresses    (OUT a{sas} output);
GetMdnsIPAddress      (OUT s      addr);
GetMeshIPAddress      (OUT s      addr);
GetNetworkingState    (OUT a{sb}  state);
GetWanModeForLanAlias (IN  s      lan_alias,
                       OUT s      wan_mode);
GetLocalDomains       (IN  s      network,
                       OUT i      status,
                       OUT a{sv}  info);
RegisterDnsHost       (IN  s      network,
                       IN  s      fqdn,
                       IN  s      ipAddr,
                       IN  s      scope,
                       OUT i      status,
                       OUT s      token,
                       OUT a{sv}  info);
RegisterDnsSRV        (IN  s      network,
                       IN  s      target,
                       IN  i      port,
                       IN  s      domain,
                       IN  s      protocol,
                       IN  s      service,
                       IN  s      scope,
                       OUT i      status,
                       OUT s      token,
                       OUT a{sv}  info);
GetRegistration       (IN  s      token,
                       OUT i      status,
                       OUT a{sv}  info);
Unregister            (IN  s      token,
                       OUT i      status);
```

## Signals

```text
UpdateNetworkDetails (a{sv} unnamed_arg0);
```

## Description

Provides methods for accessing platform networking services.

## Method Details

### The GetMeshIPAddresses() method

```text
GetMeshIPAddresses (OUT a{sas} output);
```

Returns the lists of mesh IP address than can be used by a container for mDNS and other protocols.

**Allow**: context=default

`OUT a{sas} output`:

The command output as a dictionary, where the keys are `ipv4` and `ipv6`, and each value is a list of IP addresses.

### The GetMdnsIPAddress() method

```text
GetMdnsIPAddress (OUT s addr);
```

Gets the IP4 address on which services can be advertised through the MDNS repeater.

**Allow**: context=default

`OUT s addr`:

the IP4 address to use, or an empty string.

### The GetMeshIPAddress() method

```text
GetMeshIPAddress (OUT s addr);
```

Gets the IP4 address which can be used to advertise services on the mesh with global DNS. This IP address should be used for control plane traffic routed across a VeeaHub network.

**Allow**: context=default

`OUT s addr`:

the IP4 address to use, or an empty string.

### The GetNetworkingState() method

```text
GetNetworkingState (OUT a{sb} state);
```

**Allow**: context=default

`OUT a{sb} state`:

A dictionary mapping string keys to Booleans. Any key not in the dictionary should be treated as having the value False.

### The GetWanModeForLanAlias() method

```text
GetWanModeForLanAlias (IN  s lan_alias,
                       OUT s wan_mode);
```

**Allow**: context=default

`IN s lan_alias`:

The LAN alias ('shared:trusted', etc.) for which to find the WAN mode

`OUT s wan_mode`:

The WAN mode ('rt', 'br') configuration for the LAN with the argument alias

### The GetLocalDomains() method

```text
GetLocalDomains (IN  s     network,
                 OUT i     status,
                 OUT a{sv} info);
```

This method returns a dictionary of host and SRV entries for the indicated network. The "host" entry is a list of host records containing:

*   FQDN - with key of "fqdn"
    
*   Array of IP addresses - with key of "ip"
    

The "SRV" entry is a list of SRV records containing:

*   FQDN - with key of "fqdn"
    
*   Array of IP addresses - with key of "ip"
    
*   Port - with key of "port"
    
*   Protocol - with key of "protocol"
    
*   Service - with key of "service"
    

**Allow**: context=default

`IN s network`:

The network alias (default is 'shared:trusted')

`OUT i status`:

`OUT a{sv} info`:

### The RegisterDnsHost() method

```text
RegisterDnsHost (IN  s     network,
                 IN  s     fqdn,
                 IN  s     ipAddr,
                 IN  s     scope,
                 OUT i     status,
                 OUT s     token,
                 OUT a{sv} info);
```

This method registers a domain name to IP mapping (A/AAAA and PTR records) in the appropriate DNS server(s).

**Allow**: context=default

`IN s network`:

The network alias (default is 'shared:trusted')

`IN s fqdn`:

The fully qualified hostname

`IN s ipAddr`:

The IPv4 or IPv6 address

`IN s scope`:

The scope of the DNS resolution ('local', 'mesh' or 'all')

`OUT i status`:

`OUT s token`:

`OUT a{sv} info`:

### The RegisterDnsSRV() method

```text
RegisterDnsSRV (IN  s     network,
                IN  s     target,
                IN  i     port,
                IN  s     domain,
                IN  s     protocol,
                IN  s     service,
                IN  s     scope,
                OUT i     status,
                OUT s     token,
                OUT a{sv} info);
```

This method registers a SRV record in the appropriate DNS server(s).

**Allow**: context=default

`IN s network`:

The network alias (default is 'shared:trusted')

`IN s target`:

The fully qualified target hostname

`IN i port`:

The target port

`IN s domain`:

The domain to register the service in

`IN s protocol`:

The protocol in use ('tcp' or 'udp')

`IN s service`:

The name of the service

`IN s scope`:

The scope of the DNS resolution ('local', 'mesh' or 'all')

`OUT i status`:

`OUT s token`:

`OUT a{sv} info`:

### The GetRegistration() method

```text
GetRegistration (IN  s     token,
                 OUT i     status,
                 OUT a{sv} info);
```

This method returns the registration information for a token

**Allow**: context=default

`IN s token`:

The token returned by the above RegisterXxxx calls

`OUT i status`:

`OUT a{sv} info`:

### The Unregister() method

```text
Unregister (IN  s token,
            OUT i status);
```

This method unregisters the DNS or other behaviours that correspond to the token.

**Allow**: context=default

`IN s token`:

The token returned by the above RegisterXxxx calls

`OUT i status`:

## Signal Details

### The "UpdateNetworkDetails" signal

```text
UpdateNetworkDetails (a{sv} unnamed_arg0);
```

This signal is emitted each time network details change; the dictionary returned has the same keys as for \`GetNetworkDetails\`.

`a{sv} unnamed_arg0`:
