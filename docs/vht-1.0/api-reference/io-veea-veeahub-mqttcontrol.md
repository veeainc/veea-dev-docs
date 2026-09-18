---
icon: lucide/file-text
---

# io.veea.VeeaHub.MqttControl

## Name

io.veea.VeeaHub.MqttControl

## Methods

```text
GetMqttSettings (OUT s username,
                 OUT s password,
                 OUT s mqtt_url,
                 OUT s mqtt_authority,
                 OUT s mqtt_publish_prefix,
                 OUT s mqtt_subscribe_prefix);
```

## Description

Provides methods for managing the platform MQTT and access to it from containers.

## Method Details

### The GetMqttSettings() method

```text
GetMqttSettings (OUT s username,
                 OUT s password,
                 OUT s mqtt_url,
                 OUT s mqtt_authority,
                 OUT s mqtt_publish_prefix,
                 OUT s mqtt_subscribe_prefix);
```

This method will return the MQTT settings for the container. It will automatically add a new account and access control list for this container if required.

**Allow**: context=default

`OUT s username`:

The username that this container should use when connecting to the MQTT server

`OUT s password`:

The password that this container should use when connecting to the MQTT server

`OUT s mqtt_url`:

The URL to use for the MQTT server

`OUT s mqtt_authority`:

The root authority certificate in PEM format

`OUT s mqtt_publish_prefix`:

The prefix for topics published by this container

`OUT s mqtt_subscribe_prefix`:

The prefix for topics published to this container
