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
                <FunnelTable/>
            </Container>
        </>
    )
}

export default Test
