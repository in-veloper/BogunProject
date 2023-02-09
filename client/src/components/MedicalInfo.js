/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FcSearch } from 'react-icons/fc';

const MedicalInfo = () => {
    const [data, setData] = useState(null);
    const [searchCategory, setSearchCategory] = useState("");
    const [toSearch, setToSearch] = useState(null);

    const URL = '/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';
    const fetchData = async(request) => {
        try {
            setData(null);
            const response = await axios.get(URL, {
                params : {
                    ServiceKey : process.env.REACT_APP_API_KEY,
                    pageNo : 1,
                    numOfRows : 3,
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
        // debugger
        // 이제 값 잘 들어옴 data 안에 body에 있음
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

    const handleSearchCategory = (event) => {
        const selectedCategory = event.target.value;
        setSearchCategory(selectedCategory);
        // setSearchCategory({
        //     ...searchCategory,
        //     searchCategory: selectedCategory
        // });
        // debugger
    }

    const handleSearch = (event) => {
        
        const toSearchText = document.getElementById('searchText').value;
        const mediCategory = document.getElementById('mediCategory');
        const selectedCategory = mediCategory.getElementsByTagName('select')[0].value;

        setToSearch({
            selectedCategory : selectedCategory,
            toSearchText : toSearchText 
        });
        debugger
    }

    return (
        <div className="container mt-5" style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            {/* <p>{data.response.body}</p> */}
            <div id='searchBar'>
                <div className="select is-small" id='mediCategory' style={{ float : 'left' }}>
                    <select onChange={handleSearchCategory} value={searchCategory}>
                        <option value='all'>전체</option>
                        <option value='itemName'>제품명</option>
                        <option value='companyName'>업체명</option>
                        <option value='effect'>효능</option>
                        <option value='itemCode'>품목기준코드</option>
                    </select>
                </div>
                <div style={{ float : 'left', marginLeft : 20 }}>
                    <input 
                        className='input is-info is-small'
                        placeholder='검색어를 입력하세요'
                        id='searchText'
                        style={{ width: 300 }}
                    />
                </div>
                <FcSearch style={{ fontSize : 20, marginBottom : -6, marginLeft : 5 }} onClick={handleSearch}/>
            </div>
            
        </div>
    )
}

export default MedicalInfo;