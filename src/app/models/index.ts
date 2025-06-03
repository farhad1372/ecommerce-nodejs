import { Model, ModelStatic } from "sequelize";
import { sequelize } from "../../services/database.js";
import Plan from "./Plan.js";
import User from "./user.js";
import Subscription from "./Subscription.js";


const models = {

    User,
    Plan,
    Subscription
}

export type ModelConstructors = {
    [K in keyof typeof models]: ModelStatic<Model>;
};

export const InitAssociation = () => {
    Object.keys(models).forEach((modelName) => {
        if ((models as any)[modelName].associate) {
            (models as any)[modelName].associate(models);
        }
    });
}


export default { sequelize, ...models };