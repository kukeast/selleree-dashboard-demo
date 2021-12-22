import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import queryString from 'query-string'
import Chart from '../component/data-display/Chart';
import Table from '../component/data-display/Table';
import DatePicker from '../component/inputs/DatePicker';
import Container from '../component/layout/Container';
import Modal from '../component/data-display/Modal';
import Sellers from './Sellers';
import { COLOR } from '../constants/color';
import Title from '../component/data-display/Title';
import { paymentMockData } from '../util/mockData';

const defaultTable = [
    [
        {
            id : 1,
            subtitle : "결제 설정",
            title : "무통장 입금",
        },
        {
            id : 2,
            subtitle : "결제 설정",
            title : "토스페이먼츠",
        },
        {
            id : 3,
            subtitle : "결제 설정",
            title : "무통장 입금 & 토스페이먼츠",
        },
        {
            id : 4,
            subtitle : "결제 설정",
            title : "설정 안 함",
        },
    ],
    [
        {
            id : 5,
            subtitle : "토스페이먼츠 상태",
            title : "신청서 작성 중",
        },
        {
            id : 6,
            subtitle : "토스페이먼츠 상태",
            title : "신청 완료",
        },
        {
            id : 7,
            subtitle : "토스페이먼츠 상태",
            title : "심사 완료",
        },
        {
            id : 8,
            subtitle : "토스페이먼츠 상태",
            title : "계약 종료",
        },
    ]
]

const Column = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

function PaymentSetting ({ location, history }) {
    const [isLoading, setIsLoading] = useState(true)
    const queryObj = queryString.parse(location.search)
    const [dateRange, setDateRange] = useState({
        startDate: new Date("2021.8.1"),
        endDate: new Date(),
    })
    const [chartData, setChartData] = useState([[],[]])
    const [tableData, setTableData] = useState([[],[]])
    const roundToTwo = num => {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    const callbackDateRange = (dateRange) => {
        setDateRange(dateRange)
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        setChartData(paymentMockData.map(arr => (
            arr.map(i => (
                parseInt(i)
            )).slice(0, 4)
        )))
        setTableData(defaultTable.map((arr, i) => (
            arr.map((data, j) => (
                {
                    ...data,
                    count: paymentMockData[i][j],
                    ratio: roundToTwo(paymentMockData[i][j]/paymentMockData[i][4]*100),
                }
            ))
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
                    title="결제 설정 현황"
                    icon="card16"
                    color={COLOR.red}
                >
                    <DatePicker defaultDate="2021.8.1" callback={callbackDateRange}/>
                </Title>
                <Column>
                    <div>
                        <Chart
                            data={chartData[0]}
                            title="결제 설정"
                            labels={["무통장 입금", "토스", "무통장 입금 & 토스", "설정 안 함"]}
                            color={[COLOR.main, COLOR.green, COLOR.yellow, COLOR.gray5]}
                            isLoading={isLoading}
                            height={460}
                            type="donut"
                        />
                        <Table
                            type="payment-setting"
                            data={tableData[0]}
                            isLoading={isLoading}
                            dateRange={dateRange}
                        />
                    </div>
                    <div>
                        <Chart
                            data={chartData[1]}
                            title="토스페이먼츠 상태"
                            labels={["신청서 작성 중", "신청 완료", "심사 완료", "계약 종료"]}
                            color={[COLOR.main, COLOR.green, COLOR.yellow, COLOR.gray5]}
                            isLoading={isLoading}
                            height={460}
                            type="donut"
                        />
                        <Table
                            type="payment-setting"
                            data={tableData[1]}
                            isLoading={isLoading}
                            dateRange={dateRange}
                        />
                    </div>
                </Column>
            </Container>
            {queryObj.id && 
                <Modal onClickClose={() => history.replace({
                    pathname: history.location.pathname,
                    search: "",
                })}>
                    <Sellers 
                        data={queryObj.id < 5 ? tableData[0].filter(data => data.id === parseInt(queryObj.id))[0] : tableData[1].filter(data => data.id === parseInt(queryObj.id))[0]}
                        dateRange={dateRange}
                    />
                </Modal>
            }
        </>
    )
}

export default PaymentSetting
