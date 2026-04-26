# Docker Guide

This project ships as a multi-stage Docker build:

- A `node:22-alpine` builder installs dependencies and runs `npm run build`
- An `nginx:alpine` runtime image serves the generated static files on port `80`
- `docker-compose.yml` publishes the app on `http://localhost:5173`

## Prerequisites

- Docker
- Docker Compose

## Build And Run With Docker Compose

Start the app with:

```bash
docker compose up --build weather-dashboard
```

To run detached:

```bash
docker compose up -d --build weather-dashboard
```

Open the app at:

```text
http://localhost:5173
```

Stop the container with:

```bash
docker compose down
```

## Build And Run Without Compose

Build the image:

```bash
docker build -t weather-dashboard .
```

Run the container:

```bash
docker run --rm -p 5173:80 --name weather-dashboard weather-dashboard
```

## Environment Variables

This app is built with Vite. That matters for Docker because `VITE_` variables are resolved when `npm run build` runs inside the image build, not when the Nginx container starts.

Relevant variables used by the app:

- `VITE_OPEN_WEATHER_MAP_API_KEY`

Docker Compose reads `.env` file for variable substitution. The compose file passes those values into the image build as Docker build args, and the Dockerfile exposes them to the Vite build step.

Example `.env`:

```env
VITE_OPEN_WEATHER_MAP_API_KEY=your_api_key_here
```

Important details:

- The `.env` file is still excluded by `.dockerignore`, so it is not copied into the image filesystem.
- The values are baked into the built frontend bundle at build time.
- For a Vite app, any `VITE_` variable is client-visible and should be treated as public.

## Notes

- This container is intended for serving the production build, not for Vite hot reload development.
- The Docker image uses Nginx, so there is no Node.js process running in the final container.
