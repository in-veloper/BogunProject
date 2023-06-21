/* eslint-disable */

import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';

export const UserContext = createContext();

const UserStore = (props) => {
    const [user, setUser] = useState(null);
    
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/token');
            const decoded = jwt_decode(response.data.accessToken);
            
            setUser({
                userId : decoded.email,
                userName : decoded.name,
                schoolName : decoded.schoolName
            });
        } catch (error) {
            if(error.response) {
                // await axios.delete('http://localhost:8000/logout');
                useNavigate("/");
                console.log(error);
            }
        }
    }

    if(!user) {
        // 여기서 getUser()를 하게 되면 조건문 안에서 hook을 사용하게 되는 경우라 에러 발생
        // 하지만 조건 없이 getUser()를 하게 되면 계속 호출하게 되는 현상 발생
        // getUser() 자체를 호출하지 않으면 User 정보를 불러오지 못하는 현상 발생
        getUser();
    }

    // const users = {
    //     name : "inveloper",
    //     job : "developer"
    // };

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
};

export default UserStore;