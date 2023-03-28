import { Sequelize } from "sequelize";

export const db = new Sequelize('portal_prd', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export const db_finpro = new Sequelize('fin_pro', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})