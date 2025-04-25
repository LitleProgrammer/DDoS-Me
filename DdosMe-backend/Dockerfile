FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3246

CMD [ "node", "index.js" ]