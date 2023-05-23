import WorkStatus from "../models/WorkStatusModel.js";
import { Sequelize } from "sequelize";

export const getWorkStatus = async(req, res) => {
    const { userId, userName, schoolName, currentWorkStatus } = req.query;

    try {
        const workStatus = await WorkStatus.findAll({
            where : {
                userId : userId,
                userName : userName, 
                schoolName : schoolName
            }
        });

        res.json(workStatus);

    } catch (error) {
        console.log(error);
    }
}

export const setWorkStatus = async(req, res) => {
    // 업무상태 Set 해주는 부분부터 처리하면 됨
    const { userId, userName, schoolName, currentWorkStatus } = req.body;

    try {
        await WorkStatus.create({
            userId : userId,
            userName : userName,
            schoolName : schoolName,
            currentWorkStatus : currentWorkStatus
        });

        res.json({ msg : "Set Work Status Successful" });

    } catch (error) {
        console.log(error);
    }
}

export const updateWorkStatus = async(req, res) => {
    const { userId, userName, schoolName, currentWorkStatus } = req.body;

    try {
        await WorkStatus.update({
            currentWorkStatus : currentWorkStatus
        },{
            where : {
                userId : userId,
                userName : userName,
                schoolName : schoolName
            }
        });

        res.json({ msg : "Update Work Status Successful" });
    } catch(error) {
        console.log(error);
    }
}