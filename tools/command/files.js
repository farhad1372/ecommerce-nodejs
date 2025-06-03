import CommanderConfig from './config.js';
import fs from 'fs';
import Shell from 'shelljs';
import pluralize from 'pluralize';
import * as AllTables from '../../dist/models/index.js';

class CommanderFiles {
	#$config;
	#$dir;
	#$fn_name;
	#driver; // sequelize | mongo
	#command;
	#options;

	constructor(command_str, full_path, driver, options) {
		//* commandStr is : make-model, make-controller, ...
		//* full_path is : users/AdminUserController
		const make_type = command_str.split('-')[1]; //* model, controller, ....
		const _config = CommanderConfig[make_type];
		if (!_config) throw new Error(`bad type selected : ${make_type}`);
		if (driver) this.#driver = driver;

		// const p = full_path.split('/');
		// if (p.length < 2) throw new Error(`Please enter the folder name and name correctly. eg: foo/bar${make_type} `);

		//* name of the function or class
		let fn_name = full_path.split('/')[full_path.split('/').length - 1];
		fn_name = fn_name.endsWith('/') ? fn_name.substring(0, fn_name.length - 1) : fn_name;
		//* path
		let dir_name = full_path.replace(fn_name, '');
		dir_name = dir_name.endsWith('/') ? dir_name.substring(0, dir_name.length - 1) : dir_name;
		if (!fn_name) throw new Error(`cant find fn name with name :`, fn_name);
		// if (!dir_name) throw new Error(`cant find dir_name with name :`, dir_name);
		this.#$dir = dir_name;
		this.#$fn_name = _config?.name_notation === 'upperFirst' ? this.#upperCaseFirst(fn_name) : _config?.name_notation === 'lowerFirst' ? this.#lowerCaseFirst(fn_name) : fn_name;
		this.#$config = _config;
		this.#command = command_str;
		this.#options = options;
	}

