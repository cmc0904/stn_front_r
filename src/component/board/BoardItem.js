import React from 'react';

import '../../style/customer/Board.css';



import { useParams, Link } from 'react-router-dom';


const BoadItem = ({item}) => {

    

    const { type } = useParams();

    return (
        <tr style={{"height" : "45px", "borderBottom" : "1px solid #ddd"}}>
            <td className="key">{item.boardIdx}</td>
            <td className=""><Link to={`/${type}/board/boardview/${item.boardIdx}`}>{item.boardTitle}</Link></td>
            <td className="" style={{"textAlign" : "center", "width" : "20px"}}>{item.writerId}</td>
            <td className="" style={{"textAlign" : "center"}}>{item.createAt.split(" ")[0]}</td>
            <td className=""style={{"textAlign" : "center"}}>{item.views}</td>
        </tr>
    );

};



export default BoadItem;
