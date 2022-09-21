FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g http-server

RUN npm install

COPY . .

RUN npm run build


EXPOSE 8080

CMD ["npm", "start"]

CMD ["http-server", "dist"]
