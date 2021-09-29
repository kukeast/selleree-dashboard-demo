import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import useAsync from '../../hooks/useAsync';
import Shopggu from './Shopggu'
import { getShopggu } from '../../hooks/api';



const Wrapper = styled.div`
    display: flex;  
    flex-direction: column;
    vertical-align: top;
    gap: 16px;
`

function Shopggus ({repatch}) {
    const [shopgguList, setShopgguList] = useState([])
    const [shopggus, repatchShopggus] = useAsync(() => getShopggu())

    useEffect(() => {
        if(shopggus.data){
            setShopgguList(shopggus.data.data)
        }
    }, [shopggus])

    useEffect(() => {
        repatchShopggus()
        // eslint-disable-next-line
    }, [repatch])

    return(
        <Wrapper>
            {shopgguList.map((shopggu) => (
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
