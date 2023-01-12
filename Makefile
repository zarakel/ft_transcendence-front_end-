NAME=transcendence

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

fclean: clean
	docker rmi -f react
	docker rmi -f nestjs
	docker rm -f react
	docker rm -f nestjs
	docker network rm transcendence

re: stop fclean all
