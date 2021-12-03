import React from 'react'
import styled from 'styled-components';
import { parseISO, format }from "date-fns";
import { COLOR } from '../../constants/color';

const Wrapper = styled.a`
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    border-radius: 8px;
    padding: 20px;
`
const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Order = styled.p`
    font-size: 15px;
    color: ${COLOR.gray6};
`
const Date = styled.p`
    font-size: 13px;
    color: ${COLOR.gray5};
`
const StoreName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: ${COLOR.main};
    margin-top: 6px;
`

function Shopggu ({data}) {
    return(
        <Wrapper href={`https://${data.store_name}.selleree.shop/`} target="_blank" rel="noreferrer">
            <TitleWrapper>
                <Order>{data.order + 1}번째 발행</Order>
                <Date>{format(parseISO(data.date), 'M월 d일 H시 m분 s초')}</Date>
            </TitleWrapper>
            <StoreName>{data.store_name}</StoreName>
        </Wrapper>
    )
}

export default Shopggu
