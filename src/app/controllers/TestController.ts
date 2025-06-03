import { Request, Response } from "express";
import User from "@models/user";
import { NOW } from "sequelize";
import BaseController from "./controller.js";
import UserCommentValidator from "../validators/comment/user.js";


class TestController extends BaseController {


    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const validation = UserCommentValidator.create(request);
            if (validation.fails) return response.Json.validationError(validation.errors);



            // const product = await Product.findByPk(id);
            // if (!product) {
            //     return this.notFound(res, `Product with ID ${id} not found`);
            // }

            response.send("done");
        } catch (error) {
            response.send(error)
        }
    }

}


export default new TestController();