---
icon: lucide/file-text
---

# io.veea.VeeaHub.Info

## Name

io.veea.VeeaHub.Info

## Methods

```text
HardwareType            (OUT s                     hardware_type);
HardwarePcba            (OUT s                     hardware_pcba);
HardwareRevision        (OUT s                     hardware_revision);
Model                   (OUT s                     model);
BoardType               (OUT s                     board_type);
CpuTemperature          (OUT i                     cpu_temperature);
CellularDriverVersion   (OUT s                     cellular_driver_version);
ManufacturerSerial      (OUT s                     manufacturer_serial);
SocSerial               (OUT s                     soc_serial);
VeeaSerial              (OUT s                     veea_serial);
BatteryIsGood           (OUT (ib)                  battery_is_good);
LastRebootTime          (OUT (is)                  last_reboot_time);
LastRecoveryTime        (OUT (is)                  last_recovery_time);
ActiveSystem            (OUT s                     active_system_uuid);
Hostname                (OUT s                     hostname);
OSVersion               (OUT s                     OSVersion);
PlatformSoftware        (OUT a(issssis)            platform_software_list);
SoftwareVersion         (OUT s                     software_version);
StorageCapacity         (OUT a{s(sssssss)}         file_system_list);
Memory                  (OUT a{ss}                 meminfo);
LoadAvg                 (OUT (ssssss)              load_avg);
Cpu                     (OUT (atatatatatattiiiiai) cpu_info);
ProductFeatures         (OUT a{ss}                 product_features_info);
ProductSerial           (OUT (sssssssssss)         product_serial_info);
SerialNumberDecode      (OUT a{sv}                 info);
BootCount               (OUT i                     boot_count);
BootCrc                 (OUT u                     boot_crc);
BootMagic               (OUT u                     boot_magic);
LastBootCount           (OUT i                     last_boot_count);
LastResetReason         (OUT (is)                  last_reset_reason);
LastSystemState         (OUT (is)                  last_system_state);
RequestSystem           (OUT (is)                  request_system);
ResetReason             (OUT (is)                  reset_reason);
RunningSystem           (OUT (is)                  running_system);
SystemState             (OUT (is)                  system_state);
HardwareModuleInventory (OUT a(sssss)              hardware_module_inventory_list);
HardwareInventoryDetail (OUT (ia{sv})              hardware_inventory_detail_report);
NodeType                (OUT s                     node_type);
NodeCountry             (OUT s                     node_country);
MeshUUID                (OUT s                     MeshUUID);
BaseMACAddress          (OUT s                     board_mac_address);
MACAddressNumber        (OUT i                     board_mac_address_number);
OwnerUUID               (OUT s                     OwnerUUID);
```

## Description

This interface allows the client to retrieve VeeaHub information.

## Method Details

### The HardwareType() method

```text
HardwareType (OUT s hardware_type);
```

Returns the hardware type as a string.

**Allow**: context=default

`OUT s hardware_type`:

The hardware type

### The HardwarePcba() method

```text
HardwarePcba (OUT s hardware_pcba);
```

Returns the hardware PCBA as a string.

**Allow**: context=default

`OUT s hardware_pcba`:

The hardware PCBA

### The HardwareRevision() method

```text
HardwareRevision (OUT s hardware_revision);
```

Returns the hardware revision as a string.

**Allow**: context=default

`OUT s hardware_revision`:

The hardware revision

### The Model() method

```text
Model (OUT s model);
```

Returns the hardware model as a string.

**Allow**: context=default

`OUT s model`:

The hardware model

### The BoardType() method

```text
BoardType (OUT s board_type);
```

Returns the hardware board type as a string.

**Allow**: context=default

`OUT s board_type`:

The hardware board type

### The CpuTemperature() method

```text
CpuTemperature (OUT i cpu_temperature);
```

Returns the CPU temperature in milli degrees Celsius.

**Allow**: context=default

`OUT i cpu_temperature`:

The CPU temperature in milli degrees Celsius

### The CellularDriverVersion() method

```text
CellularDriverVersion (OUT s cellular_driver_version);
```

Returns the contents of the cellular driver module version file.

**Allow**: context=default

`OUT s cellular_driver_version`:

The name and version of the Cellular driver

### The ManufacturerSerial() method

```text
ManufacturerSerial (OUT s manufacturer_serial);
```

