import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WorkNote = db.define('worknote', {
    userId : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    schoolName : {
        type : DataTypes.STRING
    },
    grade : {
        type : DataTypes.STRING
    },
    classNum : {
        type : DataTypes.STRING
    },
    num : {
        type : DataTypes.STRING
    },
    gender : {
        type : DataTypes.STRING
    },
    studentName : {
        type : DataTypes.STRING
    },
    disease : {
        type : DataTypes.STRING
    },
    treat : {
        type : DataTypes.STRING
    },
    medicine : {
        type : DataTypes.STRING
    },
    reactThing : {
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
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default WorkNote;