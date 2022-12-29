// import Students from "../models/StudentsModel.js";
// import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";

// export const getStudents = async(req, res) => {
//     try {
//         const students = await Students.findAll({
//             attribute: ['school', 'grade']
//         });
//         res.json(students);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const setStudents = async(req, res) => {
//     const { school, grade, classNumber, name, testDate, testName, testInstitute } = req.body;

//     try {
//         await Students.create({
//             school : school,
//             grade : grade,
//             classNumber : classNumber,
//             name : name,
//             testDate : testDate,
//             testName : testName,
//             testInstitute : testInstitute
//         });
//         res.json({ msg : "save successful" });
//     } catch (error) {
//         console.log(error)
//     }
// }