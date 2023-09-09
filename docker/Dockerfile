FROM node:18.15-bullseye

ENV SHELL=bash

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY apps/api/package.json ./apps/api/

RUN yarn install

