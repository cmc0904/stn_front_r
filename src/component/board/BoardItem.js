import React from 'react';

import '../../style/customer/Board.css';



import { useParams, Link } from 'react-router-dom';


const BoadItem = ({item}) => {

    

    const { type } = useParams();

    return (
        <div>
            <div className="num">{item.boardIdx}</div>
            <div className="b_title"><Link to={`/${type}/board/boardview/${item.boardIdx}`}>{item.boardTitle}</Link></div>
            <div className="writer">{item.writerId}</div>
            <div className="date">{item.createAt.replaceAll("-", ".")}</div>
        </div>
    );

};



export default BoadItem;
