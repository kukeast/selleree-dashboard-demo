import React from 'react'
import styled from 'styled-components';
import Chart from '../component/data-display/Chart';
import FunnelTable from '../component/data-display/FunnelTable';
import DatePicker from '../component/inputs/DatePicker';
import Container from '../component/layout/Container';
import { COLOR } from '../constants/color';

const DatePickerWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
`

function Test () {
    const response = [200, 123, 94, 43, 23, 5]
    const defaultFunnel = [
        {
            id : 1,
            step : "1단계",
            title : "가입",
        },
        {
            id : 2,
            step : "2단계",
            title : "상점 개설",
        },
        {
            id : 3,
            step : "3단계",
            title : "결제 설정",
        },
        {
            id : 4,
            step : "4단계",
            title : "상품 2개 이상 등록",
        },
        {
            id : 5,
            step : "5단계",
            title : "주문 2건",
        },
        {
            id : 6,
            step : "6단계",
            title : "최근 60일 주문 10건",
        },
    ]
    const roundToTwo = num => {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    const funnelData = defaultFunnel.map((data,i) => (
        {
            ...data,
            count: response[i],
            conversionRate: roundToTwo(response[i] / response[0] * 100),
            bounceRate: response[i-1] ? roundToTwo(100 - response[i] / response[0] * 100) : null,
            previousConversionRate: response[i-1] ? roundToTwo(response[i] / response[i-1] * 100) : null,
            previousBounceRate: response[i-1] ? roundToTwo(100 - response[i] / response[i-1] * 100) : null,
        }
    ))
    console.log(funnelData)
    const callbackDateRange = (dateRange) => {
        // console.log(dateRange)
    }
    
    return(
        <>
            <Container>
                <DatePickerWrapper>
                    <DatePicker callback={callbackDateRange}/>
                </DatePickerWrapper>
                <Chart
                    data={[{
                        name: "Count",
                        data: [200, 123, 94, 43, 23, 5]
                    }]}
                    categories={["가입", "상점 개설","결제 설정","상품 2개 이상 등록","주문 2건","최근 60일 주문 10건"]}
                    color={COLOR.main}
                    // isLoading={chart.loading}
                    width={1080}
                    height={460}
                    type="bar"
                />
            </Container>
            <Container className="mt30">
                <FunnelTable funnelData={funnelData}/>
            </Container>
        </>
    )
}

export default Test
