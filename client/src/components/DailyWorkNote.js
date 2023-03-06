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
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineSave } from 'react-icons/ai';
import { FiPlusSquare } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Toast from './Toast.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './style/toggleButton.css';

const DailyWorkNote = () => {

    const [user, setUser] = useState(null);
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

    useEffect(() => {
        getUser();
        getDisease();
        getTreats();
        getMedicine();

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
        header: ["NO", "학년/반", "이름", "성별", "병명", "처치사항", "투약사항", "특이사항", "침상안정"],
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
                    <td key={i + 1} style={{height: 30, textAlign: 'center', padding: 0}}>
                        {i}
                    </td>
                    <td key={i + 2} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 3} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 4} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
                    </td>
                    <td key={i + 5} style={{height: 30, textAlign: 'center', padding: 0}}>
                        <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/>
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
                    <td key={i + 9} style={{height: 30, textAlign: 'center', padding: 0}}>
                        {/* <input style={{ border: 'none', outline: 'none', width: '100%', height: '100%'}}/> */}
                        <div name="isBedToggleDiv" hidden={true}>
                            <input type="checkbox" id="toggle" hidden/> 
                            <label htmlFor="toggle" className="toggleSwitch">
                                <span className="toggleButton"></span>
                            </label>
                        </div>
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
        
        if(event.target.id != 'toggle') {
            const isBedDiv = event.target.parentElement.parentElement.getElementsByTagName('td')[8].firstChild;
            if(inputText.length > 0) {
                isBedDiv.hidden = false;
                const toggleList = document.querySelectorAll(".toggleSwitch");
                toggleList.forEach(($toggle) => {
                    $toggle.onclick = () => {
                        $toggle.classList.toggle('active');
                    }
                })
            }else{
                isBedDiv.hidden = true;
            }
        }else{
            // Toggle 스위치 켤때 걸림
            //침상안정 등록 위한 Modal Show
            setBedModalShow(true);
        }
    }

    const onInputForm = (event) => {
        if(event.target.id == 'toggle') {
            // Toggle 스위치 끌때 걸림
            debugger
        }
    }

    const inputTextHandler = (event) => {
        const inputText = event.target.value;
        setInputText(inputText);
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
                    style={{ width: 200, fontSize : 15 }}
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
                                }else if(item == "병명") {
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

            <div className= {bedModalshow ? 'modal is-active' : 'modal'}>
                <form>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 17, fontWeight : 'bold' }}>침상안정 등록</p>
                            <button className='delete' aria-label='close' onClick={handleBedModalClose}></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 420, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={handleBedModalClose}>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

            <div className= {diseaseModalshow ? 'modal is-active' : 'modal'}>
            {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
            {registDiseaseSuccessToast && <Toast setToast={setRegistDiseaseSuccessToast} text="작성하신 병명이 정상적으로 등록되었습니다."></Toast>}
            {registDiseaseFailedToast && <Toast setToast={setRegistDiseaseFailedToast} text="동일하게 작성하신 병명이 이미 존재합니다."></Toast>}
            {removeDiseaseToast && <Toast setToast={setRemoveDiseaseToast} text="병명 삭제가 정상적으로 처리되었습니다."></Toast>}
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
                                <button className='button is-small' onClick={plusDiseaseItem}>항목 추가</button>
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