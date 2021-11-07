import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components';
import Title from '../component/data-display/Title';
import Container from '../component/layout/Container';
import Tabs from '../component/navigation/Tabs';
import { COLOR } from '../constants/color';
const tabs = [
    {
        id : 1,
        title : "대시보드",
        path : "/"
    },
    {
        id : 2,
        title : "상품",
        path : "/products"
    },
    {
        id : 3,
        title : "주문",
        path : "/orders"
    },
    {
        id : 4,
        title : "판매자 퍼널",
        path : "/funnel"
    },
]

const HeaderWrapper = styled.div`
    ${props => props.scrollPosition >= 76 
    ? css`
        position: fixed;
        top: -76px;
        box-shadow: ${COLOR.shadow};
        border: none;
    `: css`
        position: absolute;
        top: 0;
        box-shadow: none;
        border-bottom: 1px solid ${COLOR.gray2};
    `}
    width: 100%;
    background-color: ${COLOR.backgroundColor};
    z-index: 99;
`

function Header () {
    const [scrollPosition, setScrollPosition] = useState(0)
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll)
    })
    return(
        <HeaderWrapper scrollPosition={scrollPosition}>
            <Container>
                <Title
                    iconSrc="../../images/ic24-chart-line.svg"
                />
                <Tabs tabs={tabs}/>
            </Container>
        </HeaderWrapper>
    )
}

export default Header
