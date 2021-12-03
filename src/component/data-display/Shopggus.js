import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import useAsync from '../../util/useAsync'
import Shopggu from './Shopggu'
import { getShopggu } from '../../util/api'
import SkeletonShopggu from './SkeletonShopggu'

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
        const result = []
        for (let i = 0; i < 16; i++) {
            result.push(<SkeletonShopggu key={i}/>)
        }
        return result
    }

    return(
        <Wrapper>
            {response.loading ? 
                skeleton() :
                shopgguList.map((shopggu) => (
                    <Shopggu
                        key={shopggu.store_name + shopggu.order}
                        data={shopggu}
                    />
                ))
            }
        </Wrapper>
    )
}

export default Shopggus
