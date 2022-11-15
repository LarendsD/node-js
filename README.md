# My <a href='https://github.com/kisilya/test-tasks/tree/main/nodeJS'>Test task</a> from <a href='https://outsi.de/'>Outside Digital</a>

# Nest.js application

## Installation
```bash
make install
```
## db-migration
```bash
make db-migrate
```
### Note
This command performs migrations to the default user, database and host!
If you want input your options, use this command:
```bash
psql -h your-host -U your-nickname -d your-db < src/migrations/migrations.sql
```
## db connection
Before server run need set environment variables in .env file:
```env
DATABASE_PASSWORD - user password
DATABASE_USERNAME - user name
```
## Start
```bash
make start
```
http://localhost:3000/api/

## Start-dev

```bash
make start-dev
```
http://localhost:3000/api/

# The embedded application is available at the following link:

https://node-js13.herokuapp.com/api
