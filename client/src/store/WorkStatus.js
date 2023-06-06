/* eslint-disable */

import React, { createContext, useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from '../store/User.js';

export const WorkStatusContext = createContext();

const WorkStatusStore = (props) => {
    const [user, setUser] = useState(null);
    const userContext = useContext(UserContext)
    const [workStatus, setWorkStatus] = useState('');
    
    if(userContext && !user) {
        setUser(userContext);
    }

    // 이 부분이 디버깅이 걸리지 않았던 이유는 App.tsx에서 등록해주지 않아서임
    // 꼭 등록해주어야 아래 함수를 탈 수 있게 됨
    // 여기부터 처리하면 됨
    const getWorkStatus = async () => {
        try {
            if(user) {
                await axios.get('http://localhost:8000/getWorkStatus', {
                    params: {
                        userId : user.userId,
                        userName : user.userName,
                        schoolName : user.schoolName
                    }
                }).then((response) => {
                    if(response.data.length == 0 && workStatus.length == 0) {
                        debugger
                        initWorkStatus();
                    }
                });
                debugger
                // setWorkStatus('working');
                // debugger
                // if(response.data.length == 0 && workStatus.length == 0) {
                //     setWorkStatus('working');
                //     initWorkStatus();
                //     debugger
                // }else{

                // }
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }

    const initWorkStatus = () => {
        if(user) {
            debugger
            axios.post('http://localhost:8000/setWorkStatus', {
                userId : user.userId,
                userName : user.userName,
                schoolName : user.schoolName,
                currentWorkStatus : 'working'
            });
        }
    }

    // if(!workStatus.length == 0) {
        getWorkStatus();
    // }

    return (
        <WorkStatusContext.Provider value={workStatus}>{props.children}</WorkStatusContext.Provider>
    )

};

export default WorkStatusStore;