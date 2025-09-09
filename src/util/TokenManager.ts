import { IToken, ITokenPayload } from "../model/Token"
import config from "../config";
import jwt = require("jsonwebtoken")
import { IUser } from "../model/User";

export class TokenManager {
    // private static readonly refreshExpIn: number = 1296000000 / 1000
    // private static readonly accessExpIn: number = 1800000 / 1000
    private static readonly refreshExpIn: number = config.TOKEN_REFRESH_EXP
    private static readonly accessExpIn: number = config.TOKEN_ACCESS_EXP
    private static readonly refreshSecret: string = config.JWT_REFRESH_SECRET
    private static readonly accessSecret: string = config.JWT_ACCESS_SECRET

    static genRefresh(user: IUser, fingerprint: string): IToken {
        const payload: ITokenPayload = {
            user: user.id,
            aud: [],
            exp: Math.floor(new Date(Date.now()).getTime() / 1000) + this.refreshExpIn,
            iat: Math.floor(new Date(Date.now()).getTime() / 1000),
            ver: user.version,
            fp: fingerprint
        }
        return {
            user_id: user.id,
            token: jwt.sign(payload, this.refreshSecret),
            expires_in: this.refreshExpIn,
            fingerprint: fingerprint,
            user: user,
        }
    }

    static genAccess(user: IUser, fingerprint: string): IToken {
        const payload: ITokenPayload = {
            user: user.id,
            role: user.role.toString(),
            aud: [],
            exp: Math.floor(new Date(Date.now()).getTime() / 1000) + this.accessExpIn,
            iat: Math.floor(new Date(Date.now()).getTime() / 1000),
            fp: fingerprint
        }
        return {
            user_id: user.id,
            token: jwt.sign(payload, this.accessSecret),
            expires_in: this.accessExpIn,
            fingerprint: fingerprint,
            user: user,
        }
    }

    static getRefClaims(token: string): ITokenPayload {
        let payload: ITokenPayload | null
        jwt.verify(token, this.refreshSecret, (err, decoded) => {
            payload = err ? null : (decoded as ITokenPayload)
            if (err) console.log(err)
        })
        return payload
    }

    static getAccClaims(token: string): ITokenPayload {
        let payload: ITokenPayload | null
        jwt.verify(token, this.accessSecret, (err, decoded) => {
            payload = err ? null : (decoded as ITokenPayload)
            if (err) console.log(err)
        })
        return payload
    }
}