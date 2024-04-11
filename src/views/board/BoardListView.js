import React, {useState, useEffect} from 'react';



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

        search()

    }, []);

    useEffect(() => {
        search()
    }, [currentPage]);



    // 날짜로 검색
    const search = async () => {

        try {

            const response = await axios.get(`/api/board/getAllBoard?type=${searchMode}&content=${searchInput}&currentPage=${currentPage}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            

            setShowData(response.data.data);
            setPageNumber(Array.from({ length: Math.ceil(response.data.totalData / 5) }, (_, index) => index + 1));
            
        } catch (e) {
            setShowData([])
        }
    };


    return (
        <>
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
                                    <button className={searchMode === "title" ? 'mode-btn selected' : 'mode-btn'} type='button' onClick={() => setSearchMode("title")}>
                                        제목으로 검색
                                    </button>
                                    <button className={searchMode === "writerId" ? 'mode-btn selected' : 'mode-btn'} type='button' onClick={() => setSearchMode("writerId")}>
                                        글쓴이로 검색
                                    </button>

                                    <button className={searchMode === "dt" ? 'mode-btn selected' : 'mode-btn'} type='button' onClick={() => setSearchMode("date")}>

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
                                            <span className="page-link" onClick={() => setCurrentPage(item)}>{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <span className="page-link" onClick={() => setCurrentPage(item)}>{item}</span>
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
