
import { Request } from 'express';
import { z, ZodError } from 'zod';

type TValidationResponse = {
    fails: true;
    errors: any;
} | { fails: false, data: any };

const UserProductValidator = {


    show: (req: Request): TValidationResponse => {
        try {
            const idSchema = z.number({ required_error: 'ID is required', invalid_type_error: 'ID must be a number' });
            const validatedId = idSchema.parse(Number(req.params.id));
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

    showReviews: (req: Request): TValidationResponse => {
        try {
            const idSchema = z.number({ required_error: 'ID is required', invalid_type_error: 'ID must be a number' });
            const validatedId = idSchema.parse(Number(req.params.id));
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

    storeReviews: (req: Request): TValidationResponse => {
        try {
            //* ID => product_id

            const idSchema = z.number({ required_error: 'ID is required', invalid_type_error: 'ID must be a number' });
            idSchema.parse(Number(req.params.id));

            const createReviewBodySchema = z.object({
                full_name: z.string({ required_error: 'Full name is required' })
                    .min(3, 'Full name must be at least 3 characters')
                    .max(70, 'Full name must not exceed 70 characters'),
                rate: z.number({ required_error: 'Rate is required' })
                    .int('Rate must be an integer')
                    .min(1, 'Rate must be at least 1')
                    .max(5, 'Rate must not exceed 5'),
                content: z.string({ required_error: 'Content is required' })
                    .min(5, 'Content must be at least 5 characters')
                    .max(500, 'Content must not exceed 500 characters'),
            });

            const validatedBodySchema = createReviewBodySchema.parse({ ...req.body, rate: Number(req.body.rate) });

            return {
                fails: false,
                data: validatedBodySchema
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

export default UserProductValidator