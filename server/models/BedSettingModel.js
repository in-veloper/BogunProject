import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const BedCount = db.define('bedCount', {
    userId : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    bedCount : {
        type : DataTypes.INTEGER
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default BedCount; 