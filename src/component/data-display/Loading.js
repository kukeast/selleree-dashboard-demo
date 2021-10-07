import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    height: 20px;
    > div{
        background-color: ${props => props.color};
    }
`

const Bullet = styled.div`
    width: 8px;
    height: 8px;
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

function Loading ({color}) {
    return(
        <Wrapper color={color}>
            <Bullet/>
            <Bullet/>
            <Bullet/>
        </Wrapper>
    )
}

export default Loading
