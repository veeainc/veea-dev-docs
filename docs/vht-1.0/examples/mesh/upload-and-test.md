---
icon: lucide/file-text
---

# Mesh-enabled Template Example Upload and Test

## Mesh Application Deployment using VHT.

The application we just built (build/vh_dmqtt-1.0.0.tgz) contains the two services (mesh broker and mesh client) for both the arm32 and arm64 architectures. This TGZ will be uploaded to your mesh using VHC.

### Application Deployment via VHT.

First lets be sure VHC can communicate with your VeeaHub MEN. We will accommplish the following tasks:

*   Add your hub to your VHC configuration by creating a hub-id for your MEN
    
*   ping your hub to make sure it is working
    
*   Configure initial VSH access by uploading your personal ssh public key into your MEN for passwordless certificate authentication
    
*   Enable VSH partner logging for log streaming
    

#### Setup Your Hub

To add your hub to your VHC configuration, run:

*   vhc hub config add-hub --ip-address <Hub IP> --serial-number <Hub Serial Number> <hub id>
    

Example below:

```bash
$ vhc hub config add-hub --ip-addr 192.168.1.5 --serial-number C25DTADSR00000001134 1134
```

#### Test communications with your VeeaHub:

*   vhc hub access ping <hub id>
    

Example below:

```bash
$ vhc hub access ping --hub-id 1134
Pinging C25DTADSR00000001134:9000 (ping)...
Located hub 192.168.1.5 via IP address.
Success
```

#### Configure Initial VSH access by uploading your ssh public key

*   vhc hub config access --hub-id <Hub Id> upload-public-key <Your ssh public key file >
    

Example below:

```bash
jstrain@test-server:~$ vhc hub access --hub-id 1134 upload-public-key ~/.ssh/id_rsa.pub 
File exists:/home/jstrain/.ssh/id_rsa.pub
Setting Ssh Public Key for file [/home/jstrain/.ssh/id_rsa.pub] on C25DTW00000000001134:9000 (hub/sshkey)...
############################################################################################################################################################################################################################ 100.0%
Success
```

#### Enable VSH partner logging

Partner logging allows you to view all of your log messages from all your running containers in one place using the VSH command 'loggging logfile stream'. The following command shows if partner logging has been enabled or not.

```bash
[VHC25000001134-0000000D] logging logfile show
```

The following command will enable partner logging.

```bash
[VHC25000001134-0000000D] logging logfile enable
```

The following command starts a partner log streaming session . And using the key command 'CTRL-C' will break you out of the session when you are done.

```bash
[VHC25000001134-0000000D] logging logfile stream
```

After you enable partner logging, your container needs to be restarted (if it is already running) for partner logging to take affect. All newley started containers from this point on will have partner logging enabled by default.

Below is example of enabling partner logging

```bash
jstrain@test-server:~$ vhc hub access --hub-id 1134 shell

                  **      **   ********  **      **
                 /**     /**  **//////  /**     /**
                 /**     /** /**        /**     /**
                 //**    **  /********* /**********
                  //**  **   ////////** /**//////**
                   //****           /** /**     /**
                    //**      ********  /**     /**
                     //      ////////   //      //
                     
       Welcome to the Veea shell. (2.33.0-23.vhp.7524.build1.10.g2edf7e5b+jstrain.20240425.003202)
       Type help to list commands.

[VHC25000001134-0000000D] logging logfile show
Logfile logging disabled

[VHC25000001134-0000000D] logging logfile enable

[VHC25000001134-0000000D] logging logfile show
Logfile logging enabled
```

#### Start logging Session

At this point its recommended to open (and leave it open) a dedicated VSH window just for the steaming of partner logs like the following example shows.

```bash
jstrain@test-server:~$ vhc hub access --hub-id 1134 shell

                  **      **   ********  **      **
                 /**     /**  **//////  /**     /**
                 /**     /** /**        /**     /**
                 //**    **  /********* /**********
                  //**  **   ////////** /**//////**
                   //****           /** /**     /**
                    //**      ********  /**     /**
                     //      ////////   //      //
                     
       Welcome to the Veea shell. (2.33.0-23.vhp.7524.build1.10.g2edf7e5b+jstrain.20240425.003202)
       Type help to list commands.

[VHC25000001134-0000000D] logging logfile stream
2024-04-27T11:33:28.822+00:00 C25DTW00000000001134 d8c30d14019f/vh_dmqtt_broker-1.0.0[10294]: 1714217608: Bridge d8c30d14019f.bridge-broker0 sending CONNECT
```

#### Upload your application to your VeeaHub using VHC

*   Upload your app using 'vhc hub access --hub-id <hubid> upload-app <application.tgz>'
    

```bash
$ vhc hub access --hub-id <hub-id> upload-app ./build/vht/vh_dmqtt-1.0.0.tgz
```

#### Start your Mesh Broker Service using VSH

You will start VSH 'Veea Shell' using command:

*   'vhc hub access --hub-id <hubid> shell'
    

Then you will list the services that you just uploaded and you should see both mesh-broker and mesh-client services using the VSH command:

*   docker service ls
    

Now start just the broker service for now using the VSH command:

*   docker service start vh_dmqtt_broker
    

See example below that shows the listing of services and the starting of your mesh-broker.

```bash
jstrain@test-server:~$ vhc hub access --hub-id 1134 shell

                  **      **   ********  **      **
                 /**     /**  **//////  /**     /**
                 /**     /** /**        /**     /**
                 //**    **  /********* /**********
                  //**  **   ////////** /**//////**
                   //****           /** /**     /**
                    //**      ********  /**     /**
                     //      ////////   //      //
                     
       Welcome to the Veea shell. (2.33.0-23.vhp.7524.build1.10.g2edf7e5b+jstrain.20240425.003202)
       Type help to list commands.

[VHC25000001134-0000000D] docker service ls
ID   | NAME              | STATE      | MODE   | REPLICAS   | IMAGE  
-    | vh_dmqtt_client   | Uploaded   | -      | -          | -      
-    | vh_dmqtt_broker   | Uploaded   | -      | -          | -      

[VHC25000001134-0000000D] docker service start vh
vh_dmqtt_broker   vh_dmqtt_client   

[VHC25000001134-0000000D] docker service start vh_dmqtt_broker 
Starting service (vh_dmqtt_broker) now, please be patient it can take up to 30 seconds to complete.
[VHC25000001134-0000000D] 

[VHC25000001134-0000000D] docker service ls
ID                          | NAME              | STATE      | MODE     | REPLICAS   | IMAGE                          
eb0526vbe6lohtlpkt1kmauvu   | vh_dmqtt_broker   | Running    | Global   | 1/1        | vh_dmqtt_broker-arm32v7:1.0.0  
-                           | vh_dmqtt_client   | Uploaded   | -        | -          | -                              
[VHC25000001134-0000000D]
```

Take a look at your partner logs and you should notice an error. The error says:

*   'Required User Config (/usr/local/config/defaults/user-config.json) file missing'
    

This error is expected ONLY for initial startup because we have not copied in the user-config.json file yet. We will resolve this issue now.

See example of error log below:

```bash

2024-04-23T15:27:17.488+00:00 C25DTADSR00000001134 9b28a1bff50a/vh_dmqtt_broker-1.0.0[8602]: 2024-04-23 15:27:17,486: mesh_mqtt_broker: validate_and_load_config: user-config.yaml validation error:Required User Config (/usr/local/config/defaults/user-config.json) file missing
2024-04-23T15:27:17.488+00:00 C25DTADSR00000001134 9b28a1bff50a/vh_dmqtt_broker-1.0.0[8602]: 2024-04-23 15:27:17,487: mesh_mqtt_broker: validate_and_load_config: Error: will try again to process /usr/local/config/defaults/user-config.json again in 30 secs
```

#### Mount WebDAV configuration volume and upload mesh brokers config file user-config.json

We need a secure way to copy our config file into our VeeaHub for our mesh broker to access and WebDAV allows us to mount a configuration volume server in our VeeaHub using HTTP.

First we need to install the WebDAV client on our workstation. The example below is for Ubuntu

```bash
$ sudo apt install -y davfs2
```

We now need to enable the WebDAV server on our mesh broker container and get its running port number. List the running containers with the VSH command:

*   docker container ls
    

Next we start the WebDAV server by exporting out mesh broker's container using the VSH command:

*   docker container export <mesh broker container name>
    

Take note of the port number returned (like example below) because we will need it in the next step.

*   'Configuration exported on https://<ip-address>:9002'
    
*   See output below for example so far.
    

Execute VSH command 'docker export <container-id>'

