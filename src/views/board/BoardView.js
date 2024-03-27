import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import '../../style/customer/BoardView.css';


import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const AdminBoardView = () => {

    

    const [content, setContent] = useState({});
    const [comment, setComment] = useState('');
    const [commentLists, setCommentLists] = useState([]);


    const { paramName, type } = useParams();


    useEffect(() => {
        getComments();
        getBoardContent();
    }, []);

    const getBoardContent = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/board/getBoardByIdx?boardIdx=' + paramName,
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


    const addComment = async () => {
        try {
            if (comment === "") {
                alert("비어있는 입력란이 있습니다.")
                return;
            }

            await axios.post('http://localhost:8081/api/board/addComment',
                {
                    boardIdx: paramName,
                    comment: comment
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            getComments();
        } catch (e) {
            console.log(e)
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/board/getComment?boardIdx=' + paramName,
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

    return (
        <>
            {
                type === "manager" &&
                <><Header content="Management"></Header><SideBar setting={{
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
                                    "isSelected": true
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
                                    "isSelected": false
                                }
                            ]
                        }
                    ]
                }} /></>

            }

            {
                type === "customer" &&
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
                                            "isSelected": true
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
                                            "isSelected": false
                                        }
                                    ]
                                }

                            ]


                        }
                    }
                    />
                </>

            }
            <section id="main">
                <div className="board_wrap">

                    <div className="board_title">
                        <strong>기타문의</strong>
                        <p>문의사항을 입력해주세요</p>
                    </div>


                    <div className="board_list_wrap">
                        <div className="board_view">
                            <div className="title">
                                {content.boardTitle}
                            </div>
                            <div className="info">
                                <dl>
                                    <dt>번호</dt>
                                    <dd>{content.boardIdx}</dd>
                                </dl>

                                <dl>
                                    <dt>글쓴이</dt>
                                    <dd>{content.writerId}</dd>
                                </dl>


                            </div>


                            <div className="cont" dangerouslySetInnerHTML={{ __html: content.boardDetail }}></div>


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
                                            <div className="comment-content"><span style={{"color" : "red"}}>-</span> {item.comment}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="bt_wrap">
                            <Link className="on" to={`/${type}/board`}>목록</Link>
                        </div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default AdminBoardView;
