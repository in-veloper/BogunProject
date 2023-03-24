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

    useEffect(() => {
        getUser();
        getStudentData();

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

    const getStudentData = async() => {
        try{
            const response = await axios.get('http://localhost:8000/getNametable');
            if(response.data) {
                // 학년 Select Box에서 선택한 수가 있을 경우 그 수에 맞는 반 Max와 번호 Max 구해서 Select Box에 넣기
                // 선택한 학년 없을 경우에는 먼저 학년 선택하도록 유도
                const jsonStudentData = JSON.parse(response.data[0].studentsJsonArray);
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

    const StudentSearchResult = () => {
        if(searchResult.length > 0) {
            const resultArray = [];
            searchResult.map((student, index) => {
                resultArray.push(
                    <tr>
                        <td>aa</td>
                        <td>{student.class}</td>
                        <td>{student.number}</td>
                        <td>{student.name}</td>
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
                        <td style={{ textAlign : 'center' }} colSpan={4}>조회 결과가 없습니다.</td>
                    </tr>
                </tbody>
            )
        }
    }

    const [searchResult, setSearchResult] = useState([]);

    const onSearchStudent = (event) => {
        event.preventDefault();
        const resultArray = [];

        const toSearchName = document.getElementById('searchName').value;
        const toSearchClassNumber = document.getElementById('searchClassNumber').value;
        const toSearchGradeValue = document.getElementById('gradeSelectBox').firstChild.value;
        const toSearchClassValue = document.getElementById('classSelectBox').firstChild.value;
        const toSearchNumberValue = document.getElementById('numberSelectBox').firstChild.value;

        if(studentJsonData) {
            studentJsonData.filter((student, index) => {
                if(student['name'].includes(toSearchName)) {
                    resultArray.push(student);
                }
            });
        }

        setSearchResult(resultArray);
    }

    return (
        <div className="container mt-5" style={{display: 'flex', flexDirection: 'column', height: '100vh', marginBottom : 25}}>
            <div style={{ marginLeft : 'auto', marginBottom : -20}}>
                <button className='button is-small'>학생별 보건일지</button>
                <button className='button is-small ml-3'>기간별 보건일지</button>
            </div>
            <div className='tile is-ancestor'>
                <div className='tile is-vertical is-12 mt-5'>
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
                                    <button className='button is-small ml-2'>리셋</button>
                                </div>
                                <hr style={{ marginLeft : 10, marginRight : 10 }}/>
                                <div style={{ height : '30%', marginBottom : 20 }}>
                                    <table className='table' style={{ fontSize : 13, width : '95%', marginLeft : 10 }} >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign : 'center'}}>학년</th>
                                                <th style={{ textAlign : 'center'}}>반</th>
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
                                <div className='panel-block'>
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