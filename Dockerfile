# syntax=docker/dockerfile:1.7

# ──────────────── Stage 1: build the static site ────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps with cache-friendly layering
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Build the static export
COPY . .
RUN npm run build

# ──────────────── Stage 2: serve with nginx ────────────────
FROM nginx:1.27-alpine AS runner

# Drop default config; use our own
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static export
COPY --from=builder /app/out /usr/share/nginx/html

# Make sure nginx user can read everything
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

# Healthcheck — fast HEAD against the homepage
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- --tries=1 --timeout=2 http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
