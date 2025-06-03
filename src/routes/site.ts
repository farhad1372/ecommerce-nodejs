import BaseController from "@controllers/controller";
import TestController from "@controllers/TestController.js";
import { Application, Router } from "express";


const SiteRoutes = (app: Application, express: any) => {
    const Router = express.Router();

    //* Passport
    // Router.use(UserPassport.initialize());
    // Router.use(UserPassport.session());



    Router.get("/products/:id", TestController.show);



    //* not found user api.
    // Router.all("/*", BaseController.notFound);

    //* Apply Router
    app.use('/api/site', Router);
}

export default SiteRoutes
