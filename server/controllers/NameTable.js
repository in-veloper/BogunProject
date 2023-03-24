import NameTable from "../models/NameTableModel.js";

export const getNameTable = async(req, res) => {
    try {
        const nametable = await NameTable.findAll({
            // where : {
            //     userId : userId,
            //     userName : userName,
            //     grade : grade
            // }
        });
        res.json(nametable);
    } catch(error) {
        console.log(error);
    }
}

export const addNameTable = async(req, res) => {
    const { userId, userName, grade, studentsJsonArray } = req.body;

    try {
        await NameTable.create({
            userId : userId,
            userName : userName,
            grade : grade,
            studentsJsonArray : studentsJsonArray
        });
        res.json({ msg : "Add Name Table Successful" });
    } catch(error) {
        console.log(error);
    }
}

export const removeNametable = async(req, res) => {
    const { userId, userName, grade } = req.body;
    try {
        await NameTable.destroy({
            where : {
                userId : userId,
                userName : userName,
                grade : grade
            }
        });
        res.json({ msg : "Delete NameTable Successful"});
    } catch (error) {
        console.log(error);
    }
}