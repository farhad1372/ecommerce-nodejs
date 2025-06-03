import { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import dotenv from 'dotenv'
dotenv.config();
// must be last app.use();
export const errorHandler = function (app: Application) {

    app.use(function (req: Request, res: Response, next: NextFunction) {
        next(createError(404));
    });

    app.use(function (err: any, req: Request, res: Response, next: NextFunction): void {
        // set locals, only providing error in development
        const error = process.env.APP_DEBUG === 'true' ? err : {};
        if (req.is('application/json')) {
            res.status(err.status || 500).send(error)
        } else {
            res.locals.message = err.message;
            res.locals.error = error;
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        }

    });
};
