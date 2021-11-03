import React, { useState } from 'react'
import Order from './Order'
import OrderExpand from './OrderExpand'

function OrderStack ( {orders, sortBy} ) {
    const [isExpand, setIsExpand] = useState(false)
    return(
        <>
            {isExpand ?
                orders.map(order => (
                    <Order
                        key={order.id}
                        order={order}
                        sortBy={sortBy}
                    />
                )):
                <OrderExpand
                    key={orders[0].id}
                    order={orders[0]}
                    length={orders.length}
                    sortBy={sortBy}
                    onClick={() => setIsExpand(true)}
                />
            }
        </>
    )
}

export default OrderStack
