import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

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

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    height: 20px;
`

const LoadingDiv = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${COLOR.white};
    border-radius: 10px;
    transform: scale(0.8);
    opacity: 0.5;
    animation-duration: 0.5s;
    animation-name: Scale;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
    @keyframes Scale {
        to {
            transform: scale(1);
            opacity: 1;
        }
    }    
    :nth-child(2){
        animation-delay: 0.2s;
    }
    :nth-child(3){
        animation-delay: 0.4s;
    }
`

function Button ({ isLoading, onClick, children}) {
    return(
        <Wrapper onClick={!isLoading && onClick}>
            {isLoading 
                ? <LoadingWrapper>
                    <LoadingDiv/>
                    <LoadingDiv/>
                    <LoadingDiv/>
                </LoadingWrapper> 
                :children
            }
        </Wrapper>
    )
}

export default Button
