import React, { useState, useEffect } from 'react';

import '../../style/customer/Board.css';

import axios from 'axios';


import { Link } from 'react-router-dom';
import BoadItem from './BoardItem';


const BoardList = (type) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState([]);
    const [showData, setShowData] = useState([]);


    useEffect(() => {
        getPageNumbers();
        getDataByPageNumber(1);
    }, []);




    const getPageNumbers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/board/pageNumbers',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            console.log(response.data)

            setPageNumber(response.data);
        } catch (e) {
            console.log(e)
        }
    };

    const getDataByPageNumber = async (item) => {
        try {
            setCurrentPage(item)
            const response = await axios.get('http://localhost:8081/api/board/getBoardByPageNumber?page=' + item,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            console.log(response.data)

            setShowData(response.data)
        } catch (e) {
            console.log(e)
        }
    };



    return (
        <>
            <div className="board_wrap">
                <div className='wrap'>
                    <div className="board_title">
                        <strong>게시판</strong>
                        <p>문의사항을 적어주세요.</p>
                    </div>

                    <div className="search-container">
                        <div>
                            <div>
                                <input type='text' placeholder='제목을 입력해주세요.' />
                                <button type="button" className="btn btn-dark" >검색</button>
                            </div>
                            <div className='mode-btn-wrap'>
                                <button className='mode-btn' type='button'>
                                    제목으로 검색
                                </button>
                                <button className='mode-btn' type='button'>
                                    글쓴이로 검색
                                </button>
                                <button className='mode-btn' type='button'>
                                    날짜로 검색
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="board_list_wrap">
                    <div className="board_list">
                        <div className="top">
                            <div className="num">번호</div>
                            <div className="b_title">제목</div>
                            <div className="writer">글쓴이</div>
                            <div className="date">작성일</div>
                        </div>

                        {showData.map((item, index) => (
                            <BoadItem item={item}></BoadItem>
                        ))}

                    </div>
                    <div className='page_selector'>
                        <nav style={{ display: 'flex', justifyContent: 'center' }}>
                            <ul className="pagination pagination-sm">
                                {pageNumber.map((item, index) => (
                                    currentPage === item ? (
                                        <li key={index} className="page-item active" aria-current="page">
                                            <span className="page-link">{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <a className="page-link" onClick={() => getDataByPageNumber(item)}>{item}</a>
                                        </li>
                                    )
                                ))}

                            </ul>
                        </nav>
                    </div>
                    <div className="bt_wrap">
                        <Link className="on" to={`/${type.type}/board/boardwrite`}>등록</Link>
                    </div>
                </div>
            </div>
        </>

    );

};



export default BoardList;