	create() {
		if (this.#$config.cli_command) {
			if (Shell.exec(this.#$config.cli_command.replace('@VAR1', this.#$fn_name)).code !== 0) {
				Shell.echo('Error: Seed failed');
				Shell.exit(1);
			}
		} else {
			this.#createDir();
			this.#createFile();
		}
	}

	#createDir() {
		var base_path = this.#$config.base_path;
		if (base_path.includes(':driver')) base_path = base_path.replace(':driver', this.#driver);

		if (!fs.existsSync(base_path + this.#$dir)) {
			fs.mkdirSync(base_path + this.#$dir, { recursive: true });
		}
	}

	#createFile() {
		var example_path = this.#$config.example_path;
		if (example_path.includes(':driver')) example_path = example_path.replaceAll(':driver', this.#driver);

		var rawFile = fs.readFileSync(example_path, 'utf-8');
		var result = rawFile;
		result = rawFile.replace(/Examples/g, pluralize(this.#$fn_name.toLowerCase())).replace(/Example/g, this.#$fn_name);

		//* calculate sub-folders
		const sub_folders_count = this.#$dir.split('/')?.length || 0;

		if (this.#$dir && this.#$dir.length > 0) {
			var sub_folder_string = '';
			for (let index = 0; index < sub_folders_count; index++) {
				sub_folder_string = sub_folder_string + '../';
			}
			result = result.replace('@to:path:', sub_folder_string);
		} else {
			result = result.replace('@to:path:', './');
		}

		//* find extension
		const extension = CommanderConfig.file_extension;
		// apply variables path

		var base_path = this.#$config.base_path;
		if (base_path.includes(':driver')) base_path = base_path.replace(':driver', this.#driver);

		const destination = `${base_path}${this.#$dir}/${this.#$fn_name}.${extension}`;

		if (this.#options?.model_in_controller_question?.model_name) {
			if (!AllTables?.default?.[this.#options?.model_in_controller_question?.model_name]) {
				throw new Error(`Model : ${this.#options?.model_in_controller_question?.model_name} not found!`);
			}

			const model_name = this.#options?.model_in_controller_question?.model_name;
			const model_attr = AllTables?.default?.[this.#options?.model_in_controller_question?.model_name]?.getAttributes();

			const except_attr = ['id', 'created_at', 'updated_at', 'image', 'images', 'avatar', 'file', 'files'];
			var all_model_attributes = [];

			for (const attr_name in model_attr) {
				if (Object.prototype.hasOwnProperty.call(model_attr, attr_name)) {
					const attr = model_attr[attr_name];
					if (!except_attr.includes(attr_name)) {
						all_model_attributes.push({
							name: attr_name,
							allow_null: attr?.allowNull || true,
							validator: this.#CreateControllerValidator(attr, attr_name),
						});

						// console.log('attr --->> ', attr_name, String(attr.type).split(' ')[0]);
						// if (attr.type === 'string') {
						// 	console.log('Horaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
						// }
						// console.log('--------------------------------------');
					}
				}
			}

			result = result.replaceAll('//*model-inputs', all_model_attributes.map((r) => r.name).join(', \n //'));
			result = result.replaceAll('//*inputs', all_model_attributes.map((r) => r.name).join(', '));
			result = result.replaceAll('model', model_name.toLowerCase());
			result = result.replaceAll('models', pluralize(model_name.toLowerCase()));
			result = result.replaceAll('Model', model_name);
			result = result.replaceAll('//*validate-request', all_model_attributes.map((a) => a.validator).join('\n'));
			result = result.replace('@m-p', '@models');
		}

		if (!fs.existsSync(destination)) fs.writeFileSync(destination, result);
		else throw new Error(`file already exists.`);
	}

	#upperCaseFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	#lowerCaseFirst(string) {
		return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
	}

	#CreateControllerValidator(attr, attr_name) {
		const attr_type = String(attr.type).split(' ')[0];
		if (attr_type === 'VIRTUAL') return;

		console.log('attr_type', attr_type);

		let VALUES;
		if (attr.type && typeof attr.type === 'object') {
			for (const key in attr.type) {
				if (Object.prototype.hasOwnProperty.call(attr.type, key)) {
					const el1 = attr.type[key];
					for (const k2 in el1) {
						if (Object.prototype.hasOwnProperty.call(el1, k2)) {
							const el2 = el1[k2];
							VALUES = el2;
						}
					}
				}
			}
		}

		let _validator_str = `//validator.body('${attr_name}')`;

		//* Required
		if (attr?.allowNull === false) {
			_validator_str = _validator_str + '.required()';
		}

		//* Other Rules
		if (attr_type === 'BIGINT') {
			_validator_str = _validator_str + '.int()';
		} else if (attr_type === 'ENUM' && VALUES && Array.isArray(VALUES) && VALUES.length > 0) {
			_validator_str =
				_validator_str +
				`.enum([${VALUES?.join(',')
					.split(',')
					.map((e) => `'${e.toString()}'`)}])`;
		} else if (['TEXT', 'VARCHAR'].includes(attr_type) || attr_type.includes('VARCHAR')) {
			_validator_str = _validator_str + '.string()';
		}

		// console.log('type is ::', attr.type);

		if (attr.type && typeof attr.type === 'object') {
			// console.log(attr.type);
			// console.log('---------------------');
			for (const key in attr.type) {
				if (Object.prototype.hasOwnProperty.call(attr.type, key)) {
					const element = attr.type[key];
					// console.log('------------------------------------------', element);
					// console.log('name ?????? ', key);
					// console.log('keyeyeyeyeye', key);
					// console.log('eys is ', key);
				}
			}
		}

		// if([].includes(attr.type)){
		// 	//
		// }

		// attr.type === ''
		// attr.allowNull === ''
		// attr.unique === '',

		return _validator_str;
	}
}

export default CommanderFiles;
