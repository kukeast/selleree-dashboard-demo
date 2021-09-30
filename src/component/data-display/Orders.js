import React, { useState, useEffect } from 'react'
import useAsync from '../../hooks/useAsync';
import styled from 'styled-components';
import Button from '../inputs/Button';
import { getOrders } from '../../hooks/api';
import Order from './Order';
import OrdersHeader from './OrdersHeader';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonWrapper = styled.div`
    text-align: center;
    *{
        width: 100%;
    }
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
                {orderList.map((order) => (
                    <Order
                        key={order.id}
                        order={order}
                    />
                ))}
            </Wrapper>
            <ButtonWrapper>
                <Button onClick={() => setLimit(prev => prev + 10)}>더 보기</Button>
            </ButtonWrapper>
        </>
    )
}

export default Orders
