FROM node:8

WORKDIR /app/api

COPY package.json ./

RUN npm install && npm audit fix

ADD public public

EXPOSE 10371

CMD ["npm", "start"]
