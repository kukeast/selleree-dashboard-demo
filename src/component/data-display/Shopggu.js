import React from 'react'
import styled from 'styled-components';
import { parseISO, format }from "date-fns";
import { COLOR } from '../../constants/color';
import Card from './Card';
import Skeleton from './Skeleton';

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Order = styled.p`
    font-size: 13px;
    color: ${COLOR.gray6};
`
const Date = styled.p`
    font-size: 13px;
    color: ${COLOR.gray5};
`
const StoreName = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.main};
    margin-top: 4px;
`

function Shopggu ({ data, isLoading }) {
    if(isLoading){
        return (
            <Card>
                <TitleWrapper>
                    <Skeleton width={60} height={19}/>
                    <Skeleton width={80} height={16}/>
                </TitleWrapper>
                <StoreName>
                    <Skeleton width={180} height={25}/>
                </StoreName>
            </Card>
        )
    }else{
        return(
            <Card onClick={() => window.open(`https://${data.store_name}.selleree.shop/`, "_blank")}>
                <TitleWrapper>
                    <Order>{data.order + 1}번째 발행</Order>
                    <Date>{format(parseISO(data.date), 'M월 d일 H시 m분')}</Date>
                </TitleWrapper>
                <StoreName>{data.store_name}</StoreName>
            </Card>
        )
    }
}

export default Shopggu
