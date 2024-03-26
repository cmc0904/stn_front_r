import React, { useState, useEffect } from 'react';

import '../../style/customer/Board.css';



import { Link } from 'react-router-dom';


const BoadItem = ({item}) => {

    return (
        <div>
            <div className="num">{item.boardIdx}</div>
            <div className="b_title"><Link to={`/manager/board/boardview/${item.boardIdx}`}>{item.boardTitle}</Link></div>
            <div className="writer">{item.writerId}</div>
            <div className="date">{item.createAt.replaceAll("-", ".")}</div>
        </div>
    );

};



export default BoadItem;
