import React from 'react'
import styled from 'styled-components'
import '../../App.scss'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    background-color: ${COLOR.white};
    min-width: 1140px;
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
    &.bottom-line{
        border-bottom: 1px solid ${COLOR.gray2};
    }
    &:last-child{
        margin-bottom: 80px;
    }
`
const Con = styled.div`
    width: 1200px;
    padding: 0 40px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto; 
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
