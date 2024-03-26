import LoginView from './views/LoginView.js';
import RegisterView from './views/RegisterView.js';

import UserRequestRepairView from './views/customer/UserRequestRepairView.js';
import UserInformationView from './views/customer/UserInformationView.js';

import FaQListView from './views/customer/FaQListView.js';

import MemberListView from './views/admin/MemberListView.js';
import AdminListView from './views/admin/AdminListView.js';
import RepairReceptionView from './views/admin/RepairReceptionView.js';
import FAQMagementView from './views/admin/FAQMagementView.js';
import AdminUserInformationView from './views/admin/AdminUserInformationView.js';


import AdminBoardWriteView from './views/board/BoardWriteView.js';
import AdminBoardDetailView from './views/board/BoardView.js';
import AdminBoardView from './views/board/BoardListView.js';

import ProtecedRouter from './component/ProtecedRouter.js';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './style/layout/index.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route element={<ProtecedRouter />}>

          {/* 사용자(Customer) 부분 */}
          <Route path="/customer/as" element={<UserRequestRepairView />} />
          <Route path="/customer/myinfo" element={<UserInformationView />} />
          <Route path="/customer/faq" element={<FaQListView />} />

          {/* 관리자(Admin) 부분 */}
          <Route path="/manager/members" element={<MemberListView />} />
          <Route path="/manager/managers" element={<AdminListView />} />
          <Route path="/manager/repaireprocess" element={<RepairReceptionView />} />
          <Route path="/manager/asklist" element={<FAQMagementView />} />


          {/* 게시판 부분 */}
          <Route path="/:type/board/boardwrite" element={<AdminBoardWriteView />} />
          <Route path="/:type/board/boardView/:paramName" element={<AdminBoardView />} />
          <Route path="/:type/board" element={<AdminBoardView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
