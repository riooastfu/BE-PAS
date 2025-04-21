import { Sequelize } from "sequelize";
import { db_finpro } from "../config/database.js";

const { DataTypes } = Sequelize;

const AttLog = db_finpro.define('att_log', {
    sn: { // Serial Number (presumably of the device)
        type: DataTypes.STRING(30),
        allowNull: false, // 'Tidak' means No (not nullable)
        primaryKey: true, // Assuming 'sn' is the primary key based on the key icon
    },
    scan_date: { // Scan timestamp
        type: DataTypes.DATE, // 'datetime' maps to DataTypes.DATE (includes time)
        allowNull: false,
        // Note: If 'sn' + 'scan_date' is a composite key, adjust primaryKey settings
    },
    pin: { // User identifier (often Employee ID or specific PIN)
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    verifymode: { // Verification mode (e.g., fingerprint, card, PIN)
        type: DataTypes.INTEGER, // 'int(11)' maps to INTEGER
        allowNull: false,
        // defaultValue: 'Tidak ada' means no default is set in the DB
    },
    inoutmode: { // Check-in / Check-out mode
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value is 0
    },
    reserved: { // Reserved field
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value is 0
    },
    work_code: { // Work code identifier
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value is 0
    },
    att_id: { // Attendance record ID (perhaps custom or related ID)
        type: DataTypes.STRING(50), // Stored as VARCHAR
        allowNull: false,
        defaultValue: '0', // Default value is '0' (as string for VARCHAR)
    },
    coordinate: { // GPS Coordinates, if available
        type: DataTypes.STRING(255),
        allowNull: false,
        // defaultValue: 'Tidak ada' means no default is set in the DB
    },
    image: { // Path or identifier for captured image
        type: DataTypes.STRING(255),
        allowNull: false,
        // defaultValue: 'Tidak ada' means no default is set in the DB
    }
}, {
    freezeTableName: true,
    timestamps: false,
    charset: 'latin1',
    collate: 'latin1_swedish_ci'
});

export default AttLog;