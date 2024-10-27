FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json from the root
COPY ./package.json ./package-lock.json ./nodemon.json ./.sequelizerc /.env ./
COPY ./server /app/server
COPY ./dist /app/dist

RUN npm clean-install

EXPOSE 3001

CMD ["npm", "run", "server"]