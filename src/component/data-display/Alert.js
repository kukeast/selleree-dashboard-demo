import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Icon from './Icon'

const Wrapper = styled.div`
    position: fixed;
    right: 40px;
    bottom: 40px;
    display: inline-flex;
    padding: 16px;
    background-color: #FFF3D4;
    border: 1px solid #FFE7AA;
    border-radius: 8px;
    align-items: center;
    gap: 30px;
`
const Title = styled.p`
    font-size: 15px;
    font-weight: 500;
    color: ${COLOR.black};
`
const Des = styled.p`
    font-size: 13px;
    font-weight: 400;
    color: ${COLOR.gray6};
    margin-top: 4px;
`
const Close = styled.div`
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: 0.3s;
    display: flex;
    &:hover{
        background-color: #FFE7AA;
    }
`

function Alert ({ callback }) {
    return(
        <Wrapper>
            <div>
                <Title>외부 공개용으로 제작된 데모 사이트입니다.</Title>
                <Des>특정 기능이 작동하지 않을 수 있습니다.</Des>
            </div>
            <Close onClick={() => callback()}>
                <Icon name="close16" size={16} color={COLOR.gray6}/>
            </Close>
        </Wrapper>
    )
}

export default Alert
