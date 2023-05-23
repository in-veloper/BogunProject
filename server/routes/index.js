import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getBookmarks, addBookmark, removeBookmark } from "../controllers/Bookmark.js";
// import { getStudents, setStudents } from "../controllers/MyPage.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getNameTable, addNameTable, removeNametable } from "../controllers/NameTable.js";
import { getCalendarData, addCalendarData, removeCalendarData } from "../controllers/Calendar.js";
import { getDiseaseItems, addDiseaseItem, removeDiseaseItem } from "../controllers/DiseaseItem.js";
import { getTreatItems, addTreatItem, removeTreatItem } from "../controllers/TreatItem.js";
import { getMedicineItems, addMedicineItem, removeMedicineItem } from "../controllers/MedicineItem.js";
import { getReactItems, addReactItem, removeReactItem } from "../controllers/ReactItem.js";
import { getBedCount, setBedCount, updateBedCount } from "../controllers/BedSetting.js";
import { getWorkNote, getTargetWorkNote, getDayWorkNote, setWorkNote, updateWorkNote, updateUseBedWorkNote, removeWorkNote } from "../controllers/WorkNote.js";
import { getUseBed, setUseBed, updateUseBedStatus, removeUseBed } from "../controllers/UseBed.js";
import { getWorkStatus, setWorkStatus, updateWorkStatus } from "../controllers/WorkStatus.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
// router.get('/getStudents', getStudents);
// router.post('/setStudents', setStudents);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/getBookmarks', getBookmarks);
router.post('/addBookmarks', addBookmark);
router.post('/removeBookmarks', removeBookmark);

router.get('/getNametable', getNameTable);
router.post('/addNametable', addNameTable);
router.post('/removeNameTable', removeNametable);

router.get('/getCalendar', getCalendarData);
router.post('/addCalendar', addCalendarData);
router.post('/removeCalendar', removeCalendarData);

router.get('/getDiseaseItems', getDiseaseItems);
router.post('/addDiseaseItem', addDiseaseItem);
router.post('/removeDiseaseItem', removeDiseaseItem);

router.get('/getTreatItems', getTreatItems);
router.post('/addTreatItem', addTreatItem);
router.post('/removeTreatItem', removeTreatItem);

router.get('/getMedicineItems', getMedicineItems);
router.post('/addMedicineItem', addMedicineItem);
router.post('/removeMedicineItem', removeMedicineItem);

router.get('/getReactItems', getReactItems);
router.post('/addReactItem', addReactItem);
router.post('/removeReactItem', removeReactItem);

router.get('/getBedCount', getBedCount);
router.post('/setBedCount', setBedCount);
router.post('/updateBedCount', updateBedCount);

router.get('/getWorkNote', getWorkNote);
router.get('/getTargetWorkNote', getTargetWorkNote);
router.get('/getDayWorkNote', getDayWorkNote);
router.post('/setWorkNote', setWorkNote);
router.post('/updateWorkNote', updateWorkNote);
router.post('/updateUseBedWorkNote', updateUseBedWorkNote);
router.post('/removeWorkNote', removeWorkNote);

router.get('/getUseBed', getUseBed);
router.post('/setUseBed', setUseBed);
router.post('/updateUseBedStatus',updateUseBedStatus);
router.post('/removeUseBed', removeUseBed);

router.get('/getWorkStatus', getWorkStatus);
router.post('/setWorkStatus', setWorkStatus);
router.post('/updateWorkStatus', updateWorkStatus);

export default router;  