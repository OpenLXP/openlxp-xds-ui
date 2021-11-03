# Dockerfile

# Name the node stage "builder"
ARG BASE_REGISTRY=registry1.dso.mil
ARG BASE_IMAGE=ironbank/opensource/nodejs/nodejs14
ARG BASE_TAG=14.18.1

FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG} as build

# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

# Download the files.
RUN yarn
# Build the app.
RUN yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
