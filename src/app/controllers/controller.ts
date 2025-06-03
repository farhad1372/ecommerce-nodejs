
import { Request, Response } from 'express';

/**
 * Interface for standardized JSON response structure
 */
interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}

/**
 * BaseController provides common methods for all controllers
 * to handle HTTP responses and errors consistently.
 */
export default abstract class BaseController {
    /**
     * Sends a successful response with optional data
     * @param res - Express response object
     * @param data - Response data
     * @param message - Success message
     * @param status - HTTP status code (default: 200)
     */
    protected success<T>(res: Response, data: T, message: string = 'Success', status: number = 200): Response {
        const response: ApiResponse<T> = {
            success: true,
            message,
            data,
        };
        return res.status(status).json(response);
    }

    /**
     * Sends a created response for newly created resources
     * @param res - Express response object
     * @param data - Created resource data
     * @param message - Success message
     */
    protected created<T>(res: Response, data: T, message: string = 'Resource created'): Response {
        return this.success(res, data, message, 201);
    }

    /**
     * Sends an error response
     * @param res - Express response object
     * @param message - Error message
     * @param errors - Additional error details
     * @param status - HTTP status code (default: 500)
     */
    protected error(res: Response, message: string = 'Internal server error', errors: any = null, status: number = 500): Response {
        const response: ApiResponse = {
            success: false,
            message,
            errors,
        };
        return res.status(status).json(response);
    }

    /**
     * Sends a not found response
     * @param res - Express response object
     * @param message - Not found message
     */
    protected notFound(res: Response, message: string = 'Resource not found'): Response {
        return this.error(res, message, null, 404);
    }

    /**
     * Sends a validation error response
     * @param res - Express response object
     * @param errors - Validation error details
     */
    protected validationError(res: Response, errors: any, message: string = 'Validation failed'): Response {
        return this.error(res, message, errors, 400);
    }
}