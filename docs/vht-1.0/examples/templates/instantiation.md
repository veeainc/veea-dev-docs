---
icon: lucide/file-text
---

# Template Instantiation

Examples are provided by Veea in the form of `templates`. There are templates that demonstrate each aspect of VeeaHub devices and services. A list of available templates can be obtained using the `vhc example templates` command.

```console
$ vhc example templates 
+-------------------------------+-----------------------------------------------+
|             NAME              |                  DESCRIPTION                  |
+-------------------------------+-----------------------------------------------+
| vh_bluetooth_sensortag_cc2650 | Sample container that demonstrates            |
|                               | communication with SensorTag cc2650 over      |
|                               | bluetooth                                     |
| vh_config                     | Sample golang web server that demostrates     |
|                               | using the configuration volume                |
| vh_dbus                       | Sample Python container that demonstrates a   |
|                               | simple DBUS interaction                       |
| vh_ext_serial                 | Sample VHX09-10 container that demonstrates   |
|                               | the external serial port                      |
| vh_golang_web                 | Sample golang web server created using        |
|                               | multistage build pattern to keep image small  |
|                               | i.e. ~6MB                                     |
| vh_haproxy                    | Sample container that demonstrates using a    |
|                               | proxy server to access a web server           |
| vh_iperf                      | Sample container that demonstrates TCP and    |
|                               | UDP sockets using Iperf                       |
| vh_mdns                       | Sample container that demonstrates mDNS       |
|                               | service discovery and queries                 |
| vh_modbus                     | Sample container that demonstrates the use of |
|                               | MODBUS RS-485 with an XY-MD02 sensor          |
| vh_netcat_client              | Sample container that demonstrates running a  |
|                               | netcat client                                 |
| vh_netcat_server              | Sample container that demonstrates running a  |
|                               | netcat server                                 |
| vh_nodejs_web                 | Sample container that demonstrates a Node.js  |
|                               | web server                                    |
| vh_persistent_storage         | Sample container that demonstrates usage of a |
|                               | persistent storage volume                     |
| vh_python                     | Sample container that demonstrates running    |
|                               | Alpine with Python 3                          |
| vh_sshd                       | Sample container that demonstrates running    |
|                               | SSHD under Alpine                             |
| vh_zigbee                     | Sample container that demonstrates using      |
|                               | zigbee                                        |
+-------------------------------+-----------------------------------------------+
```

## Checking for Updates

New examples are added occasionally, so there is a command to check for updates:

```console
$ vhc example update
Updating Index... Done.
Updating Assets... Done.
```

You will also notice a reference to `assets`. These are example scripts that can be used in VeeaHub applications.

## Testing Templates

The `vhc` utility can be used to instantiate, build, and test a template. This is the topic of the next article. We’ll start with one of the simplest templates that demonstrates how to retrieve information about the VeeaHub called `vh_dbus`.
