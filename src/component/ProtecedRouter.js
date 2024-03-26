
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// 인증 여부를 확인하고 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('jwt_token');

    if(isAuthenticated == null) {
        return <Navigate replace to="/"/>;
    } else {
        return <Outlet></Outlet> // 자식 컴포넌트 렌더링
    }
};

export default ProtectedRoute;