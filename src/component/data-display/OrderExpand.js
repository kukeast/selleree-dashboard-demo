import React from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Button from '../inputs/Button';
import Icon from './Icon';
const Wrapper = styled.div`
    &:hover{
        > div:nth-child(2), > div:nth-child(3){
            height: 10px;
            opacity: 1;
        }
        > div:nth-child(1){
            background-color: ${COLOR.gray1};
        }
    }
    margin: 10px 0;
    cursor: s-resize;
`

const OrderWrapper = styled.div`
    position: relative;
    display: flex;
    border-radius: 8px;
    transition: 0.2s;
    background-color: ${COLOR.white};
    padding: 10px 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
`
const Card1 = styled.div`
    background-color: ${COLOR.gray2};
    height: 0px;
    transition: 0.3s;
    border-radius: 0 0 8px 8px;
    margin: 0 15px;
    opacity: 0;
`
const Card2 = styled(Card1)`
    background-color: ${COLOR.gray3};
    margin: 0 30px;
`
const Image = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
    margin-right: 16px;
    border: 1px solid ${COLOR.gray2};
`
const CreatedAt = styled.div`
    flex: 1.5;
`
const Title = styled.div`
    flex: 4;
`
const Name = styled.div`
    flex: 2.5;
`
const More = styled.div`
    text-align: right;
    flex: 2;
`

function OrderExpand ({order, sortBy, length, onClick}) {
    var backgroundImage = {
        backgroundImage: "url(" + order.image_url + "?w=300)"
    }
    return(
        <Wrapper onClick={onClick}>
            <OrderWrapper>
                <CreatedAt>{format(parseISO(order[sortBy]), 'H시 m분 s초')}</CreatedAt>
                <Image style={backgroundImage}/>
                <Title>{order.title}</Title>
                <Name>{order.name}</Name>
                <More>
                    <Button type="secondary" shape="pill">
                        {length}개
                        <Icon name="arrow_down" color={COLOR.main} size={16}/>
                    </Button>
                </More>
            </OrderWrapper>
            <Card1/>
            {length > 2 && <Card2/>}
            
        </Wrapper>
    )
}

export default OrderExpand