import WorkNote from "../models/WorkNoteModel.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

export const getWorkNote = async(req, res) => {
    const { userId, userName, schoolName, grade, classNum, num, gender, studentName, registDate } = req.query;

    try {
        const workNotes = await WorkNote.findAll({
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName,
                grade : grade,
                classNum : classNum,
                num : num,
                gender : gender,
                studentName : studentName,
                registDate : registDate
            }
        });

        res.json(workNotes);

    } catch (error) {
        console.log(error);
    }
}

export const getTargetWorkNote = async(req, res) => {
    const { schoolName, grade, classNum, num, gender, studentName } = req.query;

    try {
        const targetWorkNotes = await WorkNote.findAll({
            where : {
                schoolName : schoolName,
                grade : grade,
                classNum : classNum,
                num : num,
                gender : gender,
                studentName : studentName
            }
        });

        res.json(targetWorkNotes);
        
    } catch (error) {
        console.log(error);
    }
}

export const getDayWorkNote = async(req, res) => {
    const { userId, userName, schoolName, registDate } = req.query;
    
    try {
        const dayWorkNotes = await WorkNote.findAll({
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName,
                registDate : registDate
            }
        });

        res.json(dayWorkNotes);
        
    } catch (error) {
        console.log(error);
    }
}

export const setWorkNote = async(req, res) => {
    const { userId, userName, schoolName, grade, classNum, num, gender, studentName, disease, treat, medicine, reactThing, bedStartTime, bedEndTime, registDate } = req.body;

    try {
        await WorkNote.create({
            userId : userId,
            userName : userName,
            schoolName : schoolName,
            grade : grade,
            classNum: classNum,
            num : num,
            gender: gender,
            studentName : studentName,
            disease : disease,
            treat : treat,
            medicine : medicine,
            reactThing : reactThing,
            bedStartTime : bedStartTime,
            bedEndTime : bedEndTime,
            registDate : registDate
        });

        res.json({ msg : "Set WorkNote Successful" });

    } catch (error) {
        console.log(error);
    }
}

export const updateWorkNote = async(req, res) => {
    const {userId, userName, schoolName, grade, classNum, num, gender, studentName, disease, treat, medicine, reactThing, bedStartTime, bedEndTime, registDate } = req.body;

    try {
        await WorkNote.update({
            disease : disease,
            treat : treat,
            medicine : medicine,
            reactThing : reactThing,
            bedStartTime : bedStartTime,
            bedEndTime : bedEndTime,
            registDate : registDate
        },{
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName,
                grade : grade,
                classNum: classNum,
                num : num,
                gender: gender,
                studentName : studentName
            }
        });

        res.json({ msg : "Update WorkNote Successful" });

    } catch (error) {
        console.log(error);
    }
}

export const removeWorkNote = async(req, res) => {
    const { userId, userName, schoolName, grade, classNum, num, gender, studentName, disease, treat, medicine, reactThing, bedStartTime, bedEndTime, registDate } = req.body;

    try {
        await WorkNote.destroy({
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName,
                grade : grade,
                classNum: classNum,
                num : num,
                gender: gender,
                studentName : studentName,
                disease : disease,
                treat : treat,
                medicine : medicine,
                reactThing : reactThing,
                bedStartTime : bedStartTime,
                bedEndTime : bedEndTime,
                registDate : registDate
            }
        });

        res.json({ msg : "Delete WorkNote Successful" });

    } catch (error) {
        console.log(error);
    }
}