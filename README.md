# Nest.js application

## Installation
```bash
make install
```
## db-migration
```bash
make db-migrate
```
### Примечание!
Данная команда выполняет миграции к пользователю, базе данных и хосту по-умолчанию!
Если хотите вставить свои опции, то используйте следующую команду:
```bash
psql -h ваш-хост -U ваш-никнейм -d ваша-бд < src/migrations/migrations.sql
```
Также необходимо 
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

# Задеплоенное проложение доступно по следующей ссылке

https://node-js13.herokuapp.com/api