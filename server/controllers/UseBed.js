import UseBed from "../models/UseBedModel.js";

export const getUseBed = async(req, res) => {
    const { userId, userName, schoolName } = req.query;

    try {
        const useBed = await UseBed.findAll({
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName
            }
        });

        res.json(useBed);
    } catch (error) {
        console.log(error);
    }
}

export const setUseBed = async(req, res) => {
    const { userId , userName, schoolName, targetStudent, bedStartTime, bedEndTime, registDate, bedNumber, useStatus } = req.body;

    try {
        await UseBed.create({
            userId : userId,
            userName : userName,
            schoolName : schoolName,
            targetStudent : targetStudent,
            bedStartTime : bedStartTime,
            bedEndTime : bedEndTime,
            registDate : registDate,
            bedNumber : bedNumber,
            useStatus : useStatus
        });

        res.json({ msg : "Set Use Bed Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const updateUseBedStatus = async(req, res) => {
    const { userId, userName, schoolName, targetStudent, bedStartTime, bedEndTime, registDate, bedNumber, useStatus } = req.body;

    try {
        await UseBed.update({
            bedEndTime : bedEndTime,
            useStatus : useStatus
        },{
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName,
                targetStudent : targetStudent,
                bedStartTime : bedStartTime,
                registDate : registDate,
                bedNumber : bedNumber
            }
        });
        
        res.json({ msg : "Update Use Bed Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const removeUseBed = async(req, res) => {
    const { userId, userName, schoolName, targetStudent, bedNumber, useStatus } = req.body;

    try {
        await UseBed.destroy({
            where : {
                userId : userId, 
                userName : userName,
                schoolName : schoolName,
                targetStudent : targetStudent,
                bedNumber : bedNumber,
                useStatus : useStatus
            }
        });

        res.json({ msg : "Delete Use Bed Successful" });
    }catch (error) {
        console.log(error);
    }
}