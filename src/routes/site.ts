import { Application, Router } from "express";
import BaseController from "@controllers/controller";
import TestController from "@controllers/TestController.js";
import UserProductController from "@controllers/product/UserProductController.js";


const SiteRoutes = (app: Application, express: any) => {
    const Router = express.Router();

    //* Passport
    // Router.use(UserPassport.initialize());
    // Router.use(UserPassport.session());



    Router.get("/products/:id", UserProductController.show);
    Router.get("/products/:id/reviews", UserProductController.reviews);
    Router.post("/products/:id/reviews", UserProductController.storeReview);





    //* not found user api.
    // Router.all("/*", BaseController.notFound);

    //* Apply Router
    app.use('/api/site', Router);
}

export default SiteRoutes
