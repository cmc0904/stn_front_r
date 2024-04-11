import React, { useEffect } from 'react';

import '../../style/customer/Board.css';



import { Link } from 'react-router-dom';


const MemberListTable = ({showData}) => {
    

    return (
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
                {showData.map((item, index) => (
                    <tr>
                        <th><Link to={`/manager/user/${item.userId}`}>{item.userId}</Link></th>
                        <th>{item.userName}</th>
                        <th>{item.userAddress}</th>
                        <th>{item.userPhone}</th>
                        <th>{item.userEmail}</th>
                        <th>{item.userGender}</th>
                    </tr>
                ))}

            </tbody>
        </table>
    );

};



export default MemberListTable;
