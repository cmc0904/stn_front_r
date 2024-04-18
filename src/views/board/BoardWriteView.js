import React, { useState } from 'react';
import '../../style/customer/BoardWriteView.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardWriteView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [validationResult, setValidationResult] = useState({ "title": false, "content": false });
    const [isPrivate, setIsPrivate] = useState(0);
    const [file, setFile] = useState([]);

    const navigate = useNavigate();
    const { type } = useParams();

    const [errors, setErrors] = useState({
        title: '',
        content: '',
        file: '',
    });

    const titleValidation = (tit) => {
        setErrors({
            ...errors,
            title: ''
        })
        const regExpTitleLength = /^.{5,50}$/; // 제목은 5에서 50글자 사이여야 합니다.

        if (!regExpTitleLength.test(tit)) {
            setErrors({ ...errors, title: "제목은 5글자 이상, 50글자 이하로 작성해주세요." });
            return false;
        } else if (tit.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, title: "공백만 적을 수 없습니다." });
            return false;
        }

        setValidationResult({ ...validationResult, title: true });
    }

    const contentValidation = (cnt) => {
        const regExpContentLength = /^.{5,150}$/; // 내용은 5에서 150글자 사이여야 합니다.

        setErrors({
            ...errors,
            content: ''
        })

        // 내용 길이 검사
        if (!regExpContentLength.test(cnt)) {
            setErrors({ ...errors, content: "내용은 5글자 이상, 150글자 이하로 작성해주세요." });
            return false;
        } else if (cnt.replaceAll(" ", "").length === 0) {
            setErrors({ ...errors, content: "공백만 적을 수 없습니다." });
            return false;
        }

        setValidationResult({ ...validationResult, content: true });
    }

    const fileValidation = () => {
        const regExpFileNameLength = /^.{1,255}$/; // 파일 이름은 1에서 255글자 사이여야 합니다.

        setErrors({
            ...errors,
            file: ''
        });

       
        if (file.length > 5) {
            setErrors({ ...errors, file: "한 게시글 당 5개 까지만 파일을 첨부 할 수 있습니다." });
            return false;
        }

        
        if (file.length > 0) {
            for (const fl of file) {
                if (!regExpFileNameLength.test(fl.name)) {
                    setErrors({ ...errors, file: "파일 이름은 1글자 이상, 255글자 이하여야 합니다." });
                    return false;
                }
            }
        }

        return true;
    }

    const uploadContent = async () => {
        try {
            if (!(validationResult.title && validationResult.content && fileValidation())) return;

            const formData = new FormData();

            Array.from(file).forEach((fl) => {
                formData.append("flL", fl);
            });

            formData.append("title", title);
            formData.append("content", content);
            formData.append("isPrivate", isPrivate);

            const response = await axios.post('/api/board/postBoard', formData);

            if (response.data.results === "ADD_BOARD_COMPLETE") {
                navigate(`/${type}/board`);
            };

        } catch (e) {
            console.log(e)
        }
    };

    const handleChangeFile = (event) => {
        setFile(event.target.files);
        fileValidation();
    }

    return (
        <>
            <section id="main">
                <div className="board_wrap">
                    <div className="board_title">
                        <strong>게시판</strong>
                        <p>문의사항을 적어주세요.</p>
                    </div>

                    <div className="board_list_wrap">
                        <table className="board-container">
                            <tbody>
                                <tr style={{ "borderBottom": "1px dashed #ddd" }}>
                                    <th>제목</th>
                                    <td>
                                        <input maxLength={20} type="text" placeholder="제목을 입력해주세요." value={title} onChange={(e) => { setTitle(e.target.value); titleValidation(e.target.value) }} />
                                        <span className="invalid-feedback show" style={{ 'fontSize': "13px" }}>{errors.title}</span>
                                    </td>
                                </tr>
                                <tr style={{ "borderBottom": "1px solid black" }}>
                                    <th>공개</th>
                                    <td>
                                        <div className="isPrivate">
                                            <span style={{ "marginRight": "5px" }}>공개 : <input type="radio" name="isPrivate" value="0" checked={isPrivate === 0} onChange={() => setIsPrivate(0)} /></span>
                                            <span>비공개 : <input type="radio" name="isPrivate" value="1" checked={isPrivate === 1} onChange={() => setIsPrivate(1)} /></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="content-box" colSpan="2">
                                        <textarea maxLength={100} placeholder="내용을 입력 해주세요." value={content} onChange={(e) => { setContent(e.target.value); contentValidation(e.target.value) }}></textarea>
                                        <span className="invalid-feedback show" style={{ 'fontSize': "13px", "textAlign": "left" }}>{errors.content}</span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mb-3" style={{ "marginTop": "15px" }}>
                            <input className="form-control" type="file" id="formFileMultiple" onChange={handleChangeFile} multiple />
                            <span className="invalid-feedback show" style={{ 'fontSize': "13px", "textAlign": "left" }}>{errors.file}</span>
                        </div>
                        <div className="bt_wrap">
                            <a href="#!" className="on" onClick={uploadContent} style={{ "marginRight": "15px" }}>등록</a>
                            <Link className="on" to={`/${type}/board`}>취소</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BoardWriteView;
