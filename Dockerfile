FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g http-server

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["http-server", "dist", "-p 8080"]
