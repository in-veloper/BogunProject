import TreatItems from "../models/TreatItemModel.js";

export const getTreatItems = async(req, res) => {
    // const { userId, userName } = req.body;
    try {
        const treatItems = await TreatItems.findAll({
            // where : {
            //     userId : userId,
            //     userName : userName
            // }
        });

        res.json(treatItems);
    } catch (error) {
        console.log(error);
    }
}

export const addTreatItem = async(req, res) => {
    const { userId, userName, treatText } = req.body;

    try {
        await TreatItems.create({
            userId : userId,
            userName : userName,
            treatText : treatText
        });

        res.json({ msg : "Add TreatItem Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const removeTreatItem = async(req, res) => {
    const { userId, userName, treatText } = req.body;

    try {
        await TreatItems.destroy({
            where : {
                userId : userId,
                userName : userName,
                treatText : treatText
            }
        });

        res.json({ msg : "Delete TreatItem Successful"});
    } catch (error) {
        console.log(error);
    }
}