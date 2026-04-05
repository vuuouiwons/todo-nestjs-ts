FROM node:22-alpine3.22 AS base

WORKDIR /build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build-app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm run build

FROM base AS build-dep

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

FROM node:lts-alpine3.22 AS prod

WORKDIR /app

RUN chown -R node:node /app

COPY --from=build-app --chown=node:node /build/dist /app/dist
COPY --from=build-app --chown=node:node /build/package.json /app/package.json
COPY --from=build-dep --chown=node:node /build/node_modules /app/node_modules

USER node

CMD [ "node", "/app/dist/main.js" ]
