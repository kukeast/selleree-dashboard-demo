import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import useAsync from '../../util/useAsync';
import Shopggu from './Shopggu'
import { getShopggu } from '../../util/api';
import SkeletonShopggu from './SkeletonShopggu';

const Wrapper = styled.div`
    display: flex;  
    flex-direction: column;
    vertical-align: top;
    gap: 16px;
`

function Shopggus ({ repatch }) {
    const [shopgguList, setShopgguList] = useState([])
    const [response] = useAsync(() => getShopggu(), [repatch])

    useEffect(() => {
        if(response.data){
            setShopgguList(response.data.data)
        }
    }, [response])

    const skeleton = () => {
        const result = [];
        for (let i = 0; i < 16; i++) {
            result.push(<SkeletonShopggu key={i}/>);
        }
        return result;
    }

    return(
        <Wrapper>
            {shopgguList[0] ? shopgguList.map((shopggu) => (
                <Shopggu
                    key={shopggu['store-name']+shopggu['order']}
                    href= {`https://${shopggu["store-name"]}.selleree.shop/`}
                    storeName={shopggu['store-name']}
                    order={shopggu['order']}
                    date={shopggu['date']}
                />
            )): skeleton()}
        </Wrapper>
    )
}

export default Shopggus
