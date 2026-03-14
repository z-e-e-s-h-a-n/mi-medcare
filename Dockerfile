# ---------- BASE ----------
FROM node:24-alpine AS base
WORKDIR /app
RUN npm install -g pnpm turbo

# ---------- PRUNE ----------
FROM base AS pruner
WORKDIR /app

COPY . .

RUN turbo prune server --docker

# ---------- INSTALL ----------
FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# ---------- BUILD ----------
FROM installer AS builder

RUN pnpm build:server

# ---------- RUNNER ----------
FROM node:24-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=8080

# Needed so the Cloud Run migration Job can run `pnpm --filter ...` inside the image.
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/turbo.json ./turbo.json

COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package.json ./server/package.json

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules

# copy workspace packages
COPY --from=builder /app/packages ./packages

EXPOSE 8080

CMD ["node", "server/dist/main.js"]
