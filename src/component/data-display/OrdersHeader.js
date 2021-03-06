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
const Image = styled.div`
    width: 60px;
    margin-right: 16px;
`
const CreatedAt = styled.div`
    flex: 1.5;
`
const Price = styled.div`
    flex: 1;
    text-align: right;
`
const Title = styled.div`
    flex: ${props => props.size === "medium" ? 4 : 3};
`
const Name = styled.div`
    flex: 1.5;
`
const Financial = styled.div`
    text-align: right;
    flex: 1;
`
const Fulfillment = styled.div`
    text-align: right;
    flex: 1;
`

function OrdersHeader ({ sortBy, size }) {
    return(
        <Wrapper>
            <CreatedAt>{sortBy === "created_at" ? "주문 시간" : "업데이트 시간"}</CreatedAt>
            <Image>상품</Image>
            <Title size={size}></Title>
            {size === "medium" && <Name>상점 이름</Name>}
            <Price>결제 금액</Price>
            <Financial>결제 상태</Financial>
            <Fulfillment>배송 상태</Fulfillment>
        </Wrapper>
    )
}

export default OrdersHeader