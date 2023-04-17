import express from "express";
import cors from 'cors';

//import config
import { db, db_finpro } from "./config/Database.js";

//import models
// import Users from "./models/UserModel.js";

//import routes
import router from "./routes/index.js";

const app = express();

async () => {
    try {
        await db.authenticate();
        await db_finpro.authenticate();
        console.log("Database Connected...!");
        // await Users.sync();
    } catch (error) {
        console.log("Error: ", error);
    }
}

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8080, () => console.log("Server running at port 8080"));