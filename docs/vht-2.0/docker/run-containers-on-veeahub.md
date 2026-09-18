---
icon: lucide/play
---

# Run Containers on a VeeaHub

Use Docker context to run pre-existing containers directly on a VeeaHub from the Ubuntu development host.

## Run hello-world

Run:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker run hello-world
```

Expected output includes:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Because the command targets the VeeaHub context, the image is pulled and run on the VeeaHub.

## Run Ubuntu Interactively

Run:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker run -it ubuntu bash
```

Exit the shell:

```bash
exit
```

## Run Alpine Interactively

Alpine is much smaller than Ubuntu and is commonly used as a base image.

Run:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker run -it alpine /bin/sh
```

Exit the shell:

```bash
exit
```

## List Images

Run:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker image ls
```
