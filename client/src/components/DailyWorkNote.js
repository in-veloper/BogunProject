/* eslint-disable */

import { FaAngleDown, FaDAndDBeyond } from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineSave, AiOutlineNotification } from 'react-icons/ai';
import { FiPlusSquare } from 'react-icons/fi';
import { FaStar, FaBed } from 'react-icons/fa';
import React, { useState, useEffect, useContext, useDebugValue } from 'react';
import Toast from './Toast.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './style/toggleButton.css';
import Moment from 'moment';
import "moment/locale/ko";
import { UserContext } from '../store/User.js';
import { WorkStatusContext } from '../store/WorkStatus.js';

const DailyWorkNote = () => {

    // const [time, setTime] = useState('');
    // const [convertTime, setConvertTime] = useState('');
    const [user, setUser] = useState(null);
    const [studentJsonData, setStudentJsonData] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [diseaseModalshow, setDiseaseModalShow] = useState(false);
    const [treatModalshow, setTreatModalShow] = useState(false);
    const [medicineModalShow, setMedicineModalShow] = useState(false);
    const [reactModalShow, setReactModalShow] = useState(false);
    const [toast, setToast] = useState(false);
    const [registDiseaseSuccessToast, setRegistDiseaseSuccessToast] = useState(false);
    const [registDiseaseFailedToast, setRegistDiseaseFailedToast] = useState(false);
    const [registTreatSuccessToast, setRegistTreatSuccessToast] = useState(false);
    const [registTreatFailedToast, setRegistTreatFailedToast] = useState(false);
    const [registMedicineSuccessToast, setRegistMedicineSuccessToast] = useState(false);
    const [registMedicineFailedToast, setRegistMedicineFailedToast] = useState(false);
    const [registReactSuccessToast, setRegistReactSuccessToast] = useState(false);
    const [registReactFailedToast, setRegistReactFailedToast] = useState(false);
    const [removeDiseaseToast, setRemoveDiseaseToast] = useState(false);
    const [removeTreatToast, setRemoveTreatToast] = useState(false);
    const [removeMedicineToast, setRemoveMedicineToast] = useState(false);
    const [removeReactToast, setRemoveReactToast] = useState(false);
    const [diseaseItemData, setDiseaseItemData] = useState([]);
    const [treatItemData, setTreatItemData] = useState([]);
    const [medicineItemData, setMedicineItemData] = useState([]);
    const [reactItemData, setReactItemData] = useState([]);
    const [diseaseTextArray, setDiseaseTextArray] = useState([]);
    const [treatTextArray, setTreatTextArray] = useState([]);
    const [medicineTextArray, setMedicineTextArray] = useState([]);
    const [reactTextArray, setReactTextArray] = useState([]);
    const [inputText, setInputText] = useState('');

    const [registeredBedCount, setRegisteredBedCount] = useState(-1);
    const [bedCountSuccessToast, setBedCountSuccessToast] = useState(false);
    const [bedCountFailedToast, setBedCountFailedToast] = useState(false);
    const [bedCountUpdateToast, setBedCountUpdateToast] = useState(false);

    const [bedSettingModalShow, setBedSettingModalShow] = useState(false);
    const [bedModalshow, setBedModalShow] = useState(false);
    
    const [bedCountUpdateStatus, setBedCountUpdateStatus] = useState(false);
    const [drawBoxStatus, setDrawBoxStatus] = useState(false);
    const [bedCount, setBedCount] = useState(null);

    const [workNoteTargetStudentResult, setWorkNoteTargetStudentResult] = useState([]);
    const [workNoteDayState, setWorkNoteDayState] = useState(false);
    const [workNoteDayResult, setWorkNoteDayResult] = useState([]);

    const [workNoteTargetState, setWorkNoteTargetState] = useState(false);
    const [workNoteTargetResult, setWorkNoteTargetResult] = useState([]);

    const [workNoteNoNameToast, setWorkNoteNoNameToast] = useState(false);
    const [workSubmitSuccessToast, setWorkSubmitSuccessToast] = useState(false);

    const [diseaseGetStatus, setDiseaseGetStatus] = useState(false);
    const [treatGetStatus, setTreatGetStatus] = useState(false);
    const [medicineGetStatus, setMedicineGetStatus] = useState(false);
    const [reactGetStatus, setReactGetStatus] = useState(false);

    const [searchDiseaseText, setSearchDiseaseText] = useState('');
    const [searchDiseaseTextArray, setSearchDiseaseTextArray] = useState([]);
    const [searchDiseaseStatus, setSearchDiseaseStatus] = useState(false);
    
    const [searchTreatText, setSearchTreatText] = useState('');
    const [searchTreatTextArray, setSearchTreatTextArray] = useState([]);
    const [searchTreatStatus, setSearchTreatStatus] = useState(false);
    
    const [searchMedicineText, setSearchMedicineText] = useState('');
    const [searchMedicineTextArray, setSearchMedicineTextArray] = useState([]);
    const [searchMedicineStatus, setSearchMedicineStatus] = useState(false);
    
    const [searchReactText, setSearchReactText] = useState('');
    const [searchReactTextArray, setSearchReactTextArray] = useState([]);
    const [searchReactStatus, setSearchReactStatus] = useState(false);

    const [removeBedUseStatusToast, setRemoveBedUseStatusToast] = useState(false);
    const [fullUsedBedToast, setFullUsedBedToast] = useState(false);

    useEffect(() => {
        getStudentData();
        getDisease();
        getTreats();
        getMedicine();
        getReact();
        getBedCount();
        getDayWorkNote();   // bedCount때처럼 계속 상시적으로 안받아옴 확인 후 동일하게 상시 받아올 수 있도록 처리
        getUsebedInfo();
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         let time = new Date();
    //         let hour = time.toLocaleTimeString().split(':')[0];
    //         let minutes = time.toLocaleTimeString().split(':')[1];
            
    //         setTime(hour + ":" + minutes);
    //         setConvertTime((time.getHours() + ":" + time.getMinutes()).toString());
    //     }, 1000);
    //     return (() => clearInterval(interval));
    // }, []);

    const context = useContext(UserContext);
    if(context && !user) {
        setUser(context);
    }

    // const workContext = useContext(WorkStatusContext);
    // debugger
    // if(workContext) {
    //     debugger
    // }

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

    const handleReactModalShow = (event) => {
        event.preventDefault();
        getReact();
        setReactModalShow(true);
    }

    const handleReactModalClose = (event) => {
        event.preventDefault();
        setReactModalShow(false);
    }

    const handleBedSettingModalClose = (event) => {
        event.preventDefault();
        setBedSettingModalShow(false);
    }

    const getBedCount = async () => {
        if(user && !bedCount) {
            const response = await axios.get('http://localhost:8000/getBedCount', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            });
            
            if(response.data.length > 0) {
                const bedCountInput = document.getElementById('bedCountInput');
                bedCountInput.setAttribute('value', response.data[0].bedCount);
                setBedCount(response.data[0].bedCount);
            }else{

            }
        }
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

    const getReact = async () => {
        let reactItemList = [];
        if(user) {
            const response = await axios.get('http://localhost:8000/getReactItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            });

            if(response.data) {
                for(let i = 0; i < response.data.length; i++) {
                    reactItemList.push(response.data[i]);
                }
            }
        }
        setReactItemData(reactItemList);
    }

    const getUsebedInfo = () => {
        if(user) {
            axios.get('http://localhost:8000/getUseBed', {
                params : {
                    userId : user.userId,
                    userName : user.userName,
                    schoolName : user.schoolName
                }
            }).then((response) => {
                const today = Moment().format('YYYY-MM-DD').toString();
                if(response.data.length > 0) {
                    for(let i = 0; i < response.data.length; i++) {
                        if(response.data[i].registDate == today && JSON.parse(response.data[i].useStatus)) {
                            const bedBox = document.getElementById('bed' + response.data[i].bedNumber);
                            if(bedBox) {
                                const useStatusTag = bedBox.getElementsByTagName('span')['bedUseStatus'];
                                // 여기서 에러 나고 있음 (빈 침상에 넣을 방법이랑 사용해제 방안 구상해야함)
                                useStatusTag.setAttribute('class', 'tag is-info');
                                useStatusTag.setHTML(response.data[i].targetStudent);
                                bedBox.childNodes[1].style.color = 'lightblue';
                                bedBox.childNodes[2].disabled = false;
                                bedBox.style.border = '1px solid lightblue';

                                let targetStudent = '';
                                let bedStartTime = '';
                                let bedEndTime = '';
                                let registDate = '';
                                let bedNumber = '';
                                let useStatus = '';

                                if(useStatusTag) {
                                    if(response.data[i].targetStudent == useStatusTag.textContent) {
                                        targetStudent = response.data[i].targetStudent;
                                        bedStartTime = response.data[i].bedStartTime;
                                        bedEndTime = response.data[i].bedEndTime;
                                        registDate = response.data[i].registDate;
                                        bedNumber = response.data[i].bedNumber;
                                        useStatus = response.data[i].useStatus;
                                    }
                                }

                                bedBox.childNodes[2].addEventListener('click', () => { removeBedUseStatus(targetStudent, bedStartTime, bedEndTime, registDate, bedNumber, useStatus) });
                            }
                        }

                    }
                }
            });
        }
    }

    const removeBedUseStatus = (targetStudent, bedStartTime, bedEndTime, registDate, bedNumber, useStatus) => {
        if(user && targetStudent.length > 0) {
            const time = Moment().format('HH:mm');
            
            axios.post('http://localhost:8000/updateUseBedStatus', {
                userId : user.userId,
                userName : user.userName,
                schoolName : user.schoolName,
                targetStudent : targetStudent,
                bedStartTime : bedStartTime,
                bedEndTime : time,
                registDate : registDate,
                bedNumber : bedNumber,
                useStatus : 'false'
            }).then((response) => {
                setRemoveBedUseStatusToast(true);
                // getDayWorkNote();
                // 여기서 204 에러 발생 후 preflight 발생 처리 해야할 부분
                // getUsebedInfo();
            });

            // 바로 반영되어 새로고침되지 않고 있음 (확인 필요)
            axios.post('http://localhost:8000/updateUseBedWorkNote', {
                userId : user.userId,
                userName : user.userName,
                schoolName : user.schoolName,
                studentName : targetStudent,
                bedStartTime : bedStartTime,
                bedEndTime : time,
                registDate : registDate
            }).then((response) => {

            });

            
        }
    }

    const GetDiseaseItems = () => {
        const registeredDiseaseItems = [];
        if(diseaseItemData.length > 0) {
            for(let i = 0; i < diseaseItemData.length; i++) {
                registeredDiseaseItems.push(
                    <div key={i} style={{ width : '100%', display : 'inline-flex' }}>
                        <span className='tag is-small' style={{ width : '25%' }}>{diseaseItemData[i].diseaseCategory}</span>
                        <input className='input ml-2' name='registeredDiseaseItem' type='text' value={diseaseItemData[i].diseaseText || ''} readOnly={true} style={{ height : 30, fontSize : 13 }}/>
                        <button key={i} className='button is-small is-danger ml-2' style={{ marginRight : 'auto' }} onClick={removeDiseaseItem}>삭제</button>
                    </div>
                )
            }
        }

        return registeredDiseaseItems;
    }

    const GetTreatItems = () => {
        const registeredTreatItems = [];
        if(treatItemData.length > 0) {
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

    const GetReactItems = () => {
        const registeredReactItems = [];
        if(reactItemData.length > 0) {
            for(let i = 0; i < reactItemData.length; i++) {
                registeredReactItems.push(
                    <div key={i}>
                        <input className='input' name='registeredReactItem' type='text' value={reactItemData[i].reactText || ''} readOnly={true} style={{ width : '85%', height : 30, fontSize : 15 }}/>
                        <button key={i} className='button is-small is-danger' style={{ marginLeft : 20 }} onClick={removeReactItem}>삭제</button>
                    </div>
                )
            }
        }

        return registeredReactItems;
    }

    const addDiseaseItem = (event) => {
        event.preventDefault();
        // 이미 등록된 문구 담을 Empty Array
        const registeredDiseaseItems = [];
        // 현재 입력한 Input Text
        const currentInputValue = event.target.getElementsByTagName('input')['newDiseaseItem'].value;
        
        const diseaseCategory = event.target.getElementsByTagName('select')[0].value;
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
                            diseaseCategory : diseaseCategory,
                            diseaseText : diseaseItems[i].value
                        }).then((response) => {
                            // Add 하고 난 뒤 목록 불러오는 Service 다시 호출하여 목록 Reload
                            getDisease();
                        });
                        // 등록 성공 Toast 출력
                        setRegistDiseaseSuccessToast(true);
                        event.target.getElementsByTagName('input')['newDiseaseItem'].value = '';
                        // setInputText('');
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
        const currentInputValue = event.target.getElementsByTagName('input')['newMedicineItem'].value;
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
                        event.target.getElementsByTagName('input')['newMedicineItem'].value = '';
                        // setInputText('');
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
        const currentInputValue = event.target.getElementsByTagName('input')['newTreatItem'].value;
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
                        event.target.getElementsByTagName('input')['newTreatItem'].value = '';
                        // setInputText('');
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

    // [자주 사용하는 조치사항 문구 등록] -> 문구 입력 후 저장 시 호출 Function
    const addReactItem = (event) => {
        event.preventDefault();
        // 이미 등록된 문구 담을 Empty Array
        const registeredReactItems = [];
        // 현재 입력한 Input Text
        const currentInputValue = event.target.getElementsByTagName('input')['newReactItem'].value;
        // 문구 상위에서 전체를 감싸고 있는 Form 하위의 Input 태그 
        let reactItems = event.target.getElementsByTagName('input');
        // [treatItemData = Server에서 받아온 이미 등록되어 있는 문구] -> registeredTreatItems에 담음
        reactItemData.forEach(item => { registeredReactItems.push(item.reactText) });
        
        // 현재 전체 Input 태그들을 돌면서 등록된 문구에 포함되어 있지 않을 시에 Add Service 호출
        for(let i = 0; i < reactItems.length; i++) {
            if(!registeredReactItems.includes(reactItems[i].value)) {
                if(reactItems[i].value.length > 0) {
                    try {
                        axios.post('http://localhost:8000/addReactItem', {
                            userId : user.userId,
                            userName : user.userName,
                            reactText : reactItems[i].value
                        }).then((response) => {
                            // Add 하고 난 뒤 목록 불러오는 Service 다시 호출하여 목록 Reload
                            getReact();
                        });
                        // 등록 성공 Toast 출력
                        setRegistReactSuccessToast(true);
                        event.target.getElementsByTagName('input')['newReactItem'].value = '';
                        // setInputText('');
                    }catch (error) {
                        console.log(error);
                    }
                }
            }else{
                if(registeredReactItems.includes(currentInputValue)) {
                    setRegistReactFailedToast(true);
                }
            }
        }
    }

    const inputTextHandler = (event) => {
        event.preventDefault();
        const inputText = event.target.value;
        // setInputText(inputText);
    } 

    const removeDiseaseItem = (event) => {
        event.preventDefault();
        const userId = user.userId;
        const userName = user.userName;
        const diseaseCategory = event.target.parentElement.getElementsByTagName('span')[0].textContent;
        const diseaseText = event.target.parentElement.getElementsByTagName('input')[0].value;

        try {
            axios.post('http://localhost:8000/removeDiseaseItem', {
                userId : userId,
                userName : userName,
                diseaseCategory : diseaseCategory,
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

    const removeReactItem = (event) => {
        event.preventDefault();
        const userId = user.userId;
        const userName = user.userName;
        const reactText = event.target.parentElement.getElementsByTagName('input')[0].value;

        try {
            axios.post('http://localhost:8000/removeReactItem', {
                userId : userId,
                userName : userName,
                reactText : reactText
            }).then((response) => {
                getReact();
            });

            setRemoveReactToast(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getStudentData = async() => {
        try{
            const response = await axios.get('http://localhost:8000/getNametable');
            if(response.data) {
                // 학년 Select Box에서 선택한 수가 있을 경우 그 수에 맞는 반 Max와 번호 Max 구해서 Select Box에 넣기
                // 선택한 학년 없을 경우에는 먼저 학년 선택하도록 유도
                const jsonStudentData = [];
                
                response.data.forEach(item => {
                    jsonStudentData.push(JSON.parse(item.studentsJsonArray));
                })
                // const jsonStudentData = JSON.parse(response.data[0].studentsJsonArray);
                setStudentJsonData(jsonStudentData);
            }
        } catch(error) {
            console.log(error);
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

    const GradeSelectBox = () => {
        const boxArray = [];
        if(user) {
            if(user.schoolName.includes("중학교") || user.schoolName.includes("고등학교")) {
                for(let i = 0; i < 3; i++) {
                    boxArray.push(
                        <option key={i}>{i + 1}</option>
                    )
                }
            }else{
                for(let i = 0; i < 6; i++) {
                    boxArray.push(
                        <option key={i}>i + 1</option>
                    )
                }
            }
        }

        return (
            <select style={{ textAlign : 'center' }}>
                <option>학년</option>
                {boxArray}
            </select>
        )
    }

    const ClassSelectBox = () => {
        const classArray = [];
        const boxArray = [];

        if(studentJsonData) {
            studentJsonData.map((student, index) => {
                classArray.push(parseInt(student['class']));
            });

            let uniClassArray = [...new Set(classArray)];
            const maxClass = Math.max(...uniClassArray);

            for(let i = 0; i < maxClass; i++) {
                boxArray.push(
                    <option key={i}>{i + 1}</option>
                )
            }
        }

        return (
            <select style={{ textAlign : 'center' }}>
                <option>반</option>
                {boxArray}
            </select>
        )
    }

    const NumberSelectBox = () => {
        const numberArray = [];
        const boxArray = [];

        if(studentJsonData) {
            studentJsonData.map((student, index) => {
                numberArray.push(parseInt(student['number']));
            });

            let uniNumberArray = [...new Set(numberArray)];
            const maxNumber = Math.max(...uniNumberArray);

            for(let i = 0; i < maxNumber; i++) {
                boxArray.push(
                    <option key={i}>{i + 1}</option>
                )
            }
        }

        return (
            <select style={{ textAlign : 'center' }}>
                <option>번호</option>
                {boxArray}
            </select>
        )
    }

    // const getWorkNote = (grade, classNum, num, gender, studentName) => {
    //     if(user) {
    //         axios.get('http://localhost:8000/getWorkNote', {
    //             params : {
    //                 userId : user.userId,
    //                 userName : user.userName,
    //                 schoolName : user.schoolName,
    //                 grade : grade,
    //                 classNum : classNum,
    //                 num : num,
    //                 gender : gender,
    //                 studentName : studentName
    //             }
    //         }).then((response) => {
    //             setWorkNoteTargetStudentResult(response.data);
    //         });
    //     }
    // }

    const getTargetWorkNote = async (Grade, Class, Number, Gender, Name) => {
        // 학생당 등록된 보건일지 불러오는 부분부터 처리하면 됨!!!
        const targetName = document.getElementById('targetNameInput');
        
        if(user && targetName && targetName.value.length > 0) {
            const targetGrade = document.getElementById('targetGradeInput').value;
            const targetClass = document.getElementById('targetClassInput').value;
            const targetNumber = document.getElementById('targetNumberInput').value;
            const targetGender = document.getElementById('targetGenderInput').value;
            
            const response = await axios.get('http://localhost:8000/getTargetWorkNote', {
                params : {
                    schoolName : user.schoolName,
                    grade : targetGrade,
                    classNum : targetClass,
                    num : targetNumber,
                    gender : targetGender,
                    studentName : targetName.value
                }
            });
            
            if(response.data) {
                setWorkNoteTargetResult(response.data);
                setWorkNoteTargetState(true);
            }
        }
    }

    const getDayWorkNote = async () => {
        const targetTime = Moment().format('YYYY-MM-DD');
        
        if(user) {
            const response = await axios.get('http://localhost:8000/getDayWorkNote', {
                params : {
                    userId : user.userId,
                    userName : user.userName,
                    schoolName : user.schoolName,
                    registDate : targetTime
                }
            });

            if(response.data) {
                setWorkNoteDayResult(response.data);
                setWorkNoteDayState(true);
            }
        }
    }

    // 학생 조회 결과 Table에서 Target 학생 Row 클릭 시 발생 Event
    const onSelectStudent = (event) => {
        event.preventDefault();

        const targetGrade = event.target.parentElement.childNodes[0].textContent;
        const targetClass = event.target.parentElement.childNodes[1].textContent;
        const targetNumber = event.target.parentElement.childNodes[2].textContent;
        const targetName = event.target.parentElement.childNodes[3].textContent;
        const targetGender = event.target.parentElement.childNodes[4].textContent;

        const targetGradeInput = document.getElementById('targetGradeInput');
        const targetClassInput = document.getElementById('targetClassInput');
        const targetNumberInput = document.getElementById('targetNumberInput');
        const targetNameInput = document.getElementById('targetNameInput');
        const targetGenderInput = document.getElementById('targetGenderInput');

        targetGradeInput.value = targetGrade;
        targetClassInput.value = targetClass;
        targetNumberInput.value = targetNumber;
        targetNameInput.value = targetName;
        targetGenderInput.value = targetGender;
        
        getTargetWorkNote();
    }

    const StudentSearchResult = () => {
        if(searchResult.length > 0) {
            const resultArray = [];
            searchResult.map((student, index) => {
                resultArray.push(
                    <tr key={index} style={{ textAlign : 'center' }} onClick={onSelectStudent}>
                        <td>{student.grade}</td>
                        <td>{student.class}</td>
                        <td>{student.number}</td>
                        <td>{student.name}</td>
                        <td>{student.gender}</td>
                    </tr>
                )
            });

            return (
                <tbody>
                    {resultArray}
                </tbody>
            )
        }else{
            return (
                <tbody>
                    <tr>
                        <td style={{ textAlign : 'center' }} colSpan={5}>조회 결과가 없습니다.</td>
                    </tr>
                </tbody>
            )
        }
    }

    const TargetWorkNoteResult = () => {
        // 검색 대상 학생 보건일지 등록 내용이 있을 경우 리스트 Table로 뿌려주고 없을 시 아래 문구 출력
        if(!workNoteTargetState) {
            getTargetWorkNote();
            
            return (
                <tbody>
                    <tr>
                        <td style={{ textAlign : 'center' }} colSpan={6}>조회 결과가 없습니다.</td>
                    </tr>
                </tbody>
            )
        }else{
            if(workNoteTargetResult.length > 0) {
                const resultArray = [];

                workNoteTargetResult.map((item, index) => {
                    resultArray.push(
                        <tr key={index} style={{ textAlign : 'center' }}>
                            <td>{item.createdAt.split('T')[0]}</td>
                            <td>{item.disease}</td>
                            <td>{item.treat}</td>
                            <td>{item.medicine}</td>
                            <td>{item.reactThing}</td>
                            <td>{item.bedStartTime} ~ {item.bedEndTime}</td>
                        </tr>
                    )
                });

                return (
                    <tbody>
                        {resultArray}
                    </tbody>
                )
            }else{
                return (
                    <tbody>
                        <tr>
                            <td style={{ textAlign : 'center' }} colSpan={6}>조회 결과가 없습니다.</td>
                        </tr>
                    </tbody>
                )
            }
        }
    }

    const DayWorkNoteResult = (props) => {
        if(!workNoteDayState) {
            getDayWorkNote();
        }else{
            if(workNoteDayResult.length > 0) {
                const resultArray = [];
                workNoteDayResult.map((item, index) => {
                    resultArray.push(
                        <tr key={index} style={{ textAlign : 'center' }}>
                            {/* <td>{item.createdAt.split('T')[0]}</td> */}
                            <td>{item.registDate}</td>
                            <td>{item.studentName}</td>
                            <td>{item.disease}</td>
                            <td>{item.treat}</td>
                            <td>{item.medicine}</td>
                            <td>{item.reactThing}</td>
                            <td>{item.bedStartTime} ~ {item.bedEndTime}</td>
                        </tr>
                    )
                });

                return (
                    <tbody>
                        {resultArray}
                    </tbody>
                )
            }else{
                return (
                    <tbody>
                        <tr>
                            <td style={{ textAlign : 'center' }} colSpan={7}>조회 결과가 없습니다.</td>
                        </tr>
                    </tbody>
                )
            }
        }
    }

    const onSearchStudent = (event) => {
        event.preventDefault();
        const resultArray = [];

        const toSearchName = document.getElementById('searchName').value;
        const toSearchClassNumber = document.getElementById('searchClassNumber').value;
        const toSearchGradeValue = document.getElementById('gradeSelectBox').firstChild.value;
        const toSearchClassValue = document.getElementById('classSelectBox').firstChild.value;
        const toSearchNumberValue = document.getElementById('numberSelectBox').firstChild.value;
        
        if(studentJsonData) {
            for(let i = 0; i < studentJsonData.length; i++) {
                studentJsonData[i].forEach(student => {
                    if(student['name'].includes(toSearchName)){
                        resultArray.push(student);
                    }
                });
            }
        }

        setSearchResult(resultArray);
    }

    const DiseaseBox = () => {
        const textArray = [];
        const itemArray = [];

        if(user && !diseaseGetStatus) {
            axios.get('http://localhost:8000/getDiseaseItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                response.data.map((item) => {
                    textArray.push(item.diseaseText);
                });

                setDiseaseTextArray(textArray);
                setDiseaseGetStatus(true);
            });
        }

        if(searchDiseaseStatus) {
            for(let i = 0; i < searchDiseaseTextArray.length; i++) {
                itemArray.push(
                    <a className='panel-block' key={i} value={searchDiseaseTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchDiseaseResultClickHandler}>{searchDiseaseTextArray[i]}</a>
                )
            }
        }else{
            if(diseaseTextArray.length > 0) {
                for(let i = 0; i < diseaseTextArray.length; i++) {
                    itemArray.push(
                        <a className='panel-block' key={i} value={diseaseTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchDiseaseResultClickHandler}>{diseaseTextArray[i]}</a>
                    )
                }
            }
        }

        return (
            <div id='diseaseList' style={{ height : 150, overflowY : 'auto'}}>
                {itemArray}
            </div>
        )
    }

    const searchDiseaseResultClickHandler = (event) => {
        event.preventDefault();
        
        const selectedText = event.target.text;
        const diseaseBoxInput = document.getElementById('diseaseBoxInput');

        diseaseBoxInput.value = selectedText;
    }

    const searchDiseaseHandler = (event) => {
        const searchKeyword = event.target.value;
        const filteredDiseaseList = diseaseTextArray.filter(item => item.includes(searchKeyword));
        setSearchDiseaseText(searchKeyword);
        
        if(filteredDiseaseList.length > 0) {
            setSearchDiseaseTextArray(filteredDiseaseList);
            setSearchDiseaseStatus(true);
        }
    }

    const TreatBox = () => {
        const textArray = [];
        const itemArray = [];

        if(user && !treatGetStatus) {
            axios.get('http://localhost:8000/getTreatItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                response.data.map((item) => {
                    textArray.push(item.treatText);
                });

                setTreatTextArray(textArray);
                setTreatGetStatus(true);
            });
        }

        if(searchTreatStatus) {
            for(let i = 0; i < searchTreatTextArray.length; i++) {
                itemArray.push(
                    <a className='panel-block' key={i} value={searchTreatTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchTreatResultClickHandler}>{searchTreatTextArray[i]}</a>
                )
            }
        }else{
            if(treatTextArray.length > 0) {
                for(let i = 0; i < treatTextArray.length; i++) {
                    itemArray.push(
                        <a className='panel-block' key={i} value={treatTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchTreatResultClickHandler}>{treatTextArray[i]}</a>
                    )
                }
            }
        }

        return (
            <div style={{ height : 150, overflowY : 'auto'}}>
                {itemArray}
            </div>
        )
    }

    const searchTreatResultClickHandler = (event) => {
        event.preventDefault();
        
        const selectedText = event.target.text;
        const treatBoxInput = document.getElementById('treatBoxInput');

        treatBoxInput.value = selectedText;
    }

    const searchTreatHandler = (event) => {
        const searchKeyword = event.target.value;
        const filteredTreatList = treatTextArray.filter(item => item.includes(searchKeyword));
        setSearchTreatText(searchKeyword);
        
        if(filteredTreatList.length > 0) {
            setSearchTreatTextArray(filteredTreatList);
            setSearchTreatStatus(true);
        }
    }

    const MedicineBox = () => {
        const textArray = [];
        const itemArray = [];

        if(user && !medicineGetStatus) {
            axios.get('http://localhost:8000/getMedicineItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                response.data.map((item) => {
                    textArray.push(item.medicineText);
                });

                setMedicineTextArray(textArray);
                setMedicineGetStatus(true);
            });
        }

        if(searchMedicineStatus) {
            for(let i = 0; i < searchMedicineTextArray.length; i++) {
                itemArray.push(
                    <a className='panel-block' key={i} value={searchMedicineTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchMedicineResultClickHandler}>{searchMedicineTextArray[i]}</a>
                )
            }
        }else{
            if(medicineTextArray.length > 0) {
                for(let i = 0; i < medicineTextArray.length; i++) {
                    itemArray.push(
                        <a className='panel-block' key={i} value={medicineTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchMedicineResultClickHandler}>{medicineTextArray[i]}</a>
                    )
                }
            }
        }


        return (
            <div style={{ height : 175, overflowY : 'auto'}}>
                {itemArray}
            </div>
        )
    }

    const searchMedicineResultClickHandler = (event) => {
        event.preventDefault();
        
        const selectedText = event.target.text;
        const medicineBoxInput = document.getElementById('medicineBoxInput');

        medicineBoxInput.value = selectedText;
    }

    const searchMedicineHandler = (event) => {
        const searchKeyword = event.target.value;
        const filteredMedicineList = medicineTextArray.filter(item => item.includes(searchKeyword));
        setSearchMedicineText(searchKeyword);
        
        if(filteredMedicineList.length > 0) {
            setSearchMedicineTextArray(filteredMedicineList);
            setSearchMedicineStatus(true);
        }
    }
    
    const ReactBox = () => {
        const textArray = [];
        const itemArray = [];

        if(user && !reactGetStatus) {
            axios.get('http://localhost:8000/getReactItems', {
                params : {
                    userId : user.userId,
                    userName : user.userName
                }
            }).then((response) => {
                response.data.map((item) => {
                    textArray.push(item.reactText);
                });

                setReactTextArray(textArray);
                setReactGetStatus(true);
            });
        }

        if(searchReactStatus) {
            for(let i = 0; i < searchReactTextArray.length; i++) {
                itemArray.push(
                    <a className='panel-block' key={i} value={searchReactTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchReactResultClickHandler}>{searchReactTextArray[i]}</a>
                )
            }
        }else{
            if(reactTextArray.length > 0) {
                for(let i = 0; i < reactTextArray.length; i++) {
                    itemArray.push(
                        <a className='panel-block' key={i} value={reactTextArray[i]} style={{ textAlign : 'center', fontSize : 13 }} onClick={searchReactResultClickHandler}>{reactTextArray[i]}</a>
                    )
                }
            }
        }

        return (
            <div style={{ height : 70, overflowY : 'auto'}}>
                {itemArray}
            </div>
        )
    }

    const searchReactResultClickHandler = (event) => {
        event.preventDefault();
        
        const selectedText = event.target.text;
        const reactBoxInput = document.getElementById('reactBoxInput');

        reactBoxInput.value = selectedText;
    }

    const searchReactHandler = (event) => {
        const searchKeyword = event.target.value;
        const filteredReactList = reactTextArray.filter(item => item.includes(searchKeyword));
        setSearchReactText(searchKeyword);
        
        if(filteredReactList.length > 0) {
            setSearchReactTextArray(filteredReactList);
            setSearchReactStatus(true);
        }
    }

    const BedBox = () => {
        const bedBox = [];
        const messageBox = [];
        
        getBedCount();
        getUsebedInfo();
        
        if(bedCount) {
            if(bedCount > 0) {
                for(let i = 0; i < Number(bedCount); i++) {
                    if(bedCount > 1) {
                        bedBox.push(
                            <div key={i} id={'bed' + (i + 1)} className='box ml-2' style={{ float : 'left', padding : 10, paddingBottom : 0 }}>
                                <div style={{ float : 'left', marginTop : 3 }}>
                                    <span className='tag' id='bedUseStatus' usestatus='false' style={{ margin : 'auto' }}>미사용중</span>
                                </div>
                                <div style={{ float : 'left' }}>
                                    <span id={'bed' + (i + 1)}><FaBed style={{ fontSize : 20, marginLeft : 5, marginTop : 5 }}/></span>
                                </div>
                                <button disabled className='button is-small is-light ml-1' style={{ height : 20, marginTop : 5 }} status='notUse'>사용 해제</button>
                            </div>
                        )
                    }else{
                        bedBox.push(
                            <div key={i} id={'bed' + (i + 1)} className='box ml-2 mb-5' style={{ float : 'left', padding : 10, paddingBottom : 0 }}>
                                <div style={{ float : 'left', marginTop : 3 }}>
                                    <span className='tag' id='bedUseStatus' style={{ margin : 'auto' }}>미사용중</span>
                                </div>
                                <div style={{ float : 'left' }}>
                                    <span id={'bed' + (i + 1)}><FaBed style={{ fontSize : 20, marginLeft : 5, marginTop : 5 }}/></span>
                                </div>
                                <button disabled className='button is-small is-light ml-1' style={{ height : 20, marginTop : 5 }} status='notUse'>사용 해제</button>
                            </div>
                        )
                    }
                }
    
                return (
                    <div>
                        {bedBox}
                    </div>
                )
            }else{
                messageBox.push(
                    <article className='message' key={1}>
                        <div className='message-body' style={{ fontSize : 13, padding : 10 }}>
                            설정된 침상 수가 없습니다. 보건실의 침상 수를 설정해 주세요.
                        </div>
                    </article>
                );
    
                return (
                    <div style={{ height : 30 }}>
                        {messageBox}
                    </div>
                )
            }
        }else{
            messageBox.push(
                <article className='message' key={1}>
                    <div className='message-body' style={{ fontSize : 13, padding : 10 }}>
                        설정된 침상 수가 없습니다. 보건실의 침상 수를 설정해 주세요.
                    </div>
                </article>
            );

            return (
                <div style={{ height : 30 }}>
                    {messageBox}
                </div>
            )
        }
    }

    // 아래 Function에서 침상 사용 등록 시 사용해제 버튼 활성화 시켜주고 is-danger로 클래스 바꿔줌
    const handleBedUseStatus = (event) => {
        event.preventDefault();
        debugger
        // 수정 필요

        // const bedUseStatus = event.target.parentElement.children['bedUseStatus'];
        // const iconTag = event.target.parentElement.children[1];
        // const bedButton = event.target.parentElement.children[2];
        
        // if(studentName) {
        //     if(bedButton.getAttribute('status') == 'notUse') {
        //         bedButton.setAttribute('status', 'use');
        //         bedButton.className = 'button is-small is-danger is-light';
        //         bedButton.innerHTML = '침상 미사용';

        //         bedUseStatus.children[0].className = 'tag is-info';
        //         bedUseStatus.children[0].innerHTML = studentName;
                
        //         iconTag.style.color = 'lightblue';

        //         handleUseBedNotification();
        //     }else{
        //         bedButton.setAttribute('status', 'notUse');
        //         bedButton.className = 'button is-small is-info is-light';
        //         bedButton.innerHTML = '침상 사용';

        //         bedUseStatus.children[0].className = 'tag';
        //         bedUseStatus.children[0].innerHTML = '미사용중';
                
        //         iconTag.style.color = '';
        //     }
        // }
    }

    const handleBedSetting = (event) => {
        event.preventDefault();
        getBedCount();
        setBedSettingModalShow(true);
    }

    const submitBedSetting = (event) => {
        event.preventDefault();
        const inputBedCount = Number(event.target.getElementsByTagName('input')[0].value);
        
        if(user) {
            if(!bedCount) {
                axios.post('http://localhost:8000/setBedCount', {
                    userId : user.userId,
                    userName : user.userName,
                    bedCount : inputBedCount
                }).then((response) => {
                    setBedCountSuccessToast(true);
                    getBedCount();
                });
            }else{
                if(inputBedCount == bedCount) {
                    // 이미 설정된 침상 수이다 토스트
                    setBedCountFailedToast(true);
                }else{
                    // 침상 수 업데이트
                    axios.post('http://localhost:8000/updateBedCount', {
                        userId : user.userId,
                        userName : user.userName,
                        bedCount : inputBedCount
                    }).then((response) => {
                        setBedCountUpdateToast(true);
                        getBedCount();
                    });
                }
            }
        }
    }

    const selectCurrentTime = (event) => {
        event.preventDefault();

        // let time = new Date();
        const time = Moment().format('HH:mm');
        
        // const convertTime = (time.getHours() + ":" + time.toLocaleTimeString().split(' ')[1].split(':')[1]).toString();
        if(time) {
            const startTimeInput = document.getElementById('bedStartTime');
            startTimeInput.setAttribute('value', time);
        }
    }

    const studentSearchReset = (event) => {
        if(event) event.preventDefault();

        const nameInput = document.getElementById('searchName');
        const gradeSelectBox = document.getElementById('gradeSelectBox').firstChild;
        const classSelectBox = document.getElementById('classSelectBox').firstChild;
        const numberSelectBox = document.getElementById('numberSelectBox').firstChild;
        const classNumberInput = document.getElementById('searchClassNumber');

        nameInput.value = '';
        gradeSelectBox.selectedIndex = 0;
        classSelectBox.selectedIndex = 0;
        numberSelectBox.selectedIndex = 0;
        classNumberInput.value = '';
    }

    const inputResetHandler = (event) => {
        if(event) {
            event.preventDefault();
            event.target.parentElement.parentElement.getElementsByTagName('input')[0].value = '';
        }else{
            const inputTags = document.getElementById('workNotePage').getElementsByTagName('input');
            
            for(let i = 0; i < inputTags.length - 2; i++) {
                inputTags[i].value = '';
            }

            // 침상안정 쪽 초기화는 따로 시켜줘야 할 듯 타입이 달라서 초기화 후 값 세팅되지 않음
        }

    }

    const allResetHandler = (event) => {
        event.preventDefault();

        studentSearchReset();
        inputResetHandler();
    }

    const onWorkNoteSubmit = (event) => {
        event.preventDefault();

        let time = new Date();
        const registDate = Moment().format('YYYY-MM-DD').toString();
        // const day = time.toLocaleDateString();
        // const currentTime = (time.getHours() + ":" + time.getMinutes()).toString();
        // const convertDate = day + " " + currentTime;
        
        const targetGrade = document.getElementById('targetGradeInput').value;
        const targetClass = document.getElementById('targetClassInput').value;
        const targetNumber = document.getElementById('targetNumberInput').value;
        const targetGender = document.getElementById('targetGenderInput').value;
        const targetName = document.getElementById('targetNameInput').value;

        const selectedDisease = document.getElementById('diseaseBoxInput').value;
        const selectedtreat = document.getElementById('treatBoxInput').value;
        const selectedMedicine = document.getElementById('medicineBoxInput').value;
        const selectedReact = document.getElementById('reactBoxInput').value;

        const selectedBedStartTime = document.getElementById('bedTimeDiv').getElementsByTagName('input')['bedStartTime'].value;
        const selectedBedEndTime = document.getElementById('bedTimeDiv').getElementsByTagName('input')['bedEndTime'].value;
        
        if(targetName.length === 0) {
            setWorkNoteNoNameToast(true);
        }else{
            axios.post('http://localhost:8000/setWorkNote', {
                userId : user.userId,
                userName : user.userName,
                schoolName : user.schoolName,
                grade : targetGrade,
                classNum : targetClass,
                num : targetNumber,
                gender : targetGender,
                studentName : targetName,
                disease : selectedDisease,
                treat : selectedtreat,
                medicine : selectedMedicine,
                reactThing : selectedReact,
                bedStartTime : selectedBedStartTime,
                bedEndTime : selectedBedEndTime,
                registDate : registDate
            }).then((response) => {
                // getWorkNote();
                getTargetWorkNote(); 
                getDayWorkNote();
                setWorkSubmitSuccessToast(true);

                if(response.status == 200 && registDate) {
                    if(user) {
                        axios.get('http://localhost:8000/getUseBed', {
                            params : {
                                userId : user.userId,
                                userName : user.userName,
                                schoolName : user.schoolName
                            }
                        }).then((response) => {
                            // 날이 지나면 침상사용 정보도 초기화 -> 같은 날에 등록된 침상 정보가 없는 경우에는 1번 침상에 세팅
                            // let sameDateWorkNote = false;
                            // for(let i = 0; i < response.data.length; i++) {
                            //     if(response.data[i].registDate == registDate) 
                            //         sameDateWorkNote = true;
                            // }

                            let possibleFirstBed = true;
                            let alreadyUsedBed = 0;
                            for(let i = 0; i < response.data.length; i++) {
                                if(response.data[i].registDate == registDate && JSON.parse(response.data[i].useStatus)) {
                                    possibleFirstBed = false;
                                    alreadyUsedBed++;
                                }
                            }

                            if(response.data.length == 0 || possibleFirstBed) {
                                axios.post('http://localhost:8000/setUseBed', {
                                    userId : user.userId,
                                    userName : user.userName,
                                    schoolName : user.schoolName,
                                    targetStudent : targetName,
                                    bedStartTime : selectedBedStartTime,
                                    bedEndTime : selectedBedEndTime,
                                    registDate : registDate,
                                    bedNumber : '1',
                                    useStatus : 'true'
                                }).then((response) => {
                                    getUsebedInfo();
                                });
                            }else{
                                if(alreadyUsedBed < bedCount) {
                                    axios.post('http://localhost:8000/setUseBed', {
                                        userId : user.userId,
                                        userName : user.userName,
                                        schoolName : user.schoolName,
                                        targetStudent : targetName,
                                        bedStartTime : selectedBedStartTime,
                                        bedEndTime : selectedBedEndTime,
                                        registDate : registDate,
                                        bedNumber : (Number(alreadyUsedBed) + 1).toString(),
                                        useStatus : 'true'
                                    }).then((response) => {
                                        getUsebedInfo();
                                    });
                                }else{
                                    setFullUsedBedToast(true);
                                    // 안내 Toast 후 Return 시켜 등록되지 않도록 처리 필요
                                }
                                debugger
                            }
                        });
                    }

                    for(let i = 1; i <= bedCount; i++) {
                        const bedBox = document.getElementById('bed' + i);
                        const useStatusTag = bedBox.getElementsByTagName('span')['bedUseStatus'];
                        const useStatus = JSON.parse(bedBox.getElementsByTagName('span')['bedUseStatus'].getAttribute('usestatus'));



                        if(!useStatus) {
                            useStatusTag.className = 'tag is-info';
                            useStatusTag.textContent = targetName;
                        }
                    }
                }
            });
        }
    }

    const [bedBoxStatus, setBedBoxStatus] = useState([]);

    const diseaseCategory = ["감염병", "구강치아계", "근골격계", "비뇨생식기계", "소화기계", "순환기계", "안과계", "이비인후과계", "정신신경계", "호흡기계", "기타"];

    const GetDiseaseCategory = () => {
        const categoryArray = [];
        for(let i = 0; i < diseaseCategory.length; i++) {
            categoryArray.push(
                <option key={i}>{diseaseCategory[i]}</option>
            )
        }

        return (
            <select>
                {categoryArray}
            </select>
        )
    }

    return (
        <div className="container mt-5" style={{display: 'flex', flexDirection: 'column', marginBottom : 50}}>
            {workSubmitSuccessToast && <Toast setToast={setWorkSubmitSuccessToast} text="작성하신 보건일지가 정상적으로 등록되었습니다."></Toast>}
            {workNoteNoNameToast && <Toast setToast={setWorkNoteNoNameToast} text="선택된 학생이 존재하지 않아 등록할 수 없습니다."></Toast>}
            {removeBedUseStatusToast && <Toast setToast={setRemoveBedUseStatusToast} text="해당 침상 사용이 정상적으로 해제되었습니다."></Toast>}
            {fullUsedBedToast && <Toast setToast={setFullUsedBedToast} text="모든 침상이 사용중이므로 침상을 사용할 수 없습니다."></Toast>}
            <div className= {diseaseModalshow ? 'modal is-active' : 'modal'}>
                {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
                {registDiseaseSuccessToast && <Toast setToast={setRegistDiseaseSuccessToast} text="작성하신 증상명이 정상적으로 등록되었습니다."></Toast>}
                {registDiseaseFailedToast && <Toast setToast={setRegistDiseaseFailedToast} text="동일하게 작성하신 증상명이 이미 존재합니다."></Toast>}
                {removeDiseaseToast && <Toast setToast={setRemoveDiseaseToast} text="증상명 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addDiseaseItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 500 }}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 증상 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleDiseaseModalClose }></button>
                        </header>
                        <section className='modal-card-body' style={{ maxHeight : 300 }}>
                            <ul id='diseaseItemList'>
                                <GetDiseaseItems/>
                                <div style={{ width : '100%', display : 'inline-flex' }}>
                                    <div className='select is-small'>
                                        <GetDiseaseCategory/>
                                    </div>
                                    <input className='input ml-2 newDiseaseItem' name='newDiseaseItem' onChange={inputTextHandler} type='text' placeholder='문구를 입력해주세요' style={{ height : 30, fontSize : 15 }}/>
                                </div>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                {/* <button className='button is-small' onClick={plusDiseaseItem}>항목 추가</button> */}
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 'auto', marginRight : 20, marginTop : 10 }}>
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
                                <input className='input' name='newTreatItem' onChange={inputTextHandler} type='text' placeholder='문구를 입력해주세요' style={{ width : '100%', height : 30, fontSize : 15 }}/>
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
                                <input className='input' name='newMedicineItem' onChange={inputTextHandler} type='text' placeholder='문구를 입력해주세요.' style={{ width : '100%', height : 30, fontSize : 15 }}/>
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
            
            <div className= {reactModalShow ? 'modal is-active' : 'modal'}>
            {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
            {registReactSuccessToast && <Toast setToast={setRegistReactSuccessToast} text="작성하신 조치사항이 정상적으로 등록되었습니다."></Toast>}
            {registReactFailedToast && <Toast setToast={setRegistReactFailedToast} text="동일하게 작성하신 조치사항이 이미 존재합니다."></Toast>}
            {removeReactToast && <Toast setToast={setRemoveReactToast} text="조치사항 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addReactItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 550}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 조치사항 등록</p>
                            <button className='delete' aria-label='close' onClick={ handleReactModalClose }></button>
                        </header>
                        <section className='modal-card-body'>
                            <ul id='reactItemList'>
                                <GetReactItems/>
                                <input className='input' name='newReactItem' onChange={inputTextHandler} type='text' placeholder='문구를 입력해주세요.' style={{ width : '100%', height : 30, fontSize : 15 }}/>
                            </ul>
                            <div style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                                {/* <button className='button is-small' onClick={plusMedicineItem}>항목 추가</button> */}
                            </div>
                        </section>
                        <footer className='modal-card-foot' style={{ padding : 0 }}>
                            <div style={{ marginLeft : 420, marginTop : 10 }}>
                                <button className='button is-info is-small'>저장</button>
                                <button className='button is-small' onClick={ handleReactModalClose }>닫기</button>
                            </div>
                        </footer>
                    </div>
                </form>
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
                                <span style={{ fontSize : 13 }}><b>침상 수 : </b></span>
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
            
            <div style={{ marginBottom : -10 }}>
                <div style={{ float : 'left'}}>
                    <BedBox/>
                </div>
                <div style={{ float : 'right',  marginTop : 10, marginBottom : 5 }}>
                    <button className='button is-small' onClick={handleBedSetting}>침상 수 설정</button>
                    <button className='button is-small ml-2'>학생별 보건일지</button>
                    <button className='button is-small ml-3'>기간별 보건일지</button>
                </div>
            </div>

            <div className='tile is-ancestor'>
                <div className='tile is-vertical is-12'>
                    <div className='tile mt-3 mb-5'>
                        <div className='tile is-parent is-vertical'>
                            <div className="panel" style={{ width : '50vh', marginTop : -10, height : '65vh', display : 'flex', flexDirection : 'column', borderRadius : 0 }}>
                                <p className="panel-heading" style={{ fontSize : 15, borderRadius : 0 }}>
                                    학생 조회
                                </p>
                                <div className='mt-5 ml-3' id='studentSearchDiv'>
                                    <div>
                                        <div>
                                            <span style={{ fontSize : 13, fontWeight : 'bold' }}>이름</span>
                                            <input 
                                                className='input is-small ml-3'
                                                placeholder='이름을 입력하세요'
                                                id='searchName'
                                                style={{ width: 150 }}
                                            />
                                            <span className='tag ml-3' style={{ fontSize : 12 }}><AiOutlineNotification style={{ fontSize : 15, marginRight : 7}}/>부분 입력으로도 조회가 가능합니다</span>
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <div>
                                            <span style={{ fontSize : 13, fontWeight : 'bold'}}>학년/반/번호</span>
                                            <div className='select is-small ml-3' id='gradeSelectBox'>
                                                <GradeSelectBox/>
                                            </div>
                                            <div className='select is-small ml-3' id='classSelectBox'>
                                                <ClassSelectBox/>
                                            </div>
                                            <div className='select is-small ml-3' id='numberSelectBox'>
                                                <NumberSelectBox/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <div>
                                            <span style={{ fontSize : 13, fontWeight : 'bold'}}>학번</span>
                                            <input 
                                                className='input is-small ml-3'
                                                placeholder='학번을 입력하세요'
                                                id='searchClassNumber'
                                                style={{ width: 150 }}
                                            />
                                            <span className='tag ml-3' style={{ fontSize : 12 }}><AiOutlineNotification style={{ fontSize : 15, marginRight : 7 }}/>부분 입력으로도 조회가 가능합니다</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ margin : 'auto', marginTop : 10, marginBottom : 0 }}>
                                    <button className='button is-small is-info' onClick={onSearchStudent}>조회</button>
                                    <button className='button is-small ml-2' onClick={studentSearchReset}>초기화</button>
                                </div>
                                <hr style={{ marginLeft : 10, marginRight : 10 }}/>
                                <div style={{ height : '175px', overflowY : 'auto', marginBottom : 20 }}>
                                    <table className='table is-striped' style={{ fontSize : 13, width : '95%', marginLeft : 10 }} >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign : 'center'}}>학년</th>
                                                <th style={{ textAlign : 'center'}}>반</th>
                                                <th style={{ textAlign : 'center'}}>번호</th>
                                                <th style={{ textAlign : 'center'}}>이름</th>
                                                <th style={{ textAlign : 'center'}}>성별</th>
                                            </tr>
                                        </thead>
                                        <StudentSearchResult/>
                                    </table>
                                </div>
                                <span className='tag ml-3 mt-5 mb-2' style={{ fontSize : 12, width : '95%' }}><AiOutlineNotification style={{ fontSize : 15, marginRight : 7 }}/>행 선택 시 보건일지에 자동으로 입력됩니다</span>
                                <div style={{ margin : 'auto' }}>
                                    <button className='button is-small'>학생관리</button>
                                </div>
                            </div>
                            <div className="panel" style={{ width : '50vh', marginTop : -10, height : '31.2vh', display : 'flex', flexDirection : 'column', borderRadius : 0 }}>
                                <p className="panel-heading" style={{ fontSize : 15, borderRadius : 0 }}>
                                    보건실 사용 요청 알람 내역
                                </p>
                            </div>
                        </div>
                        
                        <div className='tile is-child' style={{ padding : 0 }}>
                            {/* <form onSubmit={onWorkNoteSubmit}> */}
                            <form>
                                <div className='panel' id='workNotePage' style={{ height : '98vh', width : '87vh', borderRadius : 0 }}>
                                    <p className='panel-heading' style={{ fontSize : 15, borderRadius : 0 }}>
                                        보건일지 작성
                                    </p>
                                    <div className='panel-block' style={{ borderBottom : 'none' }}>
                                        <div style={{ margin : 'auto' }}>
                                            <span  style={{ fontSize : 13, fontWeight : 'bold' }}>학년</span>
                                            <input 
                                                className='input is-small ml-3'
                                                id='targetGradeInput'
                                                style={{ width: 50, textAlign : 'center' }}
                                                readOnly
                                            />
                                            <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>반</span>
                                            <input 
                                                className='input is-small ml-3'
                                                id='targetClassInput'
                                                style={{ width: 50, textAlign : 'center' }}
                                                readOnly
                                            />
                                            <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>번호</span>
                                            <input 
                                                className='input is-small ml-3'
                                                id='targetNumberInput'
                                                style={{ width: 50, textAlign : 'center' }}
                                                readOnly
                                            />
                                            <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>성별</span>
                                            <input 
                                                className='input is-small ml-3'
                                                id='targetGenderInput'
                                                style={{ width: 50, textAlign : 'center' }}
                                                readOnly
                                            />
                                            <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>이름</span>
                                            <input 
                                                className='input is-small ml-3'
                                                id='targetNameInput'
                                                style={{ width: 100, textAlign : 'center' }}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div style={{ height : 151, overflowY : 'auto'}}>
                                        <table className='table is-striped is-narrow is-hoverable ml-3' style={{ width : '97.5%', fontSize : 12 }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign : 'center' }}>등록일</th>
                                                    <th style={{ textAlign : 'center' }}>증상</th>
                                                    <th style={{ textAlign : 'center' }}>처치사항</th>
                                                    <th style={{ textAlign : 'center' }}>투약사항</th>
                                                    <th style={{ textAlign : 'center' }}>조치사항</th>
                                                    <th style={{ textAlign : 'center' }}>침상안정</th>
                                                </tr>
                                            </thead>
                                            <TargetWorkNoteResult/>
                                        </table>
                                    </div>
                                    <hr style={{ marginLeft : 10, marginRight : 10, marginBottom : 10 }}/>
                                    <div className='mt-2' style={{ display : 'inline-flex', width : '100%' }}>
                                        <div id='diseaseDiv'>
                                            <nav className='panel ml-2 mb-3' style={{ width : '28vh', borderRadius : 0 }}>
                                                <p className='panel-heading' style={{ fontSize : 15, padding : 3, borderRadius : 0 }}>
                                                    증상
                                                </p>
                                                <div className='panel-block'>
                                                    <input className='input is-small' id='diseaseBoxInput' style={{ margin : 0 }} type='text' value={searchDiseaseText} onChange={searchDiseaseHandler} placeholder='직접 입력'/>
                                                </div>
                                                <DiseaseBox />
                                                <hr style={{ margin : 0 }}/>
                                                <div className='mt-1'>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={handleDiseaseModalShow}>증상 항목 관리</button>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={inputResetHandler}>초기화</button>
                                                </div>
                                            </nav>
                                        </div>
                                        <div id='treatDiv'>
                                            <nav className='panel ml-3 mb-3' style={{ width : '56vh', borderRadius : 0 }}>
                                                <p className='panel-heading' style={{ fontSize : 15, padding : 3, borderRadius : 0 }}>
                                                    처치사항
                                                </p>
                                                <div className='panel-block'>
                                                    <input className='input is-small' id='treatBoxInput' style={{ margin : 0 }} type='text' value={searchTreatText} onChange={searchTreatHandler} placeholder='직접 입력'/>
                                                </div>
                                                <TreatBox/>
                                                <hr style={{ margin : 0 }}/>
                                                <div className='mt-1'>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '49%' }} onClick={handleTreatModalShow}>처치사항 항목 관리</button>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '49%' }} onClick={inputResetHandler}>초기화</button>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className='mb-3' style={{ display : 'inline-flex' }}>
                                        <div id='medicineDiv'>
                                            <nav className='panel ml-2 mb-3' style={{ width : '28vh', borderRadius : 0 }}>
                                                <p className='panel-heading' style={{ fontSize : 15, padding : 3, borderRadius : 0 }}>
                                                    투약사항
                                                </p>
                                                <div className='panel-block'>
                                                    <input className='input is-small' id='medicineBoxInput' style={{ margin : 0 }} type='text' value={searchMedicineText} onChange={searchMedicineHandler} placeholder='직접 입력'/>
                                                </div>
                                                <MedicineBox/>
                                                <hr style={{ margin : 0 }}/>
                                                <div className='mt-1'>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={handleMedicineModalShow}>투약사항 항목 관리</button>
                                                    <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={inputResetHandler}>초기화</button>
                                                </div>
                                            </nav>
                                        </div>
                                        <div>
                                            <div id='reactDiv'>
                                                <nav className='panel ml-3' style={{ width : '56vh', borderRadius : 0 }}>
                                                    <p className='panel-heading' style={{ fontSize : 15, padding : 3, borderRadius : 0 }}>
                                                        조치사항
                                                    </p>
                                                    <div className='panel-block'>
                                                        <input className='input is-small' id='reactBoxInput' style={{ margin : 0 }} type='text' value={searchReactText} onChange={searchReactHandler} placeholder='직접 입력'/>
                                                    </div>
                                                    <ReactBox/>
                                                    <hr style={{ margin : 0 }}/>
                                                    <div className='mt-1'>
                                                        <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={handleReactModalShow}>조치사항 항목 관리</button>
                                                        <button className='button is-small ml-1' style={{ marginBottom : 5, width : '48%' }} onClick={inputResetHandler}>초기화</button>
                                                    </div>
                                                </nav>
                                            </div>
                                            <div className='mb-3 mt-3' id='bedTimeDiv'>
                                                <nav className='panel ml-3 mb-3 mt-2' style={{ width : '56vh', borderRadius : 0 }}>
                                                    <p className='panel-heading' style={{ fontSize : 15, padding : 3, borderRadius : 0 }}>
                                                        침상안정
                                                    </p>
                                                    <div className='panel-block'>
                                                        <span className='tag is-info is-light' style={{ fontSize : 12, marginTop : -10 }}>시작시간</span>
                                                        <input className='input is-small ml-1'
                                                            id='bedStartTime'
                                                            type='time'
                                                            style={{ width : '20%'}}
                                                        />
                                                        <button className='button is-small ml-1' style={{ marginTop : 6 }} onClick={selectCurrentTime}>현재시간 선택</button>
                                                        <span className='tag is-danger is-light ml-2' style={{ fontSize : 12, marginTop : -10 }}>종료시간</span>
                                                        {/* 여기에 10분 단위로 Select Box 만들어줘서 선택해서 시간 입력되도록 하면 편할 듯 */}
                                                        <input className='input is-small ml-1'
                                                            id='bedEndTime'
                                                            type='time'
                                                            style={{ width : '20%'}}
                                                        />
                                                        <button className='button is-small ml-1' style={{ marginTop : 6 }} >초기화</button>
                                                    </div>
                                                </nav>
                                                {/* <span className='tag mr-5 mt-1' style={{ float : 'right'}}>현재시간 &nbsp; <b>{time}</b></span> */}
                                                {/* <button className='button is-small is-info is-light is-outlined ml-3'>사용 등록</button>
                                                <button className='button is-small is-danger is-light is-outlined ml-2'>사용 해제</button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='panel-block'>
                                        <div style={{ margin : 'auto' }}>
                                            <button className='button is-info is-small' type='submit' id='registWorkNote' onClick={onWorkNoteSubmit}>등록</button>
                                            <button className='button is-small ml-2' id='resetWorkNote' onClick={allResetHandler}>초기화</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='tile is-vertical is-12 ml-2 mt-1'>
                        <div style={{ minHeight : 230, overflowY : 'auto'}}>
                            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth' style={{ fontSize : 13 }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>등록일</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>이름</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>증상</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>처치사항</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>투약사항</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>조치사항</th>
                                        <th style={{ textAlign : 'center', backgroundColor : 'lightblue' }}>침상안정</th>
                                    </tr>
                                </thead>
                                <DayWorkNoteResult/>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyWorkNote;