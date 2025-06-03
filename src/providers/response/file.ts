import appRootPath from "app-root-path";
import { Response } from "express";
import path from "path";



export interface IFileResponse {
    download(filePath: string, options?: { storage?: "public" | "private" }): void;
}


class FileResponse implements IFileResponse {
    private $response: Response;

    constructor(res: Response) {
        this.$response = res;
    }

    download(filePath: string, options?: { storage?: "public" }): void {
        const STORAGE = options?.storage || "public";
        let full_path: string;
        if (STORAGE === "public") full_path = path.join(appRootPath.path.toString(), "public", filePath);
        else full_path = path.join(appRootPath.path.toString(), filePath)
        console.log({ full_path })
        return this.$response.download(full_path);
    }
}

export default FileResponse;