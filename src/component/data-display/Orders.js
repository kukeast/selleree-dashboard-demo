import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns";
import useAsync from '../../hooks/useAsync';
import styled from 'styled-components';
import Button from '../inputs/Button';
import { getOrders } from '../../hooks/api';
import Order from './Order';
import OrdersHeader from './OrdersHeader';
import { COLOR } from '../../constants/color';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    *{
        width: 100%;
    }
`
const DateWrapper = styled.div`
    padding: 8px;
    font-size: 14px;
    color: ${COLOR.gray6};
    text-align: center;
    background-color: ${COLOR.gray2};
    border-radius: 8px;
`

function Orders () {
    const [limit, setLimit] = useState(10)
    const [orderList, setOrderList] = useState([])
    const [orders] = useAsync(() => getOrders(limit),[limit])
    
    useEffect(() => {
        if(orders.data){
            setOrderList(orders.data.data)
        }
    }, [orders])

    return(
        <>
            <OrdersHeader/>
            <Wrapper>
                {orderList.map((order, index) => (
                    <div key={order.id}>
                        {index === 0 
                            ? <DateWrapper>{format(parseISO(orderList[index].created_at), 'M월 d일')}</DateWrapper>
                            : format(parseISO(orderList[index-1].created_at), 'M월 d일') === format(parseISO(orderList[index].created_at), 'M월 d일')
                            ? null
                            : <DateWrapper>{format(parseISO(orderList[index].created_at), 'M월 d일')}</DateWrapper>
                        }
                        <Order
                            order={order}
                        />
                    </div>
                ))}
            </Wrapper>
            <ButtonWrapper>
                <Button onClick={() => setLimit(prev => prev + 10)}>더 보기</Button>
            </ButtonWrapper>
        </>
    )
}

export default Orders
