import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'must provide name'],
			trim: true,
			maxlength: [255, 'name can not be more than 255 characters'],
		},
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.model('Task', TaskSchema);
