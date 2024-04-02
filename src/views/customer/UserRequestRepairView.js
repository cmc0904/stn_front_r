import React, { useState } from 'react';
import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar';
import '../../style/customer/AsView.css';


import axios from 'axios';

const AsView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });
    const validation = () => {
        if (title.length < 5) {
            setErrors({ ...errors, title: "5글자 이상 작성해주세요." });
            return false;
        } else if (title.length > 50) {
            setErrors({ ...errors, title: "50글자 이하로 작성해주세요." });
            return false;
        } else if (title.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, title: "공백만 적을 수 없습니다." });
            return false;
        }

        if (content.length < 5) {
            setErrors({ ...errors, content: "5글자 이상 작성해주세요." });
            return false;
        } else if (content.length > 100) {
            setErrors({ ...errors, content: "100글자 이하로 작성해주세요." });
            return false;
        } else if (content.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, content: "공백만 적을 수 없습니다." });
            return false;
        }

        return true;
    }

    const registration = async () => {
        try {
            
            if(!validation()) return;
    
    
            const res =  await axios.post('http://localhost:8081/api/repair/registrationrepair', {
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

            if(res.data.results === "정상적으로 처리되었습니다.") {
                alert("정상적으로 접수되었습니다.")
                setContent('');
                setTitle('');
                setErrors({
                    title: '',
                    content: '',
                });
            }
        } catch (e) {
            console.log(e);
            
        }
    };

    return (
        <>
            <Header content="고객서비스"></Header>
            <SideBar setting={


                {
                    "logindUserName":  window.localStorage.getItem("name"),
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
            />  
            <section id="main">
                <div className="page-title">A/S 접수</div>
                <div id="as-form">
                    <h2>A/S 접수</h2>
                    <label htmlFor="customerName">문제명:</label>
                    <input type="text" id="customerName" name="customerName" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
                    <span className='invaild-feedback show' style={{"fontSize": "13px"}}>{errors.title}</span>
                    <label htmlFor="asDescription">문제 설명:</label>
                    <textarea id="asDescription" name="asDescription" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <span className='invaild-feedback show' style={{"fontSize": "13px"}}>{errors.content}</span>

                    <button type="submit" onClick={registration}>A/S 신청</button>
                </div>
            </section>

        </>

    );
};

export default AsView;
