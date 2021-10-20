import React, { useState } from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import { createPortal } from 'react-dom';
import OrderDetail from '../../view/OrderDetail';
import Icon from './Icon';

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

// const Wrapper = styled(Link)`
const Wrapper = styled.div`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    margin: 10px 0;
    padding: 10px 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
    cursor: pointer;
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

const ModalWrapper = styled.div`
    position: fixed;
    inset: 0;
`
const Dim = styled.div`
    position: fixed;
    inset: 0;
    background-color: ${COLOR.black};
    opacity: 0.6;
    cursor: pointer;
`
const Modal = styled.div`
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    padding: 40px 0;
    background-color: ${COLOR.white};
    overflow: scroll;
    border-radius: 16px;
`
const Close = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    width: 40px;
    height: 40px;
    background-color: ${COLOR.white};
    border-radius: 20px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    :hover{
        background-color: ${COLOR.gray2};
    }
`

function Portal (props) {
    return createPortal(props.children, document.getElementById("portal"))
}

function Order ({order, sortBy}) {
    const defaultShippingFee = parseInt(order.default_shipping_fee)
    const extraShippingFee = parseInt(order.extra_shipping_fee)
    const price = parseInt(order.price)
    const totalPrice = (defaultShippingFee + extraShippingFee + (price * order.quantity)).toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    var backgroundImage = {
        backgroundImage: "url(" + order.image_url + "?w=300)"
    }

    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <Wrapper onClick={() => setIsOpen(true)}>
                <CreatedAt>{format(parseISO(order[sortBy]), 'H시 m분 s초')}</CreatedAt>
                <Image style={backgroundImage}/>
                <Title>{order.title}</Title>
                <Name>{order.name}</Name>
                <Price>{totalPrice}원</Price>
                <Financial status={order.financial_status}>{FinancialStatus[order.financial_status].text}</Financial>
                <Fulfillment status={order.fulfillment_status}>{FulfillmentStatus[order.fulfillment_status].text}</Fulfillment>
            </Wrapper>
            {isOpen && 
                <Portal>
                    <ModalWrapper>
                        <Dim onClick={() => setIsOpen(false)}/>
                        <Close onClick={() => setIsOpen(false)}>
                            <Icon name="close" color={COLOR.gray5}/>
                        </Close>
                        <Modal>
                            <OrderDetail orderId={order.id}/>
                        </Modal>
                    </ModalWrapper>
                </Portal>
            }
        </>
    )
}

export default Order