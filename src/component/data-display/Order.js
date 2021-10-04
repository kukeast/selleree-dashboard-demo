import React from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const FinancialStatus ={
    WAITING : {
        color: COLOR.yellow,
        text: '결제 대기'
    },
    COMPLETE : {
        color: COLOR.blue,
        text: '결제 완료'
    },
    CANCELED : {
        color: COLOR.gray4,
        text: '주문 취소'
    }
}
const FulfillmentStatus ={
    WAITING : {
        color: COLOR.yellow,
        text: '배송 대기'
    },
    COMPLETE : {
        color: COLOR.green,
        text: '배송 완료'
    },
    WILL_NOT : {
        color: COLOR.gray4,
        text: '배송 안 함'
    }
}

const Wrapper = styled.a`
    display: flex;
    &:hover{

        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    //border-bottom: 1px solid ${COLOR.gray1};
    margin: 10px 0;
    padding: 10px 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
`
const Image = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
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
    flex: 4;
`
const Name = styled.div`
    flex: 1;
`
const Financial = styled.div`
    text-align: right;
    flex: 1;
    font-weight: bold;
    color: ${props => FinancialStatus[props.status].color};
`
const Fulfillment = styled.div`
    text-align: right;
    flex: 1;
    font-weight: bold;
    color: ${props => FulfillmentStatus[props.status].color};
`

function Order ({order, sortBy}) {
    const defaultShippingFee = parseInt(order.default_shipping_fee)
    const extraShippingFee = parseInt(order.extra_shipping_fee)
    const price = parseInt(order.price)
    const totalPrice = (defaultShippingFee + extraShippingFee + (price * order.quantity)).toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    var backgroundImage = {
        backgroundImage: "url(" + order.image_url + "?w=300)"
    };
    return(
        <Wrapper href={"https://" + order.identifier + ".selleree.shop/"} target="_blank" rel="noreferrer">
            <CreatedAt>{format(parseISO(order[sortBy]), 'H시 m분 s초')}</CreatedAt>
            <Image style={backgroundImage}/>
            <Title>{order.title}</Title>
            <Name>{order.name}</Name>
            <Price>{totalPrice}원</Price>
            <Financial status={order.financial_status}>{FinancialStatus[order.financial_status].text}</Financial>
            <Fulfillment status={order.fulfillment_status}>{FulfillmentStatus[order.fulfillment_status].text}</Fulfillment>
        </Wrapper>
    )
}

export default Order