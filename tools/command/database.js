import CommanderConfig from './config.js';
import sequelize from '../../dist/services/database.js';
import Shell from 'shelljs';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
dotEnv.config();

// ---------------- all Models should be here to migrate works ! ----------------------------------
import * as AllTables from '../../dist/models/index.js';
// ---------------- all Models should be here to migrate works ! ----------------------------------
// 		await sequelize.sync({ force: true });
// 		if (Shell.exec('npx sequelize-cli db:seed:all').code !== 0) {
// 			Shell.echo('Error: Seed failed');
// 			Shell.exit(1);
// 		}

export default class DatabaseCommander {
	#$commandType; //* migrate&seed | migrate
	#mode; //* development | production
	#driver; //* sequelize | mongo

	constructor(command_str, mode, driver) {
		const command_type = command_str.split('-')[1];
		if (mode) this.#mode = String(mode).trim();
		if (driver) this.#driver = driver;
		this.#$commandType = String(command_type).trim();
	}

	async #mongoose(migrate = true, seed = true) {
		// process.env.MONGO_CONNECTION_STRING
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		if (migrate) {
			await mongoose.connection.dropDatabase();
		}
		if (seed) {
			//
		}
		await mongoose.connection.close();
	}

	async #sequelize(migrate = true, seed = true) {
		if (migrate) {
			await sequelize.getQueryInterface().dropAllTables({ logging: false });
			// await sequelize.drop({ logging: false });
			await sequelize.sync({ force: true, logging: false });
		}
		if (seed) {
			var shell_command = 'npx sequelize-cli db:seed:all';
			if (this.#mode) shell_command = 'npx sequelize-cli --env ' + this.#mode + ' db:seed:all';
			if (Shell.exec(shell_command).code !== 0) {
				Shell.echo('Error: Seed failed');
				Shell.exit(1);
			}
		}
	}

	async execute() {
		const has_seed = this.#$commandType.split('&').includes('seed');
		if (['all', 'sequelize'].includes(this.#driver)) await this.#sequelize(true, has_seed);
		if (['all', 'mongo'].includes(this.#driver)) await this.#mongoose(true, has_seed);
	}
}
