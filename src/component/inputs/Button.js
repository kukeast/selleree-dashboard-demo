import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

const Wrapper = styled.button`
    font-size: 15px;
    color: ${COLOR.white};
    background-color: ${COLOR.main};

    padding: 16px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.3s;

    :hover{
        background-color: ${COLOR.main6};
    }
    :active{
        background-color: ${COLOR.main};
    }
`

function Button ({ onClick, children}) {
    return(
        <Wrapper onClick={onClick}>
            {children}
        </Wrapper>
    )
}

export default Button
