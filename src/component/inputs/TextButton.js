import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import { ICON } from '../../constants/icon';

const Wrapper = styled.button`
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
    color: ${COLOR.main};
    font-weight: bold;
    background-color: ${COLOR.white};
    line-height: 20px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    :hover{
        background-color: ${COLOR.main2};
    }
    :active{
        background-color: ${COLOR.main3};
    }
`

function TextButton ({ onClick, icon,  children }) {
    return(
        <Wrapper onClick={onClick}>
            {icon && ICON[icon]}
            {children}
        </Wrapper>
    )
}

export default TextButton
