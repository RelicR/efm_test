import { IUser } from "./User"

export interface IToken {
    id?: string,
    user_id: string,
    token: string,
    expires_in: number,
    fingerprint: string,
    user: IUser
}

export interface ITokenPayload {
    user: string, // user uuid
    role?: string,
    aud: string[], // apps
    exp: number, // истечение
    iat: number, // выдача
    ver?: number, // user version
    fp: string,
}