db-migrate:
	psql -h localhost -U postgres -d postgres < src/migrations/migrations.sql