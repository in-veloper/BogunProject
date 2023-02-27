/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
 
const Dashboard = () => {
    // const [name, setName] = useState('');
    // const [token, setToken] = useState('');
    // const [expire, setExpire] = useState('');
    // const [users, setUsers] = useState([]);
    // const navigate = useNavigate();
 
    // useEffect(() => {
    //     refreshToken();
    //     getUsers();
    // }, []);
 
    // const refreshToken = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/token');
    //         setToken(response.data.accessToken);
    //         const decoded = jwt_decode(response.data.accessToken);
    //         setName(decoded.name);
    //         setExpire(decoded.exp);
    //     } catch (error) {
    //         if (error.response) {
    //             navigate("/");
    //         }
    //     }
    // }
 
    // const axiosJWT = axios.create();
 
    // axiosJWT.interceptors.request.use(async (config) => {
    //     const currentDate = new Date();
    //     if (expire * 1000 < currentDate.getTime()) {
    //         const response = await axios.get('http://localhost:8000/token');
    //         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    //         setToken(response.data.accessToken);
    //         const decoded = jwt_decode(response.data.accessToken);
    //         setName(decoded.name);
    //         setExpire(decoded.exp);
    //     }
    //     return config;
    // }, (error) => {
    //     return Promise.reject(error);
    // });
 
    // const getUsers = async () => {
    //     const response = await axiosJWT.get('http://localhost:8000/users', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     setUsers(response.data);
    // }
 
    return (
        <div className="container mt-5" style={{display: 'flex', flexDirection: 'column', height: '100vh', marginBottom : 25}}>
            <div className='tile is-ancestor'>
                <div className='tile is-vertical is-12 mt-5'>
                    <div className='panel is-info'>
                        <p class="panel-heading" style={{ fontSize : 15 }}>
                            공지사항
                            <button className='button is-text is-normal' style={{ padding : 0, float : 'right', verticalAlign: 'center', marginLeft : -35, marginTop : -8, marginBottom : -10, color : 'white', background : 'transparent' }}>
                                More
                            </button>
                        </p>
                        <div class="panel-block">
                            <table className='table is-fullwidth is-striped is-hoverable' style={{ textAlign : 'center' }}>
                                <thead>
                                    <tr style={{ fontSize : 13 }}>
                                        <th style={{ textAlign : 'center', width : 50 }}>No</th>
                                        <th style={{ textAlign : 'center', width : 300 }}>제목</th>
                                        <th style={{ textAlign : 'center', width : 450 }}>내용</th>
                                        <th style={{ textAlign : 'center', width : 200 }}>작성일</th>
                                        <th style={{ textAlign : 'center', width : 100 }}>분류</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize : 15 }}>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='panel-block'>
                            <div style={{ marginLeft : '33%' }}>
                                <nav className="pagination is-centered" role="navigation" aria-label="pagination" style={{ fontSize : 13 }}>
                                    <a className="pagination-previous">Previous</a>
                                    <a className="pagination-next">Next page</a>
                                    <ul className="pagination-list">
                                        <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                                        <li><span className="pagination-ellipsis">&hellip;</span></li>
                                        <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
                                        <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                                        <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
                                        <li><span className="pagination-ellipsis">&hellip;</span></li>
                                        <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className='tile mt-5'>
                        <div className='tile is-parent is-vertical mr-5'>
                            <div class="panel is-info" style={{ marginLeft : -12, marginTop : -10}}>
                                <p class="panel-heading" style={{ fontSize : 15 }}>
                                    이번 달 보건일정
                                </p>
                                <div class="panel-block">
                                    <p class="control has-icons-left">
                                    </p>
                                </div>
                                <a class="panel-block is-active">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    bulma
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    marksheet
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    minireset.css
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    jgthms.github.io
                                </a>
                            </div>
                            <div class="panel is-info mt-3" style={{ marginLeft : -12, marginTop : -10}}>
                                <p class="panel-heading" style={{ fontSize : 15 }}>
                                    미정
                                </p>
                                <div class="panel-block">
                                    <p class="control has-icons-left">
                                    </p>
                                </div>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    bulma
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    marksheet
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    minireset.css
                                </a>
                                <a class="panel-block">
                                    <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                    </span>
                                    jgthms.github.io
                                </a>
                            </div>
                        </div>
                        
                        <div className='tile is-child' style={{ padding : 0 }}>
                            <div className='panel is-info' style={{ paddingBottom : 45}}>
                                <p className='panel-heading' style={{ fontSize : 15 }}>
                                    문의 & 요청
                                    <button className='button is-text is-normal' style={{ padding : 0, float : 'right', verticalAlign: 'center', marginLeft : -35, marginTop : -8, marginBottom : -10, color : 'white', background : 'transparent' }}>
                                        More
                                    </button>
                                </p>
                                <div className='panel-block'>
                                    <table className='table is-fullwidth is-striped is-hoverable' style={{ textAlign : 'center', margin : 10 }}>
                                        <thead style={{ fontSize : 13 }}>
                                            <tr>
                                                <th style={{ textAlign : 'center', width : 50 }}>No</th>
                                                <th style={{ textAlign : 'center', width : 350 }}>제목</th>
                                                <th style={{ textAlign : 'center', width : 100}}>작성자</th>
                                                <th style={{ textAlign : 'center', width : 70}}>답변</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize : 15 }}>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='panel-block'>
                                    <div style={{ marginLeft : '18%'}}>
                                        <nav className="pagination is-centered" role="navigation" aria-label="pagination" style={{ fontSize : 13 }}>
                                            <a className="pagination-previous">Previous</a>
                                            <a className="pagination-next">Next page</a>
                                            <ul className="pagination-list">
                                                <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                                <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
                                                <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                                                <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
                                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                                <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
                                            </ul>
                                        </nav>
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
 
export default Dashboard;