import React, { useEffect, useState } from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../constants/color'
import { getOrderDetail } from '../util/api'
import useAsync from '../util/useAsync'
import SkeletonOrderDetail from '../component/data-display/SkeletonOrderDetail';
import Icon from '../component/data-display/Icon';
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
const Step = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: ${COLOR.main};
`
const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: ${COLOR.black};
    margin: 8px 0;
`
const Description = styled.p`
    font-size: 15px;
    color: ${COLOR.gray6};
`
const Card = styled.a`
    padding: 20px;
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    border-radius: 8px;
    margin-bottom: 20px;
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StoreName = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.main};
`
const Para = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4px;
    font-size: 15px;
    color: ${COLOR.black};
    line-height: 1.6;
    flex: 1;
`
const Label = styled.p`
    font-size: 13px;
    color: ${COLOR.gray6};
    margin-bottom: 6px;
`
const StoreWrapper = styled.div`
    flex: 2;
`

function FunnelDetail ({funnelData}) {
    const count = funnelData.count.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return(
        <Wrapper>
            <>
                <Header>
                    <div>
                        <Step>{funnelData.step}</Step>
                        <Title>{funnelData.title}</Title>
                        <Description>전환율: {funnelData.conversionRate ? funnelData.conversionRate + "%" : "-"}</Description>
                    </div>
                    <Title>{count}명</Title>
                </Header>
                <Card href="/" target="_blank" rel="noreferrer">
                    <StoreWrapper>
                        <Label>mnpt.selleree.shop</Label>
                        <StoreName>무니프린팅</StoreName>
                    </StoreWrapper>
                    <Para><Icon size={20} name="tag20" color={COLOR.green}/>3개</Para>
                    <Para><Icon size={20} name="cart20" color={COLOR.yellow}/>8개</Para>
                </Card>
            </>
        </Wrapper>
    )
}

export default FunnelDetail
