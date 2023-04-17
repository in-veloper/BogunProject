import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const DiseaseItems = db.define('diseaseItems', {
    userId : {
        type : DataTypes.STRING
    },
    userName : {
        type : DataTypes.STRING
    },
    diseaseCategory : {
        type : DataTypes.STRING
    },
    diseaseText : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default DiseaseItems; 