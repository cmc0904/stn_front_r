import React, { useState } from 'react';
import '../style/auth/LoginRegister.css';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [NOTFOUND, setNOTFOUNT] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async () => {

        if (username === '' || password === "") {
            setNOTFOUNT(true)
            return;
        }


        try {
            const response = await axios.post('/api/user/login', {
                userId: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.message !== "Login") {
                setNOTFOUNT(true)
                return;
            }

            await setLoginUserInformation()
            
            if (response.data.data.roles.includes("Admin")) {
                navigate('/manager/repaireprocess');
            } else {
                navigate('/customer/board');
            }
                
        } catch (e) {
            console.error(e);
        }

    };



    const setLoginUserInformation = async () => {

        try {

            const response = await axios.get('/api/user/getUserByUserId');
            
            window.localStorage.setItem("name", response.data.result.userName);
            window.localStorage.setItem("userId", response.data.result.userId);

        } catch (e) {
            console.error(e);
        }

    };

    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleLogin(); 
        }
    };
    

    return (
        <>

        <div className="my-login-page">

            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="brand">
                            </div>
                            <div className="card fat">
                                <div className="card-body">
                                    <div className="my-login-validation">
                                        <div className="form-group">
                                            <label htmlFor="userId">아이디</label>
                                            <input id="userId" type="text" className="form-control" name="userId" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} maxLength={10} autoFocus/>
                                            {NOTFOUND && (
                                                <div className="invalid-feedback show">
                                                    아이디를 확인해주세요.
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">비밀번호</label>
                                            <input id="password" type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} maxLength={10} data-eye/>
                                            {NOTFOUND && (
                                                <div className="invalid-feedback show">
                                                    비밀번호를 확인해주세요.
                                                </div>
                                            )}
                                        </div>


                                            
                                        {/* <Link to="/customer/board"> */}
                                            <button className="btn btn-primary btn-block" onClick={handleLogin}  style={{"marginLeft" : "0"}}  >
                                                로그인
                                            </button>
                                        {/* </Link> */}

                                        <div className="mt-4 text-center">
                                            <Link to="/register">회원가입 하기</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>    

    );
};

export default Login;
