# Тестовое задание
# Сервис для работы с пользователями

## Шаги:
- Задать секретные ключи для JWT в файле `.env`
- Задать параметры БД в файле `./src/data-source.ts`
- Выполнить установку зависимостей `npm i`
- Запустить командой `npm start`

## Важно
- Поля пользователя:
  - `email` в формате эл. почты
  - `password`
  - `first_name`
  - `last_name`
  - `middle_name` (опционально)
  - `birthday` в формате "ДД.ММ.ГГГГ"
  - `role` (опционально)
  - `version` (опционально)
- Роль пользователя задаётся полем `role` с вариантами:
  - "User" по умолчанию
  - "Admin"
- Raw Json body запроса:
```
{
    "email": "почта",
    "password": "пароль",
    "first_name": "Имя",
    "last_name": "Фамилия",
    "birthday": "ДД.ММ.ГГГГ",
    "role": "Admin"
}
```
- Полученные токены передаются серверу в заголовках HTTP
  - `X-Restore-Token` для refresh_token
  - `X-Auth-Token` для access_token
- Bulk edit для заголовков в Postman:
```
X-Restore-Token:токен
X-Auth-Token:токен
```
