import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Students = db.define('students', {
    school : {
        type : DataTypes.STRING
    },
    grade : {
        type : DataTypes.STRING
    },
    classNumber : {
        type : DataTypes.STRING
    },
    name : {
        type : DataTypes.STRING
    },
    testDate : {
        type : DataTypes.STRING
    },
    testName : {
        type : DataTypes.STRING
    },
    testInstitute : {
        type : DataTypes.STRING
    }
})