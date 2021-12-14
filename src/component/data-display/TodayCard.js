import React from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'
import Icon from './Icon'
import Card from './Card'

const CardWrapper = styled(Card)`
    flex: 1;
    ${props => props.select 
        && css`border: 1px solid ${props => props.color};`
    }
`
const CardTitle = styled.p`
    font-size: 13px;
    font-weight: 400;
    color: ${COLOR.gray5};
    margin-top: 16px;
`
const Count = styled.p`
    font-size: 40px;
    line-height: 1;
    font-weight: 600;
    color: ${COLOR.black};
    margin-top: 12px;
`
const GrowthCountWrapper = styled.span`
    font-size: 15px;
    margin-left: 2px;
    display: inline-flex;
    align-items: center;
    ${props => props.count > 0 
        ? css`color: ${COLOR.red};`
        : props.count < 0
        ? css`color: ${COLOR.blue};`
        : css`color: ${COLOR.gray5};`
    }
`

function GrowthCount ({count}) {
    return(
        <GrowthCountWrapper count={count}>  
            {count > 0
                ? <Icon size="16" color={COLOR.red} name="increase"/>
                : count < 0
                ? <Icon size="16" color={COLOR.blue} name="decrease"/>
                : <Icon size="16" color={COLOR.gray5} name="medium"/>
            }
            <span>{count ? Math.abs(count) : 0}</span>
        </GrowthCountWrapper>
    )
}

function TodayCard ({icon, title, color, count, growthCount, select, onClick}) {
    return(
        <CardWrapper select={select} onClick={onClick} color={color}>
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
        </CardWrapper>
    )
}

export default TodayCard
