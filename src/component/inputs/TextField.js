import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.input`
    width: 100%;
    padding: 16px;
    background-color: ${COLOR.gray1};
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    outline: none;
    font-size: 16px;
    color: ${COLOR.black};
    transition: 0.3s;
    :focus{
        background-color: ${COLOR.gray2};
    }
`

function TextField ({type, name, onChange, onKeyDown}) {
    return(
        <Wrapper 
            type={type} 
            name={name} 
            onChange={onChange} 
            onKeyDown={onKeyDown}
        />
    )
}

export default TextField
