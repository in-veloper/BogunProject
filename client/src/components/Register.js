/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { setegid } from 'process';

const URL = "https://open.neis.go.kr/hub/schoolInfo";

const Register = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [schoolName, setSchoolName] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    
    const getSchoolInfo = (e) => {
        try {
            setLoading(true);
            axios.get(URL, {
                params: {
                    KEY: "1addcd8b3de24aa5920d79df1bbe2ece",
                    pIndex: 1,
                    pSize: 100,
                    Type: "json",
                    SCHUL_NM: e
                }
            }).then((response) => {
                const data = response.data;
                
                // data.schoolInfo가 없으면 값이 없을 떄
                if(!data.schoolInfo) {
                    setData(null)
                } else {
                    if(data.schoolInfo[1].row.length > 50) {
                        setData(null);
                    }else{
                        setData(data.schoolInfo[1].row);
                        // SchoolList(data.schoolInfo[1].row);
                    }
                }    
                
                // setData(data);
                console.log(data);
            });
        } catch (error) {
            console.log(error);
            setError(error)
        }
        setLoading(false);
    }

    const searchHandle = (e) => {
        setSchoolName(e.target.value);
        getSchoolInfo(e.target.value);
        // SchoolList(data);
    }

    const SearchResultBox = () => {
        if(data) {
            for(let i = 0; i < data.length; i++) {
                return <ul>
                    <li>{ data[i].SCHUL_NM }</li>
                </ul>
            }
        }
    }
    // useEffect(() => {
    //     // fetchData();
    // }, [data]);

    // if(loading) return <div>loading...</div>;
    // if(error) return <div>Error...</div>;
    // if(!data) return null;

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost8000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    // const SchoolList = (data) => {
    //     if(data.length) {
    //         debugger
    //         return (
    //                         data.forEach(item => {
    //                             <li>item.SCHUL_NM</li>
    //                         })
    //                         // data.map((v, inx) => {
    //                         //     <li>v.SCHUL_NM</li>
    //                         // })
    //         )
    //     }
    // }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-6-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <label className='label'>학교 선택</label>
                                <input className="input" name="searchSchool" type="text" value={schoolName} onChange={ searchHandle } placeholder="학교명을 입력하세요" />
                                <div>
                                    <SearchResultBox />
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                            {/* <div>
                                <p>{ data.response }</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register