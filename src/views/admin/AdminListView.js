import React, { useState, useEffect } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar.js';
import axios from 'axios';


import '../../style/admin/adminMemberList.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import


const AdminList = () => {
    const [admins, setAdmins] = useState([]);


    useEffect(() => {
        getAllAdmin();
    }, []);

    const getAllAdmin = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/user/getAllAdmins',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            setAdmins(response.data);
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
                                    "isSelected": false
                                },
                                {
                                    "subMenuName": "관리자",
                                    "link": "/manager/managers",
                                    "isSelected": true
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
                <div className="page-title">관리자 관리</div>
                <div className='container'>
                    <table className="member_table" style={{ "margin": "auto" }}>
                        <thead>
                            <tr>
                                <td>아이디</td>
                                <td>성명</td>
                                <td>주소</td>
                                <td>전화번호</td>
                                <td>이메일</td>
                                <td>성별</td>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((item, index) => (
                                <tr>
                                    <th>{item.userId}</th>
                                    <th>{item.userName}</th>
                                    <th>{item.userAddress}</th>
                                    <th>{item.userPhone}</th>
                                    <th>{item.userEmail}</th>
                                    <th>{item.userGender}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </section>
        </>

    );
};

export default AdminList;