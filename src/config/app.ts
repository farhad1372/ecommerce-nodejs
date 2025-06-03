import dotenv from 'dotenv';
dotenv.config();

const appConfig = {
    appDebug: true,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    server_timeout_in_sec: process.env.SERVER_HTTP_REQUEST_TIMEOUT_IN_SEC ? Number(process.env.SERVER_HTTP_REQUEST_TIMEOUT_IN_SEC) : 30000
}

export default appConfig