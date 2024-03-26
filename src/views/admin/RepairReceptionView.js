import React, { useState, useEffect } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar';
import '../../style/admin/repaire.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import

import axios from 'axios';

const RepairReception = () => {

    const [repairs, setRepairs] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [meetingTime, setMeetingTime] = useState('2023-12-22T19:30');

    useEffect(() => {
        getAllAdmin();
        getAllRepairStatus();
        console.log(window.localStorage.getItem("name"))
    }, []);

    const getAllRepairStatus = async () => {

        const response = await axios.get('http://localhost:8081/api/repair/getRepairStatus',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );

        console.log(response.data)

        setRepairs(response.data);

    };

    const getAllAdmin = async () => {

        const response = await axios.get('http://localhost:8081/api/user/getAllAdmins',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );
        console.log(response.data)
        setAdmins(response.data);

    };

    const registerRepair = async (reId) => {
        if (selectedAdmin === "NONE") {
            return;
        }


        await axios.post('http://localhost:8081/api/repair/processrepair',
            {
                repairIdx: reId,
                adminId: selectedAdmin,
                visitDate: meetingTime
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );
        getAllRepairStatus();
    };


    // 기사 선택시 실행되는 함수
    const adminChange = (event) => {
        setSelectedAdmin(event.target.value);
    };

    // 시간 선택시 실행되는 함수
    const timeChange = (event) => {
        setMeetingTime(event.target.value);
    };

    return (
        <>
            <Header content="Management" />
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
                                    "isSelected": true
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
                <div className="page-title">A/S 접수 및 처리</div>
                <div className="container-md">

                    {repairs.map((item, index) => (
                        <div className="collapse-box" key={index}>
                            <div className="information-btn-container">
                                <a data-bs-toggle="collapse" href={`#collapseContainer${index + 1}`} role="button" aria-expanded="false" aria-controls="collapseContainer">
                                    <div className="as-information">
                                        <div className="as-title">
                                            {item.adminId == null ? <span style={{ color: 'red' }}>[접수대기]</span> : <span style={{ color: 'green' }}>[접수완료]</span>}

                                            {item.problemTitle}
                                        </div>
                                        <div className="as-profile">
                                            <div>성함 : {item.name}</div>
                                            <div>전화번호 : {item.phone}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="collapse" id={`collapseContainer${index + 1}`}>
                                <div className="card card-body">
                                    <div className="as-sub-title">[ 접수자 인적 사항 ]</div>
                                    <table className="member_table">
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
                                            <tr>
                                                <th>{item.customerUserId}</th>
                                                <th>{item.name}</th>
                                                <th>{item.address}</th>
                                                <th>{item.phone}</th>
                                                <th>{item.email}</th>
                                                <th>{item.gender}</th>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="as-sub-title">[ 접수 처리 ]</div>
                                    <div className="as-information">
                                        <div className="desc"><span style={{ color: 'red' }}>-</span> {item.problemComment}</div>
                                    </div>

                                    <div className="as-process">
                                        <select className="form-select form-select-lg" aria-label="Large select example" value={selectedAdmin} onChange={adminChange}>
                                            <option value="NONE" selected>담당 기사를 배정해주세요</option>
                                            {admins.map((admin, idx) => (
                                                <><option value={`${admin.userId}`}>{admin.userName}</option></>
                                            ))}
                                        </select>

                                        <input
                                            type="datetime-local"
                                            id="meeting-time"
                                            className="meeting-time"
                                            name="meeting-time"
                                            value={meetingTime}
                                            min="2023-12-22T16:04"
                                            onChange={timeChange}
                                        />
                                        {item.adminId == null ? <button className="as-p-btn" onClick={() => registerRepair(item.idx)}>접수완료</button> : <button className="as-p-btn" onClick={() => registerRepair(item.idx)} disabled>접수완료</button>}
                                    </div>
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                    ))}


                </div>
            </section>
        </>
    );
};

export default RepairReception;