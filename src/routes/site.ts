import { Application, Router } from "express";
import BaseController from "@controllers/controller";
import TestController from "@controllers/TestController.js";
import UserProductController from "@controllers/product/UserProduct.controller.js";
import UserProductReviewController from "@controllers/product/UserProductReview.controller.js";
import UserProductSummaryController from "@controllers/product/UserProductSummary.controller.js";


const SiteRoutes = (app: Application, express: any) => {
    const Router = express.Router();

    //* Passport
    // Router.use(UserPassport.initialize());
    // Router.use(UserPassport.session());


    //* Products
    Router.get("/products/:id", UserProductController.show);

    //* Products-Reviews
    Router.get("/products/:id/reviews", UserProductReviewController.show);
    Router.post("/products/:id/reviews", UserProductReviewController.store);

    //* Summary
    Router.post("/ai/summary", UserProductSummaryController.index);





    //* not found user api.
    // Router.all("/*", BaseController.notFound);

    //* Apply Router
    app.use('/api/site', Router);
}

export default SiteRoutes
