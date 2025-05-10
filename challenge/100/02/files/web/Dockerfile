FROM node:22.7.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public/ ./public
COPY index.js ./

USER node

CMD node index.js
