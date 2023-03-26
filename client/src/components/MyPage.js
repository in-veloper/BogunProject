/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/react-in-jsx-scope */

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import { ImUpload } from 'react-icons/im';
import Toast from './Toast.js'
import Neis from "@my-school.info/neis-api";
import jwt_decode from "jwt-decode";

const MyPage = () => {
    const [users, setUsers] = useState([]);
    const [toast, setToast] = useState(false);
    const [nameData, setNameData] = useState(null);
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        getUsersInfo();
        getBookmarkData();
        getNameTableData();
    }, []);

    const getUsersInfo = async () => {
        try {
            if(users.length === 0) {
                const response = await axios.get('http://localhost:8000/token');
                const decoded = jwt_decode(response.data.accessToken);
                setUsers(decoded);
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        function openModal($el) {
            $el.classList.add('is-active');
        }

        function closeModal($el) {
            $el.classList.remove('is-active');
        }

        function cloassAllModals() { 
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
            });
        }

        (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modal = $trigger.CDATA_SECTION_NODE.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener('click', () => {
                openModal($target);
            });
        });

        (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button') || []).forEach(($close) => {
            const $target = $close.closest('.modal');

            $close.addEventListener('click', () => {
                closeModal($target);
            });
        });

        document.addEventListener('keydown', (event) => {
            const e = event || window.event;

            if(e.keyCode === 27) {
                cloassAllModals();
            }
        });
    });
    const [bookmarkData, setBookmarkData] = useState([]);

    const getBookmarkData = async () => {
        let bookmarkList = [];
        const response = await axios.get('http://localhost:8000/getBookmarks');
        if(response.data) {
            for(let i = 0; i < response.data.length; i++) {
                bookmarkList.push(response.data[i]);
            }
        }
        setBookmarkData(bookmarkList);
    }

    const GetBookmarks = () => {
        const bookmarkList = [];
        if(bookmarkData.length > 0) {
            for(let i = 0; i < bookmarkData.length; i++) {
                bookmarkList.push(
                    <li key={i}>{bookmarkData[i].bookmarkName}</li>
                )
            }
        }
        return bookmarkList;
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const neis = new Neis({ KEY : "1addcd8b3de24aa5920d79df1bbe2ece", Type : "json" });

    const setNameTableFunc = (e) => {
        const reader = new FileReader();
        const targetGrade = e.target.name;
        
        reader.onload = (event) => {
            const binaryData = event.target.result;
            const workBook = XLSX.read(binaryData, { type : 'binary' });
            const sheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(workSheet, { header : 1 });
            const nameJsonArray = [];

            // 데이터 가공 코드
            // const newData = addColumn(addRow(parsedData, 0), 0, 'ID');
            let targetRow = null;
            for(let i = 0; i < parsedData.length; i++) {
                if(parsedData[i].includes("반") && parsedData[i].includes("번호")) {
                    targetRow = i + 1;
                }
            }
            
            for(let i = targetRow; i < parsedData.length; i++) {
                const studentInfo = {
                    'grade' : targetGrade,
                    'class' : parsedData[i][0],
                    'number' : parsedData[i][1],
                    'name' : parsedData[i][2],
                    'gender' : parsedData[i][3]
                };
                nameJsonArray.push(studentInfo);
            }
            
            const studentsJsonArray = JSON.stringify(nameJsonArray);
            
            if(users.userId && users.name && nameJsonArray.length > 0) {
                try {
                    axios.post('http://localhost:8000/addNametable', {
                        userId : users.userId,
                        userName : users.name,
                        grade : targetGrade,
                        studentsJsonArray : studentsJsonArray
                    });
                } catch(error) {
                    console.log(error);
                }
            }

            setNameData(parsedData);
        };

        reader.readAsBinaryString(e.target.files[0]);
    }

    // 열 추가 함수
    const addColumn = (rows, columnIndex, columnTitle) => {
        return rows.map((row, index) => {
            if(index === 0) {
                return [...row.slice(0, columnIndex), columnTitle, ...row.slice(columnIndex)];
            }else{
                return [...row.slice(0, columnIndex), '', ...row.slice(columnIndex)];
            }
        });
    }

    // 행 추가 함수
    const addRow = (rows, rowIndex) => {
        const newRow = rows[0].map(() => '');
        return [...rows.slice(0, rowIndex), newRow, ...rows.slice(rowIndex)];
    }

    // const setNameTableFunc = (event) => {
    //     event.preventDefault();


    //     const targetGrade = Number(event.target.name);
        
    //     const [file] = event.target.files;
    //     const reader =  new FileReader();

    //     reader.readAsArrayBuffer(event.target.files[0]);
    //     reader.onload = function(e) {

    //         const binaryData = e.target.result;
    //         const workBook = XLSX.read(binaryData, { type: 'binary'});
    //         const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    //         const parsedData = XLSX.utils.sheet_to_json(workSheet, { header : 1 });
    //         setData(parsedData);
    //         debugger








    //         // const data = new Uint8Array(reader.result);
    //         // const wb = XLSX.read(data, {type : 'array'});
    //         // const wsname = wb.SheetNames[0];

    //         // const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    //         // let htmlstr = XLSX.write(wb, {sheet : wsname, type : 'string', bookType : 'html'});
    //         // htmlstr = htmlstr.split('검사명: 전체</td></tr><tr><td id="sjs-B7"></td><td id="sjs-C7"></td><td id="sjs-D7"></td><td id="sjs-E7"></td><td id="sjs-F7"></td><td id="sjs-G7"></td><td id="sjs-H7"></td></tr>')[1];
            
    //         // if(htmlstr && users.userId && users.name) {
    //         //     try {
    //         //         axios.post('http://localhost:8000/addNametable', {
    //         //             userId : users.userId,
    //         //             userName : users.name,
    //         //             grade : targetGrade,
    //         //             html : htmlstr
    //         //         });
    //         //     } catch(error) {
    //         //         console.log(error);
    //         //     }
    //         // }
    //     }
    // }

    const [registeredGrade, setRegisteredGrade] = useState([]);

    // 해야 할 일 : 명렬표 가져오는 부분도 유저별로 나눠줘야 함
    const getNameTableData = async() => {
        const registeredGrade = [];
        try {
            const response = await axios.get('http://localhost:8000/getNametable');
            if(response.data) {
                response.data.forEach(item => {
                    registeredGrade.push(item.grade);
                });
            }
            setRegisteredGrade(registeredGrade);
        } catch(error) {
            console.log(error);
        }
    }

    const readNameTableFunc = async(event) => {
        event.preventDefault();
        const selectedGrade = event.target.name;
        try{
            const response = await axios.get('http://localhost:8000/getNametable');
            if(response.data) {
                if(response.data[0].grade == selectedGrade) {
                    const jsonStudentData = JSON.parse(response.data[0].studentsJsonArray);
                    setPreviewData(jsonStudentData);
                }

                if(response.data[0].grade == selectedGrade) {
                    const removeButton = document.getElementById('removeButton');
                    removeButton.setAttribute('value', selectedGrade);
                }
            }
        } catch(error) {
            console.log(error);
        }
        handleShow();
    }

    const PreviewNameTable = () => {
        if(previewData) {
            return (
                <table className='table is-bordered is-fullwidth is-hoverable' style={{ textAlign : 'center', fontSize : 13 }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign : 'center' }}>반</th>
                            <th style={{ textAlign : 'center' }}>번호</th>
                            <th style={{ textAlign : 'center' }}>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {previewData.map((row, index) => (
                            <tr key={index}>
                                <td>{row['class']}</td>
                                <td>{row['number']}</td>
                                <td>{row['name']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    }

    const AddNameTableButtons = () => {
        const buttonList = [];
        const userSchoolName = users.schoolName;

        if(userSchoolName) {
            if(userSchoolName.includes('초등학교')) {
                for(let i = 1; i < 7; i++) {
                    buttonList.push(
                        <button key={i} className='button' style={{padding : 0, border : 'none', marginRight : 5}}>
                            <div className='file'>
                                <label className='file-label'>
                                    <input className='file-input' type='file' name={i} onClick={registeredGrade.includes(String(i)) ? readNameTableFunc : undefined} onChange={(e) => registeredGrade.includes(String(i)) ? undefined : setNameTableFunc(e.target.files[0])}/>
                                    <span className='file-cta' style={registeredGrade.includes(String(i)) ? {backgroundColor : '#96C7ED', border : 'none'} : {}}>
                                        <span className='file-label'>
                                            <b>{i}</b>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </button>
                    )
                }
            }else if(userSchoolName.includes('중학교') || userSchoolName.includes('고등학교')) {
                for(let i = 1; i < 4; i++) {
                    buttonList.push(
                        <button key={i} className='button' style={{padding : 0, border : 'none', marginRight : 5}}>
                            <div className='file'>
                                <label className='file-label'>
                                    <input className='file-input' type='file' name={i} onClick={registeredGrade.includes(String(i)) ? readNameTableFunc : undefined} onChange={registeredGrade.includes(String(i)) ? undefined : setNameTableFunc}/>
                                    <span className='file-cta' style={registeredGrade.includes(String(i)) ? {backgroundColor : '#96C7ED', border : 'none'} : {}}>
                                        <span className='file-label'>
                                            <b>{i}</b>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </button>
                    )
                }
            }
        }
        return buttonList;
    }

    const removeNameTable = (event) => {
        event.preventDefault();
        const userId = users.userId;
        const userName = users.name;
        const toRemoveGrade = event.target.value;
        try {
            axios.post('http://localhost:8000/removeNameTable', {
                userId : userId,
                userName : userName,
                grade : toRemoveGrade
            });
            setShow(false);
            setToast(true);
        } catch (error) {
            console.log("명렬표 삭제 실패" + error);
        }
    }
    
    return (
        <div className="container mt-5" style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            <div className='field'>
                <label className='label'>ID</label>
                <div className='control'>
                    <input className='input' type='text' value={users.email || ''} readOnly={true}/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>이름</label>
                <div className='control'>
                    <input className='input' type='text' value={users.name || ''} readOnly={true}/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>소속 학교</label>
                <div className='control'>
                    <input className='input' type='text' value={users.schoolName || ''} readOnly={true}/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>즐겨찾기 목록</label>
                <div className='box'>
                    <GetBookmarks/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>명렬표 등록 및 현황</label>
                <div className='box' style={{ height : 80}}>
                    <div className='buttons has-addons' style={{ float : 'left' }}>
                        <AddNameTableButtons />
                    </div>
                    <button className='button is-info js-modal-trigger' style={{width: 303, float : 'right'}} data-target="modal" onClick={handleShow}>
                        명렬표 미리보기
                    </button>
                </div>
            </div>
            
            <br></br>
            {toast && <Toast setToast={setToast} text="해당 명렬표 삭제가 정상적으로 처리되었습니다."></Toast>}
            <div className= {show ? 'modal is-active' : 'modal'}>
                <div className='modal-background'></div>
                <div className='modal-card' style={{ height : 500, width : 400 }}>
                    <header className='modal-card-head' style={{ height : 50}}>
                        <p className='modal-card-title' style={{ fontSize : 17, fontWeight : 'bold' }}>명렬표 미리보기</p>
                        <button className='delete' aria-label='close' onClick={handleClose}></button>
                    </header>
                    <section className='modal-card-body'>
                        <PreviewNameTable/>
                    </section>
                    <footer className='modal-card-foot' style={{ padding : 0 }}>
                        <div style={{ marginLeft : 'auto', marginRight : 20, marginTop : 10 }}>
                            <button className='button is-info is-small' id='removeButton' onClick={removeNameTable}>삭제</button>
                            <button className='button is-small' onClick={ handleClose }>닫기</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default MyPage;