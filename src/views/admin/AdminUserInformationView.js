import React, { useState, useEffect } from 'react';


import '../../style/customer/MyInfoView.css';
import { Link, useParams } from 'react-router-dom';


import axios from 'axios';

const MyInfoView = () => {
    const [userInformation, setUserInformation] = useState({});
    const [boards, setBoards] = useState([]);
    const [repairs, setRepairs] = useState([]);

    const { paramName } = useParams();


    const getUserInformation = async () => {
        try {
            const response = await axios.get('/api/user/getUserByUserId?userId=' + paramName,
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
            
            const response = await axios.get('/api/board/getBoardByUserIdx?userId=' + paramName);
    
            setBoards(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getRepairs = async () => {
        try {
            const response = await axios.get('/api/repair/getRepairStatusByUserId?userId=' + paramName);
    
            setRepairs(response.data);
            
        } catch (e) {
            console.log(e);
        }
    };


    const deleteBoard = async (boardIdx) => {
        try {
            await axios.delete('/api/board/deleteBoard?boardIdx=' + boardIdx);
            getBoard();
            
        } catch (e) {
            console.log(e);
        }
    };

    const addAdmin = async () => {
        try {
            var res = await axios.post('/api/user/addRole',
                {
                    "userId": paramName,
                    "role": "Admin"
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

                    <dl>
                        <button className='add-r' onClick={addAdmin}>관리자로 지정</button>
                    </dl>
                </div>


                <div className="section">
                    <h2>A/S 접수 내역</h2>

                    {repairs.map((item, index) => (
                        <div className="box" key={index}>
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
                    <h2>작성글 목록</h2>
                    <div className="my_inquiry_list">
                        {boards.map((item, index) => (
                            <Link to={`/customer/board/boardview/${item.boardIdx}`}>
                                <div className="box" key={index}>
                                    <h3>제목 : {item.boardTitle} (작성일 : {item.createAt})</h3>
                                    <div className="btn-group">
                                        <button className="btn-delete" onClick={() => deleteBoard(item.boardIdx)}>삭제</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </>

    );
};

export default MyInfoView;
