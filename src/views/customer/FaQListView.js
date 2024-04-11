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
            
            const response = await axios.get('/api/faq/getAllFaQ',
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
