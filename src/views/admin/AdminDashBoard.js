import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/admin/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import
import ChartBox from '../../component/dashboard/ChartBox';

const Dashboard = () => {
    const [selectedAdminsChartData, setSelectedAdminsChartData] = useState({});
    const [selectedDataChartPage, setSelectedDataChartPage] = useState(1);


    const [postingBoardGroupByDayChartData, setPostingBoardGroupByDayChartData] = useState({});
    const [postingBoardChartPage, setPostingBoardChartPage] = useState(1);


    const [joinUserGroupByDayChartData, setJoinUserGroupByDayChartData] = useState({});
    const [joinUserChartPage, setJoinUserChartPage] = useState(1);

    const [repairRequestGroupByDayChartData, setRepairRequestGroupByDayChartData] = useState({});
    const [repairRequestChartPage, setRepairRequestChartPage] = useState(1);
    

    useEffect(() => {
        getRepairSelectedAdminsForChartData();
        getBoardPostingDayForChartData();
        getJoinPostingDayForChartData();
        getRepairRequestPostingDayForChartData();
    }, []);

    useEffect(() => {
        getRepairSelectedAdminsForChartData();
    }, [selectedDataChartPage]);

    useEffect(() => {
        getBoardPostingDayForChartData();
    }, [postingBoardChartPage]);

    useEffect(() => {
        getJoinPostingDayForChartData();
    }, [joinUserChartPage]);

    useEffect(() => {
        getRepairRequestPostingDayForChartData();
    }, [repairRequestChartPage]);

    const getRepairSelectedAdminsForChartData = async () => {
        try {
            const response = await axios.get(`/api/repair/getSelectedAdminsCountForChart?currentPage=${selectedDataChartPage}`);
            setSelectedAdminsChartData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getBoardPostingDayForChartData = async () => {
        try {
            const response = await axios.get(`/api/board/getDataForChart?currentPage=${postingBoardChartPage}`);
            setPostingBoardGroupByDayChartData(response.data)
        } catch (e) {
            console.log(e);
        }
    };

    const getJoinPostingDayForChartData = async () => {
        try {
            const response = await axios.get(`/api/user/getJoinDataForChart?currentPage=${joinUserChartPage}`);
            setJoinUserGroupByDayChartData(response.data)
        } catch (e) {
            console.log(e);
        }
    };

    const getRepairRequestPostingDayForChartData = async () => {
        try {
            const response = await axios.get(`/api/repair/getRepairDataForChart?currentPage=${repairRequestChartPage}`);
            setRepairRequestGroupByDayChartData(response.data)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <section id="main" className='mainMinusHeader'>
                <div className="page-title">차트</div>
                <div className='container grid'>
                    <ChartBox
                        chartName={"A/S 담당 관리자 배정 건수"}
                        chartData={selectedAdminsChartData}
                        currentPage={selectedDataChartPage}
                        setCurrentPage={setSelectedDataChartPage}
                        x={"adminId"}
                        y={"count"}
                        chartId={"as_selected_admin_chart"}
                    ></ChartBox>

                    <ChartBox
                        chartName={"게시판 일별 업로드 횟수"}
                        chartData={postingBoardGroupByDayChartData}
                        currentPage={postingBoardChartPage}
                        setCurrentPage={setPostingBoardChartPage}
                        x={"day"}
                        y={"count"}
                        chartId={"board_day_chart"}
                    ></ChartBox>

                    <ChartBox
                        chartName={"일별 사용자 가입 건수"}
                        chartData={joinUserGroupByDayChartData}
                        currentPage={joinUserChartPage}
                        setCurrentPage={setJoinUserChartPage}
                        x={"day"}
                        y={"count"}
                        chartId={"as_selected_admin_char1t"}
                    ></ChartBox>

                    <ChartBox
                        chartName={"일별 A/S접수 건수"}
                        chartData={repairRequestGroupByDayChartData}
                        currentPage={repairRequestChartPage}
                        setCurrentPage={setRepairRequestChartPage}
                        x={"day"}
                        y={"count"}
                        chartId={"board_day_ch222a2rt"}
                    ></ChartBox>
                   
                </div>
            </section>
        </>
    );
};

export default Dashboard;
