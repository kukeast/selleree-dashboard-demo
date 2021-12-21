import React, { useState } from 'react'
import styled from 'styled-components';
import Icon from '../component/data-display/Icon';
import Tabs from '../component/navigation/Tabs';
import { COLOR } from '../constants/color';
import Search from './Search';
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
    @media screen and (max-width: 1024px) {
        width: 160px;
    }
    @media screen and (max-width: 768px) {
        border-top: 1px solid ${COLOR.gray2};
        border-right: none;
        top: initial;
        width: 100%;
    }
`
const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 0 10px;
    margin: 16px 0;
    @media screen and (max-width: 768px) {
        display: none;
    }
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
const SearchIcon = styled.div`
    display: flex;
    padding: 6px;
    border-radius: 8px;
    background-color: ${COLOR.gray1};
    transition: 0.3s;
    &:hover{
        background-color: ${COLOR.gray2};
    }
    cursor: pointer;
`
function Header () {
    const [searching, setSearching] = useState(false)
    const closeSearching = () => {
        setSearching(false)
    }
    return(
        <>
            <HeaderWrapper>
                <TitleWrapper>
                    <div>
                        <Title>마요네즈</Title>
                        <Description>셀러리 모니터링</Description>
                    </div>
                    <SearchIcon onClick={() => setSearching(true)}>
                        <Icon name="search20" size={20} color={COLOR.gray6}/>
                    </SearchIcon>
                </TitleWrapper>
                <Tabs tabs={tabs}/>
            </HeaderWrapper>
            {searching && <Search callback={closeSearching}/>}
        </>
    )
}

export default Header
