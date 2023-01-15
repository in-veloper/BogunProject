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
    const { userId, userName, grade, html } = req.body;

    try {
        await NameTable.create({
            userId : userId,
            userName : userName,
            grade : grade,
            html :  html
        });
        res.json({ msg : "Add Name Table Successful" });
    } catch(error) {
        console.log(error);
    }
}