import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import { COLOR } from '../../constants/color';
import Icon from '../data-display/Icon';

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`
const SelectWrapper = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: ${COLOR.black};
    background-color: ${COLOR.gray2};
    line-height: 20px;
    padding: 10px 10px 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: 0.3s;
    :hover{
        background-color: ${COLOR.gray3};
    }
    :active{
        background-color: ${COLOR.gray2};
    }
    ${props => props.isShow && css`
        background-color: ${COLOR.main2};
        color: ${COLOR.main};
    `}
`
const Dim = styled.div`
    position: fixed;
    inset: 0;
    display: ${props => props.isShow ? "block" : "none"};
    z-index: 9;
`
const Options = styled.div`
    position: absolute;
    width: 120px;
    top: 50px;
    right: 0;
    display: ${props => props.isShow ? "inline-block" : "none"};
    border-radius: 16px;
    background-color: ${COLOR.white};
    box-shadow: 0px 4px 24px 0px rgba(34, 34, 34, 0.1);
    z-index: 9;
    padding: 8px;
`
const Option = styled.div`
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    color: ${COLOR.black};
    padding: 10px 10px;
    border-radius: 8px;
    background-color: ${COLOR.white};
    :hover{
        background-color: ${COLOR.gray1};
    }
    & + &{
        margin-top: 2px;
    }
    cursor: pointer;
`
function Select ({ options, defaultValue, callback }) {
    const [isShow, setIsShow] = useState(false)
    const [selected, setSelected] = useState(defaultValue)
    const SelectOption = value => {
        setIsShow(false)
        setSelected(value)
        callback(value)
    }
    return(
        <Wrapper>
            <SelectWrapper isShow={isShow} onClick={() => setIsShow(prev => !prev)}>
                {options[selected]}
                {isShow ? 
                    <Icon name="expand_less" size={16} color={COLOR.main}/> :
                    <Icon name="expand_more" size={16} color={COLOR.black}/>
                }
            </SelectWrapper>
            <Dim isShow={isShow} onClick={() => setIsShow(false)}/>
            <Options isShow={isShow}>
                {Object.keys(options).map( option => (
                    <Option 
                        key={option} 
                        onClick={() => SelectOption(option)}
                    >
                        {options[option]}
                    </Option>
                ))}
            </Options>
        </Wrapper>
    )
}

Select.defaultProps = {

}

export default Select
