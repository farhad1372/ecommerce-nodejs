import { Application } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import debug from 'debug';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import corsConfig from '../config/cors.js';
import cookieSession from 'cookie-session';
import timeout from 'connect-timeout';
import appConfig from '@config/app.js';
import ServerTimedOut from '@middleware/serverTimeout.js';
import Trimmer from '@middleware/trimmer.js';
import { rateLimit } from 'express-rate-limit'
// import dotenv from 'dotenv';
// dotenv.config();
debug('web:server');

export default function (app: Application, express: any) {

    app.use(helmet());
    const whitelist = corsConfig.whitelist;
    const corsOptions = {
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
            if (origin && whitelist.indexOf(origin) !== -1) callback(null, true);
            else callback(null, false);
        },
        methods: corsConfig.methods,
        optionsSuccessStatus: corsConfig.optionsSuccessStatus,
        credentials: corsConfig.credentials,
        allowedHeaders: corsConfig.allowedHeaders
    };

    app.use(cors(corsOptions));

    app.use(cookieSession({
        secret: "asdasda12312",
        secure: false,
        secureProxy: true,
        maxAge: 1000000,
        sameSite: "none"
    }));

    app.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false; // don't compress responses if this request header is present
            }
            return compression.filter(req, res); // fallback to standard compression
        },
    }));

    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json({
        limit: '50mb'
    }));
    app.use(cookieParser());
    app.use(morgan('combined'));


    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    });
    app.use(limiter)



    //* 1.timeout middleware
    app.use(timeout(appConfig.server_timeout_in_sec)); // sec
    app.use(ServerTimedOut);

    //* 2.trimmer middleware
    app.use(Trimmer);
}
