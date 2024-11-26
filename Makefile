setup:
	./setup.sh

docker-restart:
	docker-compose down
	docker-compose up -d

database:
	cd server && npm run migrate

docker-build:
	docker-compose build

test:
	cd server && npm run test
