import React from 'react'
import styled from 'styled-components';
import Row from './Row';
import TableHeader from './TableHeader';
import SkeletonRow from './SkeletonRow';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function Table ({data, isLoading, dateRange, type}) {
    return(
        <div>
            <TableHeader type={type}/>
            <Wrapper>
                {!isLoading ? data.map(row => (
                    <Row
                        type={type}
                        key={row.id}
                        data={row}
                        dateRange={dateRange}
                    />
                )): 
                    <>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                        <SkeletonRow type={type}/>
                    </>
                }
            </Wrapper>
        </div>
    )
}

export default Table
