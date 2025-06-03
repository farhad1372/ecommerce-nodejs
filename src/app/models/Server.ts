import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@services/database.js';
import { ModelConstructors } from "./index.js";

// const PROTECTED_ATTRIBUTES = ['password']
export default class Server extends Model {
	// static associate(models: ModelConstructors) {
	//    //
	// }
}

Server.init({
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	host: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Host cannot be empty' },
			isIPOrDomain(value: string) {
				if (!/^((\d{1,3}\.){3}\d{1,3}|[\w.-]+\.[a-zA-Z]{2,})$/.test(value)) {
					throw new Error('Host must be a valid IP or domain');
				}
			},
		},
		comment: 'Server IP or domain',
	},
	region: {
		type: DataTypes.STRING(50),
		allowNull: false,
		comment: 'Server region (e.g., Germany, USA)',
	},
	api_url: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			isUrl: { msg: 'API URL must be a valid URL' },
		},
		comment: 'Outline API URL',
	},
	cert_sha256: {
		type: DataTypes.STRING(64),
		allowNull: false,
		validate: {
			is: {
				args: /^[A-F0-9]{64}$/i,
				msg: 'Certificate SHA256 must be a 64-character hexadecimal string',
			},
		},
		comment: 'Certificate SHA256 for Outline API',
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	max_users: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: null,
		comment: 'Maximum number of users for this server, set null to unlimited users',
	},
	current_users: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	sequelize,
	modelName: 'Server',
	tableName: 'servers',
	engine: 'InnoDB',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});
