FROM node:10

WORKDIR /app/api

COPY package*.json ./

RUN npm install && npm audit fix

COPY . .

EXPOSE 9518

CMD npm start
