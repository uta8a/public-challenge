FROM node:22.7.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public/ ./public
COPY flag.txt /
COPY index.js ./

CMD node index.js
