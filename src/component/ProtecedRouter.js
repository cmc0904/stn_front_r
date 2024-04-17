
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, React, useState } from 'react';
import axios from 'axios';

// 인증 여부를 확인하고 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('jwt_token');

    const [isVaild, setIsVaild] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validationJWT = async () => {
            try {
                const res = await axios.get('/api/user/checkVaildJWT');
                setIsVaild(res.data.results === "JWT_CHECKED");
            } catch (error) {
                setIsVaild(false);
            }finally {
                setLoading(false); // 로딩 상태를 false로 설정하여 완료됨을 알림
            }
        };

        validationJWT();
    }, []);

    if (loading) {
        // 로딩 중일 때의 처리
        return <div>Loading...</div>;
    }


    if (!isVaild) {
        return <Navigate replace to="/" />;
    }
    
    return <Outlet></Outlet> // 자식 컴포넌트 렌더링
};

export default ProtectedRoute;