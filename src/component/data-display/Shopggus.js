import React from 'react'
import Shopggu from './Shopggu'

function Shopggus ({shopggusData}) {
    
    return(
        <div className="Shopggus">
            {shopggusData.map((shopggu, index) => (
                <Shopggu
                    key={index}
                    href= {"https://" + shopggu["store-name"] + ".selleree.shop/"}
                    storeName={shopggu['store-name']}
                    order={shopggu['order']}
                    date={shopggu['date']}
                />
            ))}
        </div>
    )
}

export default Shopggus
