export type Result<T> = {
    error: boolean
    message: string
    result: T
}

export enum ExceptionType {
    ERR_UNAUTHORIZED = "Вы не авторизованы",
    ERR_ACCESS_DENIED = "Доступ запрещен",
    ERR_INVALID_CREDENTIAL = "Неверные данные пользователя",
    ERR_INVALID_TOKEN = "Даннные авторизации устарели",
    ERR_FINGERPRINT_MISMATCH = "Требуется повторная авторизация при доступе с нового устройства",
    ERR_USER_ALREADY_EXISTS = "Пользователь уже существует",
    ERR_USER_DOESNT_EXIST = "Пользователь не найден",
    ERR_USER_BLOCKED = "Пользователь находится в блокировке"
}

export enum SuccessStatus {
    USER_CREATED = "Пользователь зарегистрирован",
    USER_LOGGED_IN = "Вы вошли в аккаунт",
    USER_LOGGED_OUT = "Вы вышли из аккаунта",
    USER_BLOCKED = "Пользователь заблокирован"
}