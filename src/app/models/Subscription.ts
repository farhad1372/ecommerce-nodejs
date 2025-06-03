import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@services/database.js';
import { ModelConstructors } from "./index.js";

// const PROTECTED_ATTRIBUTES = ['password']
export default class Subscription extends Model {
	// static associate(models: ModelConstructors) {
	//    //
	// }
}

Subscription.init({
	outline_access_key: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null,
		validate: {
			is: {
				args: /^ss:\/\/[a-zA-Z0-9+/=]+@[\w.-]+:\d+#[\w-]+$/i,
				msg: 'Invalid Outline access key format',
			},
		},
		comment: 'Outline access key (ss://...)',
	},
	data_limit: {
		type: DataTypes.BIGINT,
		allowNull: false,
		comment: 'Data limit in megabytes , set 0 to unlimited access',
	},
	status: {
		type: DataTypes.ENUM('active', 'expired', 'canceled'),
		allowNull: false,
		defaultValue: 'active',
	},
	auto_renew: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	user_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	},
	plan_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		onDelete: 'RESTRICT', // prevent delete when has a subscriptions
		onUpdate: 'CASCADE',
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'Subscription',
	tableName: 'subscriptions',
	engine: 'InnoDB',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});
