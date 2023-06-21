/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../store/User';
import { WorkStatusContext } from '../store/WorkStatus';
import Neis from "@my-school.info/neis-api";

const CurrentStatus = () => {

    const neis = new Neis({ KEY : "1addcd8b3de24aa5920d79df1bbe2ece", Type : "json" });

    const [data, setData] = useState(null);
    const [schoolName, setSchoolName] = useState('');
    const [name, setName] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const workStatusContext = useContext(WorkStatusContext);

    if(workStatusContext != 'working') {
        // debugger
        // 여기서 보건교사의 업무상태가 working이 아닐 경우 제약사항 처리 필요
    }

    const getSchoolInfo = async (e) => {
        try {
            setLoading(true);
            await neis.getSchoolInfo({
                    // args
                    SCHUL_NM : e
                },{
                    // config
                    pIndex : 1,
                    pSize : 100
            }).then((response) => {
                debugger
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

    return (
        <div className="container mt-6" style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            <section className="hero is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-6-desktop">
                                <form className="box">
                                    <p className="has-text-centered"></p>
                                    <label className='label'>학교 선택</label>
                                    <input className="input" name="searchSchool" type="text" value={schoolName} onChange={ searchHandle } placeholder="학교명을 입력하세요" />
                                    <div>
                                        <SearchResultBox />
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label">Name</label>
                                        <div className="controls">

                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label">Email</label>
                                        <div className="controls">

                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label">Password</label>
                                        <div className="controls">

                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label">Confirm Password</label>
                                        <div className="controls">

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

            {/* <div className='tile is-ancestor' style={{ width : '100%' }}>
                    <div className='panel ml-5' style={{ width : '48%', height : '50%', fontSize : 12 }}>
                        <p className='panel-heading'>
                            처치 의뢰
                        </p>
                    </div>
                    <div className='panel ml-6' style={{ width : '48%',height : '50%', fontSize : 12 }}>
                        <p className='panel-heading'>
                            침상안정 의뢰
                        </p>
                    </div>
            </div> */}
        </div>
    )
}


export default CurrentStatus;