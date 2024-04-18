import React, { useState } from 'react';

import '../../style/customer/AsView.css';


import axios from 'axios';

const AsView = () => {
    const [title, setTitle] = useState('');
    const [validationResult, setValidationResult] = useState({"title":false, "content":false}); 
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });



    const titleValidation = (tit)=> {
        setErrors({
            ...errors,
            title : ''
        })
        const regExpTitleLength = /^.{5,50}$/; // 제목은 5에서 50글자 사이여야 합니다.

        if (!regExpTitleLength.test(tit)) {
            setErrors({ ...errors, title: "제목은 5글자 이상, 50글자 이하로 작성해주세요." });
            return false;
        } else if (tit.replaceAll(" ", "").length === 0) {
                setErrors({ ...errors, title: "공백만 적을 수 없습니다." });
                return false;
        }

        setValidationResult({...validationResult, title : true});

    }

    const contentValidation = (cnt)=> {
        const regExpContentLength = /^.{5,150}$/; // 내용은 5에서 150글자 사이여야 합니다.

        setErrors({
            ...errors,
            content : ''
        })
    
        // 내용 길이 검사
        if (!regExpContentLength.test(cnt)) {
            setErrors({ ...errors, content: "내용은 5글자 이상, 150글자 이하로 작성해주세요." });
            return false;
        }else if (cnt.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, content: "공백만 적을 수 없습니다." });
            return false;
        }

        setValidationResult({...validationResult, content : true});

    }

    const registration = async () => {
        try {
            
            if(!(validationResult.title && validationResult.content)) return;
    
    
            const res =  await axios.post('/api/repair/registrationrepair', 
                {
                    problemTitle: title,
                    problemComment: content
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

            <section id="main">
                <div className="page-title">A/S 접수</div>
                <div id="as-form">
                    <h2>A/S 접수</h2>
                    <label htmlFor="customerName">문제명:</label>
                    <input maxLength={50} type="text" id="customerName" name="customerName" value={title} onChange={(e) => {setTitle(e.target.value); titleValidation(e.target.value)}} autoFocus />
                    <span className='invaild-feedback show' style={{"fontSize": "13px", "color": "red"}}>{errors.title}</span>
                    <label htmlFor="asDescription">문제 설명:</label>
                    <textarea maxLength={100} id="asDescription" name="asDescription" value={content} onChange={(e) => {setContent(e.target.value); contentValidation(e.target.value)}}></textarea>
                    <span className='invaild-feedback show' style={{"fontSize": "13px", "color": "red"}}>{errors.content}</span>

                    <button type="submit" onClick={registration}>A/S 신청</button>
                </div>
            </section>

        </>

    );
};

export default AsView;
