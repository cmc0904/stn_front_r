import React from 'react';

import '../../style/customer/Board.css';

import BoadItem from './BoardItem';

const BoardList = (type) => {

    


    return (
        <>
           
            <div className="board_list_wrap">
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

            </div>

        </>

    );

};



export default BoardList;
