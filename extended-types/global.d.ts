declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        JWT_REFRESH_SECRET: string;
        JWT_ACCESS_SECRET: string;
        TOKEN_REFRESH_EXP: number;
        TOKEN_ACCESS_EXP: number;
        SERVER_PORT: number;
    }
}