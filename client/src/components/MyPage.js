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

            const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
            let htmlstr = XLSX.write(wb, {sheet : wsname, type : 'string', bookType : 'html'});
            htmlstr = htmlstr.split('검사명: 전체</td></tr><tr><td id="sjs-B7"></td><td id="sjs-C7"></td><td id="sjs-D7"></td><td id="sjs-E7"></td><td id="sjs-F7"></td><td id="sjs-G7"></td><td id="sjs-H7"></td></tr>')[1];
            
            if(htmlstr && users.userId && users.name) {
                try {
                    axios.post('http://localhost:8000/addNametable', {
                        userId : users.userId,
                        userName : users.name,
                        grade : targetGrade,
                        html : htmlstr
                    });
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }

    const [registeredGrade, setRegisteredGrade] = useState([]);

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
                response.data.forEach(item => {
                    if(item.grade === selectedGrade) {
                        document.getElementById('excelResult').innerHTML = item.html;
                        const removeButton = document.getElementById('removeButton');
                        removeButton.setAttribute('value', selectedGrade);
                    }
                })
            }
        } catch(error) {
            console.log(error);
        }
        handleShow();
    }

    const AddNameTableButtons = () => {
        const buttonList = [];
        const userSchoolName = users.schoolName;

        if(userSchoolName) {
            if(userSchoolName.includes('초등학교')) {
                for(let i = 1; i < 7; i++) {
                    buttonList.push(
                        <button key={i} className='button' style={{padding : 0, border : 'none'}}>
                            <div className='file'>
                                <label className='file-label'>
                                    <input className='file-input' type='file' name={i} onClick={registeredGrade.includes(String(i)) ? readNameTableFunc : undefined} onChange={registeredGrade.includes(String(i)) ? undefined : setNameTableFunc}/>
                                    <span className='file-cta' style={registeredGrade.includes(String(i)) ? {backgroundColor : '#96C7ED', border : 'none', marginRight : 5} : {}}>
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
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>명렬표 미리보기</p>
                        <button className='delete' aria-label='close' onClick={handleClose}></button>
                    </header>
                    <section className='modal-card-body'>
                        <table className='table is-bordered is-fullwidth is-hoverable' id='excelResult'>

                        </table>
                    </section>
                    <footer className='modal-card-foot' style={{ padding : 0 }}>
                        <div style={{ marginLeft : 500, marginTop : 10 }}>
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