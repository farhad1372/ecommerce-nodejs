import { Request, Response } from "express";
import BaseController from "../controller.js";
import UserProductValidator from "@validators/product/user.js";



class UserProductReviewController extends BaseController {

    public async show(request: Request, response: Response) {
        try {


            const { id } = request.params;
            const { page, limit } = request.query;

            const _page = page ? parseInt(page as string) : 1;
            const _limit = limit ? parseInt(limit as string) : 10;
            const _start = (_page - 1) * _limit;
            const _end = _start + _limit - 1;

            const validation = UserProductValidator.showReviews(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            const data = await request.app.get('supabase')
                .from('reviews')
                .select('*', { count: 'exact' })
                .eq('product_id', id)
                .eq('status', 'approve')
                .range(_start, _end)
                .order('id', { ascending: false });


            if (data?.error) return response.Json.internalError(data?.error);
            return response.Json.successful("", data);
        } catch (e) {
            console.log("E", e);
            response.Json.internalError(e);
        }
    }


    public async store(request: Request, response: Response) {
        try {
            const { id } = request.params; //* product_id
            const { full_name, rate, content } = request.body;

            const validation = UserProductValidator.storeReviews(request);
            if (validation.fails) return response.Json.validationError(validation.errors);

            console.log("here is !!!", {
                full_name,
                product_id: parseInt(id),
                rate,
                content,
            })
            const data = await request.app.get('supabase')
                .from('reviews')
                .insert({
                    full_name,
                    product_id: parseInt(id),
                    rate,
                    content,
                    status: "pending"
                })
                .select('*')
                .single();

            console.log("data", data);
            if (data?.error) return response.Json.internalError(data?.error);
            return response.Json.successful("", data);

        } catch (e) {
            console.log("E", e);
            response.Json.internalError(e);
        }
    }



}


export default new UserProductReviewController();