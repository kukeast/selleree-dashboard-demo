import React from 'react'
import styled from 'styled-components'
import Skeleton from './Skeleton';

const Wrapper = styled.div`
    display: flex;
    margin: 10px 0;
    padding: 10px 16px;
    align-items: center;
`

const CreatedAt = styled.div`
    flex: 1.5;
`
const Price = styled.div`
    flex: 1;
    text-align: right;
`
const Title = styled.div`
    flex: 4;
`
const Name = styled.div`
    flex: 1.5;
`
const Financial = styled.div`
    text-align: right;
    flex: 1;
    font-weight: bold;
`
const Fulfillment = styled.div`
    text-align: right;
    flex: 1;
    font-weight: bold;
`

function SkeletonOrder () {
    return(
        <Wrapper>
            <CreatedAt>
                <Skeleton 
                    style={{
                        width: "100px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </CreatedAt>
            <Skeleton 
                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    marginRight: "16px",
                }}
            />
            <Title>
                <Skeleton 
                    style={{
                        width: "260px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </Title>
            <Name>
                <Skeleton 
                    style={{
                        width: "100px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </Name>
            <Price>
                <Skeleton 
                    style={{
                        float: "right",
                        width: "80px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </Price>
            <Financial>
                <Skeleton 
                    style={{
                        float: "right",
                        width: "80px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </Financial>
            <Fulfillment>
                <Skeleton 
                    style={{
                        float: "right",
                        width: "80px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
            </Fulfillment>
        </Wrapper>
    )
}

export default SkeletonOrder