import React, { useState, useEffect } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar.js';
import '../../style/admin/repaire.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import

import axios from 'axios';


const RepairReception = () => {

    const [repairs, setRepairs] = useState([]);
    const [admins, setAdmins] = useState([]);




    const [error, setError] = useState({});
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [selectedMode, setSelectedMode] = useState('allData');


    const getToday = () => {
        var options = { timeZone: 'Asia/Seoul' };
        var koreaTime = new Date().toLocaleString('en-US', options);

        var formattedKoreaTime = new Date(koreaTime).toISOString().slice(0, 19);

        return formattedKoreaTime;
    }

    useEffect(() => {
        setMeetingTime(getToday())
        getAllAdmin();
        getAllRepairStatus();
        //getsearchRepair();
    }, []);


    const validation = (idx) => {


        if (selectedAdmin === "") {
            setError({ ...error, [idx]: { "admin": "관리자를 선택해주세요." } });
            return false;
        } else if (selectedAdmin === "NONE") {
            setError({ ...error, [idx]: { "admin": "관리자를 선택해주세요." } });
            return false;
        }

        return true;
    }

    // 모든 A/S 정보 불러오기
    const getAllRepairStatus = async () => {

        try {
            const response = await axios.get('http://localhost:8081/api/repair/getRepairStatus',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
            setRepairs(response.data);

        } catch(e) {
            console.log(e)
        }


    };

    // 접수 화면에 뜰 관리자 목록
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
            console.log(e)
        }
    };

    // 접수
    const registerRepair = async (reId) => {
        try {
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
        } catch (e) {
            console.log(e)
        }

    };

    // 처리 완료
    const complete = async (reId) => {
        try {
            await axios.post('http://localhost:8081/api/repair/completeRepair',
                reId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            getAllRepairStatus();
        } catch (e) {
            console.log(e)
        }
    };


    // 기사 선택시 실행되는 함수
    const adminChange = (event) => {
        setError({})
        setSelectedAdmin(event.target.value);
    };

    // 시간 선택시 실행되는 함수
    const timeChange = (event) => {
        setMeetingTime(event.target.value);
    };

    // 이미 접수된 접수 담당 관리자, 방문 시간 초기화
    const selectItem = (item) => {
        if (item.adminId === null && item.finished === 0) {
            return;
        }
        setSelectedAdmin(item.adminId);
        setMeetingTime(item.visitDate);
    };

    // 담당 관리자, 방문 시간대 변경
    const edit = async (reId, idx) => {
        console.log(error)
        if(!validation(idx)) return;

        try {
            const res = await axios.put('http://localhost:8081/api/repair/editAdminIdVisitDate',
                {
                    idx: reId,
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

            if (res.data.result === "FAILED") {
                alert("접수 일정 및 관리자 변경을 실패하였습니다.")
            } else {
                alert("접수 일정 및 담당 관리자를 변경하였습니다.")
                getAllRepairStatus();
            }
        } catch (e) {
            console.log(e)
        }

    };
    


    const getFilteringData = async (type) => {
        console.log(type)   
        setSelectedMode(type);
        try{
            const response = await axios.get("http://localhost:8081/api/repair/getRepairFiltering?type="+type,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                },
            }
        );
            console.log(response.data)
            setRepairs(response.data)

        }catch(e){
            console.log(e)
        }
        
    
    };

    const getsearchRepair = async (getValue) => {
        console.log(getValue);
        try{
            const response = await axios.get(`http://localhost:8081/api/repair/searchRepair?userId=${getValue}&type=${selectedMode}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
            );
            console.log(response.data)
            
            setRepairs(response.data)

        }catch(e){
            console.log(e)
        }

        

    };

    

    
    


    const getFilteringData = async (type) => {
        try{
            const response = await axios.get("http://localhost:8081/api/repair/getRepairFiltering?type="+type,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                },
            }
        );
            console.log(response.data)
            setRepairs(response.data)

        }catch(e){
            console.log(e)
        }
        
    
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
            />  
            <section id="main">
                <div className="page-title">A/S 접수 및 처리</div>
                <div className="container-md">
                    <div className="button-container">
                        <button onClick={() => getFilteringData("allData")}>전체보기</button>
                        <button onClick={() => getFilteringData("waiting")}>접수 대기</button>
                        <button onClick={() => getFilteringData("willVisit")}>방문 예정</button>
                        <button onClick={() => getFilteringData("finished")}>처리 완료</button>
                    </div>

                    <div className='wrap'>
                        <div className="search-container" style={{"width":"100%"}}>
                            <div style={{"width":"100%"}}>
                                
                                <input type='text' placeholder='아이디로 검색' onChange={(e) => getsearchRepair(e.target.value)}></input>

                                <button onClick={null} className="btn btn-dark">검색</button>
                            </div>
                            

                            <div className="mode-btn-wrap">
                                <button onClick={() => getFilteringData("allData")} className='mode-btn'>전체보기</button>
                                <button onClick={() => getFilteringData("waiting")} className='mode-btn'>접수 대기</button>
                                <button onClick={() => getFilteringData("willVisit")} className='mode-btn'>방문 예정</button>
                                <button onClick={() => getFilteringData("finished")} className='mode-btn'>처리 완료</button>
                            </div>
                    </div>

                    </div>
                    
                   


                   

                    
                    {repairs.map((item, index) => (
                        <div className="collapse-box" key={index}>
                            <div className="information-btn-container">
                                <a onClick={() => selectItem(item)} data-bs-toggle="collapse" href={`#collapseContainer${index + 1}`} role="button" aria-expanded="false" aria-controls="collapseContainer">
                                    <div className="as-information">
                                        <div className="as-title">
                                            {item.adminId === null && item.finished === 0 &&
                                                <span style={{ color: 'red' }}>[접수 대기]</span>
                                            }

                                            {item.adminId != null && item.finished === 0 &&
                                                <span style={{ color: 'orange' }}>[방문 예정]</span>
                                            }

                                            {item.adminId != null && item.finished === 1 &&
                                                <span style={{ color: 'green' }}>[처리 완료]</span>
                                            }

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
                                        <select className="form-select form-select-lg" aria-label="Large select example" defaultValue={selectedAdmin} onChange={adminChange}>
                                            <option value="NONE" selected>담당 기사를 배정해주세요</option>
                                            {admins.map((admin, idx) => (
                                                <><option value={`${admin.userId}`}>{admin.userName}</option></>
                                            ))}
                                        </select>

                                        {error[item.idx] !== undefined && 
                                            <div className="invalid-feedback show">{error[item.idx].admin}</div>
                                        }

                                        <input
                                            type="datetime-local"
                                            id="meeting-time"
                                            className="meeting-time"
                                            name="meeting-time"
                                            value={meetingTime}
                                            min="2023-12-22T16:04"
                                            onChange={timeChange}
                                        />

                                        {/* <div className="invalid-feedback show">{error[item.idx].meetingTime}</div> */}


                                        {item.adminId === null && item.finished === 0 &&
                                            <button className="as-p-btn" onClick={() => registerRepair(item.idx)}>접수완료</button>
                                        }

                                        {item.adminId != null && item.finished === 0 &&
                                            <div className='flex-btn-wrap'>
                                                <button className='flex-btn orange' onClick={() => edit(item.ridx, item.idx)}>접수 변경</button>
                                                <button className='flex-btn green' onClick={() => complete(item.idx)}>처리 완료</button>
                                            </div>
                                        }

                                        {item.adminId != null && item.finished === 1 &&
                                            <button className="as-p-btn" onClick={() => registerRepair(item.idx)} disabled>접수완료</button>
                                        }

                                        {/* {item.adminId == null ? <button className="as-p-btn" onClick={() => registerRepair(item.idx)}>접수완료</button> : <button className="as-p-btn" onClick={() => registerRepair(item.idx)} disabled>접수완료</button>} */}
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