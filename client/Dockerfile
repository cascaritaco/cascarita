FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN cp .env.example .env

CMD ["npm", "run", "client"]
