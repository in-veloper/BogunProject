/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
 
const Navbar = () => {
    const [name, setName] = useState('');
    const [bookmarkData, setBookmarkData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserName();
        getBookmarkData();
    }, []);

    
    const getUserName = async () => {
        try{
            if(name.length === 0) {
                const response = await axios.get('http://localhost:8000/token');
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
            }
        } catch (error) {
            if(error.response) {
                console.log(error);
            }
        }
    }
    
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:8000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    const goDailyWorkNote = async () => {
        navigate("/dailyWorkNote");
    }

    const [show, setShow] = useState(false);
    
    const handleClose = (event) => {
        event.preventDefault();
        setShow(false)
    };
    
    const handleShow = (event) => {
        event.preventDefault();
        setShow(true)
    };
    
    const AddBookmark = (event) => {
        event.preventDefault();
        const registeredBookmarks = [];
        let bookmarkElements = event.target.getElementsByTagName('li');
        bookmarkData.forEach(item => { registeredBookmarks.push(item.bookmarkName) });
        for(let i = 0; i < bookmarkElements.length; i++) {
            if(!registeredBookmarks.includes(bookmarkElements[i].firstChild.value)) {
                if(bookmarkElements[i].firstChild.value.length > 0 && bookmarkElements[i].lastChild.value.length > 0) {
                    try {
                        axios.post('http://localhost:8000/addBookmarks', {
                            bookmarkName : bookmarkElements[i].firstChild.value,
                            bookmarkAddress : bookmarkElements[i].lastChild.value
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }

        setShow(false);
    }

    const getBookmarkData = async () => {
        let bookmarkList = [];
        const response = await axios.get('http://localhost:8000/getBookmarks');
        if(response.data) {
            for(let i = 0; i < response.data.length; i++) {
                bookmarkList.push(response.data[i]);
            }
        }
        setBookmarkData(bookmarkList);
    }

    const onDeleteBookmark = (event) => {
        event.preventDefault();
        //! 여기부터 즐겨찾기 삭제 처리 로직 시작
        const targetBookmarkName = event.target.parentElement.getElementsByTagName('span')[0].textContent;
        bookmarkData.forEach(item => {
            if(item.bookmarkName === targetBookmarkName) {
                debugger
                try {
                    axios.post('http://localhost:8000/removeBookmarks', {
                        id : item.id,
                        bookmarkName : item.bookmarkName,
                        bookmarkAddress : item.bookmarkAddress
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    const GetBookmarks = () => {
        const bookmarkTag = [];
        if(bookmarkData.length > 0) {
            for(let i = 0; i < bookmarkData.length; i++) {
                bookmarkTag.push(
                    // <span style={{ display : 'inline-block' }}>
                    //     <a key={i} className='dropdown-item' style={{ height : 32 }} onClick={moveToBookmark}>
                    //         {bookmarkData[i].bookmarkName}
                    //     </a>    
                    //     <button className='button is-small' style={{ height : 20 }}>삭제</button>
                    // </span>
                    <a key={i} className='dropdown-item' style={{ height : 32, display : 'inline-block', paddingRight : 17 }} onClick={moveToBookmark}>
                        <span>{bookmarkData[i].bookmarkName}</span>
                        <button className='button is-small' style={{ height : 20, float : 'right' }} onClick={onDeleteBookmark}>삭제</button>
                    </a>    
                )
            }
        }else{
            bookmarkTag.push(
                <a key={10} className='dropdown-item' onClick={(e) => {e.preventDefault()}}>
                    등록항목 없음
                </a>
            )
        }
        return bookmarkTag;
    }

    const BookmarkFormData = () => {
        const bookmarkFormData = [];
        const sortedBookmarkData = bookmarkData.sort((a, b) => b.id - a.id);

        if(sortedBookmarkData.length > 0) {
            for(let i = 0; i < sortedBookmarkData.length; i++) {
                if(sortedBookmarkData[i].bookmarkName && bookmarkData[i].bookmarkAddress) {
                    bookmarkFormData.unshift(
                        <div className="controls" key={i}>
                            <li>
                                <input className='input' name='bookmarkName' type='text' defaultValue={ sortedBookmarkData[i].bookmarkName || '' } placeholder='페이지명' style={{ width : 150 }}/>&nbsp;&nbsp; : &nbsp;&nbsp;
                                <input className='input' name='bookmarkAddress' type='text' defaultValue={ sortedBookmarkData[i].bookmarkAddress || '' } placeholder='페이지 주소' style={{ width : 300 }}/>
                            </li>
                        </div>
                    )
                }
                
            }
            
            if(bookmarkFormData.length < 6) {
                for(let i = 0; i < (7 - bookmarkFormData.length); i++) {
                    bookmarkFormData.push(
                        <div className="controls" key={i + 10}>
                            <li>
                                <input className='input' name='bookmarkName' type='text' placeholder='페이지명' style={{ width : 150 }}/>&nbsp;&nbsp; : &nbsp;&nbsp;
                                <input className='input' name='bookmarkAddress' type='text' placeholder='페이지 주소' style={{ width : 300 }}/>
                            </li>
                        </div>
                    )
                }
            }
        }else{
            for(let i = 0; i < 5; i++) {
                bookmarkFormData.push(
                    <div className="controls" key={i}>
                        <li>
                            <input className='input' name='bookmarkName' type='text' placeholder='페이지명' style={{ width : 150 }}/>&nbsp;&nbsp; : &nbsp;&nbsp;
                            <input className='input' name='bookmarkAddress' type='text' placeholder='페이지 주소' style={{ width : 300 }}/>
                        </li>
                    </div>
                );
            }
        }
        return bookmarkFormData;
    }

    const moveToBookmark = (event) => {
        event.preventDefault();
        let address = '';
        if(event.target.textContent != '삭제') {
            bookmarkData.forEach(item => {
                if(item.bookmarkName === event.target.textContent) {
                    const url = item.bookmarkAddress;
                    if(!url.startsWith('http')) {
                        address = 'https://' + url;
                    } 
                }
            });
            // 브라우저 창을 따로 열어야 할 경우 및 외부 Link(URL)로 연결해야 할 경우 -> 앞에 Localhost 및 Port 번호가 붙는다면 변수에 담아 https를 포함한 전체 주소를 입력하면 해결된다.
            window.open(address);
        }
    }

    return (
        <nav className="navbar" style={{ borderBottom : '1px solid lightgrey'}} role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>
 
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/dashboard" className="navbar-item">
                            <b>메인</b>
                        </a>
                        <a href="/dailyWorkNote" className="navbar-item" onClick={goDailyWorkNote}>
                            <b>보건일지</b>
                        </a>
                        <a href="/calendar" className="navbar-item">
                            <b>보건일정</b>
                        </a>
                        <a href="/" className="navbar-item">
                            <b>약품정보</b>
                        </a>
                        <div className="navbar-item">
                            <div className='dropdown is-hoverable'>
                                <div className='dropdown-trigger'>
                                    <span aria-haspopup="true" aria-controls='dropdown-menu3'><b>즐겨찾기</b></span>
                                    <span className='icon is-small' style={{ verticalAlign : 'middle', marginTop : -3}}>
                                        <FaAngleDown />
                                    </span>
                                </div>
                                <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
                                    <div className='dropdown-content'>
                                        <GetBookmarks />
                                        <hr className='dropdown-divider'/>
                                        <a className='dropdown-item js-modal-trigger' data-target="modal" onClick={handleShow}>
                                            <AiOutlinePlusSquare style={{ marginRight : 5, marginTop : -5, fontSize : 17, verticalAlign : 'middle', fontWeight : 'bold' }}/>
                                            추가등록
                                        </a>
                                        {/* 즐겨찾기 추가 Modal */}
                                        <div className= {show ? 'modal is-active' : 'modal'}>
                                            <form onSubmit={AddBookmark}>
                                                <div className='modal-background'></div>
                                                    <div className='modal-card' style={{ width : 550}}>
                                                    <header className='modal-card-head'>
                                                        <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>즐겨찾기 목록 관리</p>
                                                        <button className='delete' aria-label='close' onClick={ handleClose }></button>
                                                    </header>
                                                    <section className='modal-card-body'>
                                                        <ul style={{ marginLeft : 20}}>
                                                            <BookmarkFormData />
                                                        </ul>
                                                    </section>
                                                    <footer className='modal-card-foot' style={{ padding : 0 }}>
                                                        <div style={{ marginLeft : 420, marginTop : 10 }}>
                                                            <button className='button is-info is-small'>저장</button>
                                                            <button className='button is-small' onClick={ handleClose }>닫기</button>
                                                        </div>
                                                    </footer>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="/myPage" className="navbar-item">
                            <b>내정보</b>
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <span style={{ marginRight: 20, color: 'gray' }}><b><u>{name} 보건교사님</u></b></span>
                            <div className="buttons are-small">
                                <button onClick={Logout} className="button is-info">
                                    <b>로그아웃</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar