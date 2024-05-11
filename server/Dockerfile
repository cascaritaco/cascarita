FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

RUN cp .env.example .env

CMD ["npm", "run", "server"]
