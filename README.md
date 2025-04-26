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

Для проверки через Postman:

```Postman
https://.postman.co/workspace/My-Workspace~6cdc7d9a-91a8-4e2a-83ca-4124b9dddaa7/collection/27280664-cca9df63-4459-4cc1-a6fb-15626befa157?action=share&creator=27280664
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

Используется **Pino** для структурированного логирования.

---

## Роуты API

| Метод | URL | Описание |
|:------|:----|:---------|
| `POST` | `/appeals/` | Создать новую заявку. Требует `title` и `description`. Валидация полей. |
| `GET` | `/appeals/` | Получить список всех заявок с фильтрацией по дате и статусу. |
| `GET` | `/appeals/:id` | Получить заявку по ID. |
| `PATCH` | `/appeals/:id/progress` | Обновить статус заявки на "В процессе". Требует ID заявки. |
| `PATCH` | `/appeals/:id/done` | Обновить статус заявки на "Выполнено". Требует ID и дополнительные данные. |
| `PATCH` | `/appeals/:id/cancel` | Отменить заявку. Требует ID и причину отмены. |
| `PATCH` | `/appeals/cancel-all-progress` | Отменить все заявки в статусе "В процессе". Требует причину отмены. |

---

## Требования

- Node.js `>=18`
- PostgreSQL `>=13`
- Docker (optional)

---

