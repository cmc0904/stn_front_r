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
    const [showModal, setShowModal] = useState(false);

    const [errors, setErrors] = useState({
        question: '',
        answer: '',
    });


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

    const addFaQ = async () => {

        try {

            if(!validation()) return;

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

            setShowModal(false)

        } catch (e) {
            console.log(e)
        }



    };


    const deleteFaQ = async (faQidx) => {

        try {

            await axios.delete('http://localhost:8081/api/faq/deleteFaQ?idx=' + faQidx,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );


            getAllFaq();

        } catch (e) {
            console.log(e)
        }

    };

    const getFaQ = async (faQidx) => {

        try {
            setShowModal(true)
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
    
    
            setMode({ "mode": "edit", "idx": faQidx });
        } catch(e) {
            console.log(e)
        }


    };

    const editFaQ = async () => {
        try {
            if(!validation()) return;

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



            setMode({ "mode": "add", "idx": null });


            setAnswer("")
            setQuestion("")
            getAllFaq();
            setShowModal(false)
        } catch (e) {
            console.log(e)
        }

    };


    const clearFaQInput = () => {
        setAnswer("");
        setQuestion("");
        setErrors({
            question: '',
            answer: '',
        });
        setShowModal(false)

    }

    const validation = () => {

        if (question.length < 5) {
            setErrors({ ...errors, question: "질문은 5글자 이상이여야 합니다." });
            return false;
        } else if (question.length > 100) {
            setErrors({ ...errors, question: "질문은 100글자 이상일 수 없습니다." });
            return false;
        } else if (question.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, question: "질문는 공백을 가질 수 없습니다." });
            return false;
        }

        if (answer.length < 5) {
            setErrors({ ...errors, answer: "답변은 5글자 이상이여야 합니다." });
            return false;
        } else if (answer.length > 150) {
            setErrors({ ...errors, answer: "답변은 150글자 이상일 수 없습니다." });
            return false;
        } else if (answer.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, answer: "답변는 공백을 가질 수 없습니다." });
            return false;
        }

        return true;
        
    }

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
            />  
            <section id="main">
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

                    <button type="button" className="add-btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setShowModal(true)}>
                        추가하기
                    </button>
                </div>

                {showModal && (
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                            <div className="invalid-feedback show">{errors.question}</div>

                                        </div>
                                        <div className="mb-3">
                                            <label for="message-text" className="col-form-label">답변</label>
                                            <textarea className="form-control" id="message-text" value={answer} onChange={(e) => setAnswer(e.target.value)} required></textarea>
                                            <div className="invalid-feedback show">{errors.answer}</div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearFaQInput}>취소</button>
                                    {mode.mode === 'add' ? <button type="submit" onClick={addFaQ} className="btn btn-primary">확인</button> : <button type="submit" onClick={editFaQ} className="btn btn-primary">확인</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default FAQMagementView;