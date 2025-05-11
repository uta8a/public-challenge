FROM node:22.15.0-slim@sha256:557e52a0fcb928ee113df7e1fb5d4f60c1341dbda53f55e3d815ca10807efdce

RUN apt-get update && apt-get install -y chromium
RUN rm -rf /var/lib/apt/lists/*

RUN groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

WORKDIR /app
COPY package.json package-lock.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install
COPY . .

USER pptruser

CMD ["node", "index.js"]
