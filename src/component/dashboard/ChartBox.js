import React, { useEffect, useState } from 'react';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


const ChartBox = ({chartId, chartName, chartData, currentPage, setCurrentPage, x, y}) => {

    useEffect(() => {
        const chart = am4core.create(chartId, am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = chartData.data;
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = "right";
        console.log(chart.exporting.menu);
        chart.exporting.menu.verticalAlign = "bottom";
    
        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = x;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;
    
        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 15; // Y축의 최소 그리드 간격을 10으로 설정합니다.
        valueAxis.min = 0;
        valueAxis.max = 70;
        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = y;
        series.dataFields.categoryX = x;
        series.name = x;
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        return () => {
            chart.dispose(); // 차트 객체 해제
        };

    }, [chartData]);


    

    return (
        <div className="box">
            <div style={{"justifyContent":"space-between", "display":"flex"}}>
                <span>{chartName}</span>
                <ul className="pagination pagination-sm" style={{ "margin": "0" }}>
                    <li className="page-item">
                        {currentPage === 1 ? 
                            <a className="page-link disable">Previous</a>
                            : 
                            <a className="page-link" onClick={() => {setCurrentPage(currentPage - 1)}}>Previous</a>
                        }
                    </li>
                    <li className="page-item">
                        {currentPage === Math.ceil(chartData.totalData / 5) ? 
                            <a className="page-link disable">Next</a>
                            : 
                            <a className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Next</a>
                        }
                    </li>
                </ul>
            </div>
            <div id={chartId} style={{ "width": "100%", "height": "300px" }}></div>
        </div>
    );

};



export default ChartBox;
