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
`
const Wrapper = styled.div`
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    padding: 40px 0;
    background-color: ${COLOR.backgroundColor};
    overflow: scroll;
    border-radius: 16px 16px 0 0;
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
    :hover{
        background-color: ${COLOR.gray2};
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