```bash
[VHC25000001134-0000000D] docker container ls
ID             | P-UUID                                 | NAME              | STATUS         | IMAGE          | CREATED         | PORTS                            
9b28a1bff50a   | 0000000D-C34F-4E1A-9E57-EB59F9762DF1   | vh_dmqtt_broker   | Up 3 minutes   | vh_dmqtt_bro   | 3 minutes ago   | 0.0.0.0:1883->1883/tcp,5678/tcp  

[VHC25000001134-0000000D] docker container export vh
vh_config:52fd3ab2         vh_dmqtt_broker:9b28a1bf   

[VHC25000001134-0000000D] docker container export vh_dmqtt_broker:9b28a1bf 
Configuration exported on https://<ip-address>:9002
[VHC25000001134-0000000D] 
```

Next, Create a temporary directory to be used as mount point for WebDav File system.

mkdir /tmp/mesh-broker-config

On your workstation, mount the WebDAV configuration volume where you will provide:

*   VeeaHub Serial Number i.e. 'C25DTADSR00000001134'
    
*   WebDAV server port number returned in output from VSH command 'docker container export' previously - i.e. '9002'
    
*   Name of temporary directory you created previously i.e. '/tmp/mesh-broker-config'
    

Now issue the following command on your workstation:

*   sudo mount -t davfs https://<VeeaHub SerialNumber>:<WebDAV Port Number> < Temporary Local Mount Directory >
    

Note: When prompted for username and password, just hit the CR for both.

See example below:

```bash
jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt$ sudo mount -t davfs https://C25DTADSR00000001134:9002 /tmp/mesh-broker-config
[sudo] password for jstrain: 
Please enter the username to authenticate with server
https://C25DTADSR00000001134:9002 or hit enter for none.
  Username:
Please enter the password to authenticate user  with server
https://C25DTADSR00000001134:9002 or hit enter for none.
  Password:
/sbin/mount.davfs: the server certificate does not match the server name
/sbin/mount.davfs: the server certificate is not trusted
  issuer:      0, Veea Inc
  subject:     0, Veea Inc
  identity:    C25DTADSR00000001134.devices.veea.io
  fingerprint: a7:0e:83:83:bf:d3:40:77:3c:cd:ea:a9:39:4a:a5:d4:8e:ec:95:55
You only should accept this certificate, if you can
verify the fingerprint! The server might be faked
or there might be a man-in-the-middle-attack.
Accept certificate for this session? [y,N] y
/sbin/mount.davfs: warning: the server does not support locks
jstrain@test-server:~/shared/veea-hub-mount/test_vht/
```

Copy the user-config.json file we generated earlier 'cloudx/user-config.json.gen' into your VeeaHub using the 'cp' command.

*   sudo cp cloudx/user-config.json.gen /tmp/mesh-broker-config/user-config.json
    

```bash
jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt$ sudo cp cloudx/user-config.json.gen  mnt/broker-config/user-config.json
jstrain@test-server:~/shared/veea-hub-mount/test_vht/
```

Lastly, issue command on your workstation to sync filesystem

*   'sync;sync'
    

```bash
VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt$ sync;sync
jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt$ 
```

*   Go back to the steaming log file and expect the 'user-config.yml' 'file not found' error to stop and the mesh-broker container to continue to run. (make sure your cloud broker is running too). You can also start the mesh client at this time using the VSH command 'docker service start mesh-client'.
    

You should see a stream of success mqtt broker messages

```bash
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Config loaded from /etc/mosquitto/mosquitto.conf.
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Warning: File /etc/mosquitto/passwd has world readable permissions. Future versions will refuse to load this file.
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: To fix this, use `chmod 0700 /etc/mosquitto/passwd`.
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Warning: File /etc/mosquitto/passwd owner is not ubxbu6tq2tzl6wwpzoyw7c. Future versions will refuse to load this file.To fix this, use `chown ubxbu6tq2tzl6wwpzoyw7c /etc/mosquitto/passwd`.
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Opening ipv4 listen socket on port 1883.
2024-04-29T09:25:16.609+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Opening ipv6 listen socket on port 1883.
2024-04-29T09:25:16.610+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Bridge local.c120cca8f215.bridge-broker0 doing local SUBSCRIBE on topic #
2024-04-29T09:25:16.616+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Connecting bridge bridge-broker0 (test-server:8883)
2024-04-29T09:25:16.626+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Bridge c120cca8f215.bridge-broker0 sending CONNECT
2024-04-29T09:25:16.626+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: mosquitto version 2.0.18 running
2024-04-29T09:25:16.678+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Received CONNACK on connection local.c120cca8f215.bridge-broker0.
2024-04-29T09:25:16.678+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Bridge local.c120cca8f215.bridge-broker0 sending SUBSCRIBE (Mid: 2, Topic: #, QoS: 0, Options: 0x00)
2024-04-29T09:25:16.681+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Received PUBACK from local.c120cca8f215.bridge-broker0 (Mid: 1, RC:0)
2024-04-29T09:25:16.720+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382716: Received SUBACK from local.c120cca8f215.bridge-broker0
2024-04-29T09:25:31.923+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714382731: Received PUBLISH from local.c120cca8f215.bridge-broker0 (d0, q0, r0, m0, 'req/all', ... (17 bytes))
```

