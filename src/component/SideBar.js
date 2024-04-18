import React, { Component } from 'react';
import PropTypes from 'prop-types'; // 추가

import '../style/layout/sidebar.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

class SideBar extends Component {

    logout = async () =>  {
        try {
            await axios.get('/api/user/logout');
        } catch (e) {
            console.log(e);     
        }

        // 로그인 페이지로 이동
        window.location.href = '/'; // 새로고침을 통해 라우팅을 다시 시작
    };

    render() {
        const { setting } = this.props; // 변경

        return (
            <nav id="side-bar">
                <div className="welcome">
                    {window.localStorage.getItem("name")} 님, 환영합니다!
                </div>

                <div className="nav-bar">
                    {setting.allMenus && setting.allMenus.map((menu, index) => (
                        <div className="select-item" key={index}>
                            <div className="category-name">{menu.categoryName}</div>
                            <div className="items">
                                {menu.subMenus.map((subMenu, subIndex) => (
                                    <Link key={subIndex} to={`${subMenu.link}`} className={`menu ${subMenu.isSelected ? 'active' : ''}`}>{subMenu.subMenuName}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bottom-nav"><a onClick={this.logout}>로그아웃 하기</a></div>
            </nav>
        );
    }
}

SideBar.propTypes = {
    setting: PropTypes.object.isRequired,
};

export default SideBar;
