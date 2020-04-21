FROM node:12.16.0 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
COPY . .
RUN npx ng build -- --output-path=./dist/out
FROM nginx:1.15
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
EXPOSE 4200
ENTRYPOINT ["nginx", "-g", "daemon off;"]

