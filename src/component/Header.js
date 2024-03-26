import React, { Component } from 'react';
import PropTypes from 'prop-types'; // 추가

import '../style/layout/header.css';

class Header extends Component {
    render() {
        const { content } = this.props; // 변경
        return (
            <header id="header">
                {content}
            </header>
        );
    }
}

Header.propTypes = {
    content: PropTypes.node.isRequired, // 변경
    
};

export default Header;
