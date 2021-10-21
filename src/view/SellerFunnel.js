import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {sub} from "date-fns";
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
        title : "상품 2개 이상 등록",
    },
    {
        id : 5,
        step : "5단계",
        title : "주문 상태 변경 2건",
    },
    {
        id : 6,
        step : "6단계",
        title : "주문 상태 변경 10건",
    },
]
const DatePickerWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
`
function SellerFunnel () {
    const [dateRange, setDateRange] = useState({
        startDate: sub(new Date(), {days: 89}),
        endDate: new Date(),
    })
    const [response] = useAsync(() => getFunnel(dateRange), [dateRange])
    const [funnelData, setFunnelData] = useState([])
    const [tableData, setTableData] = useState([])

    const roundToTwo = num => {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    const callbackDateRange = (dateRange) => {
        setDateRange(dateRange)
    }
    
    useEffect(() => {
        if(response.data){
            setFunnelData(response.data.data)
        }
    }, [response])

    useEffect(() => {
        if(funnelData[0]){
            setTableData(defaultFunnel.map((data,i) => (
                {
                    ...data,
                    count: funnelData[i],
                    conversionRate: roundToTwo(funnelData[i] / funnelData[0] * 100),
                    bounceRate: funnelData[i-1] ? roundToTwo(100 - funnelData[i] / funnelData[0] * 100) : null,
                    previousConversionRate: funnelData[i-1] ? roundToTwo(funnelData[i] / funnelData[i-1] * 100) : null,
                    previousBounceRate: funnelData[i-1] ? roundToTwo(100 - funnelData[i] / funnelData[i-1] * 100) : null,
                }
            )))
        }
    }, [funnelData])

    return(
        <>
            <Container>
                <DatePickerWrapper>
                    <DatePicker callback={callbackDateRange}/>
                </DatePickerWrapper>
                <Chart
                    data={[{
                        name: "Count",
                        data: funnelData,
                    }]}
                    categories={["가입", "상점 개설","결제 설정","상품 2개 이상 등록","주문 상태 변경 2건","주문 상태 변경 10건"]}
                    color={COLOR.main}
                    isLoading={response.loading}
                    width={1080}
                    height={460}
                    type="bar"
                />
            </Container>
            <Container className="mt30">
                <FunnelTable
                    funnelData={tableData}
                    isLoading={response.loading}
                />
            </Container>
        </>
    )
}

export default SellerFunnel
