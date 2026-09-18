---
icon: simple/docker
---

# Install Docker

Install Docker on the Ubuntu 24.04 LTS development host.

## Install Packages

Run:

```bash
sudo apt update
sudo apt install docker.io docker-buildx docker-compose-v2
```

## Run Docker Without sudo

Add your user to the `docker` group:

```bash
sudo usermod --append --groups docker $USER
```

Log out and back in, or restart the host, for the group change to take effect.

## Verify Docker

Check the Docker service:

```bash
sudo systemctl status docker
```

Check Docker versions:

```bash
docker version
docker compose version
docker buildx version
```

## Run hello-world

Run:

```bash
docker run hello-world
docker ps -a
```

Expected output includes:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

You can also run an interactive Ubuntu container:

```bash
docker run -it ubuntu bash
```
