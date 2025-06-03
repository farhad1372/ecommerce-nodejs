import Controller from '@to:path:controller.js';
import { Request, Response } from 'express';
import Validator from '@services/validator/index.js';
import Model from '@m-p/Model.js';

class Example extends Controller {
	async index(request: Request, response: Response) {
		try {
			// const models = await super.paginate(request, Model, { searchableFields: [] });
			// return response.Json.pagination(models);
		} catch (e) {
			return response.Json.internalError(e);
		}
	}

	async show(request: Request, response: Response) {
		try {
			// const validator = new Validator(request);
			// validator.param("id").required().numeric();
			// if (validator.fails()) return response.Json.validationError(validator.errors());
			// const model = await Model.findByPk(request.params.id);
			// if (!model) return response.Json.notFound();
			// return response.Json.successful("", model)
		} catch (e) {
			return response.Json.internalError(e);
		}
	}

	async create(request: Request, response: Response) {
		try {
			// const {
			//  //*inputs
			//  } = request.body;
			// const validator = new Validator(request);
			//*validate-request
			// if (validator.fails()) return response.Json.validationError(validator.errors());
			// const model = await Model.create({
			// //*model-inputs
			// });
			// if (!model) return response.Json.error();
			// return response.Json.created(model);
		} catch (e) {
			return response.Json.internalError(e);
		}
	}

	async update(request: Request, response: Response) {
		try {
			// const {
			//  //*inputs
			//  } = request.body;

			// const model = await Model.findByPk(request.params.id);
			// if (!model) return response.Json.notFound();

			// const validator = new Validator(request);
			// validator.param("id").required().numeric();
			//*validate-request
			// if (validator.fails()) return response.Json.validationError(validator.errors());

			// const updated = await model.update({
			// //*model-inputs
			// });
            
			// if (!updated) return response.Json.error();
			// return response.Json.updated()
		} catch (e) {
			return response.Json.internalError(e);
		}
	}

	async delete(request: Request, response: Response) {
		try {
			// const validator = new Validator(request);
			// validator.param("id").required().numeric();
			// if (validator.fails()) return response.Json.validationError(validator.errors());

			// const model = await Model.findByPk(request.params.id);
			// if (!model) return response.Json.notFound();
            
			// await model.destroy();
			// return response.Json.deleted();
		} catch (e) {
			return response.Json.internalError(e);
		}
	}
}

export default new Example();
