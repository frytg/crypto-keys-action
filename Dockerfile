FROM node:12.16-alpine

MAINTAINER Daniel Freytag <sys@frytg.com>

RUN apk update \
	&& apk add --no-cache openssl\
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/cache/apk/*

WORKDIR /web/app

COPY ./src/package*.json ./

RUN rm -rf node_modules
RUN npm install

COPY ./src/ ./

CMD [ "npm", "start" ]