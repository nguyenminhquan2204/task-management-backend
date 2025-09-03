import express from 'express';
import controller from '../controllers/projectController';

let router = express.Router();

router.post('/create-project', controller.postCreateProject);

router.put('/edit-project', controller.putEditProject);

router.patch('/update-status-project', controller.patchUpdateStatusProject);

router.get('/get-all-projects', controller.getAllProjects);

router.get('/get-project-by-id', controller.getProjectById);

router.delete('/delete-project-by-id', controller.deleteProject);

router.get('/search-projects-by-name-status', controller.getSearchProjectsByName);

module.exports = router;