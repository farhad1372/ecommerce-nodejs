import { Request, Response } from "express";
import BaseController from "../controller.js";
import UserSummaryValidator from "@validators/summary/user.js";
import { OpenAIService } from "@services/openai.service.js";



class UserProductSummaryController extends BaseController {

    public async index(request: Request, response: Response) {
        try {

            const { product_id, section } = request.query;

            //* Validation
            const validation = UserSummaryValidator.show(request);
            if (validation.fails) return response.Json.validationError(validation.errors);


            //* Find Product
            const data = await request.app.get('supabase')
                .from('products')
                .select(`*, attributes!product_attributes_product_id_fkey ( id, value, type), product_attributes!product_attributes_product_id_fkey1 ( id, attribute_ids, price)`)
                .eq('id', product_id)
                .single();

            if (data?.error) return response.Json.internalError(data?.error);

            // return response.Json.successful(data?.data);
            const openai_service = new OpenAIService();

            switch (section) {
                case "product_info":
                    const summary = await openai_service.summarizeText(data?.data);
                    if (summary.fails) return response.Json.internalError(summary.message);
                    return response.Json.successful(summary?.message);
                    break;

                case "reviews":
                    const reviews = await request.app.get('supabase')
                        .from('reviews')
                        .select('*')
                        .eq('product_id', product_id);

                    if (reviews?.error) return response.Json.internalError(reviews.error);
                    if (!reviews?.data || !Array.isArray(reviews?.data) || reviews?.data.length === 0) return response.Json.successful("No Comments set yet");

                    // return response.Json.successful("", reviews?.data);
                    const analyze_reviews = await openai_service.analyzeReviews(reviews?.data);
                    if (analyze_reviews.fails) return response.Json.internalError(analyze_reviews.message);
                    return response.Json.successful(analyze_reviews?.message);
                    break;

                default:
                    return response.Json.internalError();
                    break;
            }

            //! Should never reach!
            return response.Json.internalError();

        } catch (e) {
            response.Json.internalError(e);
        }
    }

}


export default new UserProductSummaryController();