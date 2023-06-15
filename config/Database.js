import { Sequelize } from "sequelize";
import * as tedious from "tedious";

export const db = new Sequelize('portal_prd', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export const db_finpro = new Sequelize('fin_pro', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export const db_cusg = new Sequelize('CUSG', 'portaldb', 'pas7892020', {
    host: "10.131.1.9",
    dialect: "mssql",
    dialectModule: tedious,
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
})
