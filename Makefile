NAME=inception

SRCS=./srcs/docker-compose.yml

FLAGS= -f $(SRCS) -p $(NAME)

all: build

build:
	docker compose $(FLAGS) up -d --build

start:
	docker compose $(FLAGS) start

stop:
	docker compose $(FLAGS) stop

status:
	docker compose $(FLAGS) ps
	
clean:
	rm -rf /Users/kalinololo/data/wordpress/*
	rm -rf /Users/kalinololo/data/db/*

fclean: clean
	docker rmi -f nginx
	docker rmi -f mariadb
	docker rmi -f wordpress
	docker rm -f nginx
	docker rm -f mariadb
	docker rm -f wordpress
	docker volume rm -f inception_wordpress
	docker volume rm -f inception_db
	docker network rm inception

re: stop fclean all
