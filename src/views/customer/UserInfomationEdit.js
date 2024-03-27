import React, { useState, useEffect } from 'react';
import '../../style/auth/LoginRegister.css';

import Header from '../../component/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import male from '../../imgs/male.png';
import female from '../../imgs/woman.png';

import DaumPostcode from 'react-daum-postcode';


const MyInfoEdit = () => {

  useEffect(() => {
    getUserInformation();
  }, []);

  const [input, setInput] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });
  const navigate = useNavigate();

  const [modalState, setModalState] = useState(false);





  const getUserInformation = async () => {
    const response = await axios.get('http://localhost:8081/api/user/getUserByUserId',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
        }
      }
    );


    console.log(response.data.result);
    console.log(response.data.result.userId);
    console.log(response.data.result.userEmail);

    setInput({
      ...input,
      userId: response.data.result.userId,
      password: response.data.result.userPassword,
      name: response.data.result.userName,
      email: response.data.result.userEmail,
      phone: response.data.result.userPhone,
      gender: response.data.result.userGender,
      address : response.data.result.userAddress
      
    });


    console.log(input)
    

  };


  const handleGenderChange = (gender) => {
    console.log(gender)
    setInput({ ...input, gender: gender });
  };






  const validation = () => {
  
    // name
    if (!input.name) {
      setErrors({ ...errors, name: "성함을 입력해주세요." });
      return false;
    } else if (input.name.length < 3) {
      console.log(input.name.length)
      console.log(input.name.length < 3)
      setErrors({ ...errors, name: "성함은 3글자 이상이여야 합니다." });
      return false;
    }

    // email
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!input.email) {
      setErrors({ ...errors, email: "이메일을 입력해주세요." });
      return false;
    }else if (input.email.length >= 50) {
      setErrors({ ...errors, email: "이메일은 50글자 이상일 수 없습니다." });
      return false;
    }else if (input.email.includes(" ")) {
      setErrors({ ...errors, email: "이메일은 공백을 가질 수 없습니다." });
      return false;
    }
    else if (!emailRegex.test(input.email)) {
      setErrors({ ...errors, email: "올바른 이메일 형식이 아닙니다." })
      return false;
    }


    // phone
    var phoneNumberRegex = /^\d{3}\d{3,4}\d{4}$/; 
    if (!input.phone) {
      setErrors({ ...errors, phone: "전화번호를 입력해주세요." });
      return false;
    } else if (input.phone.length >= 11) {
      setErrors({ ...errors, phone: "전화번호는 11자리 이상일 수 없습니다." });
      return false;
    }
      else if (!phoneNumberRegex.test(input.phone)) {
      setErrors({ ...errors, phone: "올바른 전화번호 형식이 아닙니다. 예)01011112222" })
      return false;
    }

    // gender
    if (!input.gender) {
      setErrors({ ...errors, gender: "성별을 선택해주세요." });
      return false;
    }

    // address
    if (!input.address) {
      setErrors({ ...errors, address: "주소를 입력해주세요." });
      return false;
    }
    

    return true;

  };

  const handleUpadte = async () => {
    if (!validation()) {
      return;
    }

    const response = await axios.put('http://localhost:8081/api/user/updateUser',
      {
        userId: input.userId,
        userPassword: input.password,
        userName: input.name,
        userEmail: input.email,
        userAddress: input.address,
        userPhone: input.phone,
        userGender: input.gender
       
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token"),
        }
      }
    );

    console.log(response.data);

    if (response.data.result === "ㄴㅁㄴ") {
      navigate('/customer/myinfo');
    } else if (response.data.message === "DUPLICATE_USER") {
      console.log('업데이트 실패');
    }
  };

  const onCompletePost = data => {
    setModalState(false);

    console.log(data)
    setInput({ ...input, address: data.address });
  };

  const postCodeContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };

  const postCodeStyle = {
    width: '400px',
    height: '400px',
    display: modalState ? 'block' : 'none',

  };




  return (
    <>
      <Header content="Register"></Header>
      <div className="my-login-page">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="card fat" style={{ marginTop: "25px" }}>
                  <div className="card-body">
                    <form method='post'>
                      <div className="form-group">
                        <label htmlFor="id">아이디</label>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                              id="id"
                              type="text"
                              className="form-control"
                              name="id"
                              value={input.userId}
                              //onChange={(e) => setInput({ ...input, userId: e.target.value })}
                              
                              autoFocus

                              readOnly
                            />
                        </div>


                        <div className="invalid-feedback show">{errors.userId}</div>

                      </div>

                      <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          value={input.password}
                          onChange={(e) => setInput({ ...input, password: e.target.value })}

                          data-eye

                          readOnly
                        />

                        <div className="invalid-feedback show">{errors.password}</div>

                      </div>

                      <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          name="name"
                          value={input.name}
                          onChange={(e) => setInput({ ...input, name: e.target.value })}

                        />

                        <div className="invalid-feedback show">{errors.name}</div>


                      </div>

                      <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          value={input.email}
                          onChange={(e) => setInput({ ...input, email: e.target.value })}

                        />

                        <div className="invalid-feedback show">{errors.email}</div>


                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                          id="phone"
                          type="text"
                          className="form-control"
                          name="phone"
                          value={input.phone}
                          onChange={(e) => setInput({ ...input, phone: e.target.value })}

                        />
                        <div className="invalid-feedback show">{errors.phone}</div>


                      </div>

                      <div className="form-group">
                        <label>성별</label>
                        <div className="d-flex align-items-center">
                          <div className="gender-btn-wrap">
                            {input.gender === "M" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male pressed' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘"/>
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘"/>
                                </button></>
                            }

                            {input.gender === "F" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘"/>
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female pressed' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘"/>
                                </button></>
                            }

                      

                          </div>
                        </div>

                        <div className="invalid-feedback show">{errors.gender}</div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">주소</label>
                        {modalState &&

                          <div style={postCodeContainerStyle}>
                            <DaumPostcode
                              style={postCodeStyle}
                              onComplete={onCompletePost}
                            />
                          </div>
                        }
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <input
                            style={{ flex: 1, marginRight: 2 }}
                            id="address"
                            type="text"
                            className="form-control"
                            name="address"
                            value={input.address}
                            onChange={(e) => setInput({ ...input, address: e.target.value })}
                            disabled
                          />
                          <input type="button" onClick={() => setModalState(true)} className="btn btn-outline-primary" value="주소" />
                        </div>

                        <div className="invalid-feedback show">{errors.address}</div>


                      </div>


                      <div className="form-group m-0">
                        <button type="button" className="btn btn-primary btn-block" onClick={handleUpadte} style={{"margin-left":"0"}}>
                          수정하기
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/customer/myinfo">내 정보로 돌아가기</Link>
                      </div>

                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section >
      </div >
    </>
  );

};

export default MyInfoEdit;