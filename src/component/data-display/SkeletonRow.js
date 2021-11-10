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
const Flex1 = styled.div`
    flex: 1;
`
const Flex2 = styled.div`
    flex: 2;
`
const Flex1Right = styled(Flex1)`
    text-align: right;
`
const Flex1Center = styled(Flex1)`
    text-align: center;
`

function SkeletonRow ({type}) {
    return(
        <Wrapper>
            {type === "seller-funnel" &&
                <>
                    <Flex1>
                        <Skeleton 
                            style={{
                                width: "40px",
                                height: "19px",
                                borderRadius: "4px",
                            }}
                        /> 
                    </Flex1>
                    <Flex2>
                        <Skeleton 
                            style={{
                                width: "130px",
                                height: "19px",
                                borderRadius: "4px",
                            }}
                        /> 
                    </Flex2>
                    <Flex1Center>
                        <Skeleton 
                            style={{
                                width: "60px",
                                height: "19px",
                                borderRadius: "4px",
                                margin: "auto",
                            }}
                        /> 
                    </Flex1Center>
                    <Flex1Center>
                        <Skeleton 
                            style={{
                                width: "60px",
                                height: "19px",
                                borderRadius: "4px",
                                margin: "auto",
                            }}
                        /> 
                    </Flex1Center>
                    <Flex1Center>
                        <Skeleton 
                            style={{
                                width: "60px",
                                height: "19px",
                                borderRadius: "4px",
                                margin: "auto",
                            }}
                        /> 
                    </Flex1Center>
                    <Flex1Center>
                        <Skeleton 
                            style={{
                                width: "60px",
                                height: "19px",
                                borderRadius: "4px",
                                margin: "auto",
                            }}
                        /> 
                    </Flex1Center>
                    <Flex1Right>
                        <Skeleton 
                            style={{
                                width: "100px",
                                height: "19px",
                                borderRadius: "4px",
                                float: "right",
                            }}
                        /> 
                    </Flex1Right>
                </>
            }
            {type === "payment-setting" &&
                <>
                    <Flex2>
                        <Skeleton 
                            style={{
                                width: "130px",
                                height: "19px",
                                borderRadius: "4px",
                            }}
                        /> 
                    </Flex2>
                    <Flex1Right>
                        <Skeleton 
                            style={{
                                width: "100px",
                                height: "19px",
                                borderRadius: "4px",
                                float: "right",
                            }}
                        /> 
                    </Flex1Right>
                    <Flex1Right>
                        <Skeleton 
                            style={{
                                width: "100px",
                                height: "19px",
                                borderRadius: "4px",
                                float: "right",
                            }}
                        /> 
                    </Flex1Right>
                </>
            }
        </Wrapper>
    )
}

export default SkeletonRow