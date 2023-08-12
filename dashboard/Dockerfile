FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk --no-cache --virtual build-dependencies add python3 make g++
RUN npm install -g node-gyp
RUN npm install argon2
RUN npm install --only=production

COPY . /usr/app/

EXPOSE 3000

WORKDIR /usr/app/src

CMD [ "node", "app.js"]
