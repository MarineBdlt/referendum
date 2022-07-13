# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
ARG NODE_IMAGE_TAG
ARG NGINX_IMAGE_TAG
FROM node:${NODE_IMAGE_TAG} as build

RUN apk add --no-cache bash git
RUN mkdir -p /app/src
# Set the working directory
WORKDIR /app

COPY package.json /app/
RUN npm i -—no-save
COPY *.json /app/
COPY src/ /app/src
RUN  npm run build
# Install all the dependencies

FROM nginx:${NGINX_IMAGE_TAG} as prod
COPY ./nginx.conf /etc/nginx/
COPY --from=build /app/dist/frontend /var/www