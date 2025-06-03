import BaseEvent from "../Event.js";
// import SMS from "../../../services/sms/index.js"
// import Validator from '../../services/validator/index.js';
// import { Model } from '../../app/models/sequelize/index.js';
// import { Request } from "express";


export default class Example extends BaseEvent {

    constructor() {
        super();
        this.$logOnError = false;
        this.handler();
    }

    private handler() {
        try {
            //
        } catch (e) {
            this.errors = {
                message: "Internal server error",
                code: 500
            }
        }
    }
}