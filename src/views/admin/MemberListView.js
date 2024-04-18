import React, { useState, useEffect } from 'react';

import MemberListTable from '../../component/member/MemberList.js';

import axios from 'axios';



import '../../style/admin/adminMemberList.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import


const MemberList = () => {

    const [pageNumber, setPageNumber] = useState([]);
    const [showData, setShowData] = useState([]);
    const [findMode, setFindMode] = useState('userId');
    const [content, setContent] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        searchUser()
    }, [content, currentPage]);


    const handleSearchInput = (e) => {
        setContent(e.target.value);
    }

    const handlePageNation = async (item) => {
        setCurrentPage(item)
    };

    const changeFinedMode = (e) => {
        setFindMode(e);
    }



    const searchUser = async () => {
        try {
            
            const response = await axios.get(`/api/user/search?type=${findMode}&content=${content}&currentPage=${currentPage}`);
            setShowData(response.data.data);
            setPageNumber(Array.from({ length: Math.ceil(response.data.totalData / 5) }, (_, index) => index + 1));

        } catch (e) {
            console.log(e);            
        }
    };

    return (
        <>
            <section id="main">
                <div className="page-title">회원관리</div>
                <div className='container'>
                    <div className='search'>
                        <input type='text' onChange={(e) => handleSearchInput(e)} placeholder={findMode === 'userId' ? '아이디를 입력해주세요' : findMode === 'name' ? '이름을 입력 해주세요' : "검색 모드를 선택 해주세요."} style={{ "flex": 1 }} />

                        <button style={findMode === 'userId' ? {backgroundColor:'rgb(140, 230, 30)'} : {}} onClick={() => changeFinedMode("userId")}>아이디로 검색</button>
                        <button style={findMode === 'name' ? {backgroundColor:'rgb(140, 230, 30)'} : {}} onClick={() => changeFinedMode("name")}>이름으로 검색</button>
                    </div>
                    <MemberListTable showData={showData}></MemberListTable>
                    <div className='page_selector'>
                        <nav>
                            <ul className="pagination pagination-sm">
                                {currentPage === 1 || showData.length === 0?
                                    <li class="page-item disabled">
                                        <a class="page-link">Previous</a>
                                    </li>
                                    : 
                                    <li class="page-item">
                                        <a class="page-link" onClick={()=> {setCurrentPage(currentPage - 1)}}>Previous</a>
                                    </li>
                                }
                                {pageNumber.map((item, index) => (
                                    currentPage === item ? (
                                        <li key={index} className="page-item active" aria-current="page">
                                            <span className="page-link">{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <a href='#!' className="page-link" onClick={() => {handlePageNation(item);}}>{item}</a>
                                        </li>
                                    )
                                ))}
                                {currentPage === pageNumber.length || showData.length === 0?
                                    <li class="page-item disabled">
                                        <a class="page-link">Next</a>
                                    </li>
                                    : 
                                    <li class="page-item">
                                        <a class="page-link" onClick={()=> {setCurrentPage(currentPage + 1)}}>Next</a>
                                    </li>
                                }

                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>

    );
};

export default MemberList;