Returns the manufacturer serial number for the main system board as a string.

**Allow**: context=default

`OUT s manufacturer_serial`:

The manufacturer serial number as a string

### The SocSerial() method

```text
SocSerial (OUT s soc_serial);
```

Returns the system-on-chip serial number as a string.

**Allow**: context=default

`OUT s soc_serial`:

The SOC serial number as a string

### The VeeaSerial() method

```text
VeeaSerial (OUT s veea_serial);
```

Returns the Veea-issued serial number for the main system board as a string.

**Allow**: context=default

`OUT s veea_serial`:

The Veea-issued serial number as a string

### The BatteryIsGood() method

```text
BatteryIsGood (OUT (ib) battery_is_good);
```

_DEPRECATED_ - rely on platform LEDs to show battery state

`battery_is_good`: The battery status The first return value is 0 if the status was read successfully and 1 for failure The second return value is only defined if the first return value is 0. It will be true if the battery is ok and false if it is bad.

**Allow**: context=default

`OUT (ib) battery_is_good`:

### The LastRebootTime() method

```text
LastRebootTime (OUT (is) last_reboot_time);
```

The first return value is the number of seconds since the epoch if the time was read successfully and 0 for failure The second return value is only defined if the first return value is not 0. It indicates the last reboot time as a string.

**Allow**: context=default

`OUT (is) last_reboot_time`:

The last reboot time

### The LastRecoveryTime() method

```text
LastRecoveryTime (OUT (is) last_recovery_time);
```

The first return value is the number of seconds since the epoch if the time was read successfully and 0 for failure The second return value is only defined if the first return value is not 0. It indicates the last recovery time as a string.

**Allow**: context=default

`OUT (is) last_recovery_time`:

The last recovery time

### The ActiveSystem() method

```text
ActiveSystem (OUT s active_system_uuid);
```

Returns the value is the partition UUID of the active/running system as a string.

| System | UUID |
| --- | --- |
| System A | 5ca1ab1e-c0de-ba5e-0005-000000000000 |
| System B | 5ca1ab1e-c0de-ba5e-0005-000000000001 |

**Allow**: context=default

`OUT s active_system_uuid`:

The running system partition UUID

### The Hostname() method

```text
Hostname (OUT s hostname);
```

Returns the systems hostname as a string.

**Allow**: context=default

`OUT s hostname`:

The host name

### The OSVersion() method

```text
OSVersion (OUT s OSVersion);
```

Returns the OS version as a string.

**Allow**: context=default

`OUT s OSVersion`:

The OS Version

### The PlatformSoftware() method

```text
PlatformSoftware (OUT a(issssis) platform_software_list);
```

Returns a list of platform software meta-data for each info partition.

| Entry | Description |
| --- | --- |
| i => Return Code | 0 - Success / 1 - Error |
| s => Partition info UUID |  |
| s => Software release UUID |  |
| s => Version |  |
| s => Type |  |
| i => Timestamp |  |
| s => JSON dump |  |

**Allow**: context=default

`OUT a(issssis) platform_software_list`:

The list of platform software meta-data

### The SoftwareVersion() method

```text
SoftwareVersion (OUT s software_version);
```

Returns the software version as a string.

**Allow**: context=default

`OUT s software_version`:

The software version

### The StorageCapacity() method

```text
StorageCapacity (OUT a{s(sssssss)} file_system_list);
```

Returns a list of file system node and size information.

| Entry | Description |
| --- | --- |
| s => Key |  |
| s => File system |  |
| s => Number of inodes |  |
| s => Number of inodes used |  |
| s => Number of inodes available |  |
| s => File system size |  |
| s => File system amount used |  |
| s => File system amount available |  |

**Allow**: context=default

`OUT a{s(sssssss)} file_system_list`:

The list of file system node and size info

### The Memory() method

```text
Memory (OUT a{ss} meminfo);
```

Returns a dictionary of all items from /proc/meminfo.

See the meminfo specification for description of all items returned in /proc/meminfo

| Entry | Description |
| --- | --- |
| s => Key | e.g., 'MemTotal' |
| s => Value | e.g., '879264 kB' |

**Allow**: context=default

`OUT a{ss} meminfo`:

The dictionary of memory info

### The LoadAvg() method

```text
LoadAvg (OUT (ssssss) load_avg);
```

