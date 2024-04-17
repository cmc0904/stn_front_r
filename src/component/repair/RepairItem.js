import React from 'react';

import '../../style/customer/Board.css';

import { useState, useEffect } from 'react';
import axios from 'axios';


const MemberListTable = ({ item, index, admins, setcheckChange, reload }) => {


    const [error, setError] = useState({});
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [meetingTime, setMeetingTime] = useState('');

    const getTodayDate = () => {
        let today = new Date();
        var formattedDate = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}T${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }

   
    //처리 완료
    const complete = async (reId) => {
        try {
            await axios.post('/api/repair/completeRepair',
                {
                    idx: reId
                }
            );

            reload()
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
        setSelectedAdmin(item.adminId);
        setMeetingTime(item.visitDate == null? getTodayDate() : item.visitDate);
    };

    // // 접수
    const registerRepair = async (reId) => {
        try {
            await axios.post('/api/repair/processrepair',
                {
                    repairIdx: reId,
                    adminId: selectedAdmin,
                    visitDate: meetingTime
                }
            );

            reload()
        } catch (e) {
            console.log(e)
        }

    };

    
    const validation = () => {


        if (selectedAdmin === "") {
            setError({ ...error, "admin": "관리자를 선택해주세요." });
            return false;
        } 

        return true;
    }

    const edit = async (reId, idx) => {
        if(!validation(idx)) return;

        try {
            const res = await axios.put('/api/repair/editAdminIdVisitDate',
                {
                    repairResponseIdx: reId,
                    adminId: selectedAdmin,
                    visitDate: meetingTime.replaceAll(" ", "T")
                }
            );



            if (res.data.results === "FAILED") {
                alert("접수 일정 및 관리자 변경을 실패하였습니다.")
            } else {
                alert("접수 일정 및 담당 관리자를 변경하였습니다.")
                
            }

            reload()

        } catch (e) {
            console.log(e)
        }

    };

    return (
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
                        <select className="form-select form-select-lg" aria-label="Large select example" value={selectedAdmin} onChange={adminChange}>
                            <option value="">담당 기사를 배정해주세요</option>
                            {admins.map((admin, idx) => (
                                <><option value={`${admin.userId}`}>{admin.userName}</option></>
                            ))}
                        </select>

                        <div className="invalid-feedback show">{error.admin}</div>
                    

                        <input
                            type="datetime-local"
                            id="meeting-time"
                            className="meeting-time"
                            name="meeting-time"
                            value={meetingTime}
                            min={getTodayDate()}
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
                            <button className="as-p-btn" onClick={() => registerRepair(item.idx)} disabled>처리완료</button>
                        }

                    </div>
                </div>
            </div>
            <div className="line"></div>
        </div>
    );

};



export default MemberListTable;
