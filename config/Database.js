import { Sequelize } from "sequelize";

export const db = new Sequelize('dummy_portal_prd', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})