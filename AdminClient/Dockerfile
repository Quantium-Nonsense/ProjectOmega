FROM node:12.16.3 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
COPY . .
RUN npm run build -- --output-path=./dist/out
FROM nginx:1.15
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
EXPOSE 4200
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
