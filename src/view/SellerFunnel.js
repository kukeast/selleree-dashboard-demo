import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import queryString from 'query-string'
import Chart from '../component/data-display/Chart';
import Table from '../component/data-display/Table';
import DatePicker from '../component/inputs/DatePicker';
import Container from '../component/layout/Container';
import { COLOR } from '../constants/color';
import Modal from '../component/data-display/Modal';
import Sellers from './Sellers';
import Title from '../component/data-display/Title';
import { funnelMockData } from '../util/mockData';

const defaultFunnel = [
    {
        id : 1,
        subtitle : "1단계",
        title : "가입",
    },
    {
        id : 2,
        subtitle : "2단계",
        title : "상점 개설",
    },
    {
        id : 3,
        subtitle : "3단계",
        title : "결제 설정",
    },
    {
        id : 4,
        subtitle : "4단계",
        title : "상품 1개 이상 등록",
    },
    {
        id : 5,
        subtitle : "5단계",
        title : "주문 1개 이상",
    },
    {
        id : 6,
        subtitle : "6단계",
        title : "주문 상태 변경 2개 이상",
    },
    {
        id : 7,
        subtitle : "7단계",
        title : "주문 상태 변경 10개 이상",
    },
]
const FunnelWrapper = styled.div`
    > div {
        min-width: 960px;
    }
    overflow-x: scroll;
`
function SellerFunnel ({ location, history }) {
    const [isLoading, setIsLoading] = useState(true)
    const queryObj = queryString.parse(location.search)
    const [dateRange, setDateRange] = useState({
        startDate: new Date("2021.8.1"),
        endDate: new Date(),
    })
    const [funnelData, setFunnelData] = useState([])
    const roundToTwo = num => {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    const callbackDateRange = (dateRange) => {
        setDateRange(dateRange)
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        setFunnelData(defaultFunnel.map((data,i) => (
            {
                ...data,
                count: parseInt(funnelMockData[i]),
                conversionRate: roundToTwo(funnelMockData[i] / funnelMockData[0] * 100),
                bounceRate: funnelMockData[i-1] ? roundToTwo(100 - funnelMockData[i] / funnelMockData[0] * 100) : null,
                previousConversionRate: funnelMockData[i-1] ? roundToTwo(funnelMockData[i] / funnelMockData[i-1] * 100) : null,
                previousBounceRate: funnelMockData[i-1] ? roundToTwo(100 - funnelMockData[i] / funnelMockData[i-1] * 100) : null,
            }
        )))
    }, [])
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500);
    }, [dateRange])
    return(
        <>
            <Container>
                <Title 
                    title="판매자 퍼널"
                    icon="filter16"
                    color={COLOR.blue}
                >
                    <DatePicker defaultDate="2021.8.1" callback={callbackDateRange}/>
                </Title>
                <Chart
                    data={[{
                        name: "Count",
                        data: funnelMockData,
                    }]}
                    categories={["가입","상점 개설","결제 설정","상품 1개 이상 등록","주문 1개 이상","주문 상태 변경 2개 이상","주문 상태 변경 10개 이상"]}
                    color={[COLOR.main]}
                    isLoading={isLoading}
                    height={460}
                    type="bar"
                />
            </Container>
            <Container className="mt30">
                <FunnelWrapper>
                    <Table
                        type="seller-funnel"
                        data={funnelData}
                        isLoading={isLoading}
                        dateRange={dateRange}
                    />
                </FunnelWrapper>
            </Container>
            {queryObj.id && 
                <Modal onClickClose={() => history.replace({
                    pathname: history.location.pathname,
                    search: "",
                })}>
                    <Sellers 
                        data={funnelData.filter( data => data.id === parseInt(queryObj.id))[0]}
                        dateRange={dateRange}
                    />
                </Modal>
            }
        </>
    )
}

export default SellerFunnel
