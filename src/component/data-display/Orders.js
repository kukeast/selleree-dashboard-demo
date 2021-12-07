import React from 'react'
import { parseISO, format }from "date-fns"
import styled from 'styled-components'
import Order from './Order'
import OrdersHeader from './OrdersHeader'
import { COLOR } from '../../constants/color'
import OrderStack from './OrderStack'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        min-width: 960px;
    }
    overflow-x: scroll;
`
const DateWrapper = styled.div`
    padding: 8px;
    font-size: 14px;
    color: ${COLOR.gray5};
    text-align: center;
    background-color: ${COLOR.gray1};
    border-radius: 8px;
`

function Orders ({ sortBy, data, isLoading }) {
    const skeleton = () => {
        const result = []
        for (let i = 0; i < 20; i++) {
            result.push(<Order isLoading key={i}/>)
        }
        return result
    }
    return(
        <Wrapper>
            <OrdersHeader sortBy={sortBy} storeName/>
            {isLoading && data.length === 0 ?
                skeleton() :
                data.map((order, index) => (
                    <div key={order.id}>
                        {index === 0 
                            ? <DateWrapper>{format(parseISO(data[index][sortBy]), 'M월 d일')}</DateWrapper>
                            : format(parseISO(data[index-1][sortBy]), 'M월 d일') === format(parseISO(data[index][sortBy]), 'M월 d일')
                            ? null
                            : <DateWrapper>{format(parseISO(data[index][sortBy]), 'M월 d일')}</DateWrapper>
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
    )
}

Orders.defaultProps = {
    sortBy: "created_at",
    data: [],
    isLoading: false,
}

export default Orders
