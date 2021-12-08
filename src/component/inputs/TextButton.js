import React from 'react'
import styled, { css } from 'styled-components';
import { COLOR } from '../../constants/color';
import Icon from '../data-display/Icon';

const Wrapper = styled.button`
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
    line-height: 20px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    background-color: ${COLOR.white};
    ${props => props.theme === "primary" ?
        css`
            font-weight: bold;
            color: ${COLOR.main};
            :hover{
                background-color: ${COLOR.main1};
            }
            :active{
                background-color: ${COLOR.main2};
            }
        `
        : props.theme === "mono" 
        ? css`
            color: ${COLOR.gray6};
            :hover{
                background-color: ${COLOR.gray2};
            }
            :active{
                background-color: ${COLOR.gray3};
            }
        `
        : null
    }
`

function TextButton ({ theme, onClick, icon, children }) {
    return(
        <Wrapper onClick={onClick} theme={theme}>
            {icon && <Icon size={20} color={COLOR.main} name={icon}/>}
            {children}
        </Wrapper>
    )
}

TextButton.defaultProps = {
    theme: "primary",
}

export default TextButton
