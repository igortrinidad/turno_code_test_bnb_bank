FROM nginx:1.25.2

ADD nginx/conf /etc/nginx/conf.d/

RUN apt-get update && apt-get install -y openssl
RUN openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt