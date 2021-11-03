import React from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Button from '../inputs/Button';
import Icon from './Icon';

const Wrapper = styled.div`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    margin: 10px 0;
    padding: 10px 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
    cursor: pointer;
`
const Image = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
    margin-right: 16px;
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
        <>
            <Wrapper onClick={onClick}>
                <CreatedAt>{format(parseISO(order[sortBy]), 'H시 m분 s초')}</CreatedAt>
                <Image style={backgroundImage}/>
                <Title>{order.title}</Title>
                <Name>{order.name}</Name>
                <More>
                    <Button 
                        onClick={onClick} 
                        type="secondary"
                        size="small"
                    >
                        {length}개 펼치기
                        <Icon name="arrow_down" color={COLOR.main} size={16}/>
                    </Button>
                </More>
            </Wrapper>
        </>
    )
}

export default OrderExpand