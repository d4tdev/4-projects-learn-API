import dbTask from '../app/models/Task';
import { createCustomError } from '../config/errors/customError';

let getAllTask = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let tasks = await dbTask.find({});
			console.log(tasks);
			resolve({
				statusId: 200,
				msg: 'Get successfully!!!',
				data: tasks,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let createTask = dataInput => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!dataInput) {
				reject(createCustomError('Missing parameters!!!', 500));
			} else {
				let task = await dbTask.create(dataInput);
				resolve({
					statusId: 200,
					msg: 'Create successfully!!!',
					data: task,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getOneTask = id => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!id) {
				reject(createCustomError('Missing parameters!!!', 500));
			} else {
				let task = await dbTask.findById(id);
				if (!task) {
					reject(createCustomError(`Task not found with id: ${id}`, 404));
				} else {
					resolve({
						statusId: 200,
						msg: 'Get one task successfully!!!',
						data: task,
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

let deleteOneTask = id => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!id) {
				reject(createCustomError('Missing parameters!!!', 500));
			} else {
				let task = await dbTask.findByIdAndDelete(id);
				if (!task) {
					reject(createCustomError('Task not found!!!', 404));
				} else {
					resolve({
						statusId: 200,
						msg: 'Delete one task successfully!!!',
						data: task,
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

let updateOneTask = (id, dataInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!id || !dataInput) {
				reject(createCustomError('Missing parameters!!!', 500));
			} else {
				let task = await dbTask.findByIdAndUpdate(id, dataInput);
				if (!task) {
					reject(createCustomError('Task not found!!!', 404));
				} else {
					resolve({
						statusId: 200,
						msg: 'Update one task successfully!!!',
						data: task,
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

export default {
	getAllTask,
	createTask,
	getOneTask,
	deleteOneTask,
	updateOneTask,
};
