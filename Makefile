

all : 
	docker compose up --build

down : 
	docker compose down --rmi all --volumes

run :
	docker compose up -d

sequelize :
	docker exec -it BEALYBACK npx sequelize