/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineSave } from 'react-icons/ai';
import { FiPlusSquare } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';

const DailyWorkNote = () => {

    const [treatModalshow, setTreatModalShow] = useState(false);
    const [medicineModalShow, setMedicineModalShow] = useState(false);

    const Today = () => {
        let now = new Date();   // 현재 날짜 및 시간
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        const week = ['월', '화', '수', '목', '금', '토', '일'];
        let dayOfWeek = week[now.getDay()];

        return todayYear + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + '[' + dayOfWeek + '요일]'
    }

    const rowCount = 100;
    const tdCount = 7;

    const tableData = {
        header: ["NO", "학년/반", "성별", "병명", "처치사항", "투약사항", "특이사항"],
        data: []
    }; 

    const statData = {
        header: ["감염병", "구강치아계", "근골격계", "비뇨생식기계", "소화기계", "순환기계", "안과계", "이비인후과계", "정신신경계", "호흡기계", "기타", "합계"],
        data: []
    }

    const createTr = () => {
        const result = [];

        for(let i = 1; i <= rowCount; i++) {
            result.push(
                <tr key={i}>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        {i}
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                </tr>
            )
        }
        return result;
    }

    const createStatTr = () => {
        const result = [];
        const trResult = [];

        for(let j = 0; j < statData.header.length; j++) {
            trResult.push(
                <td key={j} style={{height: 50, textAlign: 'center'}}></td>
            )
        }

        for(let i = 0; i < 1; i++) {
            result.push(
                <tr key={i}>
                    {trResult}
                </tr>
            )
        }
        return result;
    }

    const finalSubmit = () => {
        return (
            <div className='modal'>
                <div className='modal-background'></div>
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className='modal-card-title'>Alert</p>
                        <button className='delete' aria-label='close'></button>
                    </header>
                    <section className='modal-card-body'>
                        content
                    </section>
                    <footer className='modal-card-foot'>
                        <button className='button is-success'>최종제출</button>
                        <button className='button'>취소</button>
                    </footer>
                </div>
            </div>
        )
    }

    const plusTen = (event) => {
        event.preventDefault();
        const toPlus = Number(event.target.getAttribute('value'));
        addLine(toPlus);
    }

    const plusFifty = (event) => {
        event.preventDefault();
        const toPlus = Number(event.target.getAttribute('value'));
        addLine(toPlus);
    }

    const plusHundred = (event) => {
        event.preventDefault();
        const toPlus = Number(event.target.getAttribute('value'));
        addLine(toPlus);
    }

    const addLine = (toPlusLine) => {
        const result = [];
        if(toPlusLine) {
            for(let i = 1; i <= toPlusLine; i++) {
                result.push(
                    <tr key={i}>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            {i}
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                        <td key={i} style={{height: 30, textAlign: 'center', padding: 0}}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </td>
                    </tr>
                )
            }
            return result;
        }
    }

    const handleTreatModalShow = (event) => {
        event.preventDefault();
        setTreatModalShow(true);
    }

    const handleTreatModalClose = (event) => {
        event.preventDefault();
        setTreatModalShow(false);
    }

    const handleMedicineModalShow = (event) => {
        event.preventDefault();
        setMedicineModalShow(true);
    }

    const handleMedicineModalClose = (event) => {
        event.preventDefault();
        setMedicineModalShow(false);
    }

    const plusTreatItem = (event) => {
        event.preventDefault();
        const inp = document.createElement('input');
        inp.className = 'input';
        inp.placeholder = '문구를 입력해주세요'
        inp.setAttribute('style', 'height : 30px; fontSize : 15px; width : 100%;');

        document.getElementById('treatItemList').appendChild(inp); 
    }

    const plusMedicineItem = (event) => {
        event.preventDefault();
        const inp = document.createElement('input');
        inp.className = 'input';
        inp.placeholder = '문구를 입력해주세요'
        inp.setAttribute('style', 'height : 30px; fontSize : 15px; width : 100%;');

        document.getElementById('medicineItemList').appendChild(inp); 
    }

    return (
        <div className="container mt-5" >
            <table className="table is-bordered is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {statData.header.map((item) => {
                            return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center' }}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {createStatTr()}
                </tbody>
            </table>
            <hr/>
            <div style={{ float: 'left', marginLeft: 10, marginTop: 5 }}>
                <span style={{ verticalAlign : 'middle', fontSize : 18 }}><b><Today /></b></span>
            </div>
            <div style={{ float: 'right' }}>
                <button className='button is-info is-outlined' style={{ marginRight : 5 }}>
                    <span className='icon is-small'>
                        <AiOutlineSave style={{ fontSize : 20 }}/>
                    </span>
                </button>
                <button className='button is-info is-outlined' style={{ marginRight : 5 }}>
                    <span className='icon is-small'>
                        <AiOutlinePrinter style={{ fontSize : 20 }}/>
                    </span>
                </button>
                <input 
                    className='input is-info'
                    placeholder='검색어를 입력하세요'
                    style={{ width: 200 }}
                />
            </div>
            <table className="table is-bordered is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {tableData.header.map((item) => {
                            if(item == "학년/반") {
                                return <th key={item} width="100" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                            }else if(item == "성별" || item == "NO") {
                                return <th key={item} width="70" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                            }else if(item == "투약사항") {
                                return <th key={item} width="200" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                    {item}
                                    <FiPlusSquare style={{ color : 'blue', fontSize : 20, marginBottom : -4, marginLeft : 5 }} onClick={handleMedicineModalShow} />
                                </th>;
                            }else if(item == "처치사항") {
                                return <th key={item} width="450" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                    {item}
                                    <FiPlusSquare style={{ color : 'blue', fontSize : 20, marginBottom : -4, marginLeft : 5 }} onClick={handleTreatModalShow}/>
                                </th>;
                            }else if(item == "병명") {
                                return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                    {item}
                                    <FiPlusSquare style={{ fontSize : 20, marginBottom : -4, marginLeft : 5 }} />
                                </th>;
                            }
                            return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                {item}
                            </th>;
                        })}
                    </tr>
                </thead>
                <tbody id='workNoteBody'>
                    {createTr()}
                    {addLine()}
                </tbody>
            </table>
            <div className="dropdown is-hoverable" style={{ float : 'left' }}>
                <div className="dropdown-trigger">
                    <button className="button is-success is-outlined is-normal" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>행 추가</span>&nbsp;
                        <FaAngleDown />
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a className="dropdown-item" value='10' onClick={ plusTen }>
                            10줄 추가
                        </a>
                        <a className="dropdown-item" value='50' onClick={ plusFifty }>
                            50줄 추가
                        </a>
                        <a className="dropdown-item" value='100' onClick={ plusHundred }>
                            100줄 추가
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ float : 'right' }}>
                <button className="button is-success is-outlined is-normal" style={{ marginRight : 10 }}>저장</button>
                <button className="button is-success is-outlined is-normal" onClick={ finalSubmit }>최종제출</button>
            </div>

            <div className= {treatModalshow ? 'modal is-active' : 'modal'}>
                <form>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 처치사항 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleTreatModalClose }></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                            <ul id='treatItemList'>
                                <input className='input' name='treatItem' type='text' placeholder='문구를 입력해주세요' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                <button className='button is-small' onClick={plusTreatItem}>항목 추가</button>
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 420, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={ handleTreatModalClose }>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

            <div className= {medicineModalShow ? 'modal is-active' : 'modal'}>
                <form>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 투약사항 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleMedicineModalClose }></button>
                        </header>
                        <section className='modal-card-body'>
                            <ul id='medicineItemList'>
                                <input className='input' name='medicineItem' type='text' placeholder='문구를 입력해주세요.' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                <button className='button is-small' onClick={plusMedicineItem}>항목 추가</button>
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 420, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={ handleMedicineModalClose }>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default DailyWorkNote;