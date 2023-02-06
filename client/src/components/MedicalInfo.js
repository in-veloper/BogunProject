/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from "axios";



const MedicalInfo = () => {
    const [data, setData] = useState(null);
    const URL = '/DrbEasyDrugInfoService';
    const fetchData = async(request) => {
        try {
            setData(null);

            const response = await axios.get(URL, {
                params : {
                    ServiceKey : process.env.REACT_APP_API_KEY,
                    // pageNo : 1,
                    // numOfRows : 3,
                    entpName : '한미약품(주)',  // 업체명
                    // itemName : '타이레놀',  // 제품명
                    // itemSeq : '',   // 품목기준코드
                    // efcyQesitm : '', // 약 효능
                    // useMethodQesitm : '',    // 약 사용법
                    // atpnWarnQesitm : '',    // 약 사용전 알아야 할 사항
                    // atpnQesitm : '',    // 약 사용시 주의사항
                    // intrcQesitm : '',   // 해당 약 사용하는 동안 주의해야 할 약품 또는 음식
                    // seQesitm : '',  // 나타날 수 있는 부작용 또는 이상반응
                    // depositMethodQesitm : '',   // 보관방법
                    type : 'json'
                }
            });

            setData(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        // getEMedicalInfo();
        fetchData();
    }, []);


    if(data) {
        debugger
    }
    // const getEMedicalInfo = async() => {
    //     const URL = '/1471000/DrbEasyDrugInfoService';

    //     const response = axios.get(URL, {
    //         params : {
    //             ServiceKey : process.env.REACT_APP_API_KEY,
    //             entpName : '한미약품(주)',  // 업체명
    //             // itemName : '',  // 제품명
    //             // itemSeq : '',   // 품목기준코드
    //             // efcyQesitm : '', // 약 효능
    //             // useMethodQesitm : '',    // 약 사용법
    //             // atpnWarnQesitm : '',    // 약 사용전 알아야 할 사항
    //             // atpnQesitm : '',    // 약 사용시 주의사항
    //             // intrcQesitm : '',   // 해당 약 사용하는 동안 주의해야 할 약품 또는 음식
    //             // seQesitm : '',  // 나타날 수 있는 부작용 또는 이상반응
    //             // depositMethodQesitm : '',   // 보관방법
    //             type : 'json'
    //         }
    //     });
    //     debugger
    //     setData(response.data);
    // }

    return (
        <div className="container mt-5" style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            {/* <p>{data.response.body}</p> */}
        </div>
    )
}

export default MedicalInfo;