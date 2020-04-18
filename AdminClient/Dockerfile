#



## Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node:10.13.0 as build-stage
#WORKDIR /app
#COPY package*.json /app/
#RUN npm install
#COPY ./ /app/
#ARG configuration=production
#RUN npm run build -- --output-path=./dist/out --configuration $configuration
#
## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
##Copy ci-dashboard-dist
#COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
##Copy default nginx configuration
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
#
##
## we first use node alpine image to build our front end application
## and then use nginx image to build our final frontend image, 2 step process.
#
# Step 1:
FROM node:10.13.0 AS build-stage
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY ./ /app/

COPY . .

# Step 2:
RUN npm run build -- --output-path=./dist/out
# Step 3:
FROM nginx:1.15
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#COPY --from=build-stage nginx.conf /etc/nginx/conf.d/default.conf

#COPY nginx/default.conf /etc/nginx/default.conf
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build /usr/src/app/dist/adminclient /usr/share/nginx/html
#
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

