import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns";
import useAsync from '../../util/useAsync';
import styled from 'styled-components';
import Button from '../inputs/Button';
import { getOrders } from '../../util/api';
import Order from './Order';
import OrdersHeader from './OrdersHeader';
import { COLOR } from '../../constants/color';
import TextButton from '../inputs/TextButton';
import SkeletonOrder from './SkeletonOrder';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        min-width: 960px;
    }
    overflow-x: scroll;
`
const SortWrapper = styled.div`
    text-align: center;
`
const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
    > *{
        width: 100%;
    }
`
const DateWrapper = styled.div`
    padding: 8px;
    font-size: 14px;
    color: ${COLOR.gray5};
    text-align: center;
    background-color: ${COLOR.gray1};
    border-radius: 8px;
`

function Orders () {
    const [limit, setLimit] = useState(10)
    const [sortBy, setSortBy] = useState("created_at")
    const [orderList, setOrderList] = useState([])
    const [response] = useAsync(() => getOrders(limit, sortBy),[limit, sortBy])
    
    useEffect(() => {
        if(response.data){
            setOrderList(response.data.data)
        }
    }, [response])

    const skeleton = () => {
        const result = [];
        for (let i = 0; i < 16; i++) {
            result.push(<SkeletonOrder key={i}/>);
        }
        return result;
    };

    const switchOrderSort = () => {
        setOrderList([])
        setSortBy(prev => prev === "created_at" ? "last_modified_at" : "created_at")
    }

    return(
        <>
            <SortWrapper>
                <TextButton icon='sort' onClick={switchOrderSort}>
                    {sortBy === "created_at" ? "최근 생성 순" : "최근 업데이트 순"}
                </TextButton>
            </SortWrapper>
            <Wrapper>
                <OrdersHeader sortBy={sortBy}/>
                {orderList[0] ? orderList.map((order, index) => (
                    <div key={order.id}>
                        {index === 0 
                            ? <DateWrapper>{format(parseISO(orderList[index][sortBy]), 'M월 d일')}</DateWrapper>
                            : format(parseISO(orderList[index-1][sortBy]), 'M월 d일') === format(parseISO(orderList[index][sortBy]), 'M월 d일')
                            ? null
                            : <DateWrapper>{format(parseISO(orderList[index][sortBy]), 'M월 d일')}</DateWrapper>
                        }
                        <Order
                            order={order}
                            sortBy={sortBy}
                        />
                    </div>
                )): skeleton()}
            </Wrapper>
            {orderList.length % 10 === 0 &&
                <ButtonWrapper>
                    <Button onClick={() => setLimit(prev => prev + 10)} isLoading={response.loading}>10개 더 보기</Button>
                </ButtonWrapper>
            }
        </>
    )
}

export default Orders
