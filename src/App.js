import LoginView from './views/LoginView.js';
import RegisterView from './views/RegisterView.js';

import UserRequestRepairView from './views/customer/UserRequestRepairView.js';
import UserInformationView from './views/customer/UserInformationView.js';
import UserInformationEdit from './views/customer/UserInfomationEdit.js';

import FaQListView from './views/customer/FaQListView.js';

import MemberListView from './views/admin/MemberListView.js';
import AdminListView from './views/admin/AdminListView.js';
import RepairReceptionView from './views/admin/RepairReceptionView.js';
import FAQMagementView from './views/admin/FAQMagementView.js';
import AdminUserInformationView from './views/admin/AdminUserInformationView.js';


import AdminBoardWriteView from './views/board/BoardWriteView.js';
import AdminBoardDetailView from './views/board/BoardView.js';
import AdminBoardView from './views/board/BoardListView.js';
import AdminDashBoard from './views/admin/AdminDashBoard.js';


import ProtecedRouter from './component/ProtecedRouter.js';

import { useEffect, useState } from 'react';


import {Route, Routes, useLocation } from 'react-router-dom';

import SideBar from './component/SideBar.js';

import Header from './component/Header.js';

import './style/layout/index.css';


function App() {


  const location = useLocation();
  const [setting, setSetting] = useState([])

  const [headerContent, setHeaderContent] = useState('')



  useEffect(() => {

    if (location.pathname.includes("manager")) {
      setHeaderContent("Management");
      setSetting(
        {
          "logindUserName": window.localStorage.getItem("name"),
          "allMenus": [
            {
              "categoryName": "대시보드",
              "subMenus": [
                {
                  "subMenuName": "대시보드",
                  "link": "/manager/dashboard",
                  "isSelected": location.pathname === "/manager/dashboard"
                },
              ]
            },
            {
              "categoryName": "회원 관리",
              "subMenus": [
                {
                  "subMenuName": "사용자",
                  "link": "/manager/members",
                  "isSelected": location.pathname === "/manager/members" || location.pathname.startsWith("/manager/user")
                },
                {
                  "subMenuName": "관리자",
                  "link": "/manager/managers",
                  "isSelected": location.pathname === "/manager/managers"
                }
              ]
            },
            {
              "categoryName": "고객센터",
              "subMenus": [
                {
                  "subMenuName": "A/S접수",
                  "link": "/manager/repaireprocess",
                  "isSelected": location.pathname === "/manager/repaireprocess"
                },
                {
                  "subMenuName": "게시판",
                  "link": "/manager/board",
                  "isSelected": location.pathname.startsWith("/manager/board")
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
                  "isSelected": location.pathname === "/manager/asklist"
                }
              ]
            }

          ]


        }
      )
    } else if (location.pathname.includes("customer")) {
      setHeaderContent("고객서비스");
      setSetting(
        {
          "logindUserName": window.localStorage.getItem("name"),
          "allMenus": [
            {
              "categoryName": "고객센터",
              "subMenus": [
                {
                  "subMenuName": "게시판",
                  "link": "/customer/board",
                  "isSelected": location.pathname.startsWith("/customer/board")
                },
                {
                  "subMenuName": "A/S접수",
                  "link": "/customer/as",
                  "isSelected": location.pathname === "/customer/as"
                }
              ]
            },
            {
              "categoryName": "관리",
              "subMenus": [
                {
                  "subMenuName": "내 정보",
                  "link": "/customer/myinfo",
                  "isSelected":  location.pathname.startsWith("/customer/myinfo")
                },
                {
                  "subMenuName": "자주 묻는 질문",
                  "link": "/customer/faq",
                  "isSelected": location.pathname === "/customer/faq"
                }
              ]
            }

          ]


        }
      )
    } else if(location.pathname === "/") {
      setHeaderContent("Login")
    } else if(location.pathname === "/register") {
      setHeaderContent("Register")
    }
  }, [location])

  return (
    <>
      <Header content={headerContent} />
      {!(location.pathname === "/" || location.pathname === "/register") && 
        <SideBar setting={setting} />
      }
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route element={<ProtecedRouter />}>

          {/* 사용자(Customer) 부분 */}
          <Route path="/customer/as" element={<UserRequestRepairView />} />
          <Route path="/customer/myinfo" element={<UserInformationView />} />
          <Route path="/customer/faq" element={<FaQListView />} />
          <Route path="/customer/myinfo/myinfoedit" element={<UserInformationEdit />} />


          {/* 관리자(Admin) 부분 */}
          <Route path="/manager/members" element={<MemberListView />} />
          <Route path="/manager/managers" element={<AdminListView />} />
          <Route path="/manager/repaireprocess" element={<RepairReceptionView />} />
          <Route path="/manager/asklist" element={<FAQMagementView />} />
          <Route path="/manager/user/:paramName" element={<AdminUserInformationView />} />
          <Route path="/manager/dashboard" element={<AdminDashBoard />} />


          {/* 게시판 부분 */}
          <Route path="/:type/board/boardwrite" element={<AdminBoardWriteView />} />
          <Route path="/:type/board/boardView/:paramName" element={<AdminBoardDetailView />} />
          <Route path="/:type/board" element={<AdminBoardView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
