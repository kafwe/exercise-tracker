FROM node:16

WORKDIR /exercise-tracker

COPY package.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]