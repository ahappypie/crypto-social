FROM mhart/alpine-node:latest

WORKDIR /app
COPY . .

RUN yarn install

CMD node pipe.js