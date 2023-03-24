/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FcSearch } from 'react-icons/fc';
import Toast from './Toast.js';

const MedicalInfo = () => {
    const [data, setData] = useState(null);
    const [resultCount, setResultCount] = useState(0);
    const [searchCategory, setSearchCategory] = useState("");
    const [toSearch, setToSearch] = useState({});
    const [nonCategoryToast, setNonCategoryToast] = useState(false);
    const [nonSearchTextToast, setNonSearchTextToast] = useState(false);

    let toSearchCategory = "";
    let toSearchText = "";

    if(toSearch.hasOwnProperty('selectedCategory') && toSearch.hasOwnProperty('toSearchText')) {
        toSearchCategory = toSearch.selectedCategory;
        toSearchText = toSearch.toSearchText;
    }

    const URL = '/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';
    const getMedicalInfo = async() => {
        try {
            setData(null);
            if(toSearchCategory && toSearchText) {
                
                // 여기서 카테고리별로 어떻게 Text 들어오는거로 적용해서 검사할지 구현하면 됨
            
                const response = await axios.get(URL, {
                    params : {
                        // serviceKey : process.env.REACT_APP_API_KEY,
                        serviceKey : 'keLWlFS+rObBs8V1oJnzhsON3lnDtz5THBBLn0pG/2bSG4iycOwJfIf5fx8Vl7SiOtsgsat2374sDmkU6bA7Zw==',
                        pageNo : 1,
                        numOfRows : 100,
                        entpName : toSearchCategory === 'companyName' ? toSearchText : '',  // 업체명
                        itemName : toSearchCategory === 'itemName' ? toSearchText : '',  // 제품명
                        itemSeq : toSearchCategory === 'itemCode' ? toSearchText : '',   // 품목기준코드
                        efcyQesitm : toSearchCategory === 'effect' ? toSearchText : '', // 약 효능
                        // useMethodQesitm : '',    // 약 사용법
                        // atpnWarnQesitm : '',    // 약 사용전 알아야 할 사항
                        // atpnQesitm : '',    // 약 사용시 주의사항
                        // intrcQesitm : '',   // 해당 약 사용하는 동안 주의해야 할 약품 또는 음식
                        // seQesitm : '',  // 나타날 수 있는 부작용 또는 이상반응
                        // depositMethodQesitm : '',   // 보관방법
                        type : 'json'
                    }
                });
                
                if(response.data.hasOwnProperty('body')) {
                    setData(response.data.body);
                    setResultCount(response.data.body.items.length);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    // useEffect(() => {
    //     getMedicalInfo();
    // }, []);

    const renderSearchResult = () => {
        const result = [];
        
        if(data) {
            if(data.hasOwnProperty('items')) {
                for(let i = 0; i < data.items.length; i++) {
                    result.push(
                        <tr key={i}>
                            <td>{ data.items[i].itemName != null ? data.items[i].itemName.replace(/(<([^>]+)>)/ig,"") : data.items[i].itemName }</td>
                            <td>{ data.items[i].entpName != null ? data.items[i].entpName.replace(/(<([^>]+)>)/ig,"") : data.items[i].entpName }</td>
                            <td>{ data.items[i].itemSeq != null ? data.items[i].itemSeq.replace(/(<([^>]+)>)/ig,"") : data.items[i].itemSeq }</td>
                            <td>{ data.items[i].efcyQesitm != null ? data.items[i].efcyQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].efcyQesitm }</td>
                            <td>{ data.items[i].useMethodQesitm != null ? data.items[i].useMethodQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].useMethodQesitm }</td>
                            <td>{ data.items[i].atpnQesitm != null ? data.items[i].atpnQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].atpnQesitm }</td>
                            <td>{ data.items[i].intrcQesitm != null ? data.items[i].intrcQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].intrcQesitm }</td>
                            <td>{ data.items[i].seQesitm != null ? data.items[i].seQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].seQesitm }</td>
                            <td>{ data.items[i].depositMethodQesitm != null ? data.items[i].depositMethodQesitm.replace(/(<([^>]+)>)/ig,"") : data.items[i].depositMethodQesitm }</td>
                        </tr>
                    )
                }
            }
        }else{
            result.push(
                <tr key={0}>
                    <td colSpan='9' style={{ textAlign : 'center', fontSize : 15, fontWeight : 'bold' }}>검색 결과가 없습니다.</td>
                </tr>
            )
        }

        return result;
    }

    const handleSearchCategory = (event) => {
        const selectedCategory = event.target.value;
        setSearchCategory(selectedCategory);
        // setSearchCategory({
        //     ...searchCategory,
        //     searchCategory: selectedCategory
        // });
    }

    const handleSearch = (event) => {
        debugger
        const toSearchText = document.getElementById('searchText').value;
        const mediCategory = document.getElementById('mediCategory');
        const selectedCategory = mediCategory.getElementsByTagName('select')[0].value;
        
        if(selectedCategory === 'none') {
            setNonCategoryToast(true);
            return;
        }else if(toSearchText.length === 0){
            setNonSearchTextToast(true);
            return;
        }else {
            setToSearch({
                selectedCategory : selectedCategory,
                toSearchText : toSearchText 
            });
    
            getMedicalInfo();
        }
    }

    return (
        <div className="container mt-5" style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            {nonCategoryToast && <Toast setToast={setNonCategoryToast} text="검색 분류를 선택해주세요."></Toast>}
            {nonSearchTextToast && <Toast setToast={setNonSearchTextToast} text="검색어를 입력해주세요."></Toast>}
            <div id='searchBar' style={{ alignItems : 'center'}}>
                <div className="select is-small" id='mediCategory' style={{ float : 'left' }}>
                    <select onChange={handleSearchCategory} value={searchCategory}>
                        <option value='none'>분류 선택</option>
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
                <FcSearch style={{ fontSize : 20, marginBottom : -6, marginLeft : 5, cursor : 'pointer' }} onClick={handleSearch}/>
            </div>
            <div>
                <div style={{ display : 'inline-block', float : 'right', marginBottom : 20, marginRight : 20, marginTop : 20 }}>
                    <p style={{ float : 'left', fontSize : 13 }}><u>검색결과 수 : {resultCount}</u></p>
                </div>
                <table className='table is-fullwidth' style={{ marginTop : 20, overflow: 'scroll' }}>
                    <thead style={{ fontSize : 13, fontWeight : 'bold' }}>
                        <tr>
                            <td>제품명</td>
                            <td style={{ width : 70 }}>업체명</td>
                            <td>품목코드</td>
                            <td>효능</td>
                            <td>사용법</td>
                            <td>주의사항</td>
                            <td>상호작용</td>
                            <td>부작용</td>
                            <td style={{ width : 70 }}>보관법</td>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize : 13 }}>
                        { renderSearchResult() }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MedicalInfo;