import React from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components'
import { COLOR } from '../../constants/color';
import Icon from './Icon';

const Dim = styled.div`
    position: fixed;
    inset: 0;
    background-color: ${COLOR.dim};
    cursor: pointer;
    z-index: 9;
`
const Wrapper = styled.div`
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    padding: 40px;
    background-color: ${COLOR.backgroundColor};
    overflow: scroll;
    border-radius: 16px 16px 0 0;
    z-index: 9;
    animation: slide 0.5s;
    @media screen and (max-width: 425px) {
        padding: 20px;
    }
    @keyframes slide{
        0%{
            opacity: 0.6;
            transform: translateY(20px);
        }
        100%{
            opacity: 1;
            transform: translateY(0px);
        }
    }
`
const Close = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    width: 40px;
    height: 40px;
    background-color: ${COLOR.white};
    border-radius: 20px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    z-index: 9;
    :hover{
        background-color: ${COLOR.gray2};
    }
    animation: slide 0.5s;
    @keyframes slide{
        0%{
            opacity: 0.8;
            transform: translateY(20px);
        }
        100%{
            opacity: 1;
            transform: translateY(0px);
        }
    }
`

function Portal (props) {
    return createPortal(props.children, document.getElementById("portal"))
}

function Modal ({ children, onClickClose }) {
    return(
        <Portal>
            <Dim onClick={onClickClose}/>
            <Close onClick={onClickClose}>
                <Icon name="close" color={COLOR.gray5}/>
            </Close>
            <Wrapper>
                {children}
            </Wrapper>
        </Portal>
    )
}

export default Modal
