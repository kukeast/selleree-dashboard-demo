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
    },
    "mono" : {
        color: COLOR.black,
        backgroundColor : COLOR.gray2,
        hover: COLOR.gray3,
        active: COLOR.gray2,
    }
}
const SHAPE = {
    "default" : {
        padding: "16px 18px",
        borderRadius: "12px",
    },
    "pill" : {
        padding: "10px 16px",
        borderRadius: "20px",
    }
}

const Wrapper = styled.button`
    font-size: 15px;
    font-weight: 500;
    color: ${props => THEME[props.type].color};
    background-color: ${props => THEME[props.type].backgroundColor};
    line-height: 20px;
    padding: ${props => SHAPE[props.shape].padding};
    border-radius: ${props => SHAPE[props.shape].borderRadius};
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

function Button ({ type, shape, isLoading, onClick, children }) {
    return(
        <Wrapper type={type} shape={shape} onClick={!isLoading ? onClick : null}>
            {isLoading 
                ? <Loading color={THEME[type].color}/>
                :children
            }
        </Wrapper>
    )
}

Button.defaultProps = {
    type : "primary",
    shape: "default",
}

export default Button
