import { Request } from 'express';
import { z, ZodError } from 'zod';

type TValidationResponse = {
  fails: true;
  errors: any;
} | { fails: false, data: any };

const UserCommentValidator = {


  create: (req: Request): TValidationResponse => {
    try {
      const createProductSchema = z.object({
        name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' })
          .min(3, 'Name must be at least 3 characters')
          .max(100, 'Name must not exceed 100 characters'),
        price: z.number({ required_error: 'Price is required', invalid_type_error: 'Price must be a number' })
          .positive('Price must be positive'),
        image: z.string({ invalid_type_error: 'Image must be a string' })
          .url('Image must be a valid URL')
          .optional(),
      });

      const validatedData = createProductSchema.parse(req.params);
      return {
        fails: false,
        data: validatedData
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
  }

}

export default UserCommentValidator