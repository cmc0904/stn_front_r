import React from 'react';

import '../../style/customer/Board.css';

import BoadItem from './BoardItem';

const BoardList = ({showData}) => {

    


    return (
        <>
           
            {/* <div className="board_list_wrap">
                <div className="board_list">
                    <div className="top">
                        <div className="num">번호</div>
                        <div className="b_title">제목</div>
                        <div className="writer">글쓴이</div>
                        <div className="date">작성일</div>
                    </div>

                    {type.showData.map((item, index) => (
                        <BoadItem item={item}></BoadItem>
                    ))}

                </div>
            </div> */}

            <table className='board_tbl'>
                <thead>
                    <tr className='th_tr'>
                        <th className='key'>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일자</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                    {showData.map((item, index) => (
                        <BoadItem key={index} item={item}></BoadItem>
                    ))}
                <tbody>

                </tbody>
            </table>

        </>

    );

};



export default BoardList;
