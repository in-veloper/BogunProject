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
import { AiOutlinePrinter, AiOutlineSave, AiOutlineNotification } from 'react-icons/ai';
import { FiPlusSquare } from 'react-icons/fi';
import { FaStar, FaBed } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Toast from './Toast.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './style/toggleButton.css';

const DailyWorkNote = () => {

    const [user, setUser] = useState(null);
    const [studentJsonData, setStudentJsonData] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
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
    const [diseaseTextArray, setDiseaseTextArray] = useState([]);
    const [treatTextArray, setTreatTextArray] = useState([]);
    const [medicineTextArray, setMedicineTextArray] = useState([]);
    const [inputText, setInputText] = useState('');

    const [registeredBedCount, setRegisteredBedCount] = useState('');
    const [bedCountSuccessToast, setBedCountSuccessToast] = useState(false);
    const [bedCountFailedToast, setBedCountFailedToast] = useState(false);
    const [bedCountUpdateToast, setBedCountUpdateToast] = useState(false);

    useEffect(() => {
        getUser();
        getStudentData();
        getDisease();
        getTreats();
        getMedicine();
        getBedCount();

        return () => {
            
        }
    }, []);

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

    const getUser = async () => {
        try {
            if(!user) {
                const response = await axios.get('http://localhost:8000/token');
                const decoded = jwt_decode(response.data.accessToken);
                
                setUser({
                    userId : decoded.email,
                    userName : decoded.name,
                    schoolName : decoded.schoolName
                });
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
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
                    // const bedCountInput = document.getElementById('bedCountInput');
                    // bedCountInput.setAttribute('value', response.data[0].bedCount);
                }

                setRegisteredBedCount(response.data[0].bedCount);
            });
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

    const GetDiseaseItems = () => {
        const registeredDiseaseItems = [];
        if(diseaseItemData.length > 0) {
            for(let i = 0; i < diseaseItemData.length; i++) {
                registeredDiseaseItems.push(
                    <div key={i}>
                        <input className='input' name='registeredDiseaseItem' type='text' value={diseaseItemData[i].diseaseText || ''} readOnly={true} style={{ width : '80%', height : 30, fontSize : 13 }}/>
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

    const inputTextHandler = (event) => {
        const inputText = event.target.value;
        setInputText(inputText);
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

        return (
            <tbody>
                <tr>
                    <td style={{ textAlign : 'center' }} colSpan={6}>조회 결과가 없습니다.</td>
                </tr>
            </tbody>
        )
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

    const DiseaseSelectBox = () => {
        const textArray = [];

        if(user && diseaseTextArray.length == 0) {
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
            });
        }

        if(diseaseTextArray.length > 0) {
            const optionArray = [];
            for(let i = 0; i < diseaseTextArray.length; i++) {
                optionArray.push(
                    <option key={i} value={diseaseTextArray[i]} style={{ textAlign : 'center' }}>{diseaseTextArray[i]}</option>
                )
            }

            return (
                <div className='select is-small' style={{ marginLeft : 37 }}>
                    <select style={{ width : 150}}>
                        <option style={{ textAlign : 'center' }}>항목 선택</option>
                        {optionArray}
                    </select>
                </div>
            )
        }
    }

    const TreatSelectBox = () => {
        const textArray = [];

        if(user && treatTextArray.length == 0) {
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
            });
        }

        if(treatTextArray.length > 0) {
            const optionArray = [];
            for(let i = 0; i < treatTextArray.length; i++) {
                optionArray.push(
                    <option key={i} value={treatTextArray[i]} style={{ textAlign : 'center' }}>{treatTextArray[i]}</option>
                )
            }

            return (
                <div className='select is-small ml-3'>
                    <select style={{ width : 510}}>
                        <option style={{ textAlign : 'center' }}>항목 선택</option>
                        {optionArray}
                    </select>
                </div>
            )
        }
    }

    const MedicineSelectBox = () => {
        const textArray = [];

        if(user && medicineTextArray.length == 0) {
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
            });
        }

        if(medicineTextArray.length > 0) {
            const optionArray = [];
            for(let i = 0; i < medicineTextArray.length; i++) {
                optionArray.push(
                    <option key={i} value={medicineTextArray[i]} style={{ textAlign : 'center' }}>{medicineTextArray[i]}</option>
                )
            }

            return (
                <div className='select is-small ml-3'>
                    <select style={{ width : 300}}>
                        <option style={{ textAlign : 'center' }}>항목 선택</option>
                        {optionArray}
                    </select>
                </div>
            )
        }
    }

    const BedBox = () => {
        const bedBox = [];

        if(registeredBedCount > 0) {
            for(let i = 0; i < Number(registeredBedCount); i++) {
                bedBox.push(
                    <div key={i} id={'bed' + (i + 1)} className='box ml-2' style={{ float : 'left', padding : 10, paddingBottom : 0 }}>
                        <div style={{ float : 'left', marginTop : 3 }}>
                            <span className='tag' id='bedUseStatus' style={{ margin : 'auto' }}>미사용중</span>
                        </div>
                        <div style={{ float : 'left' }}>
                            <span id={'bed' + (i + 1)}><FaBed style={{ fontSize : 20, marginLeft : 5, marginTop : 5 }}/></span>
                        </div>
                        <button disabled className='button is-small is-light ml-1' style={{ height : 20, marginTop : 5 }} status='notUse' onClick={handleBedUseStatus}>사용 해제</button>
                    </div>
                )
            }
        } 
        return (
            <div>
                {bedBox}
            </div>
        )
    }

    // 아래 Function에서 침상 사용 등록 시 사용해제 버튼 활성화 시켜주고 is-danger로 클래스 바꿔줌
    const handleBedUseStatus = (event) => {
        event.preventDefault();

        // 수정 필요

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

    return (
        <div className="container mt-5" style={{display: 'flex', flexDirection: 'column', height: '100vh', marginBottom : 25}}>

            <div className= {diseaseModalshow ? 'modal is-active' : 'modal'}>
                {toast && <Toast setToast={setToast} text="작성하지 않은 항목이 있습니다. 모든 항목을 작성 후 추가 항목을 생성하실 수 있습니다."></Toast>}
                {registDiseaseSuccessToast && <Toast setToast={setRegistDiseaseSuccessToast} text="작성하신 증상명이 정상적으로 등록되었습니다."></Toast>}
                {registDiseaseFailedToast && <Toast setToast={setRegistDiseaseFailedToast} text="동일하게 작성하신 증상명이 이미 존재합니다."></Toast>}
                {removeDiseaseToast && <Toast setToast={setRemoveDiseaseToast} text="증상명 삭제가 정상적으로 처리되었습니다."></Toast>}
                <form onSubmit={addDiseaseItem}>
                    <div className='modal-background'></div>
                        <div className='modal-card' style={{ width : 400}}>
                        <header className='modal-card-head'>
                            <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>자주 사용하는 증상 등록</p>
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
            
            <div style={{ marginBottom : -10 }}>
                <div style={{ float : 'left'}}>
                    <BedBox/>
                </div>
                <div style={{ float : 'right', marginLeft : 'auto', marginTop : 12 }}>
                    <button className='button is-small'>학생별 보건일지</button>
                    <button className='button is-small ml-3'>기간별 보건일지</button>
                </div>
            </div>

            <div className='tile is-ancestor'>
                <div className='tile is-vertical is-12'>
                    <div className='tile mt-3'>
                        <div className='tile is-parent is-vertical'>
                            <div className="panel" style={{ width : '50vh', marginTop : -10, height : '65vh', display : 'flex', flexDirection : 'column' }}>
                                <p className="panel-heading" style={{ fontSize : 15 }}>
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
                                    <button className='button is-small ml-2'>초기화</button>
                                </div>
                                <hr style={{ marginLeft : 10, marginRight : 10 }}/>
                                <div style={{ height : '175px', overflowY : 'auto', marginBottom : 20 }}>
                                    <table className='table' style={{ fontSize : 13, width : '95%', marginLeft : 10 }} >
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
                        </div>
                        
                        <div className='tile is-child' style={{ padding : 0 }}>
                            <div className='panel' style={{ height : '65vh', width : '92vh'}}>
                                <p className='panel-heading' style={{ fontSize : 15 }}>
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
                                <div style={{ overflowY : 'auto'}}>
                                    <table className='table is-bordered is-striped is-narrow is-hoverable ml-4' style={{ width : '96.5%', fontSize : 12, height : 150 }}>
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
                                <div className='mt-5'>
                                    <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>증상</span>
                                    <DiseaseSelectBox/>
                                    <button className='button is-small ml-5'>직접 입력</button>
                                    <button className='button is-small ml-2' onClick={handleDiseaseModalShow}>증상 항목 관리</button>
                                </div>
                                <div>
                                    <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>처치사항</span>
                                    <TreatSelectBox/>
                                    <button className='button is-small ml-5'>직접 입력</button>
                                    <button className='button is-small ml-2' onClick={handleTreatModalShow}>처치사항 항목 관리</button>
                                </div>
                                <div>
                                    <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>투약사항</span>
                                    <MedicineSelectBox/>
                                    <button className='button is-small ml-5'>직접 입력</button>
                                    <button className='button is-small ml-2' onClick={handleMedicineModalShow}>투약사항 항목 관리</button>
                                </div>
                                <div>
                                    <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>조치사항</span>
                                    <input 
                                        className='input is-small ml-3'
                                        placeholder='조치사항을 입력하세요'
                                        id='reactInput'
                                        style={{ width: '88%' }}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <span className='ml-5' style={{ fontSize : 13, fontWeight : 'bold' }}>침상안정</span>
                                    <button className='button is-small is-info is-light is-outlined ml-3'>사용 등록</button>
                                    <button className='button is-small is-danger is-light is-outlined ml-2'>사용 해제</button>
                                </div>
                                <div className='panel-block'>
                                    <div style={{ margin : 'auto' }}>
                                        <button className='button is-info is-small'>등록</button>
                                        <button className='button is-small ml-2'>초기화</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyWorkNote;