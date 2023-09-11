FROM node:18.15-bullseye-slim as builder

RUN corepack enable
RUN mkdir -p /usr/app
RUN mkdir /usr/app/.yarn
WORKDIR /usr/app

COPY .yarn /usr/app/.yarn
COPY package.json /usr/app
COPY .yarnrc.yml /usr/app
COPY yarn.lock /usr/app
COPY apps/website/package.json /usr/app/apps/website/package.json
COPY libs/types/package.json /usr/app/libs/types/package.json
COPY turbo.json ./

RUN yarn install 

COPY tsconfig.root.json /usr/app
COPY apps/website /usr/app/apps/website
COPY libs/types /usr/app/libs/types

RUN yarn website prepare
RUN yarn build:website
RUN rm -rf node_modules

RUN yarn workspaces focus @twitchtoolkit/website --production

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

COPY --from=builder /usr/app/apps/website/dist /usr/app
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
COPY --from=builder /usr/app/libs/types/dist /usr/app/node_modules/@twitchtoolkit/types/dist
COPY --from=builder /usr/app/libs/types/package.json /usr/app/node_modules/@twitchtoolkit/types/package.json


CMD ["/bin/sh", "-c", "node /usr/app/ace migration:run --force && node /usr/app/ace admin:create && node /usr/app/server.js"]
