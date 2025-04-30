import { db } from "../config/database.js";
import { Sequelize } from "sequelize";
import AuthRoleHt from "./AuthRoleHt.js";
import MasterLokasiAbsen from "./MasterLokasiAbsen.js";

const { DataTypes } = Sequelize;

const AuthMaps = db.define('auth_maps', {
    id_role: {
        type: DataTypes.INTEGER(11), // Ukuran dalam kurung opsional
        allowNull: false,
    },
    id_map: {
        type: DataTypes.INTEGER(11), // Ukuran dalam kurung opsional
        allowNull: false,
        unsigned: true, // Untuk properti UNSIGNED
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

AuthRoleHt.belongsToMany(MasterLokasiAbsen, {
    through: AuthMaps,
    foreignKey: 'id_role'
});

MasterLokasiAbsen.belongsToMany(AuthRoleHt, {
    through: AuthMaps,
    foreignKey: 'id_map'
});

export default AuthMaps;