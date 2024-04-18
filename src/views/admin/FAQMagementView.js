
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

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

    const handleCloseModal = () => {
        setShowModal(false);
        clearFaQInput();
    };

    const handleShowModal = () => setShowModal(true);

    const getAllFaq = async () => {
        try {
            const response = await axios.get('/api/faq/getAllFaQ');

            setFaq(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const addFaQ = async () => {
        try {

            if(!validation()) return;

            const res = await axios.post('/api/faq/addFaQ',
                {
                    question: question,
                    answer: answer
                }
            );

            getAllFaq();
            clearFaQInput()

            setShowModal(false)
            
        } catch (e) {
            console.log(e)
        }
    };

    const deleteFaQ = async (faQidx) => {

        try {
            await axios.delete('/api/faq/deleteFaQ?idx=' + faQidx);

            getAllFaq();

        } catch (e) {
            console.log(e)
        }
    };

    const getFaQ = async (faQidx) => {

        try {
            setShowModal(true)
            const response = await axios.get('/api/faq/getFaQByIdx?idx=' + faQidx);
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

            await axios.put('/api/faq/updateFaQ',
                {
                    idx: mode.idx,
                    question: question,
                    answer: answer
                }
            );

            setMode({ "mode": "add", "idx": null });

            clearFaQInput()
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
    };

    const validation = () => {
        const regExpQusetionLength = /^.{5,50}$/;
        if (regExpQusetionLength.test(question)) {
            setErrors({ ...errors, question: "질문은 5글자 이상, 50글자 이하로 작성해주세요." });
            return false;
        }  else if (question.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, question: "질문는 공백을 가질 수 없습니다." });
            return false;
        }

        const regExpAnswerLength = /^.{5,150}$/;
        if (regExpAnswerLength.test(answer)) {
            setErrors({ ...errors, answer: "질문은 5글자 이상, 150글자 이하로 작성해주세요." });
            return false;
        } else if (answer.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, answer: "답변는 공백을 가질 수 없습니다." });
            return false;
        }

        return true;
    };

    return (
        <>
            <section id="main">
                <div className="page-title">자주 묻는 질문 관리</div>
                <div className="container-md">
                    {faq.map((item, index) => (
                        <div className="collapse-box" key={index}>
                            <div className="information-btn-container">
                                <a data-bs-toggle="collapse" href={`#collapseContainer${index + 1}`} role="button" aria-expanded="false"
                                    aria-controls="collapseContainer">
                                    <div className="information">
                                        <div className="faq-title">
                                            <span style={{ "color": "red" }}>Q.{index + 1}</span> {item.question}
                                        </div>
                                        <div className='btn-container'>
                                            <button className="btn edit" onClick={() => getFaQ(item.idx)}>수정</button>
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
                    <button type="button" className="add-btn btn-primary" onClick={handleShowModal}>추가하기</button>
                </div>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        {mode.mode === 'add' ? <Modal.Title>자주 묻는 질문 추가</Modal.Title> : <Modal.Title>자주 묻는 질문 수정</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>질문</Form.Label>
                                <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={50} required />
                                <div className='invaild-feedback show' style={{"color":"red"}}>
                                    {errors.question}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>답변</Form.Label>
                                <Form.Control as="textarea" rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} maxLength={100} required />
                                <div className='invaild-feedback show' style={{"color":"red"}}>
                                    {errors.answer}
                                </div>                            
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                        {mode.mode === 'add' ?
                            <Button variant="primary" onClick={addFaQ}>확인</Button> :
                            <Button variant="primary" onClick={editFaQ}>확인</Button>
                        }
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

export default FAQMagementView;
