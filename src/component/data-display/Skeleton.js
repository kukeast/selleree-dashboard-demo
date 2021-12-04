import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: ${props => props.rounded ? 8 : 4}px;

    background-color: ${COLOR.gray2};
    animation-duration: 0.5s;
    animation-name: fadeIn;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
    @keyframes fadeIn {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.5;
        }
    }    
`

function Skeleton ({style, width, height, rounded, className}) {
    return(
        <Wrapper 
            className={className}
            width={width}
            height={height}
            rounded={rounded}
            style={style}
        />
    )
}

Skeleton.defaultProps ={
    width: 0,
    height: 0,
    rounded: false,
}

export default Skeleton