Returns all items from /proc/loadavg.

See the loadavg specification for description of all items returned in /proc/loadavg

| Entry | Description |
| --- | --- |
| s => Average 1 minute |  |
| s => Average 5 minutes |  |
| s => Average 15 minutes |  |
| s => Number of running processes and threads |  |
| s => Number of scheduled processes and threads |  |
| s => Most recently created PID |  |

**Allow**: context=default

`OUT (ssssss) load_avg`:

Load average

### The Cpu() method

```text
Cpu (OUT (atatatatatattiiiiai) cpu_info);
```

Returns all info from /proc/stat

See the stat specification for description of all items returned in /proc/loadavg

| Entry | Description |
| --- | --- |
| ai => cpu | array of int e.g., 18381 0 27635 89617892 7560 0 163720 0 0 0 |
| ai => cpu0 | array of int e.g., 4807 0 9291 21441860 292 0 163718 0 0 0 |
| ai => cpu1 | array of int e.g., 6181 0 6701 22719014 63 0 0 0 0 0 |
| ai => cpu2 | array of int e.g., 3252 0 4790 22722657 7142 0 2 0 0 0 |
| ai => cpu3 | array of int e.g., 4141 0 6853 22734360 61 0 0 0 0 0 |
| ai => intr | array of int e.g., 995944649 0 0 0 0 0 0 0 0 0 0 0 0 ........ |
| i => ctxt | int e.g., 22719264 |
| i => btime | int e.g., 1552683394 |
| i => processes | int e.g., 96912 |
| i => procs_running | int e.g., 1 |
| i => procs_blocked | int e.g., 0 |
| ai => softirq array of int | e.g., 24297677 2398271 8381593 45496 297213 218858 0 552057 8479017 0 3925172 |

**Allow**: context=default

`OUT (atatatatatattiiiiai) cpu_info`:

Stat info

### The ProductFeatures() method

```text
ProductFeatures (OUT a{ss} product_features_info);
```

Returns a dictionary of platform specific information with the following fields:

ProductFeatures is intended to describe features that cannot reliably be determined through software means e.g. by scanning a USB bus, or device-tree look-up.

Product Features might include:

Manufacturing considerations e.g. to describe when erratas or waivers are imposed Physical consideration e.g. if a high-gain antenna fitted

| Entry | Description |
| --- | --- |
| wifi_ap_mesh_mux - "True" | "False" | Returns "True" if the hardware platform has a multiplexed access-point and mesh configuration for the WiFi radio. |
| wifi_sub_band_5gz_radios - "True" | "False" | Returns "True" if the hardware platform supports multiple 5 GHz sub-band radios. For example the VHE10 supports 2 x 5 GHz radios (lower and upper bands). |
| wifi_ap_mesh_mux_24g - "True" | "False" | Returns "True" if the hardware platform 2.4 GHz radio is sharded between mesh and AP. |
| wifi_single_band_24g - "True" | "False" | Returns "True" if the hardware platform 2.4 GHz radio is single band. |
| wifi_single_band_5g - "True" | "False" | Returns "True" if the hardware platform 5 GHz radio is single band. |

**Allow**: context=default

`OUT a{ss} product_features_info`:

Product feature info

### The ProductSerial() method

```text
ProductSerial (OUT (sssssssssss) product_serial_info);
```

_DEPRECATED_ - superseded by SerialNumberDecode

Decodes product serial number and returns the following values:

These values above are encoded into a VeeaHub serial number and the encoding definition is documented in the serial number specification.

| Entry | Description |
| --- | --- |
| VeeaHub Serial Number |  |
| Model |  |
| Hardware Revision |  |
| Country Of Origin |  |
| Color |  |
| LTE Backhaul |  |
| LTE Access |  |
| Module/Feature Bitmap |  |
| Module/Feature List |  |
| Mem DDR/Flash (units 1GB) |  |
| Unique ID |  |

**Allow**: context=default

`OUT (sssssssssss) product_serial_info`:

Product serial info

### Warning

The ProductSerial() method is deprecated.

### The SerialNumberDecode() method

```text
SerialNumberDecode (OUT a{sv} info);
```

Decodes the product serial number and returns a dictionary with the following values:

These values above are encoded into a VeeaHub serial number and the encoding definition is documented in the serial number specification.

