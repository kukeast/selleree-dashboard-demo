import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Skeleton from './Skeleton'

const Wrapper = styled.div`
    display: flex;
    background-color: ${COLOR.white};
    margin: 4px 0;
    padding: 16px;
    align-items: center;
`
const Step = styled.div`
    flex: 1;
`
const Title = styled.div`
    flex: 2;
    `
const Rate = styled.div`
    flex: 1;
    text-align: center;
`
const Count = styled.div`
    flex: 1;
    text-align: right;
`

function SkeletonFunnelRow () {
    return(
        <Wrapper>
            <Step>
                <Skeleton 
                    style={{
                        width: "40px",
                        height: "19px",
                        borderRadius: "4px",
                    }}
                /> 
            </Step>
            <Title>
                <Skeleton 
                    style={{
                        width: "130px",
                        height: "19px",
                        borderRadius: "4px",
                    }}
                /> 
            </Title>
            <Rate>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "19px",
                        borderRadius: "4px",
                        margin: "auto",
                    }}
                /> 
            </Rate>
            <Rate>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "19px",
                        borderRadius: "4px",
                        margin: "auto",
                    }}
                /> 
            </Rate>
            <Rate>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "19px",
                        borderRadius: "4px",
                        margin: "auto",
                    }}
                /> 
            </Rate>
            <Rate>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "19px",
                        borderRadius: "4px",
                        margin: "auto",
                    }}
                /> 
            </Rate>
            <Count>
                <Skeleton 
                    style={{
                        width: "100px",
                        height: "19px",
                        borderRadius: "4px",
                        float: "right",
                    }}
                /> 
            </Count>
        </Wrapper>
    )
}

export default SkeletonFunnelRow