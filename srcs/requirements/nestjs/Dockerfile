FROM debian:buster

RUN	apt -y update
RUN apt -y upgrade
RUN apt install -y nodejs npm curl
RUN npm install -g n
RUN n stable

RUN mkdir -p /var/www/html/back 
VOLUME ["/var/www/html/back"]
WORKDIR /var/www/html/back

RUN npm install
RUN npm run build

