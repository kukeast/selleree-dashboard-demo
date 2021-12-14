import React from 'react'
import styled, { css } from 'styled-components';
import { COLOR } from '../../constants/color';
import Loading from '../data-display/Loading';
const THEME = {
    "primary" : {
        color: COLOR.buttonText,
        backgroundColor : COLOR.main,
        border: COLOR.main6,
        hover: COLOR.main6,
    },
    "secondary" : {
        color: COLOR.main,
        backgroundColor : COLOR.main2,
        border: COLOR.main3,
        hover: COLOR.main3,
    },
    "line" : {
        color: COLOR.black,
        backgroundColor : COLOR.white,
        border: COLOR.gray2,
        hover: COLOR.gray1,
    },
    "mono" : {
        color: COLOR.black,
        backgroundColor : COLOR.gray1,
        border: COLOR.gray2,
        hover: COLOR.gray2,
    }
}
const SIZE = {
    "small" : {
        padding: "8px 10px",
        fontSize: "14px",
        borderRadius: "8px",
    },
    "medium" : {
        padding: "12px 16px",
        fontSize: "14px",
        borderRadius: "8px",
    },
    "large" : {
        padding: "14px 18px",
        fontSize: "15px",
        borderRadius: "8px",
    }
}

const Wrapper = styled.button`
    font-weight: 400;
    color: ${props => THEME[props.type].color};
    background-color: ${props => THEME[props.type].backgroundColor};
    border: 1px solid ${props => THEME[props.type].border};
    line-height: 20px;
    padding: ${props => SIZE[props.size].padding};
    border-radius: ${props => SIZE[props.size].borderRadius};
    font-size: ${props => SIZE[props.size].fontSize};
    cursor: pointer;
    transition: 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    :hover{
        background-color: ${props => THEME[props.type].hover};
    }
    ${props => props.type === "line" && css`
        box-shadow: 0px 2px 4px 0px #22222214;
    `}
`

function Button ({ type, size, isLoading, onClick, children }) {
    return(
        <Wrapper type={type} size={size} onClick={!isLoading ? onClick : null}>
            {isLoading 
                ? <Loading color={THEME[type].color}/>
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
