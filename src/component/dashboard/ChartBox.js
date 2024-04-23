import React, { useEffect, useState } from 'react';

import '../../style/customer/Board.css';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';



const ChartBox = ({chartName, data, currentPage, setCurrentPage, valueY, categoryX}) => {
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        console.log(chartName)
        console.log(data)

    }, []);

    useEffect(() => {
        const chart = am4core.create('chart', am4charts.XYChart);
        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = chartData.data;

    
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
                        {currentPage === 100 ? 
                            <a className="page-link disable">Next</a>
                            : 
                            <a className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Next</a>
                        }
                    </li>
                </ul>
            </div>
            <div className='chart' style={{ "width": "100%", "height": "300px" }}></div>
        </div>
    );

};



export default ChartBox;