| Entry | Type | Values |
| --- | --- | --- |
| serial_number | s | Full serial number (20 characters) |
| model | s | VHC05, VHC25, VHE06, VHE09, VHE10, VHE20, VHH06, VHH09, VHH10, VHHR06, PS2 |
| hardware_revision | s | A-Z |
| country_of_origin | s | US, China, Korea, Great Britain, Taiwan, Japan, India |
| color | s | Black, White |
| lte_backhaul | s | None, Quectel ECxxx, Quectel EGxxx |
| lte_access | s | None |
| module_feature_bitmap | y | 0x00-0xff |
| module_feature_list | as | Array of strings (e.g., \"Nortek Zigbee", "Nortek Zwave"\]) |
| ddr_in_gb | u | 1, 2, 4, 8 |
| ddr_type | s | non-ECC, ECC |
| flash_in_gb | u | 32 |
| unique_id | s | 8 digits (00000000 - 99999999) |
| lorawan | s | None, RG-1058M, RG-1018M, RG-1008M |

**Allow**: context=default

`OUT a{sv} info`:

Product serial info decoded as a dictionary

### The BootCount() method

```text
BootCount (OUT i boot_count);
```

Set to zero when the unit is powered up and incremented by one by first stage bootloader (U-Boot, TBL1FW/NBL1FW) every time it boots or reboots.

If the boot count is over 12, the bootloader resets it back to 7. Thus, once in self-heal, it will alternate between the self-heal primary and self-heal backup.

Defines first stage bootloader default boot selection: 0-3 = preferred system, 4-6 = failover system, 7-9 = self-heal primary, 10-12 = self-heal backup.

Reset to zero by the system after successful self-heal or upon controlled system reboot.

**Allow**: context=default

`OUT i boot_count`:

The boot count

### The BootCrc() method

```text
BootCrc (OUT u boot_crc);
```

Returns the CRC used to check the integrity of data backed in DRAM.

**Allow**: context=default

`OUT u boot_crc`:

The boot CRC

### The BootMagic() method

```text
BootMagic (OUT u boot_magic);
```

Returns a number used for memory mapped platforms to indicate that the boot info has been initialized and is valid.

**Allow**: context=default

`OUT u boot_magic`:

The boot magic value

### The LastBootCount() method

```text
LastBootCount (OUT i last_boot_count);
```

Returns a copy of boot_count when first stage bootloader started.

**Allow**: context=default

`OUT i last_boot_count`:

The last boot count

### The LastResetReason() method

```text
LastResetReason (OUT (is) last_reset_reason);
```

