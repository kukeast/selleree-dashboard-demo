import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import useAsync from '../util/useAsync';
import Chart from '../component/data-display/Chart';
import FunnelTable from '../component/data-display/FunnelTable';
import DatePicker from '../component/inputs/DatePicker';
import Container from '../component/layout/Container';
import { COLOR } from '../constants/color';
import { getFunnel } from '../util/api';

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
        title : "상품 1개 이상 등록",
    },
    {
        id : 5,
        step : "5단계",
        title : "주문 1개 이상",
    },
    {
        id : 6,
        step : "6단계",
        title : "주문 상태 변경 2개 이상",
    },
    {
        id : 7,
        step : "7단계",
        title : "주문 상태 변경 10개 이상",
    },
]
const DatePickerWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
`
const FunnelWrapper = styled.div`
    > div {
        min-width: 960px;
    }
    overflow-x: scroll;
`
function SellerFunnel () {
    const [dateRange, setDateRange] = useState({
        startDate: new Date("2021.8.1"),
        endDate: new Date(),
    })
    const [response] = useAsync(() => getFunnel(dateRange), [dateRange])
    const [funnelData, setFunnelData] = useState([])

    const roundToTwo = num => {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    const callbackDateRange = (dateRange) => {
        setDateRange(dateRange)
    }
    
    useEffect(() => {
        if(response.data){
            setFunnelData(defaultFunnel.map((data,i) => (
                {
                    ...data,
                    count: response.data.data[i],
                    conversionRate: roundToTwo(response.data.data[i] / response.data.data[0] * 100),
                    bounceRate: response.data.data[i-1] ? roundToTwo(100 - response.data.data[i] / response.data.data[0] * 100) : null,
                    previousConversionRate: response.data.data[i-1] ? roundToTwo(response.data.data[i] / response.data.data[i-1] * 100) : null,
                    previousBounceRate: response.data.data[i-1] ? roundToTwo(100 - response.data.data[i] / response.data.data[i-1] * 100) : null,
                }
            )))
        }
    }, [response])

    return(
        <>
            <Container>
                <DatePickerWrapper>
                    <DatePicker callback={callbackDateRange}/>
                </DatePickerWrapper>
                <Chart
                    data={[{
                        name: "Count",
                        data: response.data ? response.data.data : [],
                    }]}
                    categories={["가입","상점 개설","결제 설정","상품 1개 이상 등록","주문 1개 이상","주문 상태 변경 2개 이상","주문 상태 변경 10개 이상"]}
                    color={[COLOR.main]}
                    isLoading={response.loading}
                    height={460}
                    type="bar"
                />
            </Container>
            <Container className="mt30">
                <FunnelWrapper>
                    <FunnelTable
                        funnelData={funnelData}
                        isLoading={response.loading}
                        dateRange={dateRange}
                    />
                </FunnelWrapper>
            </Container>
        </>
    )
}

export default SellerFunnel
