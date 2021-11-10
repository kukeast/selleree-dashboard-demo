import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Skeleton from './Skeleton'

const Wrapper = styled.div`
    width: 640px;
    margin: auto;
`
const Card = styled.div`
    padding: 20px;
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StoreWrapper = styled.div`
    flex: 2;
`
const Para = styled.div`
    flex: 1;
`
function SkeletonCard () {
    return(
        <Card>
            <StoreWrapper>
                <Skeleton 
                    style={{
                        width: "140px",
                        height: "17px",
                        borderRadius: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "100px",
                        height: "22px",
                        marginTop: "6px",
                        borderRadius: "4px",
                    }}
                />
            </StoreWrapper>
            <Para>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "24px",
                        borderRadius: "4px",
                        float: "right",
                    }}
                />
            </Para>
            <Para>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "24px",
                        borderRadius: "4px",
                        float: "right",
                    }}
                />
            </Para>
        </Card>
    )
}

function SkeletonSellers () {
    return(
        <Wrapper>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </Wrapper>
    )
}

export default SkeletonSellers
