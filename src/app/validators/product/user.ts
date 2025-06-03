
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

    showPreviews: (req: Request): TValidationResponse => {
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

}

export default UserProductValidator