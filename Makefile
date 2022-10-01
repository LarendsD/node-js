db-migrate:
	psql < src/migrations/migrations.sql

install:
	npm install

start:
	npm run start

start-dev:
	npm run start:dev