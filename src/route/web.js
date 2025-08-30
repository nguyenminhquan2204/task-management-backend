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

   return app.use("/", router);
}

export default initWebRoutes;
