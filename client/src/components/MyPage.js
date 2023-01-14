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
import Neis from "@my-school.info/neis-api";
import jwt_decode from "jwt-decode";

const MyPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersInfo();
        getBookmarkData();
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
        const response = await axios.get('http://localhost:8000/bookmarks');
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

    const readExcel = (e) => {
        const [file] = e.target.files;
        const target = document.getElementsByClassName('container mt-5');
        const reader = new FileReader();

        const isElementSchool = false;
        const isMiddleSchool = true;
        const isHighSchool = false;
        const elementSchoolGrade = 6;
        const middleSchoolGrade = 3;
        const highSchoolGrade = 3;

        const nameTable = [];
        let test1 = null; 
        let test2 = null;

        debugger
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function(e) {
            const data = new Uint8Array(reader.result);
            const wb = XLSX.read(data, {type: 'array'});
            const wsname = wb.SheetNames[0];
            // const ws = wb.Sheets[wsname];
            // const sheetData = XLSX.utils.sheet_to_json(ws);
            // let headerIndex = 0;
            // let headerData = {};

            // const getKeyByValue = (obj, value) => {
            //     return Object.keys(obj).findIndex(key => obj[key] === value);
            // }

            // for(let i = 1; i < sheetData.length; i++) {
            //     const index = getKeyByValue(sheetData[i], '성명');
            //     if(index != -1) {
            //         headerData = data[i];
            //         headerIndex = index;
            //     }
            // }
            debugger
            var htmlstr = XLSX.write(wb, {sheet: wsname, type: 'string', bookType: 'html'});
            document.getElementById('excelResult').innerHTML += htmlstr;
        }

        // reader.readAsBinaryString(e.target.files[0]);
    }

    const setNameTableFunc = (event) => {
        event.preventDefault();
        const targetGrade = Number(event.target.name);
        
        const [file] = event.target.files;
        const reader =  new FileReader();

        reader.readAsArrayBuffer(event.target.files[0]);
        reader.onload = function(e) {
            const data = new Uint8Array(reader.result);
            const wb = XLSX.read(data, {type : 'array'});
            const wsname = wb.SheetNames[0];

            var htmlstr = XLSX.write(wb, {sheet : wsname, type : 'string', bookType : 'html'});
            debugger
            if(htmlstr && users.userId && users.name) {
                debugger
                try {
                    axios.post('http://localhost:8000/nametable', {
                        userId : users.userId,
                        userName : users.name,
                        grade : targetGrade,
                        html : htmlstr
                    });
                } catch(error) {
                    console.log(error);
                }
            }
            // document.getElementById('nameTableResult').innerHTML +=  htmlstr;
        }
    }

    const AddNameTableButtons = () => {
        const buttonList = [];
        const userSchoolName = users.schoolName;

        if(userSchoolName) {
            if(userSchoolName.includes('초등학교')) {
                for(let i = 1; i < 7; i++) {
                    buttonList.push(
                        <button key={i} className='button'>{i}</button>
                    )
                }
            }else if(userSchoolName.includes('중학교') || userSchoolName.includes('고등학교')) {
                for(let i = 1; i < 4; i++) {
                    buttonList.push(
                        <button key={i} className='button' style={{padding : 0, border : 'none'}}>
                            <div className='file'>
                                <label className='file-label'>
                                    <input className='file-input' type='file' name={i} onChange={setNameTableFunc}/>
                                    <span className='file-cta'>
                                        <span className='file-label'>
                                            {i}
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
                <label className='label'>즐겨찾기 관리</label>
                <div className='box'>
                    <GetBookmarks/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>명렬표 등록 및 현황</label>
                <div className='box' style={{ height : 80}}>
                    {/* <div className='file has-name is-success' style={{ float : 'left'}}>
                        <label className='file-label'>
                            <input className='file-input' type="file" name="resume" onChange={ readExcel }/>
                            <span className='file-cta'>
                                <span className='file-icon'>
                                    <ImUpload />
                                </span>
                                <span className='file-label'>
                                    Choose a file
                                </span>
                            </span>
                            <span className='file-name'>
                                선택된 파일 없음
                            </span>
                        </label>
                    </div> */}
                    <div className='buttons has-addons' style={{ float : 'left' }}>
                        <AddNameTableButtons />
                    </div>
                    <button className='button is-success js-modal-trigger' style={{width: 303, float : 'right'}} data-target="modal" onClick={handleShow}>
                        명렬표 미리보기
                    </button>
                </div>
            </div>
            
            <br></br>
            
            <div className= {show ? 'modal is-active' : 'modal'}>
                <div className='modal-background'></div>
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className='modal-card-title'>명렬표 미리보기</p>
                        <button className='delete' aria-label='close' onClick={handleClose}></button>
                    </header>
                    <section className='modal-card-body'>
                        <table className='table is-bordered is-fullwidth is-hoverable' id='excelResult'>

                        </table>
                    </section>
                    <footer className='modal-card-foot'>
                        <button className='button is-success'>저장</button>
                        <button className='button' onClick={ handleClose }>닫기</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default MyPage