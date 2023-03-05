
all: 
	docker-compose up --build

clean:
	docker-compose down
	docker system prune -af
	docker volume prune -f

re: clean all
	
