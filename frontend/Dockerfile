FROM node:8

LABEL maintainer "Li Ding<1995dingli@gmail.com>"

ADD ./* /app/frontend/

WORKDIR /app/frontend/

RUN npm run build ;\
    npm rm src public

EXPOSE 3001

CMD ["npm", "serve"]



