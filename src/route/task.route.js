import express from 'express';
import controller from '../controllers/taskController';

let router = express.Router();

router.post('/create-task', controller.postCreateTask);

router.get('/get-all-tasks', controller.getAllTasks);

router.get('/get-task-by-id-or-assigntedTo', controller.getTaskByIdOrAssigntedTo);

router.get('/get-task-by-projectId', controller.getAllTaskByProjectId);

router.delete('/delete-task-by-id', controller.deleteTaskById);

router.get('/search-tasks-by-title-status', controller.getSearchTaskByTitleStatus);

router.patch('/change-status-task-by-id', controller.patchChangeStatusTaskById);

module.exports = router;
