import React from 'react';

import Header from '../../component/Header';
import SideBar from '../../component/SideBar';

import '../../style/customer/Board.css';
import BoardList from '../../component/board/BoardList';
import { useParams } from 'react-router-dom';


const Board = () => {

    const { type } = useParams();


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
                <BoardList type={type}></BoardList>
            </section>


        </>

    );
};

export default Board;
