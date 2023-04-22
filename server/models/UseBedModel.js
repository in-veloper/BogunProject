import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UseBed = db.define('usebed', {
    userId : {
        type: DataTypes.STRING 
    },
    userName : {
        type : DataTypes.STRING
    },
    schoolName : {
        type : DataTypes.STRING
    },
    targetStudent : {
        type : DataTypes.STRING
    },
    bedStartTime : {
        type : DataTypes.STRING
    },
    bedEndTime : {
        type : DataTypes.STRING
    },
    registDate : {
        type : DataTypes.STRING
    },
    bedNumber : {
        type : DataTypes.STRING
    },
    useStatus : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default UseBed;