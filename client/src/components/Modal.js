/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback, useReducer} from 'react';
import Picker from "./Picker";
import Style from "./Style";
import ModalReducer from "./reducer/ModalReducer";
import CalcDate from './CalcDate';
import './style/calendarModal.css';
import { ImNotification } from 'react-icons/im';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Modal = ({index, visible, onConfirm, onCancel}) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getUserName();
    }, []);
    
    const getUserName = async () => {
        try{
            if(userId.length === 0) {
                const response = await axios.get('http://localhost:8000/token');
                const decoded = jwt_decode(response.data.accessToken);
                setUserId(decoded.email);
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }
    
    
    const initialState = {
        color: '',
        todo: '',
        todos: '',
        checked: false,
        date: ''
    };

    let convertedToday = '';
    if(index) 
        convertedToday = index.split('.')[0] + '년 ' + index.split('.')[1] + '월 ' + index.split('.')[2] + '일';
    

    const [state, dispatch] = useReducer(ModalReducer, initialState);
    const [modalShow, setModalShow] = useState(false);

    const color = state.color;
    const todo = state.todo;
    const todos = state.todos;
    const check = state.checked;
    const end = state.date

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onConfirm({index, todo});
            dispatch({type: 'CHANGE', value: ''});
        }
    }
    
    // 초기화
    const Initialization = () => {
        dispatch({type: 'INITIALIZATION'});
    }

    // 색상 변경
    const changeColor = (color) => {
        dispatch({type: 'COLOR', value: color});
    }
    
    // 일정
    const onChange = useCallback(e => {
        dispatch({type: 'TODO', value: e.target.value});
    }, [])
    
    // 일정 종료일
    const onTodos = useCallback( e => {
        dispatch({type: 'TODOS', value: e.target.value});
    }, [])

    // 체크 박스
    const onCheck = () => {
        dispatch({type: 'CHECK', value: check});
    }
    
    // 입력 취소
    const cancel = () => {
        onCancel();
        Initialization();
    }
    
    // 입력
    const confirm = () => {
        const todos = CalcDate(index, end);
        onConfirm({index, todo, color, todos});
        Initialization();
        changeColor('');

        try{
            axios.post('http://localhost:8000/addCalendar', {
                userId : userId,
                selectedDate : index,
                endDate : end,
                selectedColor : color,
                todo : todo
            });
        } catch(error) {
            console.log(error);
            return;
        }
    }

    if (!visible) return null;
    
    return (
        <div className= { visible ? "modal is-active" : "modal" }>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>보건일정 등록</p>
                    <button className='delete' aria-label='close' onClick={cancel}></button>
                </header>
                <section className='modal-card-body'>
                    <p style={{ fontSize : 18, fontWeight : 'bold', marginLeft : -15, marginBottom : 10 }}>{convertedToday}</p>
                    <div className="input">
                        <input className='schedule-input' placeholder="보건 일정을 입력해 주세요" value={todo} onChange={onChange} onKeyPress={onKeyPress} style={{ width : '95%', border : 'none'}}></input>
                            {color !== '' && <div className="custom-check-box" style={Style(color)}/>}
                    </div>
                    <hr style={{ marginTop : 15, marginBottom : 15 }}/>
                    <div className="end">
                        <p style={{ fontSize : 15 }}><b>종료일 설정</b></p>
                        <input type='checkbox' onClick = {onCheck} style={{ marginTop : 7}}/>
                    </div>
                    <div className="choice-day" style={{ marginLeft : -20, marginTop : 10 }}>
                        { check === true &&
                            <div className="day">
                                <div className="end-day" style={{ display : 'inline-block'}}>
                                    <div className='input' style={{ width : 120, float : 'left' }}>
                                        <input className='schedule-input' type="text" onChange={onTodos} placeholder="2021.10.13" style={{ width : 80, marginLeft : 10, border : 'none' }}/>
                                    </div>
                                    <div className='notification' style={{ float : 'right', height : 35, marginTop : 2, paddingTop : 7, fontSize : 12, width : 355 }}>
                                        <ImNotification style={{ fontSize : 13, marginBottom : -2, marginRight : 5 }} />
                                        <span>날짜 입력은 20OO.OO.OO 형식으로 입력해 주세요</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <hr style={{ marginTop : 15, marginBottom : 15 }}/>
                    <p style={{ fontSize : 15, textAlign : 'left', marginTop : 15, marginBottom : -15}}><b>일정 분류색 설정</b></p>
                    <Picker changeColor = {changeColor}/>
                </section>
                <footer className='modal-card-foot' style={{ padding : 0 }}>
                    <div style={{ marginLeft : 370, marginTop : 10 }}>
                        <button className="choice button is-info is-small" style={{ padding : 0 }} onClick={confirm}>저장</button>
                        <button className="choice button is-small" style={{ marginLeft : 0, padding : 0 }} onClick={cancel}>닫기</button>
                    </div>
                </footer>
            </div>
        </div>
     );
};

export default Modal