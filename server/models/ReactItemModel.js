import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ReactItems = db.define('reactItems', {
    userId : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    reactText : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default ReactItems; 