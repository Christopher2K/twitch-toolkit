FROM node:18.15-bullseye-slim as builder

RUN corepack enable
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
COPY .npmrc /usr/app
COPY pnpm-workspace.yaml /usr/app
COPY pnpm-lock.yaml /usr/app
COPY apps/website/package.json /usr/app/apps/website/package.json
COPY apps/website/panda.config.ts /usr/app/apps/website/panda.config.ts
COPY libs/types/package.json /usr/app/libs/types/package.json
COPY turbo.json ./

RUN pnpm i

COPY tsconfig.root.json /usr/app
COPY apps/website /usr/app/apps/website
COPY libs/types /usr/app/libs/types

RUN pnpm website prepare
RUN pnpm build:website
RUN pnpm website deploy --prod /production


FROM node:18.15-alpine3.17 as runner

ARG PORT=80
ARG APP_KEY
ARG DATABASE_URL
ARG ADMIN_USERNAME
ARG ADMIN_PASSWORD

ENV HOST=0.0.0.0
ENV APP_NAME=twitchtoolkit
ENV DRIVE_DISK=local
ENV NODE_ENV=production
ENV SESSION_DRIVER=cookie
ENV CACHE_VIEWS=false
ENV PORT=${PORT}
ENV APP_KEY=${APP_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

EXPOSE ${PORT}

COPY --from=builder /production/dist /usr/app
COPY --from=builder /production/node_modules /usr/app/node_modules

CMD ["/bin/sh", "-c", "node /usr/app/ace migration:run --force && node /usr/app/ace admin:create && node /usr/app/server.js"]

