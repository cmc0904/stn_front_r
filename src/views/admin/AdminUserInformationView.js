import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';

import '../../style/customer/MyInfoView.css';
import { useParams } from 'react-router-dom';


import axios from 'axios';

const MyInfoView = () => {
    const [userInformation, setUserInformation] = useState({});
    const [boards, setBoards] = useState([]);
    const [repairs, setRepairs] = useState([]);

    const { paramName } = useParams();


    const getUserInformation = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/user/getUserByUserId?userId=' + paramName,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            setUserInformation(response.data.result);


        } catch (e) {
            console.log(e)
        }




    };

    const getBoard = async () => {
        try {
            
            const response = await axios.get('http://localhost:8081/api/board/getBoardByUserIdx?userId=' + paramName,
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
            const response = await axios.get('http://localhost:8081/api/repair/getRepairStatusByUserId?userId=' + paramName,
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
            var res = await axios.delete('http://localhost:8081/api/board/deleteBoard?boardIdx=' + boardIdx,
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

    const addAdmin = async () => {
        try {
            var res = await axios.post('http://localhost:8081/api/user/addRole',
                {
                    "userId": paramName,
                    "role": "Admin"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            if (res.status === 200) {
                alert("관리자 지정에 성공하였습니다.")

            }
        } catch (e) {
            alert("관리자 지정에 실패하였습니다.")
        }
    };

    useEffect(() => {
        getUserInformation();
        getBoard();
        getRepairs();
    }, []);


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
            />            <section id="main">
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

                    <dl>
                        <button className='add-r' onClick={addAdmin}>관리자로 지정</button>
                    </dl>
                </div>


                <div className="section">
                    <h2>A/S 접수 내역</h2>

                    {repairs.map((item, index) => (
                        <div className="box">
                            <h3>A/S 신청 내역#{index + 1}</h3>
                            <p>신청일: {item.createAt.split("T")[0]}</p>
                            <p>
                                처리 상태: {
                                    item.adminId == null ?
                                        <span className="status-ing">[접수 대기]</span>
                                        :
                                        <><span className="status-ing" style={{ "color": "green" }}>[접수 완료]</span><span>  방문 예정일  : {item.visitDate.replaceAll("T", " ")}</span></>
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
                            <div className="box">
                                <h3>제목 : {item.boardTitle} (작성일 : {item.createAt})</h3>
                                <div className="btn-group">
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
