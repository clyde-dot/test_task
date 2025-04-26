# Test Task

Backend-приложение на **TypeScript + Express + Prisma**.

## Стек технологий

- **TypeScript**
- **Express 5**
- **Prisma ORM**
- **PostgreSQL**
- **Pino** для логирования
- **Day.js** для работы с датами
- **Express-validator** для валидации данных

---

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/clyde-dot/test_task.git
cd test_task
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` в корне проекта и укажите настройки БД:

```dotenv
DATABASE_URL="postgresql://admin:admin@localhost:5432/postgres?schema=public"
PORT=4200
```

---

## Локальный запуск

Перед запуском убедитесь, что у вас запущен PostgreSQL.  
Для быстрого старта можно использовать Docker:

```bash
docker-compose up -d
```

Это поднимет локальный сервер PostgreSQL на порту `5432` с пользователем `admin` и паролем `admin`.

---

## Скрипты

| Скрипт           | Описание                                                  |
|------------------|------------------------------------------------------------|
| `npm run start`  | Запуск сервера в режиме разработки (`ts-node-dev`)          |
| `npm run db:migrate` | Создание миграции в Prisma и генерация клиента             |
| `npm run db:push` | Применение схемы Prisma напрямую в базу данных     |

---

## Работа с базой данных

1. Сначала создайте миграцию:

```bash
npm run db:migrate
```

2. Затем отправьте схему в базу:

```bash
npm run db:push
```

---

## Логирование

Используется **Pino**
---

## Требования

- Node.js `>=18`
- PostgreSQL `>=13`
- Docker (optional)

---

