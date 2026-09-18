---
icon: lucide/file-text
---

# io.veea.VeeaHub.ReverseProxy

## Name

io.veea.VeeaHub.ReverseProxy

## Methods

```text
RegisterReverseProxy     (IN  s      network,
                          IN  s      fqdn,
                          IN  i      externalPort,
                          IN  s      mode,
                          IN  s      alpn,
                          IN  s      localAddress,
                          IN  i      localPort,
                          IN  s      clientAuthority,
                          OUT i      status,
                          OUT s      token,
                          OUT aa{sv} info);
GetStatus                (IN  s      token,
                          OUT i      status,
                          OUT a{sv}  config,
                          OUT s      tunnel,
                          OUT aa{sv} dns,
                          OUT aa{sv} certbots,
                          OUT aa{sv} proxies);
Unregister               (IN  s      token,
                          OUT i      status,
                          OUT s      message);
ListProxies              (OUT aav    proxies);
CertificateUpdate        (IN  s      fqdn,
                          OUT i      status);
ConfigureVeeaCloudAccess (IN  s      token,
                          IN  s      protocol,
                          IN  s      name,
                          IN  s      description,
                          IN  aa{sv} access,
                          OUT i      status,
                          OUT s      message);
```

## Description

Provides methods for managing Reverse Proxy services on the host and the cloud.

!!! note
    For the practical `UI:HTTP` service-card flow, see [Control Center UI Links](../control-center-ui-links.md). For browser path behavior through the Control Center cloud proxy, see [Web UI Proxy Compatibility](../web-ui-proxy-compatibility.md).

## Method Details

### The RegisterReverseProxy() method

```text
RegisterReverseProxy (IN  s      network,
                      IN  s      fqdn,
                      IN  i      externalPort,
                      IN  s      mode,
                      IN  s      alpn,
                      IN  s      localAddress,
                      IN  i      localPort,
                      IN  s      clientAuthority,
                      OUT i      status,
                      OUT s      token,
                      OUT aa{sv} info);
```

This method assigns a Reverse Proxy on the VeeaHub, with optional presences in the Veea cloud and on the public Internet.

**Allow**: context=default

`IN s network`:

The network alias (default is 'shared:trusted')

`IN s fqdn`:

The fully qualified hostname, empty if network is "public_internet" or "veea_cloud"

`IN i externalPort`:

The port to listen on

`IN s mode`:

One of "http", "https", "tls", or "tls_sniff"

`IN s alpn`:

Optional ALPN protocol string

`IN s localAddress`:

Optional local address that the backend service is listening on

`IN i localPort`:

Local port that the backend services is listening on

`IN s clientAuthority`:

Optional certificate authority for Mutual TLS offload

`OUT i status`:

`OUT s token`:

`OUT aa{sv} info`:

### The GetStatus() method

```text
GetStatus (IN  s      token,
           OUT i      status,
           OUT a{sv}  config,
           OUT s      tunnel,
           OUT aa{sv} dns,
           OUT aa{sv} certbots,
           OUT aa{sv} proxies);
```

This method returns the status for the proxy

**Allow**: context=default

`IN s token`:

Administration token for the proxy

`OUT i status`:

`OUT a{sv} config`:

`OUT s tunnel`:

`OUT aa{sv} dns`:

`OUT aa{sv} certbots`:

`OUT aa{sv} proxies`:

### The Unregister() method

```text
Unregister (IN  s token,
            OUT i status,
            OUT s message);
```

This method releases all resources from the original request.

Status is 0 if the resources were released without error Status is 1 if the token is invalid

Internal errors when releasing resources will return a DBus error.

**Allow**: context=default

`IN s token`:

Administration token for the proxy

`OUT i status`:

`OUT s message`:

### The ListProxies() method

```text
ListProxies (OUT aav proxies);
```

Lists all proxies. It returns a list of proxy status fields as if

queried individually from GetStatus.

If called by a container, it lists the proxies belonging to the container. If called by the host, it lists all proxies across all containers.

**Allow**: context=default

`OUT aav proxies`:

### The CertificateUpdate() method

```text
CertificateUpdate (IN  s fqdn,
                   OUT i status);
```

This method notifies the service that some certificates have been updated.

Status is always 0

**Allow**: context=default

`IN s fqdn`:

`OUT i status`:

### The ConfigureVeeaCloudAccess() method

```text
ConfigureVeeaCloudAccess (IN  s      token,
                          IN  s      protocol,
                          IN  s      name,
                          IN  s      description,
                          IN  aa{sv} access,
                          OUT i      status,
                          OUT s      message);
```

This method controls access to the service from the Veea cloud.

**Allow**: context=default

`IN s token`:

The administration token for the proxy, as returned by Register()

`IN s protocol`:

The high level protocol carried by the proxy

`IN s name`:

The human-readable name of this service

`IN s description`:

The human-readable description of this service

`IN aa{sv} access`:

List of access control objects

`OUT i status`:

The status code indicating success or failure

`OUT s message`:

A human-readable message describing the status
