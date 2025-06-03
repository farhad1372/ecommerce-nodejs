import { Request, Response } from "express";
import User from "@models/user";
import { NOW } from "sequelize";
import BaseController from "./controller.js";
import UserCommentValidator from "../validators/comment/user.js";
// import { SupabaseService } from "@services/supabase.js";


class TestController extends BaseController {


    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;


            const data = await request.app.get('supabase')
                .from('products')
                .select(`*, attributes!product_attributes_product_id_fkey ( id, value, type), product_attributes!product_attributes_product_id_fkey1 ( id, attribute_ids, price)`)
                .eq('id', id)
                .single();

            if (data?.error) return response.Json.internalError(data?.error);

            console.log("data", data?.error);
            return response.send(data?.data);


            // const validation = UserCommentValidator.create(request);
            // if (validation.fails) return response.Json.validationError(validation.errors);



            // const product = await Product.findByPk(id);
            // if (!product) {
            //     return this.notFound(res, `Product with ID ${id} not found`);
            // }

            response.send("done");
        } catch (error) {
            console.log("Err", error);
            response.send(error)
        }
    }

}


export default new TestController();