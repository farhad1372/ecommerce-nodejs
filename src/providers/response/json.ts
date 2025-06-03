import AppConfig from "@config/app.js";
import { Response } from "express";
type TPaginationParams = {
	order: any[],
	limit: number,
	offset: number
}

export interface IJsonResponse {
	unauthorized(message?: string): Response;
	validationError(errors: object | Array<object>, message?: string): Response;
	created(model?: object | Array<object>, message?: string): Response;
	deleted(message?: string): Response;
	successful(message?: string, data?: object | Array<any>): Response;
	updated(message?: string, data?: object | Array<any>): Response;
	forbidden(message?: string): Response;
	error(message?: string | { code?: number, message: string }, code?: number): Response;
	notFound(message?: string): Response;
	pagination(data: any, extraData?: any): Response
	alert(msg: string, status?: number): Response
	internalError(msg?: any): Response

}


class JsonResponse implements IJsonResponse {
	private $response: Response;

	constructor(res: Response) {
		this.$response = res;
	}

	unauthorized(message = "") {
		return this.$response.status(401).json({ message });
	}

	validationError(errors: object | Array<object>, message?: string) {
		return this.$response.status(422).json({ errors, message: message || "Please check inputs" });
	}

	created(model?: object | Array<object>, message?: string) {
		return this.$response.status(201).json({ data: model, message: message || "Successfully created" });
	}

	successful(message?: string, data?: object | Array<any>) {
		return this.$response.status(200).send({ message, data });
	}

	updated(message?: string, data?: object | Array<any>) {
		return this.$response.status(200).send({ message: message || "Successfully updated", data });
	}

	forbidden(message?: string) {
		return this.$response.status(403).send({ message: message || "forbidden" });
	}

	error(message?: string | { [key: string]: any }, code = 400) {
		if (typeof message === "object")
			return this.$response.status(code).send(message);
		else
			return this.$response.status(code).send({ message: message || "An error occurred, please try again later" });
	}

	notFound(message?: string) {
		return this.$response.status(404).send({ message: message || "Resource not found" });
	}

	deleted(message?: string) {
		return this.$response.status(200).send({ message: message || "Successfully deleted" });
	}

	send(data: any) {
		return this.$response.status(200).send({ data });
	}

	pagination(data: any, extraData?: any) {
		let result = data;
		if (extraData) result = { ...data, extraData }
		return this.$response.status(200).send({ data: result });
	}

	internalError(msg?: any) {
		//* check if config debug is true.
		return this.$response.status(500).send({ message: "An error occurred, please try again later", reason: AppConfig.appDebug ? msg : null });
	}


	alert(msg: string, status = 400) {
		return this.$response.status(status).send({ alert: msg });
	}

}

export default JsonResponse;