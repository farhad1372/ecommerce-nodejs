
namespace NodeJS {
	interface ProcessEnv {
		SEQUELIZE_DB_NAME: string;
		SEQUELIZE_DB_USER: string;
		SEQUELIZE_DB_PASS: string;
		SEQUELIZE_DB_HOST: string;
		SEQUELIZE_DB_PORT: string;
		SEQUELIZE_DB_DIALECT: string;
		SEQUELIZE_TIMEZONE: string;
		PORT: string;
		SERVER_HTTP_REQUEST_TIMEOUT_IN_SEC: string;
	}
}
