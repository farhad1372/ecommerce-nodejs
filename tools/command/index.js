#! node
import prompts from 'prompts';
import FileCommander from './files.js';
import DatabaseCommander from './database.js';
import DatabaseConfig from '../../dist/config/database.js';

const FirstStepQuestions = [
	{
		type: 'select',
		name: 'duty',
		message: 'Select an operation :',
		choices: [
			{ title: 'make model', value: 'make-model' },
			{ title: 'make controller', value: 'make-controller' },
			{ title: 'make middleware', value: 'make-middleware' },
			{ title: 'make validation', value: 'make-validation' },
			{ title: 'make seed', value: 'make-seed' },
			{ title: 'make event', value: 'make-event' },
			// { title: 'database migrate & seed', value: 'db-migrate&seed' },
			// { title: 'database migrate', value: 'db-migrate' },
		],
		validate: (value) => {
			if (!value) return 'operation is required';
			else return true;
		},
	},
];

const MakePathQuestion = [
	{
		type: 'text',
		name: 'path',
		message: 'Enter full directory name ...',
		validate: (value) => {
			if (value.length < 3) return 'path name can not be less than 3 characters';
			// else if (!value.includes('/')) return 'Please enter the folder name and name correctly';
			else return true;
		},
	},
];

const MakeDriverQuestion = [
	{
		type: 'select',
		name: 'driver',
		message: 'Select a driver :',
		choices: [
			{ title: 'Sequelize', value: 'sequelize' },
			{ title: 'Mongo', value: 'mongo' },
		],
		validate: (value) => {
			if (!value) return 'driver is required when two driver has been set in config.';
			else return true;
		},
	},
];

const SelectModeQuestion = [
	{
		type: 'select',
		name: 'mode',
		message: 'Select mode :',
		choices: [
			{ title: 'Development', value: 'development' },
			{ title: 'Production', value: 'production' },
		],
		validate: (value) => {
			if (!value || !['production', 'development'].includes(value)) return 'mode must be in [development, production]';
			else return true;
		},
	},
];

const MakeModelInControllerQuestion = [
	{
		type: 'text',
		name: 'model_name',
		message: 'Enter Model Name (Optional)',
	},
];

// console.log(
// 	'process.env.npm_config_myVar',
// 	process.argv?.[2],
// 	process.env.npm_config_myVar
// )

if (process?.argv?.[2] === 'db:fr') {
	var mode = ''; //* development | production
	var driver = ''; //* sequelize | mongo | all
	if (['development', 'production'].includes(process.env.npm_config_mode)) mode = process.env.npm_config_mode;
	else {
		const q2 = await prompts(SelectModeQuestion);
		if (q2?.mode) {
			mode = q2.mode;
		}
	}
	if (!mode) mode = 'development';
	if (['sequelize', 'mongo', 'all'].includes(process.env.npm_config_driver)) driver = process.env.npm_config_driver;
	else if (DatabaseConfig.mongo && DatabaseConfig.sequelize) driver = 'all';
	else if (DatabaseConfig.sequelize) driver = 'sequelize';
	else if (DatabaseConfig.mongo) driver = 'mongo';

	const db_commander = new DatabaseCommander('db-migrate&seed ', mode, driver);
	db_commander.execute();
} else {
	(async () => {
		const q1 = await prompts(FirstStepQuestions);
		if (!q1 || !q1?.duty) {
			return;
		}
		var q3;
		if (['make-model', 'make-seed'].includes(q1.duty) && (DatabaseConfig.mongo || DatabaseConfig.sequelize)) {
			q3 = await prompts(MakeDriverQuestion);
			if (!q3) return;
		}

		if (q1.duty.includes('make-')) {
			const q2 = await prompts(MakePathQuestion);

			var model_in_controller_question;
			if (q1.duty === 'make-controller') {
				model_in_controller_question = await prompts(MakeModelInControllerQuestion);
			}

			const file_commander = new FileCommander(q1.duty, q2.path, q3?.driver, { model_in_controller_question });
			file_commander.create();
		}

		// if(this.#command.includes("-controller") )
		// else if (q1.duty.includes('db-')) {
		// 	const db_commander = new DatabaseCommander(q1.duty);
		// 	db_commander.execute();
		// }
		else {
			throw new Error(`bad type Exception : ${q1.duty}`);
		}
	})();
}
