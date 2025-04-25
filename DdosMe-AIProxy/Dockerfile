FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3456

CMD [ "node", "index.js" ]