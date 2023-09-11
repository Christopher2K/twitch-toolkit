FROM node:18.15-bullseye

ENV SHELL=bash

RUN corepack enable

WORKDIR /usr/src/app

COPY turbo.json ./
COPY package.json ./
COPY yarn.lock ./

COPY apps/website/package.json ./apps/website/
COPY libs/types/package.json ./libs/types/

RUN yarn install

