# VHT Developer Documentation

Structured developer documentation for VHT 2.0 and VHT 1.x: platform onboarding,
runtime installation and target enrollment, Docker-based application workflows,
and command references.

## Using this content

Everything under `docs/` is plain Markdown, organized to be easy to consume
directly — no build step required:

- **Browse or search directly** — each page is a standalone Markdown file
  under `docs/`, organized by product area (`vht-2.0/`, `vht-1.0/`, `platform/`).
- **Feed it to an LLM or coding assistant** — `docs/llms.txt` is a curated
  index of the key pages with short descriptions, following the
  [llms.txt convention](https://llmstxt.org/), meant to give an assistant a
  map of what's here and where to look before it answers questions about VHT.
- **Clone it for local reference**:

  ```bash
  git clone https://github.com/veeainc/veea-dev-docs.git
  ```

## Contributing

Open a pull request against `main` with your proposed changes. Keep edits
focused — one `#` page title per file, `##`/`###` for sections, and relative
Markdown links between docs pages.

## Building and previewing the site locally (maintainers)

The instructions below are only needed if you're editing content and want to
preview the rendered site before opening a PR — reading or citing the
Markdown directly does not require any of this.

Use Python locally when editing the documentation. The pinned Zensical version is listed in `requirements.txt`.

Create a virtual environment:

```bash
python3 -m venv .venv
```

Install dependencies:

```bash
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
```

Build the site:

```bash
.venv/bin/zensical build --clean
```

You should see:

```text
No issues found
```

Run the local development server:

```bash
.venv/bin/zensical serve --dev-addr 127.0.0.1:8080
```

Then open:

```text
http://127.0.0.1:8080/
```

Stop the local server with `Ctrl+C`.

## Optional Local Docker Run

Docker builds the Zensical site into static HTML and serves it with Nginx. This is useful for checking the production container behavior locally.

```bash
docker compose up -d --build
```

Open:

```text
http://127.0.0.1:8080/
```

Check the container:

```bash
docker ps --filter name=vht-docs
```

Stop the container:

```bash
docker compose down
```

## Deployment

Merging a pull request into `main` automatically builds and publishes this site.

Before opening a pull request, run:

```bash
.venv/bin/zensical build --clean
```

Only push once the build completes without issues.

## Project Layout

```text
docs/             Markdown documentation source
site/             Generated static site output
zensical.toml     Site configuration and navigation
requirements.txt  Python documentation tooling
Dockerfile        Production container build
docker-compose.yml Local container run configuration
```

## Add Documentation Pages

Add new pages as Markdown files under `docs/`. Use one `#` page title, then organize the content with short `##` and `###` sections.

Example:

```text
docs/vht-2.0/reference/new-topic.md
```

Start the page with:

```markdown
# New Topic

Short introduction that explains what the page is for.

## When To Use This

Task-focused content goes here.
```

Use fenced code blocks with language names so commands and config remain readable and copyable:

````markdown
```bash
.venv/bin/zensical build --clean
```

```yaml
services:
  app:
    image: example/app:latest
```
````

## Update The Left Menu

The left navigation menu is controlled by the `nav` list in `zensical.toml`.

To add a page to the menu:

1. Create the Markdown file under `docs/`.
2. Open `zensical.toml`.
3. Add the page path under the correct section in `nav`.
4. Run `.venv/bin/zensical build --clean` to catch broken paths or config errors.

Simple menu item:

```toml
"vht-2.0/reference/new-topic.md"
```

Menu item with a custom label:

```toml
{ "New Topic" = "vht-2.0/reference/new-topic.md" }
```

Nested menu group:

```toml
{ "Reference" = [
  "vht-2.0/reference/command-reference.md",
  { "New Topic" = "vht-2.0/reference/new-topic.md" }
] }
```

Paths in `zensical.toml` are relative to the `docs/` directory. For example, this file:

```text
docs/vht-2.0/reference/new-topic.md
```

is referenced as:

```toml
"vht-2.0/reference/new-topic.md"
```

## Page Maintenance Checklist

Before publishing a page:

1. Make sure it appears in the correct place in the left menu.
2. Confirm links use relative Markdown links when pointing to other docs pages.
3. Keep shell commands in `bash` code fences.
4. Keep YAML and JSON in `yaml` and `json` code fences.
5. Run `.venv/bin/zensical build --clean`.
6. Preview the site locally and click through the new page.

## Publishing Workflow

1. Edit Markdown files under `docs/`.
2. Update `zensical.toml` when adding, removing, or reordering pages.
3. Run `.venv/bin/zensical build --clean`.
4. Preview locally with `.venv/bin/zensical serve --dev-addr 127.0.0.1:8080`.
5. Commit to a branch, push it, and open a pull request against `main`. Address review feedback before it's merged.
