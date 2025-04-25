import { DataTypes } from 'sequelize';
import { db } from '../config/database.js';
import Users from './Users.js';

const RefreshToken = db.define('refresh_tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    karyawanid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Definisikan relasi dengan Users
RefreshToken.belongsTo(Users, { foreignKey: 'karyawanid' });
Users.hasMany(RefreshToken, { foreignKey: 'karyawanid' });

export default RefreshToken;