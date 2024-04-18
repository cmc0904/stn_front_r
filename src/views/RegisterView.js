import React, { useState } from 'react';
import '../style/auth/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';

import male from '../imgs/male.png';
import female from '../imgs/woman.png';



const Register = () => {
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
    phone: ',',
    gender: '',
    address: ''
  });

  const [validationResult, setValidationResult] = useState({
    "userId" : false,
    "password" : false,
    "name" : false,
    "phone" : false,
    "gender" : false,
    "address" : false,
  }); 

  const [modalState, setModalState] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isCheckedDuplicate, setIsCheckedDuplicate] = useState(false);

  const navigate = useNavigate();


  const idValidation = (type) =>{
    // 유저 아이디
    const regExpUserIdFormat = /^[a-zA-Z0-9]+$/; // 아이디의 형식을 검사하는 정규식
    const regExpUserIdLength = /^.{4,10}$/; // 아이디의 길이를 검사하는 정규식

    setErrors({
      ...errors,
      userId: ''
    })

    if (input.userId.includes(" ")) {
      setErrors({ ...errors, userId: "아이디는 공백을 가질 수 없습니다." });
      return false;
    } else if (!regExpUserIdLength.test(input.userId)) {
      setErrors({ ...errors, userId: "아이디는 최소(4) 이상 (10) 이하이어야 합니다." });
      return false;
    } else if (!regExpUserIdFormat.test(input.userId)) {
      setErrors({ ...errors, userId: "아이디는 영어/숫자로만 조합해주세요." });
      return false;
    }

    if (type === "DUPLICATE_CHECK") {
      return true;
    } else if (!isCheckedDuplicate) {
      setErrors({ ...errors, userId: "중복 확인을 해주세요." });
      return false;
    } else if (isDuplicate) {
      setErrors({ ...errors, userId: "중복된 아이디 입니다." });
      return false;
    }

    setValidationResult({...validationResult, userId : true})
  }

  const passwordValidation = () =>{
    const regExpPasswordFormat = /^^[a-zA-Z\\d`~!@#$%^&*()-_=+]+$/;
    const regExpPasswordLength = /^.{4,10}$/;

    setErrors({
      ...errors,
      password: ''
    })

    if (!input.password) {
      setErrors({ ...errors, password: "비밀번호를 입력해주세요." });
      return false;
    }
    if (input.password.includes(" ")) {
      setErrors({ ...errors, password: "비밀번호는 공백을 가질 수 없습니다." });
      return false;
    }
    if (!regExpPasswordLength.test(input.password)) {
      setErrors({ ...errors, password: "비밀번호는 최소(4) 이상 (10) 이하이어야 합니다." });
      return false;
    }
    if (!regExpPasswordFormat.test(input.password)) {
      setErrors({ ...errors, password: "올바른 비밀번호 형식이 아닙니다." });
      return false;
    }

    setValidationResult({...validationResult, password : true})
  }

  const nameValidation = () =>{
      // name

    const regExpNameFormat = /^[가-힣a-zA-Z]+$/; // 이름의 형식을 검사하는 정규식
    const regExpNameLength = /^.{2,8}$/; // 이름의 길이를 검사하는 정규식

    setErrors({
      ...errors,
      name: ''
    })

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

    setValidationResult({...validationResult, name : true})
  }

  const emailValidation = () =>{
      // email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setErrors({
      ...errors,
      email: ''
    })
    if (!input.email) {
      setErrors({ ...errors, email: "이메일을 입력해주세요." });
      return false;
    } else if (!emailRegex.test(input.email)) {
      setErrors({ ...errors, email: "올바른 이메일 형식이 아닙니다." })
      return false;
    }

    setValidationResult({...validationResult, email : true})
  }

  const phoneValidation = () =>{
      // phone
    const phoneNumberRegex = /^\d{3}\d{3,4}\d{4}$/;
    const phoneNumberRegexLength = /^.{1,11}$/

    setErrors({
      ...errors,
      phone: ''
    })

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

    setValidationResult({...validationResult, phone : true})
  }

  const genderValidation = () =>{

    setErrors({
      ...errors,
      gender: ''
    })
      // gender
    if (!input.gender) {
      setErrors({ ...errors, gender: "성별을 선택해주세요." });
      return false;
    }

    setValidationResult({...validationResult, gender : true})
  }

  const addressValidation = () =>{

    setErrors({
      ...errors,
      address: ''
    })
       // address
    if (!input.address) { 
      setErrors({ ...errors, address: "주소를 입력해주세요." });
      return false;
    }

    setValidationResult({...validationResult, address : true})
  }









  const checkDuplicateUser = async () => {
    try {
      if (!idValidation("DUPLICATE_CHECK")) {
        return;
      }
      setIsCheckedDuplicate(true);
      const response = await axios.get('/api/user/checkDuplicate?userId=' + input.userId);


      if (response.data.results === "DUPLICATE_USER") {
        setIsDuplicate(true);
        setErrors({ ...errors, userId: "중복된 아이디 입니다." });

      } else {
        setIsDuplicate(false)
        setErrors({ ...errors, userId: "" });
      }

    } catch (e) {
      console.log(e)
    }
  };

  const handleGenderChange = (gender) => {
    setInput({ ...input, gender: gender });
  };



  const onCompletePost = data => {
    setModalState(false);

    setInput({ ...input, address: data.address });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    return year + month + day;
  };

  const handleRegister = async () => {
    try {

      if (!(validationResult.userId && validationResult.password && validationResult.name && validationResult.email && validationResult.address && validationResult.phone && validationResult.gender)) return;
  
      const response = await axios.post('/api/user/register', {
        userId: input.userId,
        userPassword: input.password,
        userName: input.name,
        userEmail: input.email,
        userAddress: input.address,
        userPhone: input.phone,
        userGender: input.gender,
        createAt: getTodayDate()
      });
  
  
      if (response.data.results === "REGISTER_COMPLETE") {
        navigate('/');
      }
      
    } catch (e) {
      console.log(e);
    }
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
                          {!isDuplicate && isCheckedDuplicate &&
                            <input
                              id="id"
                              type="text"
                              className="form-control"
                              name="id"
                              value={input.userId}
                              onChange={(e) => {setInput({ ...input, userId: e.target.value });{idValidation({ ...input, userId: e.target.value })}}}
                              style={{ "border": "1px solid lightgreen" }}
                              autoFocus
                              disabled
                            />
                          }
                          {(isDuplicate || !isCheckedDuplicate) &&
                            <input
                              id="id"
                              type="text"
                              className="form-control"
                              name="id"
                              value={input.userId}
                              onChange={(e) => {setInput({ ...input, userId: e.target.value });{idValidation({ ...input, userId: e.target.value })}}}
                              autoFocus
                            />
                          }
                          <input type="button" onClick={checkDuplicateUser} className="btn btn-outline-primary" value="중복확인" />
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
                          onChange={(e) => {setInput({ ...input, password: e.target.value });{passwordValidation({ ...input, password: e.target.value })}}}
                          data-eye
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
                          onChange={(e) =>{setInput({ ...input, name: e.target.value });{nameValidation({ ...input, name: e.target.value })}}}

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
                          onChange={(e) => {setInput({ ...input, email: e.target.value });{emailValidation({ ...input, email: e.target.value })}}}

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
                          onChange={(e) => {setInput({ ...input, phone: e.target.value });{phoneValidation({ ...input, phone: e.target.value })}}}
                        />
                        <div className="invalid-feedback show">{errors.phone}</div>


                      </div>

                      <div className="form-group">
                        <label>성별</label>
                        <div className="d-flex align-items-center">
                          <div className="gender-btn-wrap">
                            {input.gender === "M" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male pressed' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘"></img>
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘"></img>
                                </button></>
                            }

                            {input.gender === "F" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘"></img>
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female pressed' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘"></img>
                                </button></>
                            }

                            {input.gender === "" &&
                              <><button onClick={() => handleGenderChange('M')} className='gender-btn male' type='button'>
                                <img width="30px" height="30px" src={male} alt="남성 아이콘"></img>
                              </button><button onClick={() => handleGenderChange('F')} className='gender-btn female' type='button'>
                                  <img width="30px" height="30px" src={female} alt="여성 아이콘"></img>
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
                            onChange={(e) => {setInput({ ...input, address: e.target.value });{addressValidation({ ...input, address: e.target.value })}}}
                            disabled
                          />
                          <input type="button" onClick={() => setModalState(true)} className="btn btn-outline-primary" value="주소" />
                        </div>

                        <div className="invalid-feedback show">{errors.address}</div>


                      </div>


                      <div className="form-group m-0">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          style={{ "marginLeft": 0 }}
                          onClick={handleRegister}
                        >
                          회원가입
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/">로그인 하기</Link>
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

export default Register;
