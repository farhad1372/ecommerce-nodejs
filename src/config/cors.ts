

export default {
    whitelist: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',

        "http://user.ahooracrm.site",
        "https://user.ahooracrm.site",


        "http://admin.ahooracrm.site",
        "https://admin.ahooracrm.site",


    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept', 'X-Password-Confirmation']
}