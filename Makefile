## Makefile intended to perform a fast development environment boot

## Install dependencies then start server
all: build reboot

## Install dependencies with NPM
## @TODO: Use yarn
build:
	cp -fa .env.dist .env
	docker run --rm -v ${PWD}:/app -w /app node:8-stretch npm install

## Show containers state
status:
	docker ps -a

## Delete docker stack
down:
	docker-compose down

## Show node container logs
log:
	docker-compose logs -f node

## Stop and Start docker stack
reboot: stop_node start_node

reboot_all: stop start

## Start docker stack
start:
	docker-compose up -d
## Stop docker stack
stop:
	docker-compose stop
## Start docker stack
start_node:
	docker-compose up -d node
## Stop docker stack
stop_node:
	docker-compose stop node
