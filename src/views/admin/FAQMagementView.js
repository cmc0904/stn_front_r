import Header from '../../component/Header.js';
import SideBar from '../../component/SideBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/admin/askList.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import


const FAQMagementView = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [mode, setMode] = useState({ 'mode': "add", "idx": null }); // 'add' by default
    const [faq, setFaq] = useState([]);


    useEffect(() => {
        getAllFaq();
    }, []);

    const getAllFaq = async () => {
        const response = await axios.get('http://localhost:8081/api/faq/getAllFaQ',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );

        setFaq(response.data);
    };

    const addFaQ = async () => {

        if (question === "" || answer === "") {
            alert("비어있는 입력란이 있어 실패하였습니다.")
            return;
        }

        await axios.post('http://localhost:8081/api/faq/addFaQ',
            {
                question: question,
                answer: answer
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );

        getAllFaq();


    };


    const deleteFaQ = async (faQidx) => {

        await axios.delete('http://localhost:8081/api/faq/deleteFaQ?idx=' + faQidx,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );


        getAllFaq();

    };

    const getFaQ = async (faQidx) => {

        const response = await axios.get('http://localhost:8081/api/faq/getFaQByIdx?idx=' + faQidx,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );
        setQuestion(response.data.question);
        setAnswer(response.data.answer);


        setMode({"mode" : "edit", "idx" : faQidx});

    };

    const editFaQ = async () => {
        if (question === "" || answer === "") {
            alert("비어있는 입력란이 있어 실패하였습니다.")
            return;
        }


        await axios.put('http://localhost:8081/api/faq/updateFaQ',
            {
                idx: mode.idx,
                question: question,
                answer: answer
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                }
            }
        );

 
        setMode({"mode" : "add", "idx" : null});


        setAnswer("")
        setQuestion("")
        getAllFaq();
    };


    const clearFaQInput = () => {
        setAnswer("");
        setQuestion("");

    }

    return (
        <>
            <Header content="Management"/>
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
                                    "isSelected": true
                                }
                            ]
                        }

                    ]


                }}
            />            <section id="main">
                <div className="page-title">자주 묻는 질문 관리</div>
                <div className="container-md">
                    {faq.map((item, index) => (
                        <div className="collapse-box">
                            <div className="information-btn-container">
                                <a data-bs-toggle="collapse" href={`#collapseContainer${index + 1}`} role="button" aria-expanded="false"
                                    aria-controls="collapseContainer">

                                    <div className="information">
                                        <div className="faq-title">
                                            <span style={{ "color": "red" }}>Q.{index + 1}</span> {item.question}
                                        </div>
                                        <div className='btn-container'>
                                            <button className="btn edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => getFaQ(item.idx)}>수정</button>
                                            <button className="btn delete" onClick={() => deleteFaQ(item.idx)}>삭제</button>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="collapse" id={`collapseContainer${index + 1}`}>
                                <div className="answer">
                                    <span style={{ "color": "red" }}>- </span> {item.answer}
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                    ))}

                    <button type="button" className="add-btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        추가하기
                    </button>
                </div>


                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                {mode.mode === 'add' ? <h1 className="modal-title fs-5" id="staticBackdropLabel">자주 묻는 질문 추가</h1> : <h1 className="modal-title fs-5" id="staticBackdropLabel">자주 묻는 질문 수정</h1>}


                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label for="recipient-name" className="col-form-label">질문</label>
                                        <input type="text" className="form-control" id="recipient-name" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">답변</label>
                                        <textarea className="form-control" id="message-text" value={answer} onChange={(e) => setAnswer(e.target.value)} required></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearFaQInput}>취소</button>
                                {mode.mode === 'add' ? <button type="submit" onClick={addFaQ} className="btn btn-primary" data-bs-dismiss="modal">확인</button> : <button type="submit" onClick={editFaQ} className="btn btn-primary" data-bs-dismiss="modal">확인</button>}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQMagementView;