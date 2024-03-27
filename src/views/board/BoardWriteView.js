import React, { useState } from 'react';
import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import '../../style/customer/BoardWriteView.css';


import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const BoardWriteView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPrivate, setIsPrivate] = useState(0);

    const navigate = useNavigate();

    const { type } = useParams();


    const uploadContent = async () => {
        if (title === "" || content === "") {
            alert("비어있는 입력란이 있습니다.")
            return;
        }


        try {
            const response = await axios.post('http://localhost:8081/api/board/postBoard', {
                boardTitle: title,
                boardDetail: content,
                isPrivate: isPrivate
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
                    }
                }
            );

            console.log(content)

            if (response.data.result === "ADD_BOARD_COMPLETE") {
                navigate(`/${type}/board`);
            };
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
                    <Header content="Management"></Header>
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
                        <strong>게시판</strong>
                        <p>문의사항을 적어주세요.</p>
                    </div>

                    <div className="board_list_wrap">
                        <table className="board-container">
                            <tr>
                                <th>제목</th>
                                <td><input type="text" placeholder="제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <th>공개</th>
                                <td>
                                    <div className="isPrivate">
                                        <span style={{"marginRight" : "5px"}}>공개 : <input type="radio" name="isPrivate" value="0" checked={isPrivate === 0} onChange={() => setIsPrivate(0)}/></span>
                                        <span>비공개 : <input type="radio" name="isPrivate" value="1" checked={isPrivate === 1} onChange={() => setIsPrivate(1)}/></span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th className="content-box" colspan="2">
                                    <textarea placeholder="내용을 입력 해주세요." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                </th>
                            </tr>

                        </table>
                        <div className="mb-3" style={{"marginTop" : "15px"}}>
                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                        </div>

                        <div className="bt_wrap">
                            <a href="#!" className="on" onClick={uploadContent} style={{"marginRight" : "15px"}}>등록</a>
                            <Link className="on" to={`/${type}/board`}>취소</Link>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
};

export default BoardWriteView;
