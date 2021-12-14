import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Icon from './Icon'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 24px 0 24px;
`
const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const H1 = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: ${COLOR.black};
`
const IconWrapper = styled.div`
    display: flex;
    padding: 8px;
    border-radius: 8px;
    background-color: ${props => props.color}1a;
`
function Title ({title, icon, color, children}) {
    
    return(
        <Wrapper>
            <Left>
                <IconWrapper color={color}>
                    <Icon name={icon} color={color} size={16}/>
                </IconWrapper>
                <H1>{title}</H1>
            </Left>
            <Right>
                {children}
            </Right>
        </Wrapper>
    )
}

Title.defaultProps = {
    title : "마요네즈",
    subtitle : "동국이의 두번째 작업"
}


export default Title
