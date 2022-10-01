db-migrate:
	psql < src/migrations/migrations.sql

db-migrate-deploy:
	psql -d $(DATABASE_URL) < src/migrations/migrations.sql

install:
	npm install
	touch .env

start:
	npm run start

start-dev:
	npm run start:dev