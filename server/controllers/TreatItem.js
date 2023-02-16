import TreatItems from "../models/TreatItemModel.js";

export const getTreatItems = async(req, res) => {
    // body가 아니라 query에 값이 들어가 있었음 -> Debugging 환경 설정 했기 때문에 앞으로 Debugging 하면 쉽게 찾을 수 있을 듯
    const { userId, userName } = req.query;
    try {
        const treatItems = await TreatItems.findAll({
            where : {
                userId : userId,
                userName : userName
            }
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