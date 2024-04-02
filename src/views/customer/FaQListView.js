import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import '../../style/customer/FaqView.css';


import axios from 'axios';

const FaqView = () => {

    const [faq, setFaq] = useState([]);


    useEffect(() => {
        getAllFaq();
    }, []);

    const getAllFaq = async () => {
        try {
            
            const response = await axios.get('http://localhost:8081/api/faq/getAllFaQ',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
    
            setFaq(response.data);
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
                                    "isSelected": false
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
                                    "isSelected": true
                                }
                            ]
                        }

                    ]


                }
            }
            />   
            <section id="main">
                <div className="page-title">자주 묻는 질문</div>
                <div className="faq">
                    {faq.map((item, index) => (
                        <div className="faq_item">
                            <div className="faq_question">Q : {item.question}</div>
                            <div className="faq_answer">
                                A : {item.answer}
                            </div>
                        </div>
                    ))}


                </div>
            </section>
        </>

    );
};

export default FaqView;
