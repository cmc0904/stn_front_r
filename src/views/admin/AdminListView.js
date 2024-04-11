import React, { useState, useEffect } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar.js';
import axios from 'axios';
import MemberListTable from '../../component/member/MemberList.js';


import '../../style/admin/adminMemberList.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import


const AdminList = () => {

    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState([]);
    
    useEffect(() => {
        getPageNumbers();
        getDataByPageNumber(1);
    }, []);

  


    const getDataByPageNumber = async (item) => {
        try {
            setCurrentPage(item)
            const response = await axios.get('/api/user/getAdminsByPage?page=' + item,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
                
            setAdmins(response.data)
            console.log(response.data)

    
            //setShowData(response.data);
            
        } catch (e) {
            console.log(e);
        }

    };

    const getPageNumbers = async () => {

        try {
            const response = await axios.get('/api/user/pageNumbers?type=admins',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            setPageNumber(response.data)
        } catch (e) {
            console.log("MemberList" + e)
        }


    };


    return (
        <>
            <section id="main">
                <div className="page-title">관리자 관리</div>
                <div className='container'>
                    <MemberListTable showData={admins}></MemberListTable>

                    <div className='page_selector'>
                        <nav>
                            <ul className="pagination pagination-sm">
                                {pageNumber.map((item, index) => (
                                    currentPage === item ? (
                                        <li key={index} className="page-item active" aria-current="page">
                                            <span className="page-link">{item}</span>
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item">
                                            <a href='#!' className="page-link" onClick={() => getDataByPageNumber(item)}>{item}</a>
                                        </li>
                                    )
                                ))}

                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>

    );
};

export default AdminList;