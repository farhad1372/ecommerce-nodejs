import appRootPath from "app-root-path";
import { Response } from "express";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

type TSendOptions = {
    isFullPath?: boolean,
    unsafe_script_inline?: boolean
}

type THtmlData = { [key: string]: any }

export interface IViewResponseProvider {
    send(filePath: string, htmlData?: THtmlData, sendOptions?: TSendOptions): void;
    sendWithLayout(layoutPath: string, filePath: string, htmlData?: THtmlData, sendOptions?: TSendOptions): void;
}


class ViewResponseProvider implements IViewResponseProvider {
    private $response: Response;
    private $base_views_path: string = path.join(appRootPath.path.toString(), "resources", "views");

    constructor(res: Response) {
        this.$response = res;
    }


    private getFullPath(filePath: string, isFullPath?: boolean): string {
        if (isFullPath) {
            return path.join(appRootPath.path.toString(), filePath);
        } else {
            return path.join(this.$base_views_path, filePath);
        }
    }

    sendWithLayout(layoutPath: string, contentPath: string, HtmlData: THtmlData, options: TSendOptions = {}): void {
        // Read layout file
        const layoutFullPath = this.getFullPath(layoutPath, options.isFullPath);
        const layoutHtml = fs.readFileSync(layoutFullPath, { encoding: "utf-8" });

        // Register the "Content" partial (for the dynamic content in the layout)
        const contentFullPath = this.getFullPath(contentPath, options.isFullPath);
        const contentHtml = fs.readFileSync(contentFullPath, { encoding: "utf-8" });
        handlebars.registerPartial("Content", contentHtml);

        // Compile layout and insert dynamic data
        const layoutTemplate = handlebars.compile(layoutHtml);
        const htmlToSend = layoutTemplate(HtmlData);

        this.$response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        if (options?.unsafe_script_inline)
            this.$response.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline';");

        // Send response
        this.$response.send(htmlToSend);
    }



    send(filePath: string, HtmlData: THtmlData, options: TSendOptions): void {
        //* isFullPath => used for private storages to prevent add public folder in path.
        let full_path: string;

        if (options?.isFullPath) full_path = path.join(appRootPath.path.toString(), filePath);
        else full_path = path.join(appRootPath.path.toString(), "resources", "views", filePath);

        const _html = fs.readFileSync(full_path, { encoding: 'utf-8' });

        //* Compile & Send
        var template = handlebars.compile(_html);
        var htmlToSend: any = template(HtmlData);

        this.$response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        if (options?.unsafe_script_inline)
            this.$response.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline';");

        return this.$response.send(htmlToSend) as any;
    }
}

export default ViewResponseProvider;