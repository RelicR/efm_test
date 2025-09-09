import path = require("path")

// require('dotenv').config({ path: path.resolve(__dirname, "../dev.env") })
require('dotenv').config({ path: path.resolve(__dirname, "../.env") })

interface ENV {
    NODE_ENV: string | undefined
    JWT_REFRESH_SECRET: string | undefined
    JWT_ACCESS_SECRET: string | undefined
    TOKEN_REFRESH_EXP: number | undefined
    TOKEN_ACCESS_EXP: number | undefined
    SERVER_PORT: number | undefined
}

interface Config {
    NODE_ENV: string
    JWT_REFRESH_SECRET: string
    JWT_ACCESS_SECRET: string
    TOKEN_REFRESH_EXP: number
    TOKEN_ACCESS_EXP: number
    SERVER_PORT: number
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        TOKEN_REFRESH_EXP: process.env.TOKEN_REFRESH_EXP ? Number(process.env.TOKEN_REFRESH_EXP) : undefined,
        TOKEN_ACCESS_EXP: process.env.TOKEN_ACCESS_EXP ? Number(process.env.TOKEN_ACCESS_EXP) : undefined,
        SERVER_PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : undefined,
    }
}

const getSanitzedConfig = (config: ENV): Config => {
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