import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Calendars = db.define('calendars', {
    userId : {
        type : DataTypes.STRING
    },
    selectedDate : {
        type : DataTypes.STRING
    },
    endDate : {
        type : DataTypes.STRING
    },
    selectedColor : {
        type : DataTypes.STRING
    },
    todo : {
        type : DataTypes.STRING
    },
    todos : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default Calendars;