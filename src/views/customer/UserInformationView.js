import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import '../../style/customer/MyInfoView.css';


import axios from 'axios';

const MyInfoView = () => {
    const [userInformation, setUserInformation] = useState({});
    const [boards, setBoards] = useState([]);
    const [repairs, setRepairs] = useState([]);

    const getUserInformation = async () => {
        try {
            const response = await axios.get('/api/user/getUserByUserId',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
            setUserInformation(response.data.result);
            
        } catch (e) {
            console.log(e);            
        }

    };

    const getBoard = async () => {
        try {
            const response = await axios.get('/api/board/getMyBoards',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
            setBoards(response.data);
            console.log(response.data);
            
        } catch (e) {
            console.log(e);
        }
    };

    const getRepairs = async () => {
        try {
            
            const response = await axios.get('/api/repair/getRepairStatusByUserId',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
            setRepairs(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };


    const deleteBoard = async (boardIdx) => {
        try {
            console.log(boardIdx)
            var res = await axios.delete('/api/board/deleteBoard?boardIdx=' + boardIdx,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            console.log(res.data)
            getBoard();
            
        } catch (e) {
            console.log(e);
        }
    };


    const changePrivate = async (boardIdx, priv) => {
        try {

            console.log(boardIdx)
            console.log(!priv)
            const res = await axios.put(
                '/api/board/changePrivate',
                {
                    idx: boardIdx,
                    pri: priv === 0 ? 1 : 0
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            getBoard();
            
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserInformation();
        getBoard();
        getRepairs();
    }, []);


    return (
        <>
            <section id="main">
                <div className="page-title">내 정보</div>



                <div className="info_section">
                    <h2>기본 정보</h2>
                    <dl>
                        <dt>ID:</dt>
                        <dd>{userInformation.userId}</dd>
                    </dl>
                    <dl>
                        <dt>이름:</dt>
                        <dd>{userInformation.userName}</dd>
                    </dl>
                    <dl>
                        <dt>주소:</dt>
                        <dd>{userInformation.userAddress}</dd>
                    </dl>
                    <dl>
                        <dt>전화번호:</dt>
                        <dd>{userInformation.userPhone}</dd>
                    </dl>
                    <dl>
                        <dt>이메일:</dt>
                        <dd>{userInformation.userEmail}</dd>
                    </dl>
                    <dl>
                        <dt>성별:</dt>
                        <dd>{userInformation.userGender}</dd>
                    </dl>

                    <div className="bt_wrap">
                        <Link className="on" to={"/customer/myinfo/myinfoedit"}>정보수정</Link>
                    </div>
                </div>


                <div className="section">
                    <h2>A/S 접수 내역</h2>

                    {repairs.map((item, index) => (
                        <div className="box">
                            <h3>A/S 신청 내역#{index + 1}</h3>
                            <p>신청일: {item.createAt[0]}/{item.createAt[1]}/{item.createAt[2]}</p>
                            <p>
                                처리 상태: 
                                    {item.adminId == null &&
                                        <span className="status-ing">[접수 대기]</span>
                                    }

                                    {item.adminId != null && item.finished === 1 &&
                                        <span className="status-ing" style={{ "color": "green" }}>[처리완료]</span>
                                    }

                                    {item.adminId != null && item.finished === 0 &&
                                        <><span className="status-ing" style={{ "color": "orange" }}>[방문대기]</span><span> (방문 예정일  : {item.visitDate[0]}/{item.visitDate[1]}/{item.visitDate[2]}-{item.visitDate[3]}:{item.visitDate[4]})</span></>

                                    }

                            </p>

                            <p>내용: {item.problemComment}</p>
                        </div>
                    ))}

                </div>


                <div className="section">
                    <h2>내 문의 글</h2>
                    <div className="my_inquiry_list">
                        {boards.map((item, index) => (
                            <div className="box" style={{"display" : "flex", "justifyContent" : "space-between"}}>
                                <h3 style={{"marginTop" : "auto", "marginBottom" : "auto"}}>제목 : {item.boardTitle} (작성일 : {new Date(item.createAt).toLocaleDateString()}) - {item.isPrivate === 0 ? <span>공개</span> : <span>비공개</span>}</h3>
                                <div className="btn-group">
                                <button className="btn-delete" onClick={() => changePrivate(item.boardIdx, item.isPrivate)}>공개/비공개 전환</button>
                                    <button className="btn-delete" onClick={() => deleteBoard(item.boardIdx)}>삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>

    );
};

export default MyInfoView;
