
### 1. Using the `version:` Field in `docker-compose.yml`

The `version:` field in Docker Compose files is more obsolute than Bootstrap CSS. Still writing it? Why? Every time you do, a whale cries. Just start with your `services:` block and move on with your life. Yes, thats a pet peeve of mine.

### 2. No Healthchecks

If your container crashes and you didn't configure a healthcheck, that's on you. Docker and Compose can't restart or manage something they don't know is broken.  

```
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 5s
  retries: 3
```

This one change turns Docker Compose into a viable production orchestrator - for real.

###3. Root by Default

Still running as root in production? Your container shouldn't be a liability. Create a non-root user in your Dockerfile and switch to it. It's not hard:  

```
RUN useradd -m appuser
USER appuser
```

Just make sure that your volume mounts are owned by the non-root user. Otherwise shit breaks (trust me, I know).

### 4. No `.dockerignore`

Nothing like shipping your `.git`, `.env`, and `node_modules` to production. Use a `.dockerignore`, save your build context, and keep secrets and bloat out of your image.

You might think this is a no-brainer, but I see it all the time (I run a [docker hosting company](https://sliplane.io/?utm_source=stop-using-docker-like-its-2015) and see hundreds of Docker app every week).

### 5. Bloated, One-Stage Dockerfiles

If your Dockerfile has all your build tools, compilers, and test dependencies in the final image: stop. Use multi-stage builds.  

```
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### 6. Manual Builds Without Cache

You're still typing `docker build .` every time?  
Set `DOCKER_BUILDKIT=1`, start using layer caching, and make your life easier. Add `--mount=type=cache` for package managers and build systems. It's not just faster - it's smarter.

---

## What Modern Docker Looks Like

Here's how you should be using Docker in 2025:

### Compose Without Legacy Bloat

```
services:
  app:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 5s
      retries: 3
    user: "1000:1000"
```

### Devcontainers, Watch Mode, and You

- Use `docker compose watch` for live-reload in local dev
- Use bind-mounted volumes + hot reload for fast iteration
- Use `.dockerignore` + caching for minimal rebuilds

```
develop:
  watch:
    - path: .
      action: rebuild
```

---

## The "Docker Isn't Good for Production" Crowd

It's not Docker's fault. It's yours.

You didn't add healthchecks, so Docker couldn't restart a broken service.  
You didn't set up multi-stage builds, so your image is 2GB of junk.  
You ran everything as root, so now you're scared of your own software.

Docker can be production-ready - if you treat it like a production tool.

---

## The "Docker Is Bad for Local Dev" Crowd

Also wrong. You're probably using it wrong. Here's what helps:

- `docker compose watch` = live rebuilds
- BuildKit cache mounts = fast builds
- Bind volumes + hot reload = native-like DX

If you're waiting 2 minutes for each build or watching logs from `docker logs -f`, it's a skill issue, not a Docker issue.