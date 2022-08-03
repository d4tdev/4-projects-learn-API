import taskService from '../../services/taskService';
import asyncWrapper from '../middleware/async'; //middleware for async/await try/catch error handling

class TaskController {
	handleGetAllTasks = asyncWrapper(async (req, res) => {
		let response = await taskService.getAllTask();
		return res.status(200).json(response);
	});

	handleCreateTask = asyncWrapper(async (req, res) => {
		let response = await taskService.createTask(req.body);
		return res.status(200).json(response);
	});

	handleGetOneTask = asyncWrapper(async (req, res) => {
		let id = req.params.id;
		let response = await taskService.getOneTask(id);
		return res.status(200).json(response);
	});

	handleDeleteOneTask = asyncWrapper(async (req, res) => {
		let id = req.params.id;
		let response = await taskService.deleteOneTask(id);
		return res.status(200).json(response);
	});

	handleUpdateOneTask = asyncWrapper(async (req, res) => {
		let id = req.params.id;
		let response = await taskService.updateOneTask(id, req.body, {
			new: true,
			// runValidators: true,
		});
		return res.status(200).json(response);
	});
}

export default new TaskController();
