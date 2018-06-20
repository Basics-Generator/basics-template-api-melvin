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

## Stop and Start docker stack
reboot: stop start

## Start docker stack
start:
	docker-compose up -d
## Stop docker stack
stop:
	docker-compose stop
