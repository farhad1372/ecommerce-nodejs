import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@services/database.js';
import { ModelConstructors } from "./index.js";

// const PROTECTED_ATTRIBUTES = ['password']
export default class Payment extends Model {
	// static associate(models: ModelConstructors) {
	//    //
	// }
}

Payment.init({
	amount: {
		type: DataTypes.DECIMAL(15, 2),
		allowNull: false,
		comment: 'Payment amount in currency (e.g., IRR)',
	},
	currency: {
		type: DataTypes.STRING(3),
		allowNull: false,
		comment: 'Currency code (e.g., IRR)',
	},
	authority: {
		type: DataTypes.STRING(50),
		allowNull: true,
		defaultValue: null,
		comment: 'Payment gateway authority code (e.g., ZarinPal)',
	},
	payment_gateway: {
		type: DataTypes.STRING(50),
		allowNull: false,
		comment: 'Payment gateway (e.g., ZarinPal)',
	},
	status: {
		type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
		allowNull: false,
		defaultValue: 'pending',
	},
	user_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	},
	subscription_id: {
		type: DataTypes.BIGINT,
		allowNull: true,
		defaultValue: null,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	},
	transaction_id: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
		comment: 'Payment gateway transaction ID',
	},
	payment_date: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: null,
	},
}, {
	sequelize,
	modelName: 'Payment',
	tableName: 'payments',
	engine: 'InnoDB',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});
