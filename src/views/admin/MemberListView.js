import React, { useState, useEffect } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar';
import MemberListTable from '../../component/member/MemberList.js';

import axios from 'axios';



import '../../style/admin/adminMemberList.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import


const MemberList = () => {

    const [pageNumber, setPageNumber] = useState([]);
    const [showData, setShowData] = useState([]);
    const [findMode, setFindMode] = useState('userId');
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        getDataByPageNumber(1)
        getPageNumbers();
    }, []);



    const getPageNumbers = async () => {

        try {
            const response = await axios.get('/api/user/pageNumbers?type=users',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            setPageNumber(response.data)
        } catch (e) {
            console.log("MemberList" + e)
        }


    };


    const getDataByPageNumber = async (item) => {
        try {
            setCurrentPage(item)
            const response = await axios.get('/api/user/getUsersByPage?page=' + item,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
    
            setShowData(response.data);
            
        } catch (e) {
            console.log(e);
        }

    };

    const changeFinedMode = async (item) => {
        setFindMode(item);
    };

    const searchUser = async (content) => {
        try {
            
            console.log(content)
            console.log(content === '')
            if (content === '') {
                getDataByPageNumber(1)
                return
            }
    
            const response = await axios.get(`/api/user/search?type=${findMode}&content=${content}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
    
            setShowData(response.data);
        } catch (e) {
            console.log(e);            
        }
    };

    return (
        <>
            <Header content="Management"></Header>
            <SideBar setting={
                {
                    "logindUserName": window.localStorage.getItem("name"),
                    "allMenus": [
                        {
                            "categoryName": "회원 관리",
                            "subMenus": [
                                {
                                    "subMenuName": "사용자",
                                    "link": "/manager/members",
                                    "isSelected": true
                                },
                                {
                                    "subMenuName": "관리자",
                                    "link": "/manager/managers",
                                    "isSelected": false
                                }
                            ]
                        },
                        {
                            "categoryName": "고객센터",
                            "subMenus": [
                                {
                                    "subMenuName": "A/S접수",
                                    "link": "/manager/repaireprocess",
                                    "isSelected": false
                                },
                                {
                                    "subMenuName": "게시판",
                                    "link": "/manager/board",
                                    "isSelected": false
                                },
                                {
                                    "subMenuName": "사용자 페이지 전환",
                                    "link": "/customer/board",
                                    "isSelected": false
                                }
                            ]
                        },
                        {
                            "categoryName": "콘텐츠 관리",
                            "subMenus": [
                                {
                                    "subMenuName": "자주 묻는 질문",
                                    "link": "/manager/asklist",
                                    "isSelected": false
                                }
                            ]
                        }

                    ]


                }}
            />  
            <section id="main">
                <div className="page-title">회원관리</div>
                <div className='container'>
                    <div className='search'>
                        <input type='text' onChange={(e) => {
                            searchUser(e.target.value);  // 검색 함수를 호출합니다.
                        }} placeholder={findMode === 'userId' ? '아이디를 입력해주세요' : '이름을 입력해주세요'} style={{ "flex": 1 }} />

                        <button onClick={() => changeFinedMode("userId")}>아이디로 검색</button>
                        <button onClick={() => changeFinedMode("name")}>이름으로 검색</button>
                    </div>
                    <MemberListTable showData={showData}></MemberListTable>
                    <div className='page_selector'>
                        <nav>
                            <ul className="pagination pagination-sm">
                                {pageNumber.map((item, index) => (
                                    currentPage === item ? (
                                        <li key={index} className="page-item active" aria-current="page">
                                            <span className="page-link">{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <a href='#!' className="page-link" onClick={() => getDataByPageNumber(item)}>{item}</a>
                                        </li>
                                    )
                                ))}

                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>

    );
};

export default MemberList;