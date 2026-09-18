---
icon: lucide/cable
---

# D-Bus API Documentation

VeeaHub services are accessed through D-Bus APIs. D-Bus is a Linux standard for _interprocess communication_ (IPC). More information can be found on the [D-Bus Tutorial](https://dbus.freedesktop.org/doc/dbus-tutorial.html) page. Libraries exist for most common programming languages. For example:

- C/C++ - _libdbus_
- Python - _pydbus_ and _dbus-next_
- Golang - _godbus_

See [D-Bus Data Types](data-types.md) for the type codes used in the API signatures.

## API Reference Links

| Interface | Description |
| --- | --- |
| [io.veea.VeeaHub.BluetoothConfig](../api-reference/io-veea-veeahub-bluetoothconfig.md) | This service provides methods to configure Linux kernel Bluetooth parameters. (This is only available on VeeaHub platform firmware 2.32.5 and newer.) |
| [io.veea.VeeaHub.BluetoothMonitor](../api-reference/io-veea-veeahub-bluetoothmonitor.md) | This service provides methods to start and stop btmon instances on HCI interfaces. (This is only available on VeeaHub platform firmware 2.32.3 and newer.) |
| [io.veea.VeeaHub.Cellular.Status](../api-reference/io-veea-veeahub-cellular-status.md) | Provides methods to obtain status and statistics for the cellular interface. |
| [io.veea.VeeaHub.ContainerControl](../api-reference/io-veea-veeahub-containercontrol.md) | Provides methods and signals for container backup and restore. |
| [io.veea.VeeaHub.DateTime](../api-reference/io-veea-veeahub-datetime.md) | This interface allows the client to enable/disable the NTP Service (auto start the NTP process at boot), start/stop the NTP Process, set the date/time when the NTP process is not running, and set the timezone. |
| [io.veea.VeeaHub.HardwareControl.SerialPort](../api-reference/io-veea-veeahub-hardwarecontrol-serialport.md) | This allows access to host hardware control and configuration. |
| [io.veea.VeeaHub.HardwareMonitoringDaemon.Container](../api-reference/io-veea-veeahub-hardwaremonitoringdaemon-container.md) | This is the API that communicates with the containers. Any container can communicate with HMD. HMD will use the caller user ID and process information to determine which container the call was made from. |
| [io.veea.VeeaHub.Info](../api-reference/io-veea-veeahub-info.md) | This interface allows the client to retrieve VeeaHub information. |
| [io.veea.VeeaHub.Licenses](../api-reference/io-veea-veeahub-licenses.md) | This allows the client to determine the licenses on the VeeaHub. |
| [io.veea.VeeaHub.MqttControl](../api-reference/io-veea-veeahub-mqttcontrol.md) | Provides methods for managing the platform MQTT and access to it from containers. |
| [io.veea.VeeaHub.NetworkControl.WiFi](../api-reference/io-veea-veeahub-networkcontrol-wifi.md) | Provides methods to create and query WiFi Aps. |
| [io.veea.VeeaHub.Networking](../api-reference/io-veea-veeahub-networking.md) | Provides methods for accessing platform networking services. |
| [io.veea.VeeaHub.ReverseProxy](../api-reference/io-veea-veeahub-reverseproxy.md) | Provides methods for managing Reverse Proxy services on the host and the cloud. |
| [io.veea.VeeaHub.SystemConfiguration.Containers](../api-reference/io-veea-veeahub-systemconfiguration-containers.md) | This allows access to general configuration parameters for how the unit runs containers. Container-specific parameters are not managed here. |
| [io.veea.VeeaHub.WiFi.DataElements](../api-reference/io-veea-veeahub-wifi-dataelements.md) | Provides methods to obtain status and statistics for the WiFi interfaces. |
| [io.veea.VeeaHub.Wireless.Stats](../api-reference/io-veea-veeahub-wireless-stats.md) | Provides methods to obtain WiFi status and statistics. |
