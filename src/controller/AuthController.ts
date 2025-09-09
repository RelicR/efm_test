import { NextFunction, Request, Response } from "express"
import { TokenService } from "../service/TokenService"
import { UserService } from "../service/UserService"
import moment = require("moment")

export class AuthController {
    async signup(request: Request, response: Response, next: NextFunction) {
        const birthdayDate = moment(request.body.birthday, 'DD.MM.YYYY').toDate()
        const user = await UserService.create({...request.body, birthday: birthdayDate})
        const fingerprint = request.get("User-Agent")
        if (user.error) {
            response.status(400)
            return user
        }

        const tokens = await TokenService.create(user.result, fingerprint)
        if (tokens.error) {
            response.status(400)
            return tokens
        }

        response.status(200)
        return tokens
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const {email, password} = request.body
        const fingerprint = request.get("User-Agent")

        const user = await UserService.authenticate({email, password})

        if (user.error) {
            response.status(400)
            return user
        }

        const tokens = await TokenService.update(user.result, fingerprint)

        if (tokens.error) {
            response.status(400)
            return tokens
        }

        response.status(200)
        return tokens
    }
}