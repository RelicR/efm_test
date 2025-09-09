import { validate } from 'class-validator'
import { UserRepository } from "../repository/UserRepository"
import { User } from "../entity/User"
import { IUser } from "../model/User"
import { Result, ExceptionType, SuccessStatus } from "../model/Result"
import { TokenManager } from "../util/TokenManager"
import { TokenService } from "./TokenService"
import bcrypt = require("bcrypt")

export class UserService {

    private static readonly saltRounds = 10

    static async create(userData: IUser): Promise<Result<User>> {
        const user = Object.assign(new User(), userData)
        const validationErrors = await validate(user)

        if (validationErrors.length > 0) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_CREDENTIAL,
                result: null
            }
        }

        if (await UserRepository.exists(user.id, user.email)) {
            return {
                error: true,
                message: ExceptionType.ERR_USER_ALREADY_EXISTS,
                result: null
            }
        }
        user.password = await bcrypt.hash(user.password, this.saltRounds)

        const userSaved = await UserRepository.create(user)
        return {
            error: false,
            message: SuccessStatus.USER_CREATED,
            result: userSaved
        }
    }

    static async authenticate(authData: Partial<User>): Promise<Result<User>> {

        if (!authData.email || !authData.password) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_CREDENTIAL,
                result: null
            }
        }

        const user = await UserRepository.findOne(authData.id, authData.email)

        if (!user) {
            return {
                error: true,
                message: ExceptionType.ERR_USER_DOESNT_EXIST,
                result: null
            }
        }
        if (await bcrypt.compare(authData.password, user.password)) {
            if (!user.status) {
                return {
                    error: true,
                    message: ExceptionType.ERR_USER_BLOCKED,
                    result: null
                }
            }
            return {
                error: false,
                message: SuccessStatus.USER_LOGGED_IN,
                result: user
            }
        }

        return {
            error: true,
            message: ExceptionType.ERR_INVALID_CREDENTIAL,
            result: null
        }
    }

    static async relogin(refreshToken: string, accessToken: string, fingerprint: string): Promise<Result<User>> {
        const refClaims = TokenManager.getRefClaims(refreshToken)
        const accClaims = TokenManager.getAccClaims(accessToken)

        if (refClaims == null || accClaims == null || refClaims?.user != accClaims?.user) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_TOKEN,
                result: null
            }
        }

        if (refClaims.fp != fingerprint) {
            return {
                error: true,
                message: ExceptionType.ERR_FINGERPRINT_MISMATCH,
                result: null
            }
        }

        const user = await UserRepository.findOne(refClaims.user)

        if (refClaims.ver != user.version) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_TOKEN,
                result: null
            }
        }

        return {
            error: false,
            message: SuccessStatus.USER_LOGGED_IN,
            result: user
        }
    }

    static async findAll(): Promise<Result<User[]>> {
        const user = await UserRepository.findAll()
        return {
            error: user == null,
            message: user != null ? "" : ExceptionType.ERR_USER_DOESNT_EXIST,
            result: user
        }
    }

    static async findOne(id?: string, email?: string): Promise<Result<User>> {
        const user = await UserRepository.findOne(id, email)
        return {
            error: user == null,
            message: user != null ? "" : ExceptionType.ERR_USER_DOESNT_EXIST,
            result: user
        }
    }

    static async block(id: string): Promise<Result<User>> {
        const user = await UserRepository.findOne(id)
        const token = await TokenService.revoke(id)

        if (!user || token.error) {
            return {
                error: true,
                message: ExceptionType.ERR_USER_DOESNT_EXIST,
                result: null
            }
        }
        user.status = false
        const userBlocked = await UserRepository.saveOne(user)
        if (!userBlocked) {
            return {
                error: true,
                message: ExceptionType.ERR_INVALID_CREDENTIAL,
                result: null
            }
        }
        return {
            error: false,
            message: SuccessStatus.USER_BLOCKED,
            result: null
        }
    }
}