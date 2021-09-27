import React from 'react'
import Shopggu from './Shopggu'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;  
    flex-direction: column;
    vertical-align: top;
    gap: 16px;
`

function Shopggus ({shopggusData}) {
    return(
        <Wrapper>
            {shopggusData.map((shopggu) => (
                <Shopggu
                    key={shopggu['store-name']+shopggu['order']}
                    href= {"https://" + shopggu["store-name"] + ".selleree.shop/"}
                    storeName={shopggu['store-name']}
                    order={shopggu['order']}
                    date={shopggu['date']}
                />
            ))}
        </Wrapper>
    )
}

export default Shopggus
