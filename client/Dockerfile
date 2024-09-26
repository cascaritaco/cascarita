FROM node:21-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./webpack.config.js /.env ./
COPY ./client /app/client
COPY ./dist /app/dist

RUN npm clean-install

EXPOSE 3000

CMD ["npm", "run", "client"]