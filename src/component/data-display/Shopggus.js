import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Shopggu from './Shopggu'
import { shopgguMockData } from '../../util/mockData'

const Wrapper = styled.div`
    display: flex;  
    flex-direction: column;
    vertical-align: top;
    gap: 16px;
`

function Shopggus ({ repatch }) {
    const [isLoading, setIsLoading] = useState(true)
    const [shopgguList] = useState(shopgguMockData)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500);
    }, [repatch])
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    const skeleton = () => {
        const result = []
        for (let i = 0; i < 16; i++) {
            result.push(<Shopggu isLoading key={i}/>)
        }
        return result
    }

    return(
        <Wrapper>
            {isLoading ? 
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
