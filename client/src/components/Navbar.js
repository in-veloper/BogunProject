/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Navbar = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserName();
    }, []);

    
    const getUserName = async () => {
        try{
            const response = await axios.get('http://localhost8000/token');
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }
    
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:8000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    const goDailyWorkNote = async () => {
        navigate("/dailyWorkNote");
    }
    
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>
 
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/dashboard" className="navbar-item">
                            <b>메인</b>
                        </a>
                        <a href="/dailyWorkNote" className="navbar-item" onClick={goDailyWorkNote}>
                            <b>보건일지</b>
                        </a>
                        <a href="/" className="navbar-item">
                            <b>보건일정</b>
                        </a>
                        <a href="/" className="navbar-item">
                            <b>약품정보</b>
                        </a>
                        <a href="/" className="navbar-item">
                            <b>관련페이지</b>
                        </a>
                        <a href="/myPage" className="navbar-item">
                            <b>내정보</b>
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <span style={{ marginRight: 20, color: 'gray' }}><b><u>{name} 보건교사님</u></b></span>
                            <div className="buttons are-small">
                                <button onClick={Logout} className="button is-success">
                                    <b>로그아웃</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar