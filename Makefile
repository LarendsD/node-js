setup: install db-migrate

db-migrate:
	ts-node src/db/migrations/up.ts

db-drop:
	ts-node src/db/migrations/down.ts

install:
	npm install
	touch .env

start:
	npm run start

start-dev:
	npm run start:dev