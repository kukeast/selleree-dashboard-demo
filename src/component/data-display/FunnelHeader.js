import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    font-size: 14px;
    color: ${COLOR.gray5};
    align-items: center;
    box-sizing: border-box;
`
const Step = styled.div`
    flex: 1;
`
const Title = styled.div`
    flex: 2;
    `
const Rate = styled.div`
    flex: 1;
    text-align: center;
`
const Count = styled.div`
    flex: 1;
    text-align: right;
`

function FunnelHeader ({sortBy}) {
    return(
        <Wrapper>
            <Step>단계</Step>
            <Title>이름</Title>
            <Rate>전환율</Rate>
            <Rate>이탈율</Rate>
            <Rate>이전 단계 전환율</Rate>
            <Rate>이전 단계 이탈율</Rate>
            <Count>카운트</Count>
        </Wrapper>
    )
}

export default FunnelHeader