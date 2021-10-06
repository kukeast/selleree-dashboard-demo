import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
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

function Skeleton ({style}) {
    return(
        <Wrapper 
            style={style}
        />
    )
}

export default Skeleton
