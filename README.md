# Тестовое задание Сервис для работы с пользователями

## Шаги:
- Клонировать проект в удобное место
- Задать секреты для JWT в файле `.env`, при необходимости изменить другие переменные
- В терминале Docker перейти в корневую директорию проекта `efm_test`
- Запустить `wsl`
- Выполнить команду `docker-compose -f docker-compose.yml up -d`
- Отправлять запросы на `http://localhost:3000`
## Эндпоинты
| Метод | Роль | Путь |  Описание    |
|-------|-----|-----|-------|
| POST| - |http://localhost:3000/api/auth/register|Регистрация|
| POST| - |http://localhost:3000/api/auth/login | Вход |
| GET | Admin | http://localhost:3000/api/users | Список аккаунтов пользователей |
| GET | Admin | http://localhost:3000/api/users/:id | Информация об аккауенте пользователе |
| GET | Admin/User | http://localhost:3000/api/users/me | Информация о своём аккаунте |
| POST | Admin | http://localhost:3000/api/users/block/:id | Заблокировать аккаунт пользователя |
| POST | Admin/User | http://localhost:3000/api/users/block/me | Заблокировать свой аккаунт |

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
