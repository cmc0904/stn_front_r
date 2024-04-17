import React, { useState, useEffect } from 'react';

import '../../style/admin/repaire.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import
import ReapirItem from "../../component/repair/RepairItem.js"
import axios from 'axios';


const RepairReception = () => {

    const [checkChange, setcheckChange] = useState("");


    const [repairs, setRepairs] = useState([]);
    const [admin, setAdmins] = useState([]);

    const [selectedMode, setSelectedMode] = useState('ALL_DATA');
    const [input, setInput] = useState('');

    useEffect(() => {
        getAllAdmin();
        getFilteringData("ALL_DATA")
    }, []);

    useEffect(() => {
        getFilteringData("ALL_DATA")
    }, [checkChange]);



    const reload = () => {
        getFilteringData(selectedMode)
    };

    // 접수 화면에 뜰 관리자 목록
    const getAllAdmin = async () => {
        try {
            const response = await axios.get('/api/user/getAllAdmins');

            setAdmins(response.data);
        } catch (e) {
            console.log(e)
        }
    };



    const getFilteringData = async (type) => {
        setSelectedMode(type);

        try{
            const response = await axios.get("/api/repair/getRepairFiltering?type="+type);
            setRepairs(response.data)

        }catch(e){
            console.log(e)
        }
        
        
    };

    const getSearchRepair = async () => {
        console.log(input);
        try{
            const response = await axios.get(`/api/repair/searchRepair?userId=${input}&type=${selectedMode}`);            
            setRepairs(response.data)

        }catch(e){
            console.log(e)
        }

        

    };


    

    return (
        <>

            <section id="main">
                <div className="page-title">A/S 접수 및 처리</div>
                <div className="container-md">


                    <div className="search-container" style={{"width":"100%"}}>
                        <div style={{"width":"100%", "display" : 'flex'}}>
                            
                            <input style={{"flex" : 9}} type='text' placeholder='아이디로 검색' value={input} onChange={(e) => setInput(e.target.value)} />

                            <button onClick={() => getSearchRepair()} className="btn btn-dark">검색</button>
                        </div>
                        

                        <div className="mode-btn-wrap">
                            <button onClick={() => getFilteringData("ALL_DATA")} className={selectedMode === "ALL_DATA" ? 'mode-btn selected' : 'mode-btn'}>전체보기</button>
                            <button onClick={() => getFilteringData("WAITING")} className={selectedMode === "WAITING" ? 'mode-btn selected' : 'mode-btn'}>접수 대기</button>
                            <button onClick={() => getFilteringData("WILL_VISIT")} className={selectedMode === "WILL_VISIT" ? 'mode-btn selected' : 'mode-btn'}>방문 예정</button>
                            <button onClick={() => getFilteringData("COMPLETE")} className={selectedMode === "COMPLETE" ? 'mode-btn selected' : 'mode-btn'}>처리 완료</button>
                        </div>

                    </div>
                    
                    {repairs.map((item, index) => (
                        <ReapirItem key={index} reload={reload} item={item} index={index} admins={admin} setcheckChange={setcheckChange}></ReapirItem>
                    ))}


                </div>
            </section>
        </>
    );
};

export default RepairReception;