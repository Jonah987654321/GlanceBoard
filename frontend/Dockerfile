# frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

# Dependencies installieren
COPY package.json package-lock.json ./
RUN npm ci

# Source code kopieren
COPY . .

# Build
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Port exposed für Docker Compose
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
