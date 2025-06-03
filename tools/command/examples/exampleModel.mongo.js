import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IExample extends mongoose.Document {
	name: string;
}

export const ExampleSchema = new mongoose.Schema({
	name: {
		type: String,
		default: null,
	},
}, {
	timestamps: true
});


ExampleSchema.plugin(paginate);
const Example = mongoose.model<IExample, mongoose.PaginateModel<IExample>>('Examples', ExampleSchema);

export default Example;
