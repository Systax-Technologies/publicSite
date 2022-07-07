# syntax=docker/dockerfile:1

FROM node:alpine

WORKDIR /home/ecommerce

COPY package.json ./

COPY . .

EXPOSE 3000

RUN npm install && npm run build

CMD ["npm", "start"]