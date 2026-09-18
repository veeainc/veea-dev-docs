---
icon: lucide/file-text
---

# io.veea.VeeaHub.BluetoothConfig

## Name

io.veea.VeeaHub.BluetoothConfig

## Description

This service provides methods to configure Linux kernel Bluetooth  
parameters.

## Method Details

## The SetScanInterval() method

io.veea.VeeaHub.BluetoothConfig.SetScanInterval()  
SetScanInterval (IN i index,  
IN q interval,  
OUT i returnCode);

Set the value of the scan interval (in units of 0.625 milliseconds) in  
the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q interval`:  
The scan interval in units of 0.625 milliseconds (from 4 to 16384)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetScanInterval() method

io.veea.VeeaHub.BluetoothConfig.GetScanInterval()  
GetScanInterval (IN i index,  
OUT i returnCode,  
OUT q interval);

Get the current value of the scan interval (in units of 0.625  
milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT q interval`:  
The scan interval in units of 0.625 milliseconds

## The SetScanWindow() method

io.veea.VeeaHub.BluetoothConfig.SetScanWindow()  
SetScanWindow (IN i index,  
IN q window,  
OUT i returnCode);

Set the value of the scan window (in units of 0.625 milliseconds) in the  
kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q window`:  
The scan window in units of 0.625 milliseconds (from 4 to 16384)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetScanWindow() method

io.veea.VeeaHub.BluetoothConfig.GetScanWindow()  
GetScanWindow (IN i index,  
OUT i returnCode,  
OUT q window);

Get the current value of the scan window (in units of 0.625  
milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT q window`:  
The scan window in units of 0.625 milliseconds

## The SetScanFilterDups() method

io.veea.VeeaHub.BluetoothConfig.SetScanFilterDups()  
SetScanFilterDups (IN i index,  
IN b filter_dups,  
OUT i returnCode);

Set the value of duplicate filtering in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN b filter_dups`:  
The scan filter duplicates value

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetScanFilterDups() method

io.veea.VeeaHub.BluetoothConfig.GetScanFilterDups()  
GetScanFilterDups (IN i index,  
OUT i returnCode,  
OUT b filter_dups);

Get the current value of duplicate filtering in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT b filter_dups`:  
The scan filter duplicates value

## The SetAdvOmitBrEdrFlag() method

io.veea.VeeaHub.BluetoothConfig.SetAdvOmitBrEdrFlag()  
SetAdvOmitBrEdrFlag (IN i index,  
IN b omit_br_edr_flag,  
OUT i returnCode);

Set the value of omit BR/EDR flag value in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN b omit_br_edr_flag`:

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetAdvOmitBrEdrFlag() method

io.veea.VeeaHub.BluetoothConfig.GetAdvOmitBrEdrFlag()  
GetAdvOmitBrEdrFlag (IN i index,  
OUT i returnCode,  
OUT b omit_br_edr_flag);

Get the current value of omit BR/EDR flag in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT b omit_br_edr_flag`:

## The SetAdvMinInterval() method

io.veea.VeeaHub.BluetoothConfig.SetAdvMinInterval()  
SetAdvMinInterval (IN i index,  
IN q interval,  
OUT i returnCode);

Set the value of the adv min interval (in units of 0.625 milliseconds)  
in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q interval`:  
The adv min interval in units of 0.625 milliseconds (from 0x20  
to 0xffffff)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetAdvMinInterval() method

io.veea.VeeaHub.BluetoothConfig.GetAdvMinInterval()  
GetAdvMinInterval (IN i index,  
OUT i returnCode,  
OUT q interval);

Get the current value of the adv min interval (in units of 0.625  
milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT q interval`:  
The adv min interval in units of 0.625 milliseconds

## The SetAdvMaxInterval() method

io.veea.VeeaHub.BluetoothConfig.SetAdvMaxInterval()  
SetAdvMaxInterval (IN i index,  
IN q interval,  
OUT i returnCode);

