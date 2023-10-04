import express from "express";
import cors from 'cors';

//package agar file dari folder be bisa diakses
import path from 'path';
import { fileURLToPath } from "url";

//import config
import { db, db_finpro } from "./config/Database.js";

//import models
// import Users from "./models/UserModel.js";

//import routes
import router from "./routes/index.js";

const app = express();


const __filename = fileURLToPath(import.meta.url); //Setting up the config so we can access file through be
const __dirname = path.dirname(__filename);

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
// try {
//     await db.authenticate();
//     await db_finpro.authenticate();
//     console.log('Database Connected...!');

//     // await Users.sync(); //Mengecek apakah table ada, jika tidak sequelize otomatis mengcreate table
// } catch (error) {
//     console.error("Error: ", error);
// }

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.listen(8080, () => console.log("Server running at port 8080"));