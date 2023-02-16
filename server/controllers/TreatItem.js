import TreatItems from "../models/TreatItemModel.js";

export const getTreatItems = async(req, res) => {
    // 정상 동작 원인 : Sequelize 에서 문법 오류 인듯 findAll인지 Where 절인지 문법 확인 후 처리하면 될듯 [현재 서비스 호출시 params 제외, where절 제외]
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