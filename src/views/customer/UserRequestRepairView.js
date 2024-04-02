import React, { useState } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar';
import '../../style/customer/AsView.css';


import axios from 'axios';

const AsView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const registration = async () => {
        try {
            
            if (title === "" || content === "") {
                alert("비어있는 입력란이 있습니다.")
                return
            }
    
    
            await axios.post('http://localhost:8081/api/repair/registrationrepair', {
                problemTitle: title,
                problemComment: content
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
        } catch (e) {
            console.log(e);
            
        }
    };

    return (
        <>
            <Header content="고객서비스"></Header>
            <SideBar setting={


                {
                    "logindUserName": "최문찬",
                    "allMenus": [
                        {
                            "categoryName": "고객센터",
                            "subMenus": [
                                {
                                    "subMenuName": "게시판",
                                    "link": "/customer/board",
                                    "isSelected": false
                                },
                                {
                                    "subMenuName": "A/S접수",
                                    "link": "/customer/as",
                                    "isSelected": true
                                }
                            ]
                        },
                        {
                            "categoryName": "관리",
                            "subMenus": [
                                {
                                    "subMenuName": "내 정보",
                                    "link": "/customer/myinfo",
                                    "isSelected": false
                                },
                                {
                                    "subMenuName": "자주 묻는 질문",
                                    "link": "/customer/faq",
                                    "isSelected": false
                                }
                            ]
                        }

                    ]


                }
            }
            />            <section id="main">
                <div className="page-title">A/S 접수</div>
                <div id="as-form">
                    <h2>A/S 접수</h2>
                    <form id="asForm">
                        <label htmlFor="customerName">문제명:</label>
                        <input type="text" id="customerName" name="customerName" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <label htmlFor="asDescription">문제 설명:</label>
                        <textarea id="asDescription" name="asDescription" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>

                        <button type="submit" onClick={registration}>A/S 신청</button>
                    </form>
                </div>
            </section>

        </>

    );
};

export default AsView;
