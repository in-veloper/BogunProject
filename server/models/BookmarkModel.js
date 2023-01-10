import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Bookmarks = db.define('bookmarks', {
    bookmarkName : {
        type : DataTypes.STRING
    },
    bookmarkAddress : {
        type : DataTypes.STRING
    }
},{
    freezeTableName : true
});

(async () => {
    await db.sync();
})();

export default Bookmarks;