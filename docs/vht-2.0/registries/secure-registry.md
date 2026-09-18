---
icon: lucide/shield-check
---

# Secure Registry

Use a secure registry for production, team, and cloud-hosted image workflows.

A secure registry uses DNS, TLS, and certificates that Docker can validate. This page uses Docker Hub as the example registry.

## Create a Public Repository

1. Sign in to Docker Hub.
2. Select **My Hub > Repositories**.
3. Select **Create repository**.
4. Enter a repository name.
5. Add a short description if useful.
6. Select **Public** visibility.
7. Select **Create**.

!!! warning
    Current VeeaHub runtime pulls require registry images to be pullable without VeeaHub-side authentication. Use public repositories or another registry configuration that supports unauthenticated pulls until authenticated pulls are supported.

## Create a Personal Access Token

1. Sign in to Docker Hub.
2. Open **Account settings** from the avatar menu.
3. Open **Personal Access Tokens** under **Security**.
4. Select **Generate New Token**.
5. Give the token a descriptive name.
6. Select permissions.
7. Select **Generate**.
8. Copy the token immediately.

Use `Read, Write, Delete` permissions when the development host must push images.

## Login From the Development Host

Run:

```bash
docker login -u <Docker Hub Username>
```

Enter the PAT as the password.

Docker stores the encoded credentials in `~/.docker/config.json`:

```bash
cat ~/.docker/config.json
```

Example structure:

```json
{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "<Base64 Encoded DockerHub PAT>"
    }
  }
}
```
