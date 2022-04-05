FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.21.4

# remove default nginx config
RUN rm /etc/nginx/conf.d/*

COPY ./default.conf ./etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
