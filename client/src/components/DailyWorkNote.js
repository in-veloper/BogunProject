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

const DailyWorkNote = () => {

    const Today = () => {
        let now = new Date();   // 현재 날짜 및 시간
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        const week = ['월', '화', '수', '목', '금', '토', '일'];
        let dayOfWeek = week[now.getDay()];

        return todayYear + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + '[' + dayOfWeek + '요일]'
    }

    const rowCount = 50;
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
        const trResult = [];

        for(let j = 0; j < tdCount; j++) {
            trResult.push(
                <td key={j} style={{height: 30, textAlign: 'center', padding: 0}}>
                    <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                </td>
            )
        }
        
        for(let i = 0; i < rowCount; i ++) {
            result.push(
                <tr key={i}>
                    {trResult}
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
            <div style={{ float: 'right', marginBottom: 10 }}>
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
                    // onSearch={(value) => console.log(value)}
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
                                return <th key={item} width="200" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                            }else if(item == "처치사항") {
                                return <th key={item} width="450" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                            }
                            return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {createTr()}
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
                        <a href="#" className="dropdown-item">
                            10줄 추가
                        </a>
                        <a href="#" className="dropdown-item">
                            50줄 추가
                        </a>
                        <a href="#" className="dropdown-item">
                            100줄 추가
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ float : 'right' }}>
                <button className="button is-success is-outlined is-normal" style={{ marginRight : 10 }}>저장</button>
                <button className="button is-success is-outlined is-normal" onClick={ finalSubmit() }>최종제출</button>
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