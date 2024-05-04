FROM node:18.15-bullseye

ENV SHELL=bash

RUN corepack enable

WORKDIR /usr/src/app

COPY turbo.json ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY apps/website/package.json ./apps/website/
COPY apps/website/panda.config.ts ./apps/website/
COPY libs/types/package.json ./libs/types/

RUN pnpm i

