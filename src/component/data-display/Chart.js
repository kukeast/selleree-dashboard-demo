import React from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { COLOR } from "../../constants/color";
import Loading from "./Loading";
const LoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    border-radius: 8px;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    margin: 20px 0;
    padding: 20px 20px 10px 20px;
    > div {
        height: ${props => props.height}px;
    }
    .apexcharts-tooltip {
        background-color: ${COLOR.backgroundColor};
        color: ${COLOR.black};
        padding: 14px 16px;
        border-radius : 8px !important;
        box-shadow: ${COLOR.shadow} !important;
        border: 0 !important;
        z-index: 6;
        .apexcharts-tooltip-series-group{
            padding: 0;
            background-color: none !important;
            .apexcharts-tooltip-y-group{
                padding: 0;
            }
        }
        
        .apexcharts-tooltip-series-group{
            margin: 4px 0;
            padding: 0 !important;
        }
        .apexcharts-tooltip-marker{
            width: 8px;
            height: 8px;
        }
    }
    .apexcharts-legend-marker{
        margin-right: 12px !important;
    }
    .apexcharts-legend-series{
        margin: 0px 12px !important;
    }
`

function Chart ({height, type, data, categories=[], labels=[], color, isLoading}) {
    const state = {
        options: {
            colors : color,
            chart: {
                fontFamily: 'Spoqa Han Sans Neo, sans-serif',
                id: "basic-bar",
                toolbar : {
                    show: false,
                    tools: {
                        zoom: false
                    },
                },
            },
            plotOptions: {
                bar: {
                   borderRadius: 4,
                   horizontal: false,
                },
                pie: {
                    expandOnClick: false,
                }
            },
            xaxis: {
                categories: categories,
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
                },
                fillSeriesColor: false,
            },
            grid: {
                borderColor: COLOR.gray2
            },
            legend:{
                position: 'bottom',
                // offsetY: "6",    
                markers: {
                    width: 8,
                    height: 8,
                }
            },
            labels: labels           
        },
        series: data
    };
    return (
        <Wrapper height={height}>
            {isLoading ? 
                <LoadingWrapper>
                    <Loading color={color}/>
                </LoadingWrapper>
                :
                <div>
                    <ApexChart
                        options={state.options}
                        series={state.series}
                        type={type}
                        height={height}
                    />
                </div>
            }
        </Wrapper>
    );
}

export default Chart;