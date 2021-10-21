import React from 'react'
import styled from 'styled-components';
import FunnelRow from './FunnelRow';
import FunnelHeader from './FunnelHeader';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function FunnelTable ({funnelData}) {
    return(
        <>
            <FunnelHeader/>
            <Wrapper>
                {funnelData.map(data => (
                    <FunnelRow
                        key={data.id}
                        data={data}
                    />
                ))}
            </Wrapper>
        </>
    )
}

export default FunnelTable
