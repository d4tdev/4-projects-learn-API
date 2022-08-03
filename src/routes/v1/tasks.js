import express from 'express';
import taskManager from '../../app/controllers/TaskController';
const router = express.Router();


// router.get('/',taskManager.handleGetAllTasks);
// router.post('/',taskManager.handleCreateTask);
// thay cho cái trên (ngắn gọn hơn)
router
	.route('/')
	.get(taskManager.handleGetAllTasks)
	.post(taskManager.handleCreateTask);
router
	.route('/:id')
	.get(taskManager.handleGetOneTask)
	.delete(taskManager.handleDeleteOneTask)
   .put(taskManager.handleUpdateOneTask);

   export default router;