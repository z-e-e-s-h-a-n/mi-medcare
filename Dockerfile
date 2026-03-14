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
WORKDIR /app/server

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/packages /app/packages

EXPOSE 8080

CMD ["node", "dist/main.js"]