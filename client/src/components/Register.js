/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Neis from "@my-school.info/neis-api";

const neis = new Neis({ KEY : "1addcd8b3de24aa5920d79df1bbe2ece", Type : "json" });

const Register = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [isSelected, setIsSelected] = useState(false);
    
    const [schoolName, setSchoolName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    
    // const URL = "https://open.neis.go.kr/hub/schoolInfo";
    const getSchoolInfo = (e) => {
        try {
            setLoading(true);
            neis.getSchoolInfo({
                    // args
                    SCHUL_NM : e
                },{
                    // config
                    pIndex : 1,
                    pSize : 100
            }).then((response) => {
                if(!response) {
                    setData(null);
                }else{
                    if(response.length > 20) {
                        setData(null)
                    }else{
                        setData(response);
                    }
                }
            });
        } catch (error) {
            console.log(error);
            setError(error)
        }
        setLoading(false);
    }

    const searchHandle = (e) => {
        setIsSelected(false);
        setSchoolName(e.target.value);
        getSchoolInfo(e.target.value);
    }

    const selectSchool = (props) => {
        setSchoolName(props);
        setIsSelected(true);
    }

    const SearchResultBox = () => {
        if(data && !isSelected) {
            const schoolList = [];
            for(let i = 0; i < data.length; i++) {
                let info = data[i];
                schoolList.push(<li key={i} onClick={(event)=>{ selectSchool(info.SCHUL_NM) }}><b>{ info.SCHUL_NM }</b> [{ info.ORG_RDNMA }]</li>);
            }
            return <div className='box'>
                <ul> { schoolList } </ul>
            </div>
        }
    }

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/users', {
                schoolName: schoolName,
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register