import React from 'react'
import styled from 'styled-components';
import FunnelRow from './FunnelRow';
import FunnelHeader from './FunnelHeader';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function FunnelTable () {
    const funnelData = [
        {
            id : 1,
            step : "1단계",
            conversionRate : 100,
            title : "가입",
            count: 200,
        },
        {
            id : 2,
            step : "2단계",
            title : "상점 개설",
            conversionRate : 54,
            bounceRate : 46,
            previousStepConversionRate : 54,
            previousStepBounceRate : 46,
            count: 123,
        },
        {
            id : 3,
            step : "3단계",
            title : "결제 설정",
            conversionRate : 42,
            bounceRate : 58,
            previousStepConversionRate : 92,
            previousStepBounceRate : 8,
            count: 94,
        },
        {
            id : 4,
            step : "4단계",
            title : "상품 2개 이상 등록",
            conversionRate : 20,
            bounceRate : 80,
            previousStepConversionRate : 46,
            previousStepBounceRate : 54,
            count: 43,
        },
        {
            id : 5,
            step : "5단계",
            title : "주문 2건",
            conversionRate : 12,
            bounceRate : 88,
            previousStepConversionRate : 54,
            previousStepBounceRate : 46,
            count: 23,
        },
        {
            id : 6,
            step : "6단계",
            title : "최근 60일 주문 10건",
            conversionRate : 4,
            bounceRate : 96,
            previousStepConversionRate : 23,
            previousStepBounceRate : 77,
            count: 5,
        },
    ]
    return(
        <>
            <FunnelHeader/>
            <Wrapper>
                {funnelData.map(data => (
                    <FunnelRow
                        key={data.id}
                        data={data}
                    />
                ))}
            </Wrapper>
        </>
    )
}

export default FunnelTable
