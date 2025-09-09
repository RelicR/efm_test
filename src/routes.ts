import { UserController } from "./controller/UserController"
import { AuthController } from "./controller/AuthController"
import {assignUserData, authorize} from "./middleware/AuthMiddleware"

export const Routes = [{
    method: "post",
    route: "/api/auth/register",
    controller: AuthController,
    action: "signup",
    middleware: []
}, {
    method: "post",
    route: "/api/auth/login",
    controller: AuthController,
    action: "login",
    middleware: []
}, {
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all",
    middleware: [assignUserData, authorize("Admin")]
}, {
    method: "get",
    route: "/api/users/me",
    controller: UserController,
    action: "self",
    middleware: [assignUserData, authorize("Admin", "User")]
}, {
    method: "get",
    route: "/api/users/:id",
    controller: UserController,
    action: "one",
    middleware: [assignUserData, authorize("Admin")]
}, {
    method: "post",
    route: "/api/users/block/me",
    controller: UserController,
    action: "blockSelf",
    middleware: [assignUserData, authorize("Admin", "User")]
}, {
    method: "post",
    route: "/api/users/block/:id",
    controller: UserController,
    action: "block",
    middleware: [assignUserData, authorize("Admin")]
}]