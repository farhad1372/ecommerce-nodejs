import { Request, Response } from "express";
import BaseController from "../controller.js";
import UserProductValidator from "@validators/product/user.js";


class UserProductController extends BaseController {


    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const validation = UserProductValidator.show(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            const data = await request.app.get('supabase')
                .from('products')
                .select(`*, product_attributes (id, type, value)`)
                .eq('id', id)
                .single();

            if (data?.error) return response.Json.internalError(data?.error);

            return response.Json.successful("", data?.data);

        } catch (error) {
            response.Json.internalError(error)
        }
    }

    public async reviews(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { page, limit } = request.query;

            const _page = page ? parseInt(page as string) : 1;
            const _limit = limit ? parseInt(limit as string) : 10;
            const _start = (_page - 1) * _limit;
            const _end = _start + _limit - 1;

            const validation = UserProductValidator.showPreviews(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            const data = await request.app.get('supabase')
                .from('reviews')
                .select('*', { count: 'exact' })
                .eq('product_id', id)
                .range(_start, _end)
                .order('id', { ascending: false });

            if (data?.error) return response.Json.internalError(data?.error);
            return response.Json.successful("", data);
        } catch (e) {
            response.Json.internalError(e);
        }
    }


    public async storeReview(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { page, limit } = request.query;

            const _page = page ? parseInt(page as string) : 1;
            const _limit = limit ? parseInt(limit as string) : 10;
            const _start = (_page - 1) * _limit;
            const _end = _start + _limit - 1;

            const validation = UserProductValidator.showPreviews(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            const data = await request.app.get('supabase')
                .from('reviews')
                .select('*', { count: 'exact' })
                .eq('product_id', id)
                .range(_start, _end)
                .order('id', { ascending: false });

            if (data?.error) return response.Json.internalError(data?.error);
            return response.Json.successful("", data);
        } catch (e) {
            response.Json.internalError(e);
        }
    }



}


export default new UserProductController();