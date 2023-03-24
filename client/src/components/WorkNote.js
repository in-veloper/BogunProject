/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaAngleDown, FaDAndDBeyond } from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineSave } from 'react-icons/ai';
import { FiPlusSquare } from 'react-icons/fi';
import { FaStar, FaBed } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Toast from './Toast.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './style/toggleButton.css';

const DailyWorkNote = () => {

    const [user, setUser] = useState(null);
    const [bedSettingModalShow, setBedSettingModalShow] = useState(false);
    const [bedModalshow, setBedModalShow] = useState(false);
    const [diseaseModalshow, setDiseaseModalShow] = useState(false);
    const [treatModalshow, setTreatModalShow] = useState(false);
    const [medicineModalShow, setMedicineModalShow] = useState(false);
    const [toast, setToast] = useState(false);
    const [registDiseaseSuccessToast, setRegistDiseaseSuccessToast] = useState(false);
    const [registDiseaseFailedToast, setRegistDiseaseFailedToast] = useState(false);
    const [registTreatSuccessToast, setRegistTreatSuccessToast] = useState(false);
    const [registTreatFailedToast, setRegistTreatFailedToast] = useState(false);
    const [registMedicineSuccessToast, setRegistMedicineSuccessToast] = useState(false);
    const [registMedicineFailedToast, setRegistMedicineFailedToast] = useState(false);
    const [removeDiseaseToast, setRemoveDiseaseToast] = useState(false);
    const [removeTreatToast, setRemoveTreatToast] = useState(false);
    const [removeMedicineToast, setRemoveMedicineToast] = useState(false);
    const [diseaseItemData, setDiseaseItemData] = useState([]);
    const [treatItemData, setTreatItemData] = useState([]);
    const [medicineItemData, setMedicineItemData] = useState([]);

    const [inputText, setInputText] = useState('');
    const [diseaseTextArray, setDiseaseTextArray] = useState([]);

    const [stateSelectBox, setStateSelectBox] = useState(false);

    const [bedCount, setBedCount] = useState('');
    const [registeredBedCount, setRegisteredBedCount] = useState(0);
    const [bedCountSuccessToast, setBedCountSuccessToast] = useState(false);
    const [bedCountFailedToast, setBedCountFailedToast] = useState(false);
    const [bedCountUpdateToast, setBedCountUpdateToast] = useState(false);

    const [studentName, setStudentName] = useState('');
    // const [registBedStatus, setRegistBedStatus] = useState(false);
    const [usingBedNumber, setUsingBedNumber] = useState('');
    const [bedNotificationModal, setBedNotificationModal] = useState(false);

    useEffect(() => {
        getUser();
        getDisease();
        getTreats();
        getMedicine();
        getBedCount();

        return () => {
            
        }
    }, []);

    const getUser = async () => {
        try {
            if(!user) {
                const response = await axios.get('http://localhost:8000/token');
                const decoded = jwt_decode(response.data.accessToken);
                setUser({
                    userId : decoded.email,
                    userName : decoded.name
                });
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }

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
    const tdCount = 9;

    const tableData = {
        header: ["NO", "학년/반", "이름", "성별", "증상", "처치사항", "투약사항", "조치사항", "침상안정"],
        data: []
    }; 

    const statData = {
        header: ["감염병", "구강치아계", "근골격계", "비뇨생식기계", "소화기계", "순환기계", "안과계", "이비인후과계", "정신신경계", "호흡기계", "기타", "합계"],
        data: []
    }

    const DiseaseSelectBox = () => {
        const textArray = [];
        
        // 추가 처리 부분 : 아래 부분 타기 전에 서비스 여러번 호출하는 문제 처리해야 함
        if(user && diseaseTextArray.length == 0) {
            axios.get('http://localhost:8000/getDiseaseItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                response.data.map((item) => {
                    textArray.push(item.diseaseText);
                })
                setDiseaseTextArray(textArray);
            });
        }
        
        if(diseaseTextArray.length > 0) {
            const optionArray = [];
            for(let i = 0; i < diseaseTextArray.length; i++) {
                optionArray.push(
                    <option key={i} value={diseaseTextArray[i]}>{diseaseTextArray[i]}</option>
                )
            }

            // 현재 모든 Select Box가 동시 적용되는 문제 있음 -> 수정 필요
            if(stateSelectBox) {
                return (
                    <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                )
            }else{

                return (
                    <div>
                        <div name='hiddenInput' hidden={true}>
                            <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                        </div>
                        <div hidden={false} className='select is-small' style={{ margin: 1 }}>
                            <select id='selectBox' onChange={handleChangeSelect}>
                                <option>항목 선택</option>
                                <option value='directInput'>직접 입력</option>
                                {optionArray}
                            </select>
                        </div>
                    </div>
                )
            }
        }
    }

    const handleChangeSelect = (event) => {
        if(event.target.value == 'directInput') {
            setStateSelectBox(true);
        }
    }

    const clickInput = (event) => {
        // debugger
    }

    const handleRightClick = (event) => {
        event.preventDefault();
    }

    const onBed = (event) => {
        event.preventDefault();
        setBedModalShow(true);
    }

    const createTr = () => {
        const result = [];
        for(let i = 1; i <= rowCount; i++) {
            result.push(
                <tr key={i}>
                    <td key={i + 1} style={{height: 30, textAlign: 'center', padding: 0}}>
                        {i}
                    </td>
                    <td key={i + 2} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input id='gradeClass' style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 3} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input id='studentName' style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 4} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 5} style={{height: 30, textAlign: 'center', padding: 0}}>
                        {/* <input name='directInput' style={{ border: 'none', outline: 'none', width: '100%', height: 30}} onClick={clickInput} onContextMenu={handleRightClick}/> */}
                        <DiseaseSelectBox/>
                    </td>
                    <td key={i + 6} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 7} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 8} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 9} style={{ height : 30, padding : 0 }}>
                        <div id='bedButtonDiv' style={{ height : 20, marginBottom : -3, marginTop : 5, marginLeft : 7 }} hidden>
                            <button id={i} className='button is-small is-outlined' style={{ height : 20 }} onClick={onBed}>사용등록</button>
                            {/* <button id={i} className='button is-small is-warning' style={{ height : 20, width : 35, marginLeft : 5 }}>OFF</button> */}
                        </div>
                        {/* <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/> */}
                        {/* <div id='isBedToggle' name="isBedToggleDiv" hidden={true}>
                            <input type="checkbox" id="toggle" hidden/> 
                            <label htmlFor="toggle" className="toggleSwitch">
                                <span className="toggleButton"></span>
                            </label>
                        </div> */}
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

    // Enter 시 자주 사용하는 문구 등록하는 Modal이 닫기는 현상 막기 위해 Enter 이벤트 막음
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;
        
        if(e.key === 'Enter') {
            event.preventDefault();
            return;
        }
    });

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

    // const handleRegistBedStatusClose = (event) => {
    //     event.preventDefault();
    //     setRegistBedStatus(false);
    // }
 
    const handleUseBedNotificationClose = (event) => {
        event.preventDefault();
        setBedNotificationModal(false);
    }

    const handleBedSettingModalShow = (event) => {
        
    }

    const handleBedSettingModalClose = (event) => {
        event.preventDefault();
        setBedSettingModalShow(false);
    }

    const handleBedModalClose = (event) => {
        event.preventDefault();
        setBedModalShow(false);
    }

    const handleDiseaseModalShow = (event) => {
         event.preventDefault();
         getDisease();
         setDiseaseModalShow(true);
    }

    const handleDiseaseModalClose = (event) => {
        event.preventDefault();
        setDiseaseModalShow(false);
    }

    const handleTreatModalShow = (event) => {
        event.preventDefault();
        getTreats();
        setTreatModalShow(true);
    }

    const handleTreatModalClose = (event) => {
        event.preventDefault();
        setTreatModalShow(false);
    }

    const handleMedicineModalShow = (event) => {
        event.preventDefault();
        getMedicine();
        setMedicineModalShow(true);
    }

    const handleMedicineModalClose = (event) => {
        event.preventDefault();
        setMedicineModalShow(false);
    }

    const getDisease = async () => {
        let diseaseItemList = [];
        if(user) {
            const response = await axios.get('http://localhost:8000/getDiseaseItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            });

            if(response.data) {
                for(let i = 0; i < response.data.length; i++) {
                    diseaseItemList.push(response.data[i]);
                }
            }
        }
        setDiseaseItemData(diseaseItemList);
    }

    const getTreats = async () => {
        let treatItemList = [];
        if(user) {
            const response = await axios.get('http://localhost:8000/getTreatItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            });
            
            if(response.data) {
                for(let i = 0; i < response.data.length; i++) {
                    treatItemList.push(response.data[i]);
                }
            }
        }
        setTreatItemData(treatItemList);
    }

    const getMedicine = async () => {
        let medicineItemList = [];
        if(user) {
            const response = await axios.get('http://localhost:8000/getMedicineItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            });

            if(response.data) {
                for(let i = 0; i < response.data.length; i++) {
                    medicineItemList.push(response.data[i]);
                }
            }
        }
        setMedicineItemData(medicineItemList);
    }

    const removeDiseaseItem = (event) => {
        event.preventDefault();
        const userId = user.userId;
        const userName = user.userName;
        const diseaseText = event.target.parentElement.getElementsByTagName('input')[0].value;

        try {
            axios.post('http://localhost:8000/removeDiseaseItem', {
                userId : userId,
                userName : userName,
                diseaseText : diseaseText
            }).then((response) => {
                getDisease();
            });

            setRemoveDiseaseToast(true);
        } catch (error) {
            console.log(error);
        }
    }

    const removeTreatItem = (event) => {
        event.preventDefault();
        const userId = user.userId;
        const userName = user.userName;
        const treatText = event.target.parentElement.getElementsByTagName('input')[0].value;

        try {
            axios.post('http://localhost:8000/removeTreatItem', {
                userId : userId,
                userName : userName,
                treatText : treatText
            }).then((response) => {
                getTreats();
            });

            setRemoveTreatToast(true);
        } catch (error) {
            console.log(error);
        }
        
    }

    const removeMedicineItem = (event) => {
        event.preventDefault();
        const userId = user.userId;
        const userName = user.userName;
        const medicineText = event.target.parentElement.getElementsByTagName('input')[0].value;

        try {
            axios.post('http://localhost:8000/removeMedicineItem', {
                userId : userId,
                userName : userName,
                medicineText : medicineText
            }).then((response) => {
                getMedicine();
            });

            setRemoveMedicineToast(true);
        } catch (error) {
            console.log(error);
        }
    }

    const GetDiseaseItems = () => {
        const registeredDiseaseItems = [];
        if(diseaseItemData.length > 0) {
            for(let i = 0; i < diseaseItemData.length; i++) {
                registeredDiseaseItems.push(
                    <div key={i}>
                        <input className='input' name='registeredDiseaseItem' type='text' value={diseaseItemData[i].diseaseText || ''} readOnly={true} style={{ width : '85%', height : 30, fontSize : 15 }}/>
                        <button key={i} className='button is-small is-danger' style={{ marginLeft : 20 }} onClick={removeDiseaseItem}>삭제</button>
                    </div>
                )
            }
        }

        return registeredDiseaseItems;
    }

    const GetTreatItems = () => {
        const registeredTreatItems = [];
        if(treatItemData.length > 0) {
            // const existViewItems = document.getElementById('treatItemList').getElementsByTagName('input');
            // for(let i = 0; i < existViewItems.length; i++) {
            //     document.getElementById('treatItemList').removeChild(existViewItems[i]);
            // }

            for(let i = 0; i < treatItemData.length; i++) {
                registeredTreatItems.push(
                    <div key={i}>
                        <input className='input' name='registeredTreatItem' type='text' value={treatItemData[i].treatText || ''} readOnly={true} style={{ width : '85%', height : 30, fontSize : 15 }}/>
                        <button key={i} className='button is-small is-danger' style={{ marginLeft : 20 }} onClick={removeTreatItem}>삭제</button>
                    </div>
                )
            }
        }

        return registeredTreatItems;
    }

    const GetMedicineItems = () => {
        const registeredMedicineItems = [];
        if(medicineItemData.length > 0) {
            for(let i = 0; i < medicineItemData.length; i++) {
                registeredMedicineItems.push(
                    <div key={i}>
                        <input className='input' name='registeredMedicineItem' type='text' value={medicineItemData[i].medicineText || ''} readOnly={true} style={{ width : '85%', height : 30, fontSize : 15}}/>
                        <button key={i} className='button is-small is-danger' style={{ marginLeft : 20 }} onClick={removeMedicineItem}>삭제</button>
                    </div>
                )
            }
        }else{
            // registeredMedicineItems.push(
            //     <div key={1}>
            //         <input className='input' name='medicineItem' type='text' placeholder='문구를 입력해주세요.' style={{ width : '100%', height : 30, fontSize : 15 }}/>
            //     </div>
            // )
        }

        return registeredMedicineItems;
    }

    // [자주 사용하는 병명 문구 등록] -> 하단 항목 추가 시 Input 추가 Function
    const plusDiseaseItem = (event) => {
        event.preventDefault();
        const inp = document.createElement('input');
        const renderedInput = event.target.parentElement.parentElement.getElementsByTagName('input');
        const registedCharCount = renderedInput[renderedInput.length - 1].value.length;
        
        if(registedCharCount === 0) {
            setToast(true);
            return;
        }else{
            inp.className = 'input';
            inp.placeholder = '문구를 입력해주세요'
            inp.setAttribute('style', 'height : 30px; fontSize : 15px; width : 100%;');
    
            document.getElementById('diseaseItemList').appendChild(inp); 
        }
    }

    // [자주 사용하는 처치사항 문구 등록] -> 하단 항목 추가 시 Input 추가 Function
    const plusTreatItem = (event) => {
        event.preventDefault();
        const inp = document.createElement('input');
        const renderedInput = event.target.parentElement.parentElement.getElementsByTagName('input');
        const registedCharCount = renderedInput[renderedInput.length - 1].value.length;
        
        if(registedCharCount === 0) {
            setToast(true);
            return;
        }else{
            inp.className = 'input';
            inp.placeholder = '문구를 입력해주세요'
            inp.setAttribute('style', 'height : 30px; fontSize : 15px; width : 100%;');
    
            document.getElementById('treatItemList').appendChild(inp); 
        }
    }
    // [자주 사용하는 투약사항 문구 등록] -> 하단 항목 추가 시 Input 추가 Function
    const plusMedicineItem = (event) => {
        event.preventDefault();
        const inp = document.createElement('input');
        const renderedInput = event.target.parentElement.parentElement.getElementsByTagName('input');
        const registedCharCount = renderedInput[renderedInput.length - 1].value.length;

        if(registedCharCount === 0) {
            setToast(true);
            return;
        }else{
            inp.className = 'input';
            inp.placeholder = '문구를 입력해주세요'
            inp.setAttribute('style', 'height : 30px; fontSize : 15px; width : 100%;');
    
            document.getElementById('medicineItemList').appendChild(inp); 
        }
    }

    // [자주 사용하는 병명 문구 등록] -> 문구 입력 후 저장 시 호출 Function
    const addDiseaseItem = (event) => {
        event.preventDefault();
        // 이미 등록된 문구 담을 Empty Array
        const registeredDiseaseItems = [];
        // 현재 입력한 Input Text
        const currentInputValue = event.target.getElementsByTagName('input')['diseaseItem'].value;
        // 문구 상위에서 전체를 감싸고 있는 Form 하위의 Input 태그
        let diseaseItems = event.target.getElementsByTagName('input');
        // [diseaseItemData = Server에서 받아온 이미 등록되어 있는 문구] -> registeredDiseaseItems에 담음
        diseaseItemData.forEach(item => { registeredDiseaseItems.push(item.diseaseText) });

        // 현재 전체 Input 태그들을 돌면서 등록된 문구에 포함되어 있지 않을 시에 Add Service 호출
        for(let i = 0; i < diseaseItems.length; i++) {
            if(!registeredDiseaseItems.includes(diseaseItems[i].value)) {
                if(diseaseItems[i].value.length > 0) {
                    try {
                        axios.post('http://localhost:8000/addDiseaseItem', {
                            userId : user.userId,
                            userName : user.userName,
                            diseaseText : diseaseItems[i].value
                        }).then((response) => {
                            // Add 하고 난 뒤 목록 불러오는 Service 다시 호출하여 목록 Reload
                            getDisease();
                        });
                        // 등록 성공 Toast 출력
                        setRegistDiseaseSuccessToast(true);
                        setInputText('');
                    } catch (error) {
                        console.log(error);
                    }
                }
            }else{
                if(registeredDiseaseItems.includes(currentInputValue)) {
                    setRegistDiseaseFailedToast(true);
                }
            }
        }
    }

    // [자주 사용하는 투약사항 문구 등록] -> 문구 입력 후 저장 시 호출 Function
    const addMedicineItem = (event) => {
        event.preventDefault();
        // 이미 등록된 문구 담을 Empty Array
        const registeredMedicineItems = [];
        // 현재 입력한 Input Text
        const currentInputValue = event.target.getElementsByTagName('input')['medicineItem'].value;
        // 문구 상위에서 전체를 감싸고 있는 Form 하위의 Input 태그
        let medicineItems = event.target.getElementsByTagName('input');
        // [medicineItemData = Server에서 받아온 이미 등록되어 있는 문구] -> registeredMedicineItems에 담음
        medicineItemData.forEach(item => { registeredMedicineItems.push(item.medicineText) });
        
        // 현재 전체 Input 태그들을 돌면서 등록된 문구에 포함되어 있지 않을 시에 Add Service 호출
        for(let i = 0; i < medicineItems.length; i++) {
            if(!registeredMedicineItems.includes(medicineItems[i].value)) {
                if(medicineItems[i].value.length > 0) {
                    try {
                        axios.post('http://localhost:8000/addMedicineItem', {
                            userId : user.userId,
                            userName : user.userName,
                            medicineText : medicineItems[i].value
                        }).then((response) => {
                            // Add 하고 난 뒤 목록 불러오는 Service 다시 호출하여 목록 Reload
                            getMedicine();
                        });
                        // 등록 성공 Toast 출력
                        setRegistMedicineSuccessToast(true);
                        setInputText('');
                    } catch (error) {
                        console.log(error);
                    }
                }
            }else{
                if(registeredMedicineItems.includes(currentInputValue)) {
                    setRegistMedicineFailedToast(true);
                }
            }
        }
    }

    // [자주 사용하는 처치사항 문구 등록] -> 문구 입력 후 저장 시 호출 Function
    const addTreatItem = (event) => {
        event.preventDefault();
        // 이미 등록된 문구 담을 Empty Array
        const registeredTreatItems = [];
        // 현재 입력한 Input Text
        const currentInputValue = event.target.getElementsByTagName('input')['treatItem'].value;
        // 문구 상위에서 전체를 감싸고 있는 Form 하위의 Input 태그 
        let treatItems = event.target.getElementsByTagName('input');
        // [treatItemData = Server에서 받아온 이미 등록되어 있는 문구] -> registeredTreatItems에 담음
        treatItemData.forEach(item => { registeredTreatItems.push(item.treatText) });
        
        // 현재 전체 Input 태그들을 돌면서 등록된 문구에 포함되어 있지 않을 시에 Add Service 호출
        for(let i = 0; i < treatItems.length; i++) {
            if(!registeredTreatItems.includes(treatItems[i].value)) {
                if(treatItems[i].value.length > 0) {
                    try {
                        axios.post('http://localhost:8000/addTreatItem', {
                            userId : user.userId,
                            userName : user.userName,
                            treatText : treatItems[i].value
                        }).then((response) => {
                            // Add 하고 난 뒤 목록 불러오는 Service 다시 호출하여 목록 Reload
                            getTreats();
                        });
                        // 등록 성공 Toast 출력
                        setRegistTreatSuccessToast(true);
                        setInputText('');
                    }catch (error) {
                        console.log(error);
                    }
                }
            }else{
                if(registeredTreatItems.includes(currentInputValue)) {
                    setRegistTreatFailedToast(true);
                }
            }
        }
    }

    const onChangeForm = (event) => {
        event.preventDefault();
        const inputText = event.target.value;
        let isBedDiv = event.target.parentElement.parentElement.getElementsByTagName('div')['bedButtonDiv'];
        
        if(inputText.length > 0) {
            isBedDiv.hidden = false;
            const studentName = event.target.parentElement.parentElement.getElementsByTagName('input')['studentName'].value;
            setStudentName(studentName);
        }else{
            isBedDiv.hidden = true;
        }
    }

    const onInputForm = (event) => {
    }

    const inputTextHandler = (event) => {
        const inputText = event.target.value;
        setInputText(inputText);
    } 

    const BedBox = (event) => {
        const bedBox = [];
        
        if(bedModalshow) {
            getBedCount();

            if(registeredBedCount) {
                for(let i = 0; i < Number(registeredBedCount); i++) {
                    bedBox.push(
                        <div key={i} id={'bed' + (i + 1)} className='box ml-2' style={{ float : 'left', padding : 15, paddingBottom : 0 }}>
                            <p id='bedUseStatus'><span className='tag'>미사용중</span></p>
                            <p id={'bed' + (i + 1)}><FaBed style={{ fontSize : 50 }}/></p>
                            <button className='button is-small is-info is-light' status='notUse' onClick={handleBedUseStatus}>침상 사용</button>
                        </div>
                        
                    )
                }
            }
        }
        
        return (
            <div>
                {bedBox}
            </div>
        )
    }

    const handleBedUseStatus = (event) => {
        event.preventDefault();
        debugger
        const bedUseStatus = event.target.parentElement.children['bedUseStatus'];
        const iconTag = event.target.parentElement.children[1];
        const bedButton = event.target.parentElement.children[2];
        
        if(studentName) {
            if(bedButton.getAttribute('status') == 'notUse') {
                bedButton.setAttribute('status', 'use');
                bedButton.className = 'button is-small is-danger is-light';
                bedButton.innerHTML = '침상 미사용';

                bedUseStatus.children[0].className = 'tag is-info';
                bedUseStatus.children[0].innerHTML = studentName;
                
                iconTag.style.color = 'lightblue';

                handleUseBedNotification();
            }else{
                bedButton.setAttribute('status', 'notUse');
                bedButton.className = 'button is-small is-info is-light';
                bedButton.innerHTML = '침상 사용';

                bedUseStatus.children[0].className = 'tag';
                bedUseStatus.children[0].innerHTML = '미사용중';
                
                iconTag.style.color = '';
            }
        }
    }

    const handleUseBedNotification = () => {
        setBedNotificationModal(true);
    }

    const handleBedCount = (event) => {
        const selectedCount = event.target.value;
        if(selectedCount) {
            setBedCount(selectedCount);
        }
    }

    const handleBedSetting = (event) => {
        event.preventDefault();
        getBedCount();
        setBedSettingModalShow(true);
    }

    const submitBedSetting = (event) => {
        event.preventDefault();
        const bedCount = Number(event.target.getElementsByTagName('input')[0].value);
        if(user) {
            if(!registeredBedCount) {
                axios.post('http://localhost:8000/setBedCount', {
                    userId : user.userId,
                    userName : user.userName,
                    bedCount : bedCount
                }).then((response) => {
                    setBedCountSuccessToast(true);
                    getBedCount();
                });
            }else{
                if(bedCount == registeredBedCount) {
                    // 이미 설정된 침상 수이다 토스트
                    setBedCountFailedToast(true);
                }else{
                    // 침상 수 업데이트
                    axios.post('http://localhost:8000/updateBedCount', {
                        userId : user.userId,
                        userName : user.userName,
                        bedCount : bedCount
                    }).then((response) => {
                        setBedCountUpdateToast(true);
                        getBedCount();
                    });
                }
            }
        }
    }

    const getBedCount = () => {
        if(user) {
            axios.get('http://localhost:8000/getBedCount', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                if(response.data.length > 0) {
                    const bedCountInput = document.getElementById('bedCountInput');
                    bedCountInput.setAttribute('value', response.data[0].bedCount);
                    setRegisteredBedCount(response.data[0].bedCount);
                }
            });
        }
    }

    return (
        <div className="container mt-5" >
            <table className="table is-bordered is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {statData.header.map((item) => {
                            return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center', fontSize : 15 }}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {createStatTr()}
                </tbody>
            </table>
            <hr/>
            <div style={{ float: 'left', marginLeft: 10, marginTop: 5 }}>
                <span style={{ verticalAlign : 'middle', fontSize : 17 }}><b><Today /></b></span>
            </div>
            <div style={{ float: 'right' }}>
                <button className='button is-small is-info is-outlined' style={{ marginRight : 5 }} onClick={handleBedSetting}>
                    <span className='icon is-small'>
                        <FaBed style={{ fontSize : 17 }}/>
                    </span>
                </button>
                <button className='button is-small is-info is-outlined' style={{ marginRight : 5 }}>
                    <span className='icon is-small'>
                        <AiOutlineSave style={{ fontSize : 17 }}/>
                    </span>
                </button>
                <button className='button is-small is-info is-outlined' style={{ marginRight : 5 }}>
                    <span className='icon is-small'>
                        <AiOutlinePrinter style={{ fontSize : 17 }}/>
                    </span>
                </button>
                <input 
                    className='input is-info'
                    placeholder='검색어를 입력하세요'
                    style={{ width: 200, fontSize : 13 }}
                />
            </div>

            <form onChange={onChangeForm} onInput={onInputForm}>
                <table className="table is-bordered is-fullwidth is-hoverable">
                    <thead style={{ fontSize : 15 }}>
                        <tr>
                            {tableData.header.map((item) => {
                                if(item == "학년/반") {
                                    return <th key={item} width="100" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                                }else if(item == "이름" || item == "성별" || item == "NO") {
                                    return <th key={item} width="70" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                                }else if(item == "침상안정") {
                                    return <th key={item} width="90" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>{item}</th>;
                                }else if(item == "투약사항") {
                                    return <th key={item} width="200" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                        {item}
                                        <FaStar style={{ color : 'gold', fontSize : 17, marginBottom : -3, marginLeft : 5, cursor : 'pointer' }} onClick={handleMedicineModalShow} />
                                    </th>;
                                }else if(item == "처치사항") {
                                    return <th key={item} width="450" style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                        {item}
                                        <FaStar style={{ color : 'gold', fontSize : 17, marginBottom : -3, marginLeft : 5, cursor : 'pointer' }} onClick={handleTreatModalShow}/>
                                    </th>;
                                }else if(item == "증상") {
                                    return <th key={item} style={{backgroundColor: '#96C7ED', textAlign: 'center'}}>
                                        {item}
                                        <FaStar style={{ color : 'gold', fontSize : 17, marginBottom : -3, marginLeft : 5, cursor : 'pointer' }} onClick={handleDiseaseModalShow}/>
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
            </form>

            <div style={{ marginTop : 20 }}>
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
            </div>

            <div className= {bedSettingModalShow ? 'modal is-active' : 'modal'}>
                {bedCountSuccessToast && <Toast setToast={setBedCountSuccessToast} text="침상 수 설정이 정상적으로 저장되었습니다."></Toast>}
                {bedCountFailedToast && <Toast setToast={setBedCountFailedToast} text="이미 설정된 침상 수입니다."></Toast>}
                {bedCountUpdateToast && <Toast setToast={setBedCountUpdateToast} text="침상 수 수정이 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={submitBedSetting}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 250}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 15, fontWeight : 'bold' }}>침상 설정</p>
                            <button className='delete' aria-label='close' onClick={handleBedSettingModalClose}></button>
                        </header>
                        <section className='modal-card-body'>
                            <div style={{ marginLeft : 35, marginBottom : -10 }}>
                                <span style={{ fontSize : 15 }}><b>침상 수 : </b></span>
                                <input id='bedCountInput' className='input is-small' type='number' style={{ width : 70, marginLeft : 10, marginTop : -2 }} />
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 130, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={handleBedSettingModalClose}>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

            <div className= {bedModalshow ? 'modal is-active' : 'modal'}>
                
                {/* <div className= {bedNotificationModal ? 'modal is-active' : 'modal'}>
                    <form>
                        <div className='modal-background'></div>
                            <div className='modal-card' style={{ display : 'inline' }}>
                            <header className='modal-card-head'>
                                <p className='modal-card-title' style={{ fontSize : 15, fontWeight : 'bold' }}>침상 사용 알림</p>
                                <button className='delete' aria-label='close' onClick={handleBedModalClose}></button>
                            </header>
                            <section className='modal-card-body' style={{ maxHeight : 300 }}>

                            </section>
                            <footer className='modal-card-foot' style={{ padding : 0 }}> */}
                                {/* 버튼 우측 정렬하는 방법 */}
                                {/* <div style={{ marginTop : 10, marginLeft : 'auto', marginRight : 10 }}>
                                    <button className='button is-info is-small'>저장</button>
                                    <button className='button is-small' onClick={handleBedModalClose}>닫기</button>
                                </div>
                            </footer>
                        </div>
                    </form>
                </div> */}

                <form>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ display : 'inline' }}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 15, fontWeight : 'bold' }}>침상안정 등록</p>
                            <button className='delete' aria-label='close' onClick={handleBedModalClose}></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                            <BedBox/>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            {/* 버튼 우측 정렬하는 방법 */}
                            <div style={{ marginTop : 10, marginLeft : 'auto', marginRight : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={handleBedModalClose}>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

            <div className= {diseaseModalshow ? 'modal is-active' : 'modal'}>
            {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
            {registDiseaseSuccessToast && <Toast setToast={setRegistDiseaseSuccessToast} text="작성하신 증상명이 정상적으로 등록되었습니다."></Toast>}
            {registDiseaseFailedToast && <Toast setToast={setRegistDiseaseFailedToast} text="동일하게 작성하신 증상명이 이미 존재합니다."></Toast>}
            {removeDiseaseToast && <Toast setToast={setRemoveDiseaseToast} text="증상명 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addDiseaseItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 병명 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleDiseaseModalClose }></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                            <ul id='diseaseItemList'>
                                <GetDiseaseItems/>
                                <input className='input' name='diseaseItem' onChange={inputTextHandler} value={inputText} type='text' placeholder='문구를 입력해주세요' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                {/* <button className='button is-small' onClick={plusDiseaseItem}>항목 추가</button> */}
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 420, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={ handleDiseaseModalClose }>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

            <div className= {treatModalshow ? 'modal is-active' : 'modal'}>
            {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
            {registTreatSuccessToast && <Toast setToast={setRegistTreatSuccessToast} text="작성하신 처치사항이 정상적으로 등록되었습니다."></Toast>}
            {registTreatFailedToast && <Toast setToast={setRegistTreatFailedToast} text="동일하게 작성하신 처치사항이 이미 존재합니다."></Toast>}
            {removeTreatToast && <Toast setToast={setRemoveTreatToast} text="처치사항 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addTreatItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 처치사항 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleTreatModalClose }></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                            <ul id='treatItemList'>
                                <GetTreatItems/>
                                <input className='input' name='treatItem' onChange={inputTextHandler} value={inputText} type='text' placeholder='문구를 입력해주세요' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                {/* <button className='button is-small' onClick={plusTreatItem}>항목 추가</button> */}
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
            {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
            {registMedicineSuccessToast && <Toast setToast={setRegistMedicineSuccessToast} text="작성하신 투약사항이 정상적으로 등록되었습니다."></Toast>}
            {registMedicineFailedToast && <Toast setToast={setRegistMedicineFailedToast} text="동일하게 작성하신 투약사항이 이미 존재합니다."></Toast>}
            {removeMedicineToast && <Toast setToast={setRemoveMedicineToast} text="투약사항 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addMedicineItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 투약사항 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleMedicineModalClose }></button>
                        </header>
                        <section className='modal-card-body'>
                            <ul id='medicineItemList'>
                                <GetMedicineItems/>
                                <input className='input' name='medicineItem' onChange={inputTextHandler} value={inputText} type='text' placeholder='문구를 입력해주세요.' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                {/* <button className='button is-small' onClick={plusMedicineItem}>항목 추가</button> */}
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