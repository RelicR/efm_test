import path from "path"
import dotenv from "dotenv"

// dotenv.config({ path: path.resolve(__dirname, "../.env") })
dotenv.config({ path: path.resolve(__dirname, "../dev.env") })

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
        JWT_REFRESH_SECRET: proccess.env.JWT_REFRESH_SECRET,
        JWT_ACCESS_SECRET: proccess.env.JWT_ACCESS_SECRET,
        TOKEN_REFRESH_EXP: proccess.env.JWT_REFRESH_SECRET ? Number(proccess.env.JWT_REFRESH_SECRET) : undefined,
        TOKEN_ACCESS_EXP: proccess.env.TOKEN_ACCESS_EXP ? Number(proccess.env.TOKEN_ACCESS_EXP) : undefined,
        SERVER_PORT: proccess.env.SERVER_PORT ? Number(proccess.env.SERVER_PORT) : undefined,
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