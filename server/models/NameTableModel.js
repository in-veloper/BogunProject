import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const NameTable = db.define('nameTable', {
    userId  : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    grade : {
        type : DataTypes.STRING
    },
    html : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default NameTable;