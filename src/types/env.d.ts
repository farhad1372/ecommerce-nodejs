
namespace NodeJS {
	interface ProcessEnv {
		// applications
		PORT: string;
		SERVER_HTTP_REQUEST_TIMEOUT_IN_SEC: string;
		// sequelize
		SEQUELIZE_DB_NAME: string;
		SEQUELIZE_DB_USER: string;
		SEQUELIZE_DB_PASS: string;
		SEQUELIZE_DB_HOST: string;
		SEQUELIZE_DB_PORT: string;
		SEQUELIZE_DB_DIALECT: string;
		SEQUELIZE_TIMEZONE: string;
		// supabase
		SUPABASE_PROJECT_URL: string
		SUPABASE_DB_PASS: string
		SUPABASE_ANON_KEY: string
	}
}
