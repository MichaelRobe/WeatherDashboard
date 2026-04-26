# build environment
FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_OPEN_WEATHER_MAP_API_KEY
ENV VITE_OPEN_WEATHER_MAP_API_KEY=$VITE_OPEN_WEATHER_MAP_API_KEY

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json vite.config.ts index.html ./
COPY src ./src
RUN npm run build


# production environment
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
