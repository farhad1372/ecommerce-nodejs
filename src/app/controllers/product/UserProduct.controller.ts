import { Request, Response } from "express";
import BaseController from "../controller.js";
import UserProductValidator from "@validators/product/user.js";


class UserProductController extends BaseController {


    public async index(request: Request, response: Response) {
        try {
             const data = await request.app.get('supabase')
                .from('products')
                .select('*')

            if (data?.error) return response.Json.internalError(data?.error);
            return response.Json.successful("", data);

        } catch (e) {
            response.Json.internalError(e)
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const validation = UserProductValidator.show(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            // const data = await request.app.get('supabase')
            //     .from('products')
            //     .select(`*, attributes (id, type, value)`)
            //     .eq('id', id)
            //     .single();

            const data = await request.app.get('supabase')
                .from('products')
                .select(`*, attributes!product_attributes_product_id_fkey ( id, value, type), product_attributes!product_attributes_product_id_fkey1 ( id, attribute_ids, price)`)
                .eq('id', id)
                .single();

            if (data?.error) return response.Json.internalError(data?.error);

            return response.Json.successful("", data?.data);

        } catch (error) {
            response.Json.internalError(error)
        }
    }
}


export default new UserProductController();