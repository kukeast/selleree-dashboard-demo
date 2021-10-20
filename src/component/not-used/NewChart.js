import React from "react";
import Chart from "react-apexcharts";

function NewChart ({data, categories}) {
    const chartCategories = categories
    const chartData = data
    const state = {
        options: {
            colors : ['#403DD5','#F61E52', '#13CA72', '#FFC32A', '#1D85FF'],
            chart: {
                fontFamily: 'Spoqa Han Sans Neo, sans-serif',
                id: "basic-bar",
                toolbar : {
                    show: false,
                    tools: {
                        zoom: false
                    },
                }
            },
            xaxis: {
                categories: [1,2,3,4,55,55,44],
                tooltip:{
                    enabled : false
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2.5,
            },
            tooltip:{
                x:{
                    show: false
                }
            },
            grid: {
                borderColor: '#f7f7fa'
            },
            legend:{
                offsetY: "6",
                markers: {
                    width: 8,
                    height: 8,
                }
            }
        },
        series: []
    };
    state.series = chartData
    state.options.xaxis.categories = chartCategories

    return (
        <div className="Chart">
            <div className="app">
                <div className="row">
                <div className="mixed-chart">
                    <Chart
                    options={state.options}
                    series={state.series}
                    type="line"
                    width="1040"
                    height="440"
                    />
                </div>
                </div>
            </div>
        </div>
    );
}

export default NewChart;