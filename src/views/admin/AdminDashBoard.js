import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import '../../style/admin/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 import

const Dashboard = () => {

    useEffect(() => {
        // 차트를 생성합니다.
        let chart = am4core.create('board_chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화

        // 데이터를 추가합니다.
        chart.data = [{
            "country": "USA",
            "visits": 30
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "Germany",
            "visits": 1322
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Spain",
            "visits": 711
        }, {
            "country": "Netherlands",
            "visits": 665
        }, {
            "country": "Russia",
            "visits": 580
        }, {
            "country": "South Korea",
            "visits": 443
        }, {
            "country": "Canada",
            "visits": 441
        }];

        // X축을 설정합니다.
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        // Y축을 설정합니다.
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // 시리즈를 생성합니다.
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "country";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        // 차트를 업데이트합니다.
        chart.current = chart;

        // 컴포넌트가 언마운트 될 때 차트를 정리합니다.
        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <>
            <section id="main" className='mainMinusHeader'>
                <div className="page-title">대시보드</div>
                <div className='container grid'>
                    <div className="box">
                        <span>일별 글 등록 수</span>
                        <div className='board_chart'></div>
                    </div>
                    <div className="box">
                        <span className='repair_admin_chart'>관리자별 A/S 방문 건수</span>
                    </div>
                    <div className="box">
                        <span className='request_day_chart'>일별 A/S 접수건 수</span>
                    </div>
                    <div className="box">
                        <span className='join_day_chart'>일별 가입자 수</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