Set the value of the adv max interval (in units of 0.625 milliseconds)  
in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q interval`:  
The adv max interval in units of 0.625 milliseconds (from 0x20  
to 0xffffff)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error,  
-3: Unknown error)

## The GetAdvMaxInterval() method

io.veea.VeeaHub.BluetoothConfig.GetAdvMaxInterval()  
GetAdvMaxInterval (IN i index,  
OUT i returnCode,  
OUT q interval);

Get the current value of the adv max interval (in units of 0.625  
milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error,  
-3: Unknown error)

`OUT q interval`:  
The adv max interval in units of 0.625 milliseconds

## The SetConnMinInterval() method

io.veea.VeeaHub.BluetoothConfig.SetConnMinInterval()  
SetConnMinInterval (IN i index,  
IN q interval,  
OUT i returnCode);

Set the value of the conn min interval (in units of 0.625 milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q interval`:  
The conn min interval in units of 0.625 milliseconds (from 0x0006 to 0x0c80)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error, -3: Unknown error)

## The GetConnMinInterval() method

io.veea.VeeaHub.BluetoothConfig.GetConnMinInterval()  
GetConnMinInterval (IN i index,  
OUT i returnCode,  
OUT q interval);

Get the current value of the conn min interval (in units of 0.625 milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error, -3: Unknown error)

`OUT q interval`:  
The conn min interval in units of 0.625 milliseconds

## The SetConnMaxInterval() method

io.veea.VeeaHub.BluetoothConfig.SetConnMaxInterval()  
SetConnMaxInterval (IN i index,  
IN q interval,  
OUT i returnCode);

Set the value of the conn max interval (in units of 0.625 milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN q interval`:  
The conn max interval in units of 0.625 milliseconds (from 0x0006 to 0x0c80)

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Write error, -3: Unknown error)

## The GetConnMaxInterval() method

io.veea.VeeaHub.BluetoothConfig.GetConnMaxInterval()  
GetConnMaxInterval (IN i index,  
OUT i returnCode,  
OUT q interval);

Get the current value of the conn max interval (in units of 0.625 milliseconds) in the kernel.

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`OUT i returnCode`:  
The return code (0: Success, -1: Invalid HCI interface, -2: Read error, -3: Unknown error)

`OUT q interval`:  
The conn max interval in units of 0.625 milliseconds

## The SetDefaultPhy() method

io.veea.VeeaHub.BluetoothConfig.SetDefaultPhy()  
SetDefaultPhy (IN i index,  
IN i all_bits,  
IN i tx_bits,  
IN i rx_bits,  
OUT i returnCode);

Set the default Phy to use for an interface

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN i all_bits`:  
The all Phy bits mask (1 - Tx, 2 - Rx)

`IN i tx_bits`:  
The Tx Phy bits (1 - 1M, 2 - 2M, 4 - Coded)

`IN i rx_bits`:  
The Rx Phy bits (1 - 1M, 2 - 2M, 4 - Coded)

`OUT i returnCode`:  
The return code (0: Success, 1: Invalid HCI interface, -1: Invalid value)

## The SetPhy() method

io.veea.VeeaHub.BluetoothConfig.SetPhy()  
SetPhy (IN i index,  
IN i conn,  
IN i all_bits,  
IN i tx_bits,  
IN i rx_bits,  
OUT i returnCode);

Set the Phy to use for a connection

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN i conn`:  
The connection handle

`IN i all_bits`:  
The all Phy bits mask (1 - Tx, 2 - Rx)

`IN i tx_bits`:  
The Tx Phy bits (1 - 1M, 2 - 2M, 4 - Coded)

`IN i rx_bits`:  
The Rx Phy bits (1 - 1M, 2 - 2M, 4 - Coded)

`OUT i returnCode`:  
The return code (0: Success, 1: Invalid HCI interface, -1: Invalid value)

## The SetDataLength() method

io.veea.VeeaHub.BluetoothConfig.SetDataLength()  
SetDataLength (IN i index,  
IN i conn,  
IN i tx_len,  
IN i tx_time,  
OUT i returnCode);

Set the tx data length for the connection

`Allow`: group=bluetooth

`IN i index`:  
The hci interface index

`IN i conn`:  
The connection handle

`IN i tx_len`:  
The connection length

`IN i tx_time`:  
The connection time

`OUT i returnCode`:  
The return code (0: Success, 1: Invalid HCI interface, -1: Invalid value)
