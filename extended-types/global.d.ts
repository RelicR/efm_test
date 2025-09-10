declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        JWT_REFRESH_SECRET: string;
        JWT_ACCESS_SECRET: string;
        TOKEN_REFRESH_EXP: string;
        TOKEN_ACCESS_EXP: string;
        SERVER_PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
    }
}