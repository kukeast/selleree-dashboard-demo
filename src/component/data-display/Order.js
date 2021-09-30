import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.a`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    border-bottom: 1px solid ${COLOR.gray1};
    padding: 20px 16px;
    font-size: 16px;
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
const Default = styled.div`
    flex: 1;
    text-align: center;
`
const Price = styled.div`
    flex: 1;
    text-align: right;
    color: ${COLOR.main};
`
const Title = styled.div`
    flex: 4;
`
const Name = styled.div`
    flex: 1;
`

function Order ({order}) {
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
            <Image style={backgroundImage}/>
            <Title>{order.title}</Title>
            <Name>{order.name}</Name>
            <Default>{order.quantity}</Default>
            <Default>{order.buyer_name}</Default>
            <Default>{order.bank_account_holder}</Default>
            <Price>{totalPrice}원</Price>
        </Wrapper>
    )
}

export default Order