import React, { useState, useEffect } from 'react';

import '../../style/customer/BoardView.css';


import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const AdminBoardView = () => {



    const [content, setContent] = useState({});
    const [comment, setComment] = useState('');
    const [commentLists, setCommentLists] = useState([]);
    const [fileNames, setFileNames] = useState([]);


    const { paramName, type } = useParams();


    useEffect(() => {
        getComments();
        getBoardContent();
        getFileName();
        read()
    }, []);

    const getBoardContent = async () => {
        try {
            const response = await axios.get('/api/board/getBoardByIdx?boardIdx=' + paramName,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            setContent(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    const read = async () => {
        try {
            await axios.put('/api/board/readBoard',
                {
                    boardIdx: paramName
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
        } catch (e) {
            console.log(e)
        }
    };


    const addComment = async () => {
        try {
            if (comment === "") {
                alert("비어있는 입력란이 있습니다.")
                return;
            }

            const res = await axios.post('/api/board/addComment',
                {
                    boardIdx: paramName,
                    comment: comment
                }
            );

            console.log(res.data.results )

            if(res.data.results === "ADD_COMMENT_COMPLETE") {
                setComment("");
                getComments();
            }

        } catch (e) {
            console.log(e)
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get('/api/board/getComment?boardIdx=' + paramName,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            console.log(response.data)

            setCommentLists(response.data);
        } catch (e) {
            console.log(e)
        }
    };

    const downloadImage = async (item) => {
        const apiUrl = "/api/board/image/download?fileName="+item;


        try {
            const response = await axios.get(apiUrl,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    },
                    responseType: 'blob' // Blob 형식으로 데이터 받기
                }
            );


            const blob = new Blob([response.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);

            // 다운로드 링크 생성
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.setAttribute('download', item.split("=")[1]);

            // 링크를 body에 추가하고 클릭하여 다운로드 시작
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // 다운로드가 완료되면 링크 제거
            document.body.removeChild(downloadLink);
        } catch (e) {
            console.log("MemberList" + e)
        }

    };



    const getFileName = async () => {
        try {
            const response = await axios.get('/api/board/getFileNames?boardIdx=' + paramName,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );
            console.log(response.data)
            setFileNames(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>

            <section id="main">
                <div className="board_wrap">

                    <div style={{"marginBottom" : "45px"}}></div>



                    <table className="board-container">
                        <tr className="title">
                            <th>{content.boardTitle}</th>
                            
                        </tr>
                        <tr className="info">
                            <td>
                                <span style={{"marginRight":"15px"}}>번호 : {content.boardIdx}</span>
                                <span>글쓴이 : {content.writerId}</span>
                            </td>
                        </tr>
                        <tr className="file-list">
                            <td>
                                <span>
                                    파일 목록 :  
                                    <span>
                                        {fileNames.map((item, index) => (
                                            <a onClick={() => {downloadImage(item)}}>{item.split("=")[1]}</a>
                                        ))}
                                    </span>
                                </span>
                            </td>
                        </tr>        

                        <tr >
                            <td className="content-box">
                                <div className='content' dangerouslySetInnerHTML={{ __html: content.boardDetail }}></div>

                            </td>

                        </tr>

                    </table>

                    <div className="comment-section">
                        <h2>댓글</h2>


                        <div className="comment-form">
                            <textarea placeholder="댓글을 입력하세요" value={comment} onChange={(e) => setComment(e.target.value)} required autoFocus></textarea>
                            <button onClick={addComment}>댓글 작성</button>
                        </div>


                        <ul className="comment-list">
                            {commentLists.map((item, index) => (
                                <li className="comment-item">
                                    <strong>이름 : {item.writerId}</strong>
                                    <div className="comment-content"><span style={{ "color": "red" }}>-</span> {item.comment}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bt_wrap">
                        <Link className="on" to={`/${type}/board`}>목록</Link>
                    </div>
                </div>
            </section>


        </>

    );
};

export default AdminBoardView;
