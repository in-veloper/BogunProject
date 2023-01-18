import Calendars from "../models/CalendarModel.js";

export const getCalendarData = async(req, res) => {
    try {
        const calendars = await Calendars.findAll({
            attributes : [userId]
        });
        res.json(calendars);
    } catch (error) {
        console.log(error);
    }
}

export const addCalendarData = async(req, res) => {
    const { userId, selectedDate, endDate, selectedColor, todo, todos } = req.body;

    try {
        await Calendars.create({
            userId : userId,
            selectedDate : selectedDate,
            endDate : endDate,
            selectedColor : selectedColor,
            todo : todo,
            todos : todos
        });
        res.json({ msg : "Add Calendar Data Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const removeCalendarData = async(req, res) => {
    const { userId, selectedDate, todo, todos } = req.body;

    try {
        await Calendars.destroy({
            where : {
                userId : userId,
                selectedDate : selectedDate,
                todo : todo,
                todos : todos
            }
        });
        res.json({ msg : "Delete Calendar data Successful"})
    } catch (error) {
        console.log(error);
    }
}