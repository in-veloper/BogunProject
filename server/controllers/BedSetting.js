import BedSetting from "../models/BedSettingModel.js";

export const getBedCount = async(req, res) => {
    // body가 아니라 query에 값이 들어가 있었음 -> Debugging 환경 설정 했기 때문에 앞으로 Debugging 하면 쉽게 찾을 수 있을 듯
    const { userId, userName } = req.query;
    try {
        const bedCount = await BedSetting.findAll({
            where : {
                userId : userId,
                userName : userName
            }
        });
        
        res.json(bedCount);
    } catch (error) {
        console.log(error);
    }
}

export const setBedCount = async(req, res) => {
    const { userId, userName, bedCount } = req.body;

    try {
        await BedSetting.create({
            userId : userId,
            userName : userName,
            bedCount : bedCount
        });

        res.json({ msg : "Set Bed Count Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const updateBedCount = async(req, res) => {
    const { userId, userName, bedCount } = req.body;

    try {
        await BedSetting.update({
            bedCount: bedCount
        },{
            where : {
                userId : userId,
                userName : userName,
            }
        });

        res.json({ msg : "Update Bed Count Successful"});
    } catch (error) {
        console.log(error);
    }
}