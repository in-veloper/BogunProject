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