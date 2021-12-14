import React from 'react'
import styled from 'styled-components';
import Tabs from '../component/navigation/Tabs';
import { COLOR } from '../constants/color';
const tabs = [
    {
        id : 1,
        title : "대시보드",
        icon: "dashboard16",
        color: COLOR.main,
        path : "/"
    },
    {
        id : 2,
        title : "상품",
        icon: "tag16",
        color: COLOR.green,
        path : "/products"
    },
    {
        id : 3,
        title : "주문",
        icon: "cart16",
        color: COLOR.yellow,
        path : "/orders"
    },
    {
        id : 4,
        title : "판매자 퍼널",
        icon: "filter16",
        color: COLOR.blue,
        path : "/funnel"
    },
    {
        id : 5,
        title : "결제 설정 현황",
        icon: "card16",
        color: COLOR.red,
        path : "/payment-setting"
    },
]

const HeaderWrapper = styled.div`
    position: fixed;
    padding: 10px;
    top: 0;
    bottom: 0;
    left: 0;
    border-right: 1px solid ${COLOR.gray2};
    box-sizing: border-box;
    width: 220px;
    background-color: ${COLOR.backgroundColor};
    z-index: 9;
`
const TitleWrapper = styled.div`
    padding: 0 10px;
    margin: 16px 0;
`
const Title = styled.p`
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    color: ${COLOR.black};
`
const Description = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: ${COLOR.gray5};
`
function Header () {
    return(
        <HeaderWrapper>
            <TitleWrapper>
                <Title>마요네즈</Title>
                <Description>셀러리 모니터링</Description>
            </TitleWrapper>
            <Tabs tabs={tabs}/>
        </HeaderWrapper>
    )
}

export default Header
