import { Dialect } from "sequelize"
import dotenv from 'dotenv';
dotenv.config();

// -------------------------------------------------------------------
//  Types


//--------------------------------------------------------------------
export type TMongo = {
    connection_string: string,
    reconnect_interval: number
}

export type TSequelize = {
    dialect: Dialect,
    host: string
    port: number
    db: string,
    timezone: string,
    username: string,
    password?: string
}



export type IDataBase = TSequelize | TMongo;

export type IDB = {
    driver: "sequelize" | "mongo"
    sequelize: TSequelize,
    mongo?: TMongo,
    redis?: any
}

// -------------------------------------------------------------------
// Configuration
//--------------------------------------------------------------------

const DatabaseConfig: IDB = {
    driver: "sequelize",
    sequelize: {
        dialect: process.env.SEQUELIZE_DB_DIALECT as Dialect,
        host: process.env.SEQUELIZE_DB_HOST as string,
        port: (Number(process.env.SEQUELIZE_DB_PORT) || 5432),
        db: process.env.SEQUELIZE_DB_NAME,
        username: process.env.SEQUELIZE_DB_USER,
        password: process.env.SEQUELIZE_DB_PASS,
        timezone: process.env.SEQUELIZE_TIMEZONE || '+03:30', // set "+03:30" as Asia/Tehran.
    },
    // mongo: {
    //     connection_string: process.env.MONGO_CONNECTION_STRING as string,
    //     reconnect_interval: Number(process.env.MONGO_RECONNECT_INTERVAL) || 5000
    // },
}

export default DatabaseConfig;