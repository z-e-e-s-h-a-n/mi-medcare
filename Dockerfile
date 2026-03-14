# ---------- BASE ----------
FROM node:24-alpine AS base
WORKDIR /app

RUN apk add --no-cache ca-certificates

RUN npm install -g pnpm

# ---------- DEPENDENCIES ----------
FROM base AS deps

# Copy only files needed for dependency resolution
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./

# Docker does not support wildcard destinations (e.g. ./packages/*/).
# Copy workspace roots instead; turbo/pnpm will still cache most layers via the lockfile.
COPY packages ./packages
COPY server ./server

RUN pnpm install --frozen-lockfile

# ---------- BUILD ----------
FROM deps AS builder

# Build server
RUN pnpm build:server

# ---------- PRODUCTION ----------
FROM node:24-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=8080

# Copy built server
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

EXPOSE 8080

CMD ["node", "dist/main.js"]
