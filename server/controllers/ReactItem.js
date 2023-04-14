import ReactItems from "../models/ReactItemModel.js";

export const getReactItems = async(req, res) => {
    // body가 아니라 query에 값이 들어가 있었음 -> Debugging 환경 설정 했기 때문에 앞으로 Debugging 하면 쉽게 찾을 수 있을 듯
    const { userId, userName } = req.query;
    
    try {
        const reactItems = await ReactItems.findAll({
            where : {
                userId : userId,
                userName : userName
            }
        });
        
        res.json(reactItems);

    } catch (error) {
        console.log(error);
    }
}

export const addReactItem = async(req, res) => {
    const { userId, userName, reactText } = req.body;

    try {
        await ReactItems.create({
            userId : userId,
            userName : userName,
            reactText : reactText
        });

        res.json({ msg : "Add React Item Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const removeReactItem = async(req, res) => {
    const { userId, userName, reactText } = req.body;

    try {
        await ReactItems.destroy({
            where : {
                userId : userId,
                userName : userName,
                reactText : reactText
            }
        });

        res.json({ msg : "Delete React Item Successful" });
        
    } catch (error) {
        console.log(error);
    }
}