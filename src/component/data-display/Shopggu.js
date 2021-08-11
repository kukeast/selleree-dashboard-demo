import React from 'react'

function Shopggu ({href, storeName, order, date}) {
    return(
        <a className="Shopggu" href={href} target="_blank" rel="noreferrer">
            <div>
                <p className="order">{order + 1}번째 발행</p>
                <p className="date">{date}</p>
            </div>
            <p className="store">{storeName}</p>
        </a>
    )
}

export default Shopggu
