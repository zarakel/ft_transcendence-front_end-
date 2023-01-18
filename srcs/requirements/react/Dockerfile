FROM alpine:latest

RUN apk add --update nodejs npm nginx

COPY ./conf/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/html 
VOLUME ["/var/www/html"]
WORKDIR /var/www/html

EXPOSE 8080

ENTRYPOINT ["./start.sh"]