Returns the reason (value and name) for the last reset. See [ResetReason() for return value details.

**Allow**: context=default

`OUT (is) last_reset_reason`:

The last reset reason

### The LastSystemState() method

```text
LastSystemState (OUT (is) last_system_state);
```

Returns a copy of the system state (value and name) when first stage bootloader started. See SystemState() for return value details.

**Allow**: context=default

`OUT (is) last_system_state`:

The last system state

### The RequestSystem() method

```text
RequestSystem (OUT (is) request_system);
```

Returns the value and name of the most recent explicit boot request for first stage boot loaded on next boot.

| Entry | Description |
| --- | --- |
| 0 | Default |
| 1 | Preferred System (A/B) |
| 2 | Failover System (A/B) |
| 3 | Self-Heal/Recovery Primary |
| 4 | Self-Heal/Recovery Backup |
| 5-7 | Reserved |
| 8 | Sys-A |
| 9 | Sys-B |
| 10 | Rec-A |
| 11 | Rec-B |
| 12 | RMA |
| 13-15 | Reserved |

**Allow**: context=default

`OUT (is) request_system`:

The most recent boot request

### The ResetReason() method

```text
ResetReason (OUT (is) reset_reason);
```

Returns the reason (value and name) of the next reset.

| Entry | Description |
| --- | --- |
| 0 | Not Set |
| 1 | Cold Boot |
| 2 | Watchdog |
| 3 | CPU |
| 4 | Button |
| 5 | Pin |

**Allow**: context=default

`OUT (is) reset_reason`:

The reset reason

### The RunningSystem() method

```text
RunningSystem (OUT (is) running_system);
```

Returns the value and name of the running system..

| Entry | Description |
| --- | --- |
| 0 | Preferred System (Sys-A/Sys-B) |
| 1 | Failover System (Sys-A/Sys-B) |
| 2 | Self-Heal Primary/Recovery (Sys-C) |
| 3 | Self-Heal Backup/Recovery (Sys-D) |

**Allow**: context=default

`OUT (is) running_system`:

The running system

### The SystemState() method

```text
SystemState (OUT (is) system_state);
```

Returns the system state (value and name) which is used for tracking to detect failed boot or provide additional information about what the system was doing when the reboot occurred.

| Entry | Description |
| --- | --- |
| 0 | Shutdown |
| 1 | BL 0.0 |
| 2 | BL 0.1 |
| 3 | BL 2.0 |
| 4 | BL 3.0 |
| 5 | BL 3.1 |
| 6 | BL 3.2 |
| 7 | BL 3.3 |
| 16 | Linux |
| 17 | VMRUN Corruption Detected |
| 18 | Reset Reqeusted by Button |
| 19 | Container Bootstrap Requested by Button |
| 20 | Factory Reset Requested by Button |
| 21 | Node Spec Not Found |
| 22 | Bootstrap Recovery Timestamp is older than the MAS EnrollmentUpdatedAt Timestamp |
| 23 | Invalid Mesh UUID |
| 24 | Timeout Connecting to the MAS |

**Allow**: context=default

`OUT (is) system_state`:

The system state

### The HardwareModuleInventory() method

```text
HardwareModuleInventory (OUT a(sssss) hardware_module_inventory_list);
```

Returns a list of the currently supported and attached USB and PCI hardware in the following format:

| Entry | Description |
| --- | --- |
| s => id | e.g., '0bda:8812' |
| s => bus | e.g., 'usb' |
| s => name | e.g., 'Realtek 8812AU' |
| s => type | e.g., 'wlan' |
| s => serial | e.g., '123456' |

**Allow**: context=default

`OUT a(sssss) hardware_module_inventory_list`:

The list of hardware

### The HardwareInventoryDetail() method

```text
HardwareInventoryDetail (OUT (ia{sv}) hardware_inventory_detail_report);
```

`hardware_inventory_detail`: Returns both a return code and an array of dictionaries that contain the Hardware Inventory Detail Report. This is a dynamic report that contains all hardware modules currently present at the time this report is run regardless of what hardware was present during manufacturing. The output structure is very similar to the VeeaHub Manufacturing Report. The detailed manufacturing-report format is not included in this repository.

| Entry | Description |
| --- | --- |
| i => ReturnCode | 0-Success, 1-Error, 2-EAGAIN |
| a{sv} => Hardware Module Inventory Array | An array of dictionaries that contain the hardware inventory detail of all hardware modules present on a VeeaHub at the time the report is run. |

**Allow**: context=default

`OUT (ia{sv}) hardware_inventory_detail_report`:

### The NodeType() method

```text
NodeType (OUT s node_type);
```

Returns the node type in the form "MEN" or "MN". If the database is available, then this setting will be read directly. If the database is not available, then this setting will be read from the enrolment data (if available), otherwise the default will be "MEN".

**Allow**: context=default

`OUT s node_type`:

The node type

### The NodeCountry() method

```text
NodeCountry (OUT s node_country);
```

Returns the node country as a 2/3 letter country code (ISO 3166). The country code is set by enrolment, and cannot be changed except by re-enrolling the unit.

**Allow**: context=default

`OUT s node_country`:

### The MeshUUID() method

```text
MeshUUID (OUT s MeshUUID);
```

Returns the current mesh UUID, as set by enrolment.

**Allow**: context=default

`OUT s MeshUUID`:

The current mesh UUID

### The BaseMACAddress() method

```text
BaseMACAddress (OUT s board_mac_address);
```

Returns the base MAC address as a string.

**Allow**: context=default

`OUT s board_mac_address`:

The base address of the 32-address block allocated to this VeeaHub

### The MACAddressNumber() method

```text
MACAddressNumber (OUT i board_mac_address_number);
```

Returns the number of MAC addresses.

**Allow**: context=default

`OUT i board_mac_address_number`:

The number of MAC addresses allocated to this VeeaHub.

### The OwnerUUID() method

```text
OwnerUUID (OUT s OwnerUUID);
```

Returns the current owner UUID, as set by enrolment.

**Allow**: context=default

`OUT s OwnerUUID`:

The current owner UUID
