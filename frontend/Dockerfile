# build stage
FROM node:12-alpine3.14 as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install && npm audit fix
COPY . .
RUN npm run build

# production stage
FROM node:12-alpine3.14 as production-stage

RUN apk update && apk add nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
