import { Dialect, Sequelize } from "sequelize";
import DatabaseConfig from "../config/database.js";
import dotenv from 'dotenv';
dotenv.config();

// const sequelize = new Sequelize(
//     process.env.SEQUELIZE_DB_NAME || "",
//     process.env.SEQUELIZE_DB_USER || "",
//     process.env.SEQUELIZE_DB_PASS || "", {
//     host: process.env.SEQUELIZE_DB_HOST,
//     port: Number(process.env.SEQUELIZE_DB_PORT),
//     dialect: process.env.SEQUELIZE_DB_DIALECT as any,
//     timezone: process.env.SEQUELIZE_TIMEZONE,   // set "+03:30" as Asia/Tehran.
// });

// export default sequelize;


// export const SequelizeConnection = async function () {
//     try {
//         await sequelize.authenticate({ logging: false });
//         console.log('\x1b[46m', 'Sequelize Connection has been established successfully.', '\x1b[0m');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }




// Interface for database configuration to ensure type safety and flexibility
interface DatabaseConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    timezone: string;
    dialect: Dialect
}

// Interface for database service to enable dependency inversion
interface DatabaseService {
    connect(): Promise<void>;
    getClient(): Sequelize;
    close(): Promise<void>;
}

/**
 * SequelizeDatabaseService implements the DatabaseService interface
 * to manage database connections using Sequelize.
 */
export class SequelizeDatabaseService implements DatabaseService {
    private sequelize: Sequelize | undefined;

    /**
     * Establishes a connection to the database
     * @throws Error if connection fails
     */


    async connect(): Promise<void> {
        try {
            const sequelize_config = DatabaseConfig.sequelize;

            const seq = new Sequelize(
                sequelize_config.db,
                sequelize_config.username,
                sequelize_config.password,
                {
                    host: sequelize_config.host,
                    port: Number(sequelize_config.port),
                    dialect: sequelize_config.dialect,
                    timezone: sequelize_config.timezone,   // set "+03:30" as Asia/Tehran.
                });
            this.sequelize = seq;
            await seq.authenticate();
            console.log('\x1b[46m', 'Database connection established successfully.', '\x1b[0m');
        } catch (error) {
            throw new Error(`Failed to connect to database: ${(error as Error).message}`);
        }
    }

    /**
     * Returns the Sequelize client instance
     * @returns Sequelize instance
     */
    getClient(): Sequelize {
        return this.sequelize as Sequelize;
    }

    /**
     * Closes the database connection
     */
    async close(): Promise<void> {
        try {
            await this.sequelize?.close();
            console.log('Database connection closed.');
        } catch (error) {
            throw new Error(`Failed to close database connection: ${(error as Error).message}`);
        }
    }
}

const sequelizeService = new SequelizeDatabaseService();
export const sequelize = sequelizeService.getClient();

/**
 * Factory function to create a database service instance with environment variables
 * @returns DatabaseService instance
 */



// function createDatabaseService(): DatabaseService {
//     const config: DatabaseConfig = {
//         database: process.env.SEQUELIZE_DB_NAME || '',
//         username: process.env.SEQUELIZE_DB_USER || '',
//         password: process.env.SEQUELIZE_DB_PASS || '',
//         host: process.env.SEQUELIZE_DB_HOST || 'localhost',
//         port: Number(process.env.SEQUELIZE_DB_PORT) || 5432,
//         dialect: (process.env.SEQUELIZE_DB_DIALECT as Dialect) || 'postgres',
//         timezone: process.env.SEQUELIZE_TIMEZONE || '+03:30', // Default to Asia/Tehran
//     };

//     // Validate configuration
//     if (!config.database || !config.username) {
//         throw new Error('Database configuration is incomplete. Check environment variables.');
//     }

//     return new SequelizeDatabaseService(config);
// }

// export { DatabaseService, SequelizeDatabaseService, createDatabaseService };
