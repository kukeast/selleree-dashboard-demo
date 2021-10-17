import React from 'react'
import styled from 'styled-components';
import Chart from '../component/data-display/Chart';
import ButtonGroup from '../component/inputs/ButtonGroup';
import Container from '../component/layout/Container';
import { COLOR } from '../constants/color';

const Buttons = styled.div`
    margin-top: 30px;
    text-align: center;
`

function Test () {
    const buttons = [
        {
            title: "오늘"
        },
        {
            title: "어제"
        },
        {
            title: "최근 7일"
        },
        {
            title: "최근 14일"
        },
        {
            title: "최근 30일"
        },
        {
            title: "최근 90일"
        },
    ]
    const callbackDateRange = (dateRange) => {
        console.log(dateRange)
    }
    return(
        <Container>
            <Buttons>
                <ButtonGroup 
                    buttons={buttons} 
                    defaultSelected={4}
                    callback={callbackDateRange}
                />
            </Buttons>
            <Chart
                data={[{
                    name: "Count",
                    data: [200, 123, 94, 43, 23, 5]
                }]}
                categories={["가입", "상점 개설","결제 설정","상품 2개 이상 등록","주문 2건 이상","최근 60일 주문 10건"]}
                color={COLOR.main}
                // isLoading={chart.loading}
                width={1080}
                height={460}
                type="bar"
            />
        </Container>
    )
}

export default Test
