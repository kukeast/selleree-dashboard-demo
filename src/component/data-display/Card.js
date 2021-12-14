import React from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    &:hover{
        ${ props => props.onClick && css`
            transform: translateY(-2px);
            cursor: pointer;
            box-shadow: ${COLOR.shadow};
        `}
    }
    transition: 0.2s;
    background-color: ${COLOR.card};
    /* box-shadow: ${COLOR.shadow}; */
    border: 1px solid ${COLOR.gray2};
    border-radius: 8px;
    padding: 20px;
`

function Card ({ className, children, onClick }) {
    return(
        <Wrapper className={className} onClick={onClick}>
            {children}
        </Wrapper>
    )
}

export default Card
