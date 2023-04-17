import DiseaseItems from "../models/DiseaseItemModel.js";

export const getDiseaseItems = async(req, res) => {
    // body가 아니라 query에 값이 들어가 있었음 -> Debugging 환경 설정 했기 때문에 앞으로 Debugging 하면 쉽게 찾을 수 있을 듯
    const { userId, userName } = req.query;
    
    try {
        const diseaseItems = await DiseaseItems.findAll({
            where : {
                userId : userId,
                userName : userName
            }
        });
        
        res.json(diseaseItems);

    } catch (error) {
        console.log(error);
    }
}

export const addDiseaseItem = async(req, res) => {
    const { userId, userName, diseaseCategory, diseaseText } = req.body;

    try {
        await DiseaseItems.create({
            userId : userId,
            userName : userName,
            diseaseCategory : diseaseCategory,
            diseaseText : diseaseText
        });

        res.json({ msg : "Add Disease Item Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const removeDiseaseItem = async(req, res) => {
    const { userId, userName, diseaseCategory, diseaseText } = req.body;

    try {
        await DiseaseItems.destroy({
            where : {
                userId : userId,
                userName : userName,
                diseaseCategory : diseaseCategory,
                diseaseText : diseaseText
            }
        });

        res.json({ msg : "Delete Disease Item Successful" });
        
    } catch (error) {
        console.log(error);
    }
}