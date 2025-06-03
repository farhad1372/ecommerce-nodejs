import { Application } from "express";
import JsonResponse from "./json.js"
import FileResponse from "./file.js";
import ViewResponseProvider from "./view.js";

export function ExtendResponse(app: Application) {
    app.use((req, res, next) => {
        const _jsonResponse = new JsonResponse(res);
        const __fileResponse = new FileResponse(res);
        const _ViewResponseProvider = new ViewResponseProvider(res);

        res.View = _ViewResponseProvider;
        res.Json = _jsonResponse;
        res.File = __fileResponse;
        next();
    })
}