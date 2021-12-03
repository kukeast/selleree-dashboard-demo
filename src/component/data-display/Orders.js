import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns"
import useAsync from '../../util/useAsync'
import styled from 'styled-components'
import Button from '../inputs/Button'
import { getOrders } from '../../util/api'
import Order from './Order'
import OrdersHeader from './OrdersHeader'
import { COLOR } from '../../constants/color'
import SkeletonOrder from './SkeletonOrder'
import OrderStack from './OrderStack'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        min-width: 960px;
    }
    overflow-x: scroll;
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

function Orders ({ sortBy, unit }) {
    const [limit, setLimit] = useState(parseInt(unit))
    const [orderList, setOrderList] = useState([])
    const [response] = useAsync(() => getOrders(limit, sortBy),[limit, sortBy])

    useEffect(() => {
        if(response.data){
            var newArr = []
            var items = []
            var stack = {}
            response.data.data.forEach((order, index) => {
                if(response.data.data[index+1] && order.name === response.data.data[index+1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(response.data.data[index+1][sortBy]), 'M월 d일')){
                    items.push(order)
                }else if(response.data.data[index-1] && order.name === response.data.data[index-1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(response.data.data[index-1][sortBy]), 'M월 d일')){
                    items.push(order)
                    stack = {
                        id: order.id,
                        type : "stack",
                        items : items,
                        created_at : order.created_at,
                        last_modified_at : order.last_modified_at,
                    }
                    newArr.push(stack)
                    items = []
                }else{
                    newArr.push(order)
                }
            })
            setOrderList(newArr)
        }
    }, [response, sortBy])

    useEffect(() => {
        setOrderList([])
    }, [sortBy])

    const skeleton = () => {
        const result = []
        for (let i = 0; i < 16; i++) {
            result.push(<SkeletonOrder key={i}/>)
        }
        return result
    }
    return(
        <>
            <Wrapper>
                <OrdersHeader sortBy={sortBy}/>
                {response.loading && orderList.length === 0 ?
                    skeleton() :
                    orderList.map((order, index) => (
                        <div key={order.id}>
                            {index === 0 
                                ? <DateWrapper>{format(parseISO(orderList[index][sortBy]), 'M월 d일')}</DateWrapper>
                                : format(parseISO(orderList[index-1][sortBy]), 'M월 d일') === format(parseISO(orderList[index][sortBy]), 'M월 d일')
                                ? null
                                : <DateWrapper>{format(parseISO(orderList[index][sortBy]), 'M월 d일')}</DateWrapper>
                            }
                            {order.type === "stack"
                                ? <OrderStack orders={order.items} sortBy={sortBy}/>
                                : <Order
                                    data={order}
                                    sortBy={sortBy}
                                />
                            }
                        </div>
                    ))
                }
            </Wrapper>
            <ButtonWrapper>
                <Button type="mono" onClick={() => setLimit(prev => prev + parseInt(unit))} isLoading={response.loading}>{unit}개 더 보기</Button>
            </ButtonWrapper>
        </>
    )
}

Orders.defaultProps = {
    sortBy: "created_at",
    unit: 20,
}

export default Orders
