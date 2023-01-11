FROM debian:buster

RUN	apt -y update
RUN apt -y upgrade
RUN apt install -y nodejs npm

RUN mkdir /var/www/html

EXPOSE 80

WORKDIR /var/www/html/

ENTRYPOINT ["npm", "run", "build"]

