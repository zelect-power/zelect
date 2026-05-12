# Standalone Dockerfile for Railway.
# Nixpacks default plan caused EBUSY on duplicate npm ci with cache mounts.
# Single-stage build keeps it simple and reliable.

FROM node:20-bookworm-slim

WORKDIR /app

# Build deps for sharp etc.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6-dev \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# App sources + build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
