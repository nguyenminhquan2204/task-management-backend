import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
// import initWebRoutes from "./route/web";
import initRoutes from "./route/index.route";
import connectDB from "./config/connectDB";
// import authMiddleware from '../src/middlewares/client/auth.middleware';

require('dotenv').config();

let app = express();
// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(cookieParser());

viewEngine(app);

// Config router
// app.use(authMiddleware.requiredAuth)
// initWebRoutes(app);
initRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
   console.log("Backend is running on the port: " + port);
})