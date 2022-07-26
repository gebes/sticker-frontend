FROM node:lts as base

# Reduce npm log spam and colour during install within Docker
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /home/node/app

COPY . /home/node/app/

RUN npm install -f
RUN npm install -g @angular/cli

RUN ng build --base-href=/sticker/

FROM alpine:latest as deploy

RUN apk add --update nginx && rm -rf /var/cache/apk/*
RUN nginx -t

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base /home/node/app/dist/sticker-frontend /usr/share/nginx/html/sticker/

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
