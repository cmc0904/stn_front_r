import React, {useState, useEffect} from 'react';

import Header from '../../component/Header';
import SideBar from '../../component/SideBar';

import '../../style/customer/Board.css';
import BoardList from '../../component/board/BoardList';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';


const Board = () => {



    const { type } = useParams();


    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState([]);
    const [showData, setShowData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchMode, setSearchMode] = useState("title");


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

            setShowData(response.data)

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    // 제목을 통해서 검색
    const getBoardByTitle = async () => {
        try {

            const response = await axios.get('http://localhost:8081/api/board/getBoardByTitle?content=' + searchInput,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            setShowData(response.data);

        } catch (e) {
            setShowData([])

        }
    };

    // 글쓴이로 검색
    const getBoardByWriterId = async () => {
        try {

            const response = await axios.get('http://localhost:8081/api/board/getBoardByUserIdx?userId=' + searchInput,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            setShowData(response.data);

        } catch (e) {
            setShowData([])
        }
    };

    // 날짜로 검색
    const getBoardByDate = async () => {
        try {

            const response = await axios.get('http://localhost:8081/api/board/getBoardByDate?date=' + searchInput,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            setShowData(response.data);
        } catch (e) {
            setShowData([])
        }
    };

    // 검색 
    const search = () => {
        if (searchInput.trim().length === 0) return;

        if (searchMode === "title") {
            getBoardByTitle();
        } else if (searchMode === "writerId") {
            getBoardByWriterId();
        } else if (searchMode === "dt") {

            if (!(new Date(searchInput) instanceof Date && !isNaN(new Date(searchInput)))) {
                return;
            }

            getBoardByDate();
        }
    };


    return (
        <>
            {
                type === "manager" &&
                <><Header content="Management"></Header><SideBar setting={{
                    "logindUserName": window.localStorage.getItem("name"),
                    "allMenus": [
                        {
                            "categoryName": "회원 관리",
                            "subMenus": [
                                {
                                    "subMenuName": "사용자",
                                    "link": "/manager/members",
                                    "isSelected": false
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
                                    "isSelected": true
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
                }} /></>

            }

            {
                type === "customer" &&
                <>
                    <Header content="고객서비스"></Header>
                    <SideBar setting={


                        {
                            "logindUserName": "최문찬",
                            "allMenus": [
                                {
                                    "categoryName": "고객센터",
                                    "subMenus": [
                                        {
                                            "subMenuName": "게시판",
                                            "link": "/customer/board",
                                            "isSelected": true
                                        },
                                        {
                                            "subMenuName": "A/S접수",
                                            "link": "/customer/as",
                                            "isSelected": false
                                        }
                                    ]
                                },
                                {
                                    "categoryName": "관리",
                                    "subMenus": [
                                        {
                                            "subMenuName": "내 정보",
                                            "link": "/customer/myinfo",
                                            "isSelected": false
                                        },
                                        {
                                            "subMenuName": "자주 묻는 질문",
                                            "link": "/customer/faq",
                                            "isSelected": false
                                        }
                                    ]
                                }

                            ]


                        }
                    }
                    />
                </>

            }

            <section id="main">
                <div className="board_wrap">
                    <div className='wrap'>
                        <div className="board_title">
                            <strong>게시판</strong>
                            <p>문의사항을 적어주세요.</p>
                        </div>

                        <div className="search-container">
                            <div>
                                <div>
                                    <input type='text' placeholder={searchMode === "title" ? "제목을 입력 해주세요." : searchMode === "writerId" ? "아이디를 정확하게 입력해주세요." : searchMode === "dt" && "날짜를 입력해주세요. 예)2024-03-27"} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                    <button type="button" className="btn btn-dark" onClick={search}>검색</button>
                                </div>
                                <div className='mode-btn-wrap'>
                                    <button className='mode-btn' type='button' onClick={() => setSearchMode("title")}>
                                        제목으로 검색
                                    </button>
                                    <button className='mode-btn' type='button' onClick={() => setSearchMode("writerId")}>
                                        글쓴이로 검색
                                    </button>
                                    <button className='mode-btn' type='button' onClick={() => setSearchMode("dt")}>
                                        날짜로 검색
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <BoardList showData={showData}></BoardList>
                    <div className='page_selector'>
                        <nav style={{ display: 'flex', justifyContent: 'center' }}>
                            <ul className="pagination pagination-sm">
                                {pageNumber.map((item, index) => (
                                    currentPage === item ? (
                                        <li key={index} className="page-item active" aria-current="page">
                                            <span className="page-link" onClick={() => getDataByPageNumber(item)}>{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <span className="page-link" onClick={() => getDataByPageNumber(item)}>{item}</span>
                                        </li>
                                    )
                                ))}

                            </ul>
                        </nav>
                    </div>
                    <div className="bt_wrap">
                        <Link className="on" to={`/${type}/board/boardwrite`}>등록</Link>
                    </div>

                </div>
            </section>


        </>

    );
};

export default Board;
