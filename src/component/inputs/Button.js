import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Loading from '../data-display/Loading';

const Wrapper = styled.button`
    font-size: 15px;
    color: ${COLOR.white};
    background-color: ${COLOR.main};
    line-height: 20px;
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

function Button ({ isLoading, onClick, children}) {
    return(
        <Wrapper onClick={!isLoading ? onClick : null}>
            {isLoading 
                ? <Loading color={COLOR.white}/>
                :children
            }
        </Wrapper>
    )
}

export default Button
