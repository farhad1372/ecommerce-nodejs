import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@services/database.js';
import { ModelConstructors } from "./index.js";

// const PROTECTED_ATTRIBUTES = ['password']
export default class Plan extends Model {
	// static associate(models: ModelConstructors) {
	//    //
	// }
}
Plan.init({
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: null,
	},
	data_limit: {
		type: DataTypes.BIGINT,
		allowNull: false,
		comment: 'Data limit in megabytes',
	},
	duration_days: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(15, 2),
		allowNull: false,
		comment: 'Price in currency (e.g., IRR)',
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
		comment: 'set null to infinite users',
	},
}, {
	sequelize,
	modelName: 'Plan',
	tableName: 'plans',
	engine: 'InnoDB',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});
