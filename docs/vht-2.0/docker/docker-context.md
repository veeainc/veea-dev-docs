---
icon: lucide/switch-camera
---

# Docker Context

Docker context lets Docker commands on the development host target a remote VeeaHub Docker daemon.

!!! warning
    Docker commands run against the currently selected Docker context. Confirm the active context before running destructive commands.

## Show Contexts

Run:

```bash
docker context ls
```

On a fresh Docker install, the only context is usually `default`:

```text
NAME        DESCRIPTION                               DOCKER ENDPOINT
default *   Current DOCKER_HOST based configuration   unix:///var/run/docker.sock
```

## Create a VeeaHub Context

First confirm the hub is configured:

```bash
vhc2 hub config show
```

Create the context:

```bash
vhc2 hub access --hub-id vh-2341 context create
```

Expected output:

```text
Success! Docker Context(vh-2341) Created
```

Validate the context:

```bash
vhc2 hub access --hub-id vh-2341 context validate
```

Expected output:

```text
Context (vh-2341) working OK
```

List contexts again:

```bash
docker context ls
```

The VeeaHub context should appear beside `default`:

```text
NAME        DESCRIPTION                                         DOCKER ENDPOINT
default *   Current DOCKER_HOST based configuration             unix:///var/run/docker.sock
vh-2341     Remote Docker daemon on HOST XXXXXXXXXXXXXXXX2341   tcp://192.168.1.36:2376
```

## Use a Default Context

Set the active Docker context:

```bash
docker context use vh-2341
docker node ls
```

Return to local Docker:

```bash
docker context use default
```

## Use a Dynamic Context

Prefer dynamic context in examples and scripts:

```bash
DOCKER_CONTEXT=vh-2341 docker node ls
```

With the required API version:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker node ls
```

This runs only that command against `vh-2341`. Later commands continue to use the default context.

Expected output for a mesh shows Swarm nodes and the manager:

```text
ID                            HOSTNAME              STATUS   AVAILABILITY   MANAGER
3ee1vv4eezf33r7q0y0oftskq     XXXXXXXXXXXXXXXX0519  Ready    Active
nq62rqtirly5r2l6nnglr1nza     XXXXXXXXXXXXXXXX0594  Ready    Active
slveb02jifizf4fezib88lioj *   XXXXXXXXXXXXXXXX2341  Ready    Active         Leader
```

## Recommended Pattern

Use dynamic context for examples, scripts, and destructive commands:

```bash
DOCKER_API_VERSION=1.39 DOCKER_CONTEXT=vh-2341 docker ps
```

This is more verbose, but it makes the target explicit every time.

Use `docker context use <context>` only when you are doing a focused interactive session and can see the active context in your prompt.

## Optional Prompt Helper

If you often switch contexts, add a prompt helper so the active context is visible.

Create `~/docker-escape-prompt`:

```bash
#!/bin/sh
ctx=$(docker context show)
if [ "$ctx" = "default" ]
then
  echo "\033[01;37m[Docker context:${ctx}]"
else
  echo "\033[01;31m[Docker context:${ctx}]"
fi
```

Make it executable:

```bash
chmod a+x ~/docker-escape-prompt
```

Add this to `~/.bashrc`:

```bash
PS1="\$($HOME/docker-escape-prompt)\n$PS1"
```

To revert to a normal prompt:

```bash
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
```
