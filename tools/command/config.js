const CommanderConfig = {
	file_extension: 'ts',
	controller: {
		base_path: 'app/http/controllers/',
		example_path: 'tools/command/examples/exampleController.js',
		name_notation: 'upperFirst', //? upperFirst, lowerFirst
	},
	model: {
		base_path: 'src/models',
		example_path: 'tools/command/examples/exampleModel.:driver.js',
		name_notation: 'upperFirst',
	},
	middleware: {
		base_path: 'app/http/middleware/',
		example_path: 'tools/command/examples/exampleMiddleware.js',
		name_notation: 'upperFirst',
	},
	validation: {
		base_path: 'app/http/validations/',
		example_path: 'tools/command/examples/exampleValidation.js',
		name_notation: 'upperFirst',
	},
	event: {
		base_path: 'app/events/',
		example_path: 'tools/command/examples/exampleEvent.js',
		name_notation: 'upperFirst',
	},
	seed: {
		base_path: 'database/sequelize/seeders/',
		cli_command: 'npx sequelize-cli seed:generate --name @VAR1',
	},
	// request : {
	// 	base_path: 'app/http/requests/',
	// 	example_path: 'tools/command/examples/exampleRequest.js',
	// 	name_notation: 'upperFirst',
	// },
};

export default CommanderConfig;
