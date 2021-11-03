import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Loading from '../data-display/Loading';
const THEME = {
    "primary" : {
        color: COLOR.buttonText,
        backgroundColor : COLOR.main,
        hover: COLOR.main6,
        active: COLOR.main,
    },
    "secondary" : {
        color: COLOR.main,
        backgroundColor : COLOR.main2,
        hover: COLOR.main3,
        active: COLOR.main2,
    }
}
const SIZE = {
    "medium" : {
        padding: "16px 18px",
    },
    "small" : {
        padding: "10px 12px",
    }
}

const Wrapper = styled.button`
    font-size: 15px;
    color: ${props => THEME[props.type].color};
    background-color: ${props => THEME[props.type].backgroundColor};
    line-height: 20px;
    padding: ${props => SIZE[props.size].padding};
    border-radius: 12px;
    cursor: pointer;
    transition: 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    :hover{
        background-color: ${props => THEME[props.type].hover};
    }
    :active{
        background-color: ${props => THEME[props.type].active};
    }
`

function Button ({ type, size, isLoading, onClick, children }) {
    return(
        <Wrapper type={type} size={size} onClick={!isLoading ? onClick : null}>
            {isLoading 
                ? <Loading color={COLOR.buttonText}/>
                :children
            }
        </Wrapper>
    )
}

Button.defaultProps = {
    type : "primary",
    size: "medium",
}

export default Button
