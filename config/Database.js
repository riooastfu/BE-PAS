import { Sequelize } from "sequelize";

export const db = new Sequelize('portal_prd', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})