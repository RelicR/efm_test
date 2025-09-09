import express = require("express")
import bodyParser = require("body-parser")
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import config from "./config"

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middleware, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                console.log(`\n${req.method} | ${req.path}\nUser: ${res.locals.user}\nRole: ${res.locals.role}`)
                result.then((result) => {
                    console.log(
                        `RESPONSE\nError: ${result.error}\nMessage: ${result.message}\nResult: `,
                        result.result,
                        '\n')
                    result !== null && result !== undefined ? res.send(result) : undefined
                })

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    const server = app.listen(config.SERVER_PORT)
    console.log(`Сервер запущен на порте ${config.SERVER_PORT}`)

    const shutdown = async () => {
        console.log('Shutting down general server...');

        server.close(() => {
            console.log('General server closed.');
        });

        await AppDataSource.destroy().then(() => {
            console.log('Data Source connection closed');
        })

        process.exit(0);
    };

    process.on('SIGINT', shutdown); // Ctrl+C
    process.on('SIGTERM', shutdown); // Termination signal
}).catch(error => console.log(error))



