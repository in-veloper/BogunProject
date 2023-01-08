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
                <div className='tile is-vertical is-8'>
                    <div className='tile'>
                        <div className='tile is-parent is-vertical'>
                            <article className='tile is-child notification is-primary'>
                                <p className='title'>Vertical...</p>
                                <p className='subtitle'>Top Tile</p>
                            </article>
                            <article className='tile is-child notification is-warning'>
                                <p className='title'>...tiles</p>
                                <p className='subtitle'>Bottom Tile</p>
                            </article>
                        </div>
                        <div className='tile is-parent'>
                            <article className='tile is-child notification is-info'>
                                <p className='title'>Middle Tile</p>
                                <p className='subtitle'>With an image</p>
                                <figure className='image is-4by3'>
                                    {/* <img src=''></img> */}
                                </figure>
                            </article>
                        </div>
                    </div>
                    <div className='tile is-parent'>
                        <article className='tile is-child notification is-danger'>
                            <p className='title'>Wide Tile</p>
                            <p className='subtitle'>Aligned with the right Tile</p>
                            <div className='content'>
                                {/* <!-- Content --> */}
                            </div>
                        </article>
                    </div>
                </div>
                <div className='tile is-parent'>
                    <article className='tile is-child notification is-success'>
                        <div className='content'>
                            <p className='title'>Tall Tile</p>
                            <p className='subtitle'>With even more content</p>
                            <div className='content'>
                                {/* <!-- Content --> */}
                            </div>
                        </div>
                    </article>
                </div>
            </div>



            {/* <h1>Welcome Back: {name}</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
 
                </tbody>
            </table> */}
        </div>
    )
}
 
export default Dashboard;