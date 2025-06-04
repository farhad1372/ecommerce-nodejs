
import { Request } from 'express';
import { z, ZodError } from 'zod';

type TValidationResponse = {
    fails: true;
    errors: any;
} | { fails: false, data: any };

const UserSummaryValidator = {


    show: (req: Request): TValidationResponse => {
        try {

            const summarySchema = z.object({
                section: z.enum(['product_info', 'reviews'], { required_error: 'Section is required and must be one of product_info or reviews' }),
                product_id: z.number({ required_error: 'PRODUCT_ID is required', invalid_type_error: 'PRODUCT_ID must be a number' })
            });

            const validatedId = summarySchema.parse({ product_id: Number(req.body.product_id), section: req.body.section });

            return {
                fails: false,
                data: validatedId
            }

        } catch (e) {
            if (e instanceof ZodError) {
                const formattedErrors = e.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {} as Record<string, string>);
                return {
                    fails: true,
                    errors: formattedErrors
                }
            }
            return {
                fails: true,
                errors: e as any
            }
        }
    },



}

export default UserSummaryValidator