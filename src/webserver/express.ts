import { Application } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import debug from 'debug';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import dotenv from 'dotenv';
import corsConfig from '../config/cors.js';
import cookieSession from 'cookie-session';
import timeout from 'connect-timeout';
import appConfig from '@config/app.js';
import ServerTimedOut from '@middleware/serverTimeout.js';
import Trimmer from '@middleware/trimmer.js';
debug('web:server');
// dotenv.config();

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


    // cookie session, also used for Google-Auth
    // app.use(Session({
    // 	secret: asdhqpnv123102u!!!!v$%^^cbjasdho344234",
    // 	resave: false,
    // 	saveUninitialized: false,
    // 	proxy: true,  // this is optional it depend which server you host, i am not sure about Heroku if you need it or not
    // 	cookie: {
    // 		secure: "auto",  // this will set to false on developement, but true on Heroku since is https so this setting is required
    // 		maxAge: 10000, // 10 sec for testing
    // 		sameSite: "none", //by default in developement this is false if you're in developement mode
    // 		httpOnly: false,
    // 	},
    // }))

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



    //* 1.timeout middleware
    app.use(timeout(appConfig.server_timeout_in_sec)); // sec
    app.use(ServerTimedOut);

    //* 2.trimmer middleware
    app.use(Trimmer);
}
