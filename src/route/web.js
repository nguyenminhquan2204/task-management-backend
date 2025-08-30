import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', (req, res) => {
      return res.send("Hello World");
   });

   router.get('/home', homeController.getHomePage);

   // API user
   router.post('/api/create-user', userController.postCreateUser);
   router.put('/api/edit-user', userController.putEditUser);
   router.get('/api/get-all-users', userController.getAllUsers);
   router.get('/api/get-user-by-id', userController.getUserById);
   router.delete('/api/delete-user-by-id', userController.deleteUser);

   // API login
   router.post('/api/login', userController.postLogin);
   router.post('/api/forgot-password', userController.postForgotPassword);
   router.post('/api/verify-forgot-password', userController.postVerifyForgotPassword);

   return app.use("/", router);
}

export default initWebRoutes;
