import React from 'react'
import styled from 'styled-components';
import FunnelRow from './FunnelRow';
import FunnelHeader from './FunnelHeader';
import SkeletonFunnelRow from './SkeletonFunnelRow';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function FunnelTable ({funnelData, isLoading, dateRange}) {
    return(
        <>
            <FunnelHeader/>
            <Wrapper>
                {!isLoading ? funnelData.map(data => (
                    <FunnelRow
                        key={data.id}
                        data={data}
                        dateRange={dateRange}
                    />
                )): 
                    <>
                        <SkeletonFunnelRow/>
                        <SkeletonFunnelRow/>
                        <SkeletonFunnelRow/>
                        <SkeletonFunnelRow/>
                        <SkeletonFunnelRow/>
                        <SkeletonFunnelRow/>
                    </>
                }
            </Wrapper>
        </>
    )
}

export default FunnelTable
