import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getBookmarks, addBookmark } from "../controllers/Bookmark.js";
// import { getStudents, setStudents } from "../controllers/MyPage.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
// router.get('/getStudents', getStudents);
// router.post('/setStudents', setStudents);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', addBookmark);
 
export default router;