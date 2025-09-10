import path = require("path")

// require('dotenv').config({ path: path.resolve(__dirname, "../dev.env") })
require('dotenv').config({ path: path.resolve(__dirname, "../.env") })

interface ENV {
    NODE_ENV: string | undefined
    JWT_REFRESH_SECRET: string | undefined
    JWT_ACCESS_SECRET: string | undefined
    TOKEN_REFRESH_EXP: string | undefined
    TOKEN_ACCESS_EXP: string | undefined
    SERVER_PORT: string | undefined
    DB_HOST: string | undefined
    DB_PORT: string | undefined
    DB_USER: string | undefined
    DB_PASSWORD: string | undefined
    DB_NAME: string | undefined
}

interface Config {
    NODE_ENV: string
    JWT_REFRESH_SECRET: string
    JWT_ACCESS_SECRET: string
    TOKEN_REFRESH_EXP: number
    TOKEN_ACCESS_EXP: number
    SERVER_PORT: number
    DB_HOST: string
    DB_PORT: number
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
}

const getConfig = (): Config => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        TOKEN_REFRESH_EXP: process.env.TOKEN_REFRESH_EXP ? Number(process.env.TOKEN_REFRESH_EXP) : undefined,
        TOKEN_ACCESS_EXP: process.env.TOKEN_ACCESS_EXP ? Number(process.env.TOKEN_ACCESS_EXP) : undefined,
        SERVER_PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : undefined,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME
    }
}

const getSanitzedConfig = (config: Config): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`)
        }
    }
    return config as Config
}

const config = getConfig()

const sanitizedConfig = getSanitzedConfig(config)

export default sanitizedConfig