import Bookmarks from "../models/BookmarkModel.js";

export const getBookmarks = async(req, res) => {
    try {
        const bookmarks = await Bookmarks.findAll({
            // attributes : [bookmarkName, bookmarkAddress]
        });
        res.json(bookmarks);
    } catch (error) {
        console.log(error);
    }
}

export const addBookmark = async(req, res) => {
    const { bookmarkName, bookmarkAddress } = req.body;

    try {
        await Bookmarks.create({
            bookmarkName : bookmarkName,
            bookmarkAddress : bookmarkAddress
        });
        res.json({ msg : "Add bookmark Successful"});
    } catch (error) {
        console.log(error);
    }
}