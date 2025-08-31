import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import projectController from '../controllers/projectController';

let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', (req, res) => {
      return res.render("home/index", {
         title: "Home Page",
         data: 'Hello world',
         day: '2025-04-22'
      });
   });

   router.get('/home', homeController.getHomePage);

   // API user
   router.post('/api/create-user', userController.postCreateUser);
   router.put('/api/edit-user', userController.putEditUser);
   router.get('/api/get-all-users', userController.getAllUsers);
   router.get('/api/get-user-by-id', userController.getUserById);
   router.delete('/api/delete-user-by-id', userController.deleteUser);
   router.get('/api/search-users-by-username', userController.getSearchUsersByUserName);

   // API login
   router.post('/api/login', userController.postLogin);
   router.post('/api/forgot-password', userController.postForgotPassword);
   router.post('/api/verify-forgot-password', userController.postVerifyForgotPassword);

   // API project
   router.post('/api/create-project', projectController.postCreateProject);
   router.put('/api/edit-project', projectController.putEditProject);
   router.patch('/api/update-status-project', projectController.patchUpdateStatusProject);
   router.get('/api/get-all-projects', projectController.getAllProjects);
   router.get('/api/get-project-by-id', projectController.getProjectById);
   router.delete('/api/delete-project-by-id', projectController.deleteProject);
   router.get('/api/search-projects-by-name', projectController.getSearchProjectsByName);

   return app.use("/", router);
}

export default initWebRoutes;