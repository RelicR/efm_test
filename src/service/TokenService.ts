import { UserService } from "./UserService"
import { TokenRepository } from "../repository/TokenRepository"
import { TokenManager } from "../util/TokenManager"
import { IToken } from "../model/Token"
import { IUser } from "../model/User"
import { ExceptionType, Result, SuccessStatus } from "../model/Result"

export class TokenService {
    static async create(user: IUser, fingerprint: string): Promise<Result<{refreshToken: string, accessToken: string}>> {
        const refreshToken = TokenManager.genRefresh(user, fingerprint)
        const accessToken = TokenManager.genAccess(user, fingerprint)

        const refreshTokenSaved = await TokenRepository.update(refreshToken)
        return {
            error: false,
            message: SuccessStatus.USER_CREATED,
            result: {
                refreshToken: refreshTokenSaved.token,
                accessToken: accessToken.token
            }
        }
    }

    static async update(user: IUser, fingerprint: string): Promise<Result<{refreshToken: string, accessToken: string}>> {
        const refreshTokenExist = await TokenRepository.findOne(user.id)
        if (refreshTokenExist == null) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_CREDENTIAL,
                result: null
            }
        }
        const refreshToken = {
            id: refreshTokenExist.id,
            ...TokenManager.genRefresh(user, fingerprint)
        }
        const accessToken = TokenManager.genAccess(user, fingerprint)
        const refreshTokenSaved = await TokenRepository.update(refreshToken)
        return {
            error: false,
            message: SuccessStatus.USER_LOGGED_IN,
            result: {
                refreshToken: refreshTokenSaved.token,
                accessToken: accessToken.token
            }
        }
    }

    static async revoke(userId: string): Promise<Result<IToken>> {
        const refreshToken = await TokenRepository.findOne(userId)
        refreshToken.token = "blockedUser"
        refreshToken.fingerprint = "blockedUser"
        const refreshTokenRevoked = await TokenRepository.saveOne(refreshToken)
        return {
            error: false,
            message: SuccessStatus.USER_BLOCKED,
            result: refreshTokenRevoked
        }
    }

    static async validate(refToken: string, accToken: string, fingerprint: string): Promise<Result<boolean>> {
        const refClaims = TokenManager.getRefClaims(refToken)
        const accClaims = TokenManager.getAccClaims(accToken)

        console.log(refClaims)
        console.log(accClaims)

        if (!refClaims || !accClaims || refClaims?.user != accClaims?.user) {
            console.log("WRONG TOKEN")
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_TOKEN,
                result: false
            }
        }

        const user = await UserService.findOne(refClaims.user)
        if (user.error) {
            return {...user, result: false}
        }
        const token = await TokenRepository.findOne(refClaims.user)
        console.log(refToken)
        console.log(token.token)
        if (token.token != refToken) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_TOKEN,
                result: false
            }
        }

        console.log(fingerprint)
        console.log(refClaims.fp)
        if (refClaims.fp != fingerprint) {
            return {
                error: true,
                message: ExceptionType.ERR_FINGERPRINT_MISMATCH,
                result: false
            }
        }
        console.log(user.result)
        if (refClaims.ver != user.result.version) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_TOKEN,
                result: false
            }
        }
        return {
            error: false,
            message: SuccessStatus.USER_LOGGED_IN,
            result: true
        }
    }
}