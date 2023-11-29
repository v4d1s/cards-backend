## Установка на локальный компьютер
Обновите .env файл, вставив следующие значения:
```
PORT=3000
DB_PORT=5432
DB_HOST=localhost
DB_USER=database
DB_PASSWORD=database
DB_NAME=database
```

#### Установка
```bash
$ npm install
```

#### Запуск БД (Docker)
```bash
$ docker-compose up
```

#### Запуск сервера
```bash
$ npm run start:dev
```