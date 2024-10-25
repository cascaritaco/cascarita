FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json from the root
COPY ./package.json ./package-lock.json ./nodemon.json ./.sequelizerc /.env ./
COPY ./server /app/server
COPY ./dist /app/dist

RUN npm clean-install

# Needed for the bcrypt dependency
RUN apk add --no-cache make gcc g++ python3 && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

EXPOSE 3001

CMD ["npm", "run", "server"]