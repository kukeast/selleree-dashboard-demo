import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

const Wrapper = styled.button`
    font-size: 14px;
    color: ${COLOR.black};
    background-color: ${COLOR.gray1};

    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    :hover{
        background-color: ${COLOR.gray2};
    }
    :active{
        background-color: ${COLOR.gray1};
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
