import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Skeleton from './Skeleton'

const Wrapper = styled.div`
    width: 640px;
    margin: auto;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 30px;
`
const Card = styled.div`
    padding: 20px;
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    border-radius: 8px;
    margin-bottom: 20px;
`
const ItemCard = styled(Card)`
    display: flex;
    align-items: center;

`
const ItemName = styled.div`
    flex: 3;
`
const Price = styled.div`
    flex: 1;
    text-align: right;
`
const CardInfo = styled.div`
    display: inline-block;
    width: 50%;
    margin-top: 20px;
    vertical-align: top;
`
function SkeletonCard () {
    return(
        <Card>
            <Skeleton 
                style={{
                    width: "120px",
                    height: "24px",
                    borderRadius: "4px",
                }}
            />
            <CardInfo>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "17px",
                        borderRadius: "4px",
                        marginBottom: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "180px",
                        height: "24px",
                        borderRadius: "4px",
                    }}
                />
            </CardInfo>
            <CardInfo>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "17px",
                        borderRadius: "4px",
                        marginBottom: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "140px",
                        height: "24px",
                        borderRadius: "4px",
                    }}
                />
            </CardInfo>
            <CardInfo>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "17px",
                        borderRadius: "4px",
                        marginBottom: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "100px",
                        height: "24px",
                        borderRadius: "4px",
                    }}
                />
            </CardInfo>
            <CardInfo>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "17px",
                        borderRadius: "4px",
                        marginBottom: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "190px",
                        height: "24px",
                        borderRadius: "4px",
                    }}
                />
            </CardInfo>
        </Card>
    )
}

function SkeletonOrderDetail () {
    return(
        <Wrapper>
            <Header>
                <div>
                    <Skeleton 
                        style={{
                            width: "60px",
                            height: "19px",
                            borderRadius: "4px",
                        }}
                    />
                    <Skeleton 
                        style={{
                            width: "150px",
                            height: "25px",
                            borderRadius: "4px",
                            margin: "8px 0",
                        }}
                    />
                    <Skeleton 
                        style={{
                            width: "80px",
                            height: "19px",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <Skeleton 
                    style={{
                        width: "150px",
                        height: "25px",
                        borderRadius: "4px",
                        margin: "8px 0",
                    }}
                />
            </Header>
            <ItemCard>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        marginRight: "16px",
                    }}
                />
                <ItemName>
                    <Skeleton 
                        style={{
                            width: "100px",
                            height: "21px",
                            borderRadius: "4px",
                        }}
                    />
                </ItemName>
                <Skeleton 
                    style={{
                        width: "20px",
                        height: "21px",
                        borderRadius: "4px",
                    }}
                />
                <Price>
                    <Skeleton 
                        style={{
                            width: "60px",
                            height: "21px",
                            borderRadius: "4px",
                            display: "inline-block",
                        }}
                    />
                </Price>
            </ItemCard>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </Wrapper>
    )
}

export default SkeletonOrderDetail
