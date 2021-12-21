import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => props.size === 'small' ? 
        css`
            gap: 3px;
            > div{
                background-color: ${props => props.color};
                width: 6px;
                height: 6px;
            }
        ` :
        css`
            gap: 6px;
            > div{
                background-color: ${props => props.color};
                width: 8px;
                height: 8px;
            }
        `
    }
    height: 24px;
`

const Bullet = styled.div`
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

function Loading ({ color, size }) {
    return(
        <Wrapper color={color} size={size}>
            <Bullet/>
            <Bullet/>
            <Bullet/>
        </Wrapper>
    )
}

Loading.defaultProps = {
    color: 'black',
    size: 'medium',
}

export default Loading
