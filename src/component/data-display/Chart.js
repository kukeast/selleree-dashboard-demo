import React from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    height: ${props => props.height + 20}px;
    border-radius: 8px;
    box-shadow: 0px 4px 24px 0px #22222215;
    margin: 20px 0;
`

function Chart ({width, height, type, data, categories, color, isLoading}) {
    const state = {
        options: {
            colors : [color],
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
                //    horizontal: true,
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
        series: data
    };
    return (
        <Wrapper height={height}>
            {isLoading ? <Loading color={color}/>:
                <ApexChart
                    options={state.options}
                    series={state.series}
                    type={type}
                    width={width}
                    height={height}
                />
            }
        </Wrapper>
    );
}

export default Chart;