import { Request, Response, NextFunction } from 'express'
import { TokenManager } from "../util/TokenManager"
import { TokenService } from "../service/TokenService"
import { ExceptionType } from "../model/Result";

export async function assignUserData(req: Request, res: Response, next: NextFunction) {
    // const refToken = req.body.refresh_token
    // const accToken = req.body.access_token
    const refToken = req.headers["x-restore-token"] as string
    const accToken = req.headers["x-auth-token"] as string

    console.log(req.headers)

    res.locals.refToken = refToken
    res.locals.accToken = accToken
    res.locals.agent = req.get("User-Agent")

    const tokenValidate = await TokenService.validate(refToken, accToken, res.locals.agent)

    if (!tokenValidate.result) {
        return res.status(401).json(tokenValidate);
    }

    const accTokenClaims = TokenManager.getAccClaims(accToken)
    console.log(accTokenClaims)
    res.locals.user = accTokenClaims.user
    res.locals.role = accTokenClaims.role

    next()
}

export function authorize(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction)=> {
        console.log("AUTHORIZE")
        console.log(res.locals)
        console.log(req.path, allowedRoles)
        if (!res.locals.user) {
            return res.status(401).json({ error: ExceptionType.ERR_UNAUTHORIZED });
        }
        if (allowedRoles && !allowedRoles.includes(res.locals.role)) {
            return res.status(403).json({ error: ExceptionType.ERR_ACCESS_DENIED });
        }
        next()
    }
}

export function roleAccess(req: Request, res: Response, next: NextFunction) {
    console.log(req.path)
    console.log(res.locals)
    next()
}