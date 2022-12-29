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

import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import { useState } from 'react';

const MyPage = () => {
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



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    return (
        <div className="container mt-5">
            {/* <div className='file is-info has-name'>
                <label className='file-label'>
                    <input className='file-input' type='file' name='resume' onChange={readExcel}>
                        {/* <span className='file-cta'>
                            <span className='file-icon'>
                                {/* <i></i> */}
                            {/* </span>
                            <span className='file-label'>
                                파일선택
                            </span>
                        </span>
                        <span className='file-name'>

                        </span> */}
                    {/* </input>
                </label>
            </div> */}
            <input type="file" onChange={readExcel}></input>
            <button className='button is-success js-modal-trigger' data-target="modal" onClick={handleShow}>
                명렬표 미리보기
            </button>
            <div className= {show ? 'modal is-active' : 'modal'}>
            {/* <div className='modal' showmodal={show}> */}
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