/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useCallback, useReducer} from 'react';
import Picker from "./Picker";
import Style from "./Style";
import ModalReducer from "./reducer/ModalReducer";
import CalcDate from './CalcDate';

const Modal = ({index, visible, onConfirm, onCancel}) => {
    
    const initialState = {
        color: '',
        todo: '',
        todos: '',
        checked: false,
        date: ''
    };

    const [state, dispatch] = useReducer(ModalReducer, initialState);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => {
        debugger
    }

    // const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    
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
        debugger
        dispatch({type: 'TODO', value: e.target.value})
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
        onCancel()
        handleClose()
        Initialization()
    }
    
    // 입력
    const confirm = () => {
        const todos = CalcDate(index, end);
        onConfirm({index, todo, color, todos})
        Initialization()
        changeColor('')
    }

    // if(visible) setModalShow(true);
    if (!visible) return null;
    
    return (
        <div className= { visible ? "modal is-active" : "modal" }>
        {/* <div className="modal is-active"> */}
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>일정 등록</p>
                    <button className='delete' aria-label='close' onClick={handleClose}></button>
                </header>
                <section className='modal-card-body'>
                    <p>{index}</p>
                    <div className="input">
                        <input placeholder="일정" value={todo} onChange={onChange} onKeyPress={onKeyPress}></input>
                            {color !== '' && <div className="custom-check-box" style={Style(color)}/>}
                    </div>
                    <div className="end">
                        <p>종료일 설정</p>
                        <input type = 'checkbox' onClick = {onCheck} 
                    />
                    </div>
                    <div className="choice-day">
                        { check === true &&
                            <div className="day">
                                <div className="end-day">
                                    <input type="text" onChange={onTodos} placeholder="2021.10.13"/>
                                </div>
                            </div>
                        }
                    </div>
                    <Picker changeColor = {changeColor}/>
                </section>
                <footer className='modal-card-foot'>
                    <button className="choice button is-success" onClick={confirm}>Confirm</button>
                    <button className="choice button" onClick={cancel}>Cancel</button>
                </footer>
            </div>
        {/* </div> */}
        </div>
     );
};

export default Modal