#### Start mesh client

If you recall we only started the mesh broker and not the mesh client yet. Issue the following VSH command to see the state of the services:

*   docker service ls
    

Example below:

```bash
[VHC25000001134-0000000D] docker service ls
ID                          | NAME              | STATE      | MODE     | REPLICAS   | IMAGE                          
eb0526vbe6lohtlpkt1kmauvu   | vh_dmqtt_broker   | Running    | Global   | 1/1        | vh_dmqtt_broker-arm32v7:1.0.0  
-                           | vh_dmqtt_client   | Uploaded   | -        | -          | -                              
[VHC25000001134-0000000D] 
```

Lets start the mesh client by issuing the following command:

*   docker service start vh_dmqt_client
    

See example below:

```bash
[VHC25000001134-0000000D] docker service start vh_dmqtt_client 
Starting service (vh_dmqtt_client) now, please be patient it can take up to 30 seconds to complete.
[VHC25000001134-0000000D] docker service ls
ID                          | NAME              | STATE      | MODE     | REPLICAS   | IMAGE                          
eb0526vbe6lohtlpkt1kmauvu   | vh_dmqtt_broker   | Running    | Global   | 1/1        | vh_dmqtt_broker-arm32v7:1.0.0  
vz464lxckdeqevsxicvrhgp1i   | vh_dmqtt_client   | Running    | Global   | 1/1        | vh_dmqtt_client-arm32v7:1.0.0  
[VHC25000001134-0000000D] 
```

Now go back to the log and you should now see a mixture of healthy (no errors) log messages from both the mesh broker and mesh client like in example below:

```bash
2024-04-29T09:32:01.945+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383121: Received PUBLISH from mesh-574 (d0, q0, r0, m0, 'rsp/all/C25DTADSR00000001134', ... (120 bytes))
2024-04-29T09:32:01.945+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383121: Sending PUBLISH to local.c120cca8f215.bridge-broker0 (d0, q0, r0, m0, 'rsp/all/C25DTADSR00000001134', ... (120 bytes))
2024-04-29T09:32:05.209+00:00 C25DTADSR00000001134 03b09e36fcd9/vh_dmqtt_client-1.0.0[6311]: 2024-04-29 09:32:05,208: cloud_mqtt_client: publish_telemetry_data: Send `{"interface_status": "Up"}` to topic `data/C25DTADSR00000001134/interface/ene0`
2024-04-29T09:32:05.210+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383125: Received PUBLISH from mesh-574 (d0, q0, r0, m0, 'data/C25DTADSR00000001134/interface/ene0', ... (26 bytes))
2024-04-29T09:32:05.210+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383125: Sending PUBLISH to local.c120cca8f215.bridge-broker0 (d0, q0, r0, m0, 'data/C25DTADSR00000001134/interface/ene0', ... (26 bytes))
2024-04-29T09:32:05.211+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383125: Received PINGREQ from mesh-574
2024-04-29T09:32:05.211+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383125: Sending PINGRESP to mesh-574
2024-04-29T09:32:15.211+00:00 C25DTADSR00000001134 03b09e36fcd9/vh_dmqtt_client-1.0.0[6311]: 2024-04-29 09:32:15,210: cloud_mqtt_client: publish_telemetry_data: Send `{"interface_status": "Down"}` to topic `data/C25DTADSR00000001134/interface/ene0`
2024-04-29T09:32:15.212+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383135: Received PUBLISH from mesh-574 (d0, q0, r0, m0, 'data/C25DTADSR00000001134/interface/ene0', ... (28 bytes))
2024-04-29T09:32:15.212+00:00 C25DTADSR00000001134 c120cca8f215/vh_dmqtt_broker-1.0.0[6311]: 1714383135: Sending PUBLISH to local.c120cca8f215.bridge-broker0 (d0, q0, r0, m0, 'data/C25DTADSR00000001134/interface/ene0', ... (28 bytes))
```

