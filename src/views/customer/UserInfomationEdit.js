import React, { useState, useEffect } from 'react';
import '../../style/auth/LoginRegister.css';

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
    address: '',
    createAt: ''
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
    try {
      const response = await axios.get('/api/user/getUserByUserId');


      console.log(response.data.result);
      console.log(response.data.result.userId);
      console.log(response.data.result.userEmail);

      setInput({
        ...input,
        userId: response.data.result.userId,
        password: "none",
        name: response.data.result.userName,
        email: response.data.result.userEmail,
        phone: response.data.result.userPhone,
        gender: response.data.result.userGender,
        address: response.data.result.userAddress,
        createAt: response.data.result.createAt

      });


    } catch (e) {
      console.log(e);
    }


  };


  const handleGenderChange = (gender) => {
    setInput({ ...input, gender: gender });
  };






  const validation = () => {

    setErrors({
      userId: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      address: ''
    });
    // name

    const regExpNameFormat = /^[가-힣a-zA-Z]+$/; // 이름의 형식을 검사하는 정규식
    const regExpNameLength = /^.{2,8}$/; // 이름의 길이를 검사하는 정규식

    if (!input.name) {
      setErrors({ ...errors, name: "성함을 입력해주세요." });
      return false;
    }
    if (!regExpNameFormat.test(input.name)) {
      setErrors({ ...errors, name: "올바른 이름 형식이 아닙니다." });
      return false;
    }
    if (!regExpNameLength.test(input.name)) {
      setErrors({ ...errors, name: "성함은 최소(2) 이상 (8) 이하이어야 합니다." });
      return false;
    }


    // email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!input.email) {
      setErrors({ ...errors, email: "이메일을 입력해주세요." });
      return false;
    } else if (!emailRegex.test(input.email)) {
      setErrors({ ...errors, email: "올바른 이메일 형식이 아닙니다." })
      return false;
    }


    // phone
    const phoneNumberRegex = /^\d{3}\d{3,4}\d{4}$/;
    const phoneNumberRegexLength = /^.{1,11}$/
    if (!input.phone) {
      setErrors({ ...errors, phone: "전화번호를 입력해주세요." });
      return false;
    } else if (!phoneNumberRegexLength.test(input.phone)) {
      setErrors({ ...errors, phone: "전화번호는 12자리 이상일 수 없습니다." });
      return false;
    } else if (!phoneNumberRegex.test(input.phone)) {
      setErrors({ ...errors, phone: "올바른 전화번호 형식이 아닙니다. 예)01012345678" })
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


    try {
      if (!validation()) {
        return;
      }

      const response = await axios.put('/api/user/updateUser',
        {
          userId: input.userId,
          userPassword: input.password,
          userName: input.name,
          userEmail: input.email,
          userAddress: input.address,
          userPhone: input.phone,
          userGender: input.gender,
          createAt: input.createAt

        }
      );

      if (response.data.results === "UPDATE") {
        navigate('/customer/myinfo');
      }
    } catch (e) {
      console.log(e);
    }

  };

  const onCompletePost = data => {
    setModalState(false);

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


                            autoFocus
                            disabled
                            readOnly
                          />
                        </div>


                        <div className="invalid-feedback show">{errors.userId}</div>

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
                          maxLength={8}

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
                          maxLength={20}

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
                          maxLength={11}

                        />
                        <div className="invalid-feedback show">{errors.phone}</div>


                      </div>

                      <div className="form-group">
                        <label>성별</label>
                        <div className="d-flex align-items-center">
                          <div className="gender-btn-wrap">
                            {input.gender === "M" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male pressed' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘" />
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘" />
                                </button></>
                            }

                            {input.gender === "F" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘" />
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female pressed' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘" />
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
                            maxLength={20}
                            disabled
                          />
                          <input type="button" onClick={() => setModalState(true)} className="btn btn-outline-primary" value="주소" />
                        </div>

                        <div className="invalid-feedback show">{errors.address}</div>


                      </div>


                      <div className="form-group m-0">
                        <button type="button" className="btn btn-primary btn-block" onClick={handleUpadte} style={{ "margin-left": "0" }}>
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