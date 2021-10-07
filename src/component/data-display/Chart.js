import React from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0px 4px 24px 0px #22222215;
    padding: 1px 0 20px;
    margin: 20px 0;
`

function Chart ({data, categories, color, isLoading}) {
    const state = {
        options: {
            colors : [],
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
    state.series = data
    state.options.xaxis.categories = categories
    state.options.colors = [color]
    return (
        <Wrapper>
            {isLoading ? <Loading color={color}/>:
                <div className="app">
                    <div className="row">
                    <div className="mixed-chart">
                        <ApexChart
                            options={state.options}
                            series={state.series}
                            type="line"
                            width="1080"
                            height="380"
                        />
                    </div>
                    </div>
                </div>
            }
        </Wrapper>
    );
}

export default Chart;