### Test Mesh

Let now test that all is working fine using the Cloud Client Web interface. On your workstation open a browser and enter URL localhost:9090

Do the following tests in the Web Browser:

*   Enter '?' or 'help' to see the list of commands
    
*   Enter command 'list' to see all the discovered mesh clients
    
*   Send a Linux command to one of the discovered mesh clients by using the command:
    
    *   'rcmd < Node Name > < Linux Command >' i.e. 'rcmd C25DTADSR00000001134 ps'
        
*   Enter command 'stats' to see what telemetry data has been received and how many times.
    

See example in screenshot below:

![Screenshot](../../../assets/vht-1.0/mesh-upload-and-test/01-assets-web-ui-clients-1.png)

#### Stop the Mesh Services

We are all done, to shutdown both mesh broker and client services using VSH run:

```text
# List uploaded services

[VHC25000001134-0000000D] docker service ls
ID                          | NAME              | STATE      | MODE     | REPLICAS   | IMAGE                          
0cos5xhyxh5389vyojs2d9ie9   | vh_dmqtt_client   | Running    | Global   | 1/1        | vh_dmqtt_client-arm32v7:1.0.0  
ibfw9o898h5w3tuwbm0ch5f5j   | vh_dmqtt_broker   | Running    | Global   | 1/1        | vh_dmqtt_broker-arm32v7:1.0.0  
[VHC25000001134-0000000D]

[VHC25000001134-0000000D] docker service stop vh_dmqtt_broker

[VHC25000001134-0000000D] docker service stop vh_dmqtt_client

[VHC25000001134-0000000D] docker service ls
ID                          | NAME              | STATE      | MODE     | REPLICAS   | IMAGE                          
0cos5xhyxh5389vyojs2d9ie9   | vh_dmqtt_client   | Uploaded    | -        | -          | -
ibfw9o898h5w3tuwbm0ch5f5j   | vh_dmqtt_broker   | Uploaded    | -        | -          | -
[VHC25000001134-0000000D]
```

#### Stop the cloud broker and client

Go back to the window where your cloud broker and client are still running and stop session with the command 'CTRL-C'. Then issue the following command to cleanup.

`./down-cloud.sh`

See example below:

```console
mqtt_cloud_clients | 2024-04-29 09:45:35,337: cloud_mqtt_client: on_message:  Received message b'{"interface_status": "Down"}' on topic 'data/C25DTADSR00000001134/interface/ene0' with QoS 0
cloud-broker    | 1714383942: Client c120cca8f215.bridge-broker0 closed its connection.
mqtt_cloud_clients | 2024-04-29 09:46:01,986: cloud_mqtt_client: publish_discover_msg_req: Send `{"cmd": "uptime"}` to topic `req`
cloud-broker    | 1714383961: Received PUBLISH from cloud-client-92 (d0, q0, r0, m0, 'req/all', ... (17 bytes))
cloud-broker    | 1714383961: Sending PUBLISH to d8c30d14019f.bridge-broker0 (d0, q0, r0, m0, 'req/all', ... (17 bytes))
cloud-broker    | 1714383962: Received PINGREQ from cloud-client-92
cloud-broker    | 1714383962: Sending PINGRESP to cloud-client-92
^CGracefully stopping... (press Ctrl+C again to force)
Stopping mqtt_cloud_clients ... done
Stopping cloud-broker       ... done

jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/cloudx$ ./down-cloud.sh 
/usr/bin/docker-compose
+ COMPOSE_FILE_BASE=docker-compose-base.yaml
+ COMPOSE_FILE_INSTANCE1=docker-compose-cloud-instance.yaml
+ docker-compose -p cloud -f docker-compose-base.yaml -f docker-compose-cloud-instance.yaml down
Removing mqtt_cloud_clients ... done
Removing cloud-broker       ... done
Removing network cloud_default
jstrain@test-server:~/shared/veea-hub-mount/test_vht/VHT-357-template-example-showing-distrib/c3-templates/vh_distributed_mqtt/cloudx$ 
```
