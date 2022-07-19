### Prerequisites
OS: Debian GNU/Linux 9 (stretch)
* PostgreSQL
* NodeJS
* yarn
* Supervisor

## Создание базы данных:

```sh
psql -c "create user cg13_bot with password '123qwe'" postgres
psql -c "create database cg13db owner cg13_bot encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```
## Разворачивание проекта

Установка зависимостей

```sh
yarn
```
Сборка проекта

```sh
yarn build
```

Запуск миграций

```sh
yarn migrate
```
Или восстановление базы из дампа

```sh
psql -U cg13_bot cg13db < dump_name.sql 
```

Запуск приложения
```sh
yarn start
```

Миграции

```sh
yarn migrate //накатить миграции

yarn migrate-undo //откатить миграции

yarn create-migration MIGRATION_NAME //генерирует новый файл миграции
```

Supervisor

```sh
sudo service supervisor restart //перезапуск супервизора
```

---

For deployment only!
Place in /opt/environment.sh:
```sh
export CG13_ENV_BOT_TOKEN=токен бота
```
