import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    font-size: 14px;
    color: ${COLOR.gray5};
    align-items: center;
`
const Default = styled.div`
    flex: 1;
    text-align: center;
`
const Price = styled.div`
    flex: 1;
    text-align: right;
`
const Title = styled.div`
    flex: 4;
`
const Image = styled.div`
    width: 60px;
    margin-right: 16px;
`
const Name = styled.div`
    flex: 1;
`

function OrdersHeader () {
    return(
        <Wrapper>
            <Image>상품</Image>
            <Title></Title>
            <Name>상점 이름</Name>
            <Default>수량</Default>
            <Default>주문자</Default>
            <Default>예금주</Default>
            <Price>결제 금액</Price>
        </Wrapper>
    )
}

export default OrdersHeader