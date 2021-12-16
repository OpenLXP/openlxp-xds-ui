# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

# install openssl
RUN apk add --update openssl

# generate self-signed certificate for nginx
RUN mkdir /etc/nginx/ssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=US/ST=California/L=San Francisco/O=Nginx/OU=Nginx/CN=nginx"
RUN chmod 600 /etc/nginx/ssl/nginx.key
RUN chmod 600 /etc/nginx/ssl/nginx.crt




# Expose the listening port
EXPOSE 80
# Expose the listening port for HTTPS
EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
