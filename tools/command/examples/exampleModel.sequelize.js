import { DataTypes, Model } from 'sequelize';
import sequelize from '@services/database.js';
import { ModelConstructors } from "./index.js";

// const PROTECTED_ATTRIBUTES = ['password']
export default class Example extends Model {
	// static associate(models: ModelConstructors) {
	//    //
	// }
}
Example.init({
		//
	},{
		sequelize,
		modelName: 'Example',
		tableName: 'Examples',
		engine: 'InnoDB',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	});
