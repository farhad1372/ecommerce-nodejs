import { Request } from "express";
import Validation from "../validation.js"
import Validator from '@services/validator/index.js';

export default class Example extends Validation {

    constructor(request: Request) {
        super(request);
    }


    private async common(): Promise<Validator[]> {
        return [
            // this.validator.body("name").required().min(3).max(250),
            // await this.validator.body("city_id").required().numeric().bail().exists(City),
        ]
    }




    //* ---------------------------------
    //* to validate in methods
    //* ---------------------------------

    async create() {
        // await this.common();
        // await this.validator.body("family").string()
    }

    async update() {
        //
    }

    async delete() {
        //
    }


}