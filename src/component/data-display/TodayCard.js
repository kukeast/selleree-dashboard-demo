import React from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'
import Icon from './Icon'

const Card = styled.div`
    flex: 1;
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    box-shadow: 0px 4px 24px 0px #22222215;
    border-radius: 8px;
    padding: 20px 20px 16px;
    cursor: pointer;
    ${props => props.select 
        ? css`border: 2px solid ${COLOR.main};`
        : css`border: 2px solid ${COLOR.white};`
    }
`
const CardTitle = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: ${COLOR.gray5};
    margin-top: 16px;
`
const Count = styled.p`
    font-size: 44px;
    font-weight: 700;
    color: ${COLOR.black};
    margin-top: 4px;
`
const GrowthCountWrapper = styled.span`
    font-size: 16px;
    margin-left: 4px;
    display: inline-flex;
    align-items: center;
    ${props => props.count > 0 
        ? css`color: ${COLOR.red};`
        : props.count < 0
        ? css`color: ${COLOR.blue};`
        : css`color: ${COLOR.gray6};`
    }
`

function GrowthCount ({count}) {
    return(
        <GrowthCountWrapper count={count}>  
            {count > 0
                ? <Icon size="16" color={COLOR.red} name="increase"/>
                : count < 0
                ? <Icon size="16" color={COLOR.blue} name="decrease"/>
                : <Icon size="16" color={COLOR.gray6} name="medium"/>
            }
            <span>{count ? Math.abs(count) : 0}</span>
        </GrowthCountWrapper>
    )
}

function TodayCard ({icon, title, color, count, growthCount, select, onClick}) {
    return(
        <Card select={select} onClick={onClick}>
            <Icon
                size={24}
                color={color}
                name={icon}
            />
            <CardTitle>{title}</CardTitle>
            <Count>
                {count ? count : 0}
                <GrowthCount count={growthCount}/>
            </Count>
        </Card>
    )
}

export default TodayCard
