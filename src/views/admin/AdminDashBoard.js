import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import '../../style/admin/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';

const Dashboard = () => {
    const [repaireData, setRepairData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [repairPage, setRepairPage] = useState(0);

    const [repairRequestData, setRepairRequestData] = useState([]);
    const [rcurrentPage, setRCurrentPage] = useState(1);
    const [repairRequestPage, setRepairRequestPage] = useState(0);


    const [boardData, setBoardrData] = useState([]);
    const [bcurrentPage, setBCurrentPage] = useState(1);
    const [boardPage, setBoardPage] = useState(0);

    const [userData, setUserData] = useState([]);
    const [ucurrentPage, setUCurrentPage] = useState(1);
    const [userPage, setUserPage] = useState(0);
    





    useEffect(() => {
        getRepairSelectedAdminsForChartData();
        getBoardPostingDayForChartData();
        getJoinPostingDayForChartData();
        getRepairRequestPostingDayForChartData();
    }, []);

    useEffect(() => {
        getRepairSelectedAdminsForChartData();
    }, [currentPage]);

    useEffect(() => {
        getBoardPostingDayForChartData();
    }, [bcurrentPage]);

    useEffect(() => {
        getJoinPostingDayForChartData();
    }, [ucurrentPage]);

    useEffect(() => {
        getRepairRequestPostingDayForChartData();
    }, [rcurrentPage]);

    useEffect(() => {
        const chart = am4core.create('repair_admin_chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = repaireData;

    
        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "adminId";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;
    
        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 10; // Y축의 최소 그리드 간격을 10으로 설정합니다.
    
        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "adminId";
        series.name = "adminId";
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        return () => {
            chart.dispose(); // 차트 객체 해제
        };
    }, [repaireData]);


    useEffect(() => {
        const chart = am4core.create('board_chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = boardData;

    
        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;
    
        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 10; // Y축의 최소 그리드 간격을 10으로 설정합니다.
        valueAxis.min = 0;
        valueAxis.max = 100;

        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "day";
        series.name = "day";
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let range = valueAxis.axisRanges.create();
        range.value = 300;
        range.endValue = 1100;

        return () => {
            chart.dispose(); // 차트 객체 해제
        };
    }, [boardData]);

    useEffect(() => {
        const chart = am4core.create('day_join_chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = userData;

    
        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;
    
        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 10; // Y축의 최소 그리드 간격을 10으로 설정합니다.
    
        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "day";
        series.name = "day";
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        return () => {
            chart.dispose(); // 차트 객체 해제
        };
    }, [userData]);

    useEffect(() => {
        const chart = am4core.create('day_repair_chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = repairRequestData;

    
        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;
    
        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 10; // Y축의 최소 그리드 간격을 10으로 설정합니다.
    
        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "day";
        series.name = "day";
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        return () => {
            chart.dispose(); // 차트 객체 해제
        };
    }, [repairRequestData]);


    const getRepairSelectedAdminsForChartData = async () => {
        try {
            const response = await axios.get(`/api/repair/getSelectedAdminsCountForChart?currentPage=${currentPage}`);
            setRepairData(response.data.data);
            setRepairPage(Math.ceil(response.data.totalData / 5))
        } catch (e) {
            console.log(e);
        }
    };

    const getBoardPostingDayForChartData = async () => {
        try {
            console.log("gg")
            const response = await axios.get(`/api/board/getDataForChart?currentPage=${bcurrentPage}`);
            setBoardPage(Math.ceil(response.data.totalData / 5))
            setBoardrData(response.data.data)
        } catch (e) {
            console.log(e);
        }
    };

    const getJoinPostingDayForChartData = async () => {
        try {
            console.log("gg")
            const response = await axios.get(`/api/user/getJoinDataForChart?currentPage=${ucurrentPage}`);
            console.log(response.data.data);
            setUserPage(Math.ceil(response.data.totalData / 5))
            setUserData(response.data.data)
        } catch (e) {
            console.log(e);
        }
    };

    const getRepairRequestPostingDayForChartData = async () => {
        try {
            console.log("gg")
            const response = await axios.get(`/api/repair/getRepairDataForChart?currentPage=${rcurrentPage}`);
            console.log(response.data.data);
            setRepairRequestPage(Math.ceil(response.data.totalData / 5))
            setRepairRequestData(response.data.data)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <section id="main" className='mainMinusHeader'>
                {/* <div className="page-title">대시보드</div> */}
                <div className='container grid'>
                    <div className="box">
                        <div style={{"justifyContent":"space-between", "display":"flex"}}>
                            <span>A/S 담당 관리자 배정 건수</span>
                            <ul className="pagination pagination-sm" style={{ "margin": "0" }}>
                                <li className="page-item">
                                    {currentPage === 1 ? 
                                        <a className="page-link disable">Previous</a>
                                        : 
                                        <a className="page-link" onClick={() => {setCurrentPage(currentPage - 1)}}>Previous</a>
                                    }
                                </li>
                                <li className="page-item">
                                    {currentPage === repairPage ? 
                                        <a className="page-link disable">Next</a>
                                        : 
                                        <a className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Next</a>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='repair_admin_chart' style={{ "width": "100%", "height": "300px" }}></div>
                    </div>

                    <div className="box">
                        <div style={{"justifyContent":"space-between", "display":"flex"}}>
                            <span>게시판 일별 업로드 횟수</span>
                            <ul className="pagination pagination-sm" style={{ "margin": "0" }}>
                                <li className="page-item">
                                    {bcurrentPage === 1 ? 
                                        <a className="page-link disable">Previous</a>
                                        : 
                                        <a className="page-link" onClick={() => {setBCurrentPage(bcurrentPage - 1)}}>Previous</a>
                                    }
                                </li>
                                <li className="page-item">
                                    {bcurrentPage === boardPage ? 
                                        <a className="page-link disable">Next</a>
                                        : 
                                        <a className="page-link" onClick={() => {setBCurrentPage(bcurrentPage + 1)}}>Next</a>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='board_chart' style={{ "width": "100%", "height": "300px" }}></div>
                    </div>

                    <div className="box">
                        <div style={{"justifyContent":"space-between", "display":"flex"}}>
                            <span>일별 사용자 가입 건수</span>
                            <ul className="pagination pagination-sm" style={{ "margin": "0" }}>
                                <li className="page-item">
                                    {ucurrentPage === 1 ? 
                                        <a className="page-link disable">Previous</a>
                                        : 
                                        <a className="page-link" onClick={() => {setUCurrentPage(ucurrentPage - 1)}}>Previous</a>
                                    }
                                </li>
                                <li className="page-item">
                                    {ucurrentPage === userPage ? 
                                        <a className="page-link disable">Next</a>
                                        : 
                                        <a className="page-link" onClick={() => {setUCurrentPage(ucurrentPage + 1)}}>Next</a>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='day_join_chart' style={{ "width": "100%", "height": "300px" }}></div>
                    </div>

                    <div className="box">
                        <div style={{"justifyContent":"space-between", "display":"flex"}}>
                            <span>일별 A/S접수 건수 </span>
                            <ul className="pagination pagination-sm" style={{ "margin": "0" }}>
                                <li className="page-item">
                                    {rcurrentPage === 1 ? 
                                        <a className="page-link disable">Previous</a>
                                        : 
                                        <a className="page-link" onClick={() => {setRCurrentPage(rcurrentPage - 1)}}>Previous</a>
                                    }
                                </li>
                                <li className="page-item">
                                    {rcurrentPage === repairRequestPage ? 
                                        <a className="page-link disable">Next</a>
                                        : 
                                        <a className="page-link" onClick={() => {setRCurrentPage(rcurrentPage + 1)}}>Next</a>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='day_repair_chart' style={{ "width": "100%", "height": "300px" }}></div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};

export default Dashboard;
