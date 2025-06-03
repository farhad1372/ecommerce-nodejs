
import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@services/database.js";
import { ModelConstructors } from "./index"

const PROTECTED_ATTRIBUTES = ['password'];



// * Required fields on creation.


export default class User extends Model {


    // declare getProjects: BelongsToManyGetAssociationsMixin<Project[]>
    // declare getDepartments: BelongsToManyGetAssociationsMixin<Department>;
    // declare countDepartments: BelongsToManyCountAssociationsMixin;
    // declare hasDepartment: BelongsToManyHasAssociationMixin<Department, number>;
    // declare hasDepartments: BelongsToManyHasAssociationsMixin<Department, number>;
    // declare setDepartments: BelongsToManySetAssociationsMixin<Department, number>;
    // declare addDepartment: BelongsToManyAddAssociationMixin<Department, number>;
    // declare addDepartments: BelongsToManyAddAssociationsMixin<Department, number>;
    // declare removeDepartment: BelongsToManyRemoveAssociationMixin<Department, number>;
    // declare removeDepartments: BelongsToManyRemoveAssociationsMixin<Department, number>;
    // declare createDepartment: BelongsToManyCreateAssociationMixin<Department>;


    static associate(models: ModelConstructors) {
        //
    }
}

User.init({
    // id: {
    //   type: DataTypes.BIGINT,
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    telegram_id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: true,
        defaultValue: null
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: null
    },
    mobile: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    gender: {
        type: DataTypes.ENUM({
            values: ['male', 'female', 'other']
        }),
        allowNull: true,
        defaultValue: null
    },
    national_code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: "code melli"
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM({
            values: ['active', 'suspended', 'pending']
        }),
        allowNull: false,
    },
    mobile_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: DataTypes.ENUM({
            values: ['reseller', 'user']
        }),
        allowNull: false,
        defaultValue: 'user'
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    engine: "InnoDB",
    timestamps: true,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
        attributes: {
            exclude: PROTECTED_ATTRIBUTES,
        },
    },
    scopes: {
        withPassword: {
            attributes: { exclude: [] },
        }
    },
    indexes: [
        {
            fields: ['full_name'],
            unique: false
        },
        {
            fields: ['telegram_id'],
            unique: false
        },
    ],
});