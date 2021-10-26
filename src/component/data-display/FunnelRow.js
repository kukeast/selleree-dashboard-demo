import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'
import FunnelDetail from '../../view/FunnelDetail'
import Modal from './Modal'

const Wrapper = styled.div`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    margin: 4px 0;
    padding: 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
    cursor: pointer;
`
const Step = styled.div`
    flex: 1;
`
const Title = styled.div`
    flex: 2;
    `
const Rate = styled.div`
    flex: 1;
    text-align: center;
    ${props => props.rate >= 70
        ? css`
            color: ${COLOR.green6};
            font-weight: bold;
        ` 
        : props.rate <= 30 && props.rate
        ? css`
            color: ${COLOR.red};
            font-weight: bold;
        ` 
        : css`
            color: ${COLOR.black};
        ` 
    };
`
const Count = styled.div`
    flex: 1;
    text-align: right;
`

function FunnelRow ({data}) {
    const [isOpen, setIsOpen] = useState(false)
    const count = data.count.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return(
        <>
            <Wrapper onClick={() => setIsOpen(true)}>
                <Step>{data.step}</Step>
                <Title>{data.title}</Title>
                <Rate>
                    {data.conversionRate ? data.conversionRate + "%" : "-"}
                </Rate>
                <Rate>{data.bounceRate ? data.bounceRate + "%" : "-"}</Rate>
                <Rate rate={data.previousConversionRate}>
                    {data.previousConversionRate ? data.previousConversionRate + "%" : "-"}
                </Rate>
                <Rate>{data.previousBounceRate ? data.previousBounceRate + "%" : "-"}</Rate>
                <Count>{count}</Count>
            </Wrapper>
            {isOpen &&
                <Modal onClickClose={() => setIsOpen(false)}>
                    <FunnelDetail funnelData={data}/>
                </Modal>
            }
        </>
    )
}

export default FunnelRow