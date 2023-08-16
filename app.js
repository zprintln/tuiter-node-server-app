import express from 'express';      // import new server session library
import session from "express-session";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import cors from 'cors';        //import Cross Origin Resource Sharing library
import "dotenv/config";        //import dotenv library to read .env file
import mongoose from "mongoose"; //import mongoose library to connect to MongoDB

//connect to MongoDB
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);



const app = express();
app.use(
    cors({
        credentials: true,                // support cookies
        //origin: "http://localhost:3000",  // restrict cross origin resource sharing to the react application // URL for development
        origin: process.env.FRONTEND_URL  //URL for production 
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
const port = process.env.PORT || 4000;


TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);


app.listen(process.env.PORT || 4000);