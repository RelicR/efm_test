import { NextFunction, Request, Response } from "express"
import { UserService } from "../service/UserService";

export class UserController {

    async all(request: Request, response: Response, next: NextFunction) {
        const user = await UserService.findAll()
        if (user.error) {
            response.status(400)
            return user
        }

        response.status(200)
        return user
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await UserService.findOne(id)
        if (user.error) {
            response.status(400)
            return user
        }

        response.status(200)
        return user
    }

    async self(request: Request, response: Response, next: NextFunction) {
        const id = response.locals.user

        const user = await UserService.findOne(id)
        if (user.error) {
            response.status(400)
            return user
        }

        response.status(200)
        return user
    }

    async block(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await UserService.block(id)
        if (user.error) {
            response.status(400)
            return user
        }

        response.status(200)
        return user
    }

    async blockSelf(request: Request, response: Response, next: NextFunction) {
        const id = response.locals.user

        const user = await UserService.block(id)
        if (user.error) {
            response.status(400)
            return user
        }

        response.status(200)
        return user
    }
}