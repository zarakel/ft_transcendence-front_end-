FROM alpine:latest

RUN apk add --update nodejs npm

RUN mkdir -p /var/www/html/back 
VOLUME ["/var/www/html/back"]
WORKDIR /var/www/html/back

EXPOSE 3000

ENTRYPOINT ["./start.sh"]