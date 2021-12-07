import React, { useState } from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import OrderDetail from '../../view/OrderDetail';
import Modal from './Modal';
import Skeleton from './Skeleton';

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
    background-image: url( ${props => props.url}?w=300);
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
    border: 1px solid ${COLOR.gray2};
`
const CreatedAt = styled.div`
    flex: 1.5;
`
const Price = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
`
const PaymentMethod = styled.span`
    font-size: 22px;
`
const Title = styled.div`
    flex: 4;
    margin-left: 16px;
`
const Name = styled.div`
    flex: 1.5;
`
const Financial = styled.div`
    display: flex;
    justify-content: end;
    flex: 1;
    font-weight: bold;
    color: ${props => props.status ? FinancialStatus[props.status].color : null};
`
const Fulfillment = styled.div`
    display: flex;
    justify-content: end;
    flex: 1;
    font-weight: bold;
    color: ${props => props.status ? FulfillmentStatus[props.status].color : null};
`

function Order ({data, sortBy, isLoading}) {
    const [isOpen, setIsOpen] = useState(false)
    if(isLoading){
        return(
            <Wrapper>
                <CreatedAt><Skeleton width={100} height={21}/></CreatedAt>
                <Skeleton width={60} height={60} rounded/>
                <Title><Skeleton width={260} height={21}/></Title>
                <Name><Skeleton width={100} height={21}/></Name>
                <Price><Skeleton width={80} height={21}/></Price>
                <Financial><Skeleton width={80} height={21}/></Financial>
                <Fulfillment><Skeleton width={80} height={21}/></Fulfillment>
            </Wrapper>
        )
    }else{
        return(
            <>
                <Wrapper onClick={() => setIsOpen(true)}>
                    <CreatedAt>{format(parseISO(data[sortBy]), 'H시 m분 s초')}</CreatedAt>
                    <Image url={data.image_url}/>
                    <Title>{data.title}</Title>
                    {data.name && <Name>{data.name}</Name>}
                    <Price>
                        {
                            (
                                parseInt(data.default_shipping_fee) 
                                + parseInt(data.extra_shipping_fee) 
                                + (parseInt(data.price) * data.quantity)
                            ).toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 
                        <PaymentMethod>{data.payment_method === "CASH" ? "💸" : "💳"}</PaymentMethod>
                    </Price>
                    <Financial status={data.financial_status}>{FinancialStatus[data.financial_status].text}</Financial>
                    <Fulfillment status={data.fulfillment_status}>{FulfillmentStatus[data.fulfillment_status].text}</Fulfillment>
                </Wrapper>
                {isOpen && 
                    <Modal onClickClose={() => setIsOpen(false)}>
                        <OrderDetail orderId={data.id}/> 
                    </Modal>
                }
            </>
        )
    }
}

export default Order