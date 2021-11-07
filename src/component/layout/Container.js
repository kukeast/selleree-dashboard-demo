import React from 'react'
import styled from 'styled-components'
import '../../App.scss'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    background-color: ${COLOR.white};
    &.setting-date > div{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
    &.mt20{
        margin-top: 20px;
    }
    &.mt30{
        margin-top: 30px;
    }
    &.pt30{
        padding-top: 30px;
    }
`
const Con = styled.div`
    max-width: 1200px;
    padding: 0 40px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto; 
    @media screen and (max-width: 425px) {
        padding: 0 20px;
    }
`


function Container ({children, className}) {
    return(
        <Wrapper className={className}>
            <Con>
                {children}
            </Con>
        </Wrapper>
    )
}

export default Container
