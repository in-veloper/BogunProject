import MedicineItems from "../models/MedicineItemModel.js";

export const getMedicineItems = async(req, res) => {
    // body가 아니라 query에 값이 들어가 있었음 -> Debugging 환경 설정 했기 때문에 앞으로 Debugging 하면 쉽게 찾을 수 있을 듯
    const { userId, userName } = req.query;
    try {
        const medicineItems = await MedicineItems.findAll({
            where : {
                userId : userId,
                userName : userName
            }
        });
        
        res.json(medicineItems);
    } catch (error) {
        console.log(error);
    }
}

export const addMedicineItem = async(req, res) => {
    const { userId, userName, medicineText } = req.body;

    try {
        await MedicineItems.create({
            userId : userId,
            userName : userName,
            medicineText : medicineText
        });

        res.json({ msg : "Add Medicine Item Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const removeMedicineItem = async(req, res) => {
    const { userId, userName, medicineText } = req.body;

    try {
        await MedicineItems.destroy({
            where : {
                userId : userId,
                userName : userName,
                medicineText : medicineText
            }
        });

        res.json({ msg : "Delete Medicine Item Successful"});
    } catch (error) {
        console.log(error);
    }
}