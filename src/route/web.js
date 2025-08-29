import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', (req, res) => {
      return res.send("Hello World");
   });

   router.get('/home', homeController.getHomePage);

   return app.use("/", router);
}

export default initWebRoutes;
