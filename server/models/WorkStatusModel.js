import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WorkStatus = db.define('workStatus', {
    userId : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    schoolName : {
        type : DataTypes.STRING
    },
    currentWorkStatus : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default WorkStatus;