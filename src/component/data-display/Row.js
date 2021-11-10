import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'
import Sellers from '../../view/Sellers'
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
const Flex1 = styled.div`
    flex: 1;
`
const Flex2 = styled.div`
    flex: 2;
`
const Flex1Right = styled(Flex1)`
    text-align: right;
`
const Flex1Center = styled(Flex1)`
    text-align: center;
`
const Rate = styled(Flex1Center)`
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


function Row ({type, data, dateRange}) {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <Wrapper onClick={() => setIsOpen(true)}>
                {type === "seller-funnel" && 
                    <>
                        <Flex1>{data.subtitle}</Flex1>
                        <Flex2>{data.title}</Flex2>
                        <Rate>
                            {data.conversionRate ? data.conversionRate + "%" : "-"}
                        </Rate>
                        <Rate>{data.bounceRate ? data.bounceRate + "%" : "-"}</Rate>
                        <Rate rate={data.previousConversionRate}>
                            {data.previousConversionRate ? data.previousConversionRate + "%" : "-"}
                        </Rate>
                        <Rate>{data.previousBounceRate ? data.previousBounceRate + "%" : "-"}</Rate>
                        <Flex1Right>{data.count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Flex1Right>
                    </>
                }
                {type === "payment-setting" && 
                    <>
                        <Flex2>{data.title}</Flex2>
                        <Flex1Right>{data.ratio}%</Flex1Right>
                        <Flex1Right>{data.count}</Flex1Right>
                    </>
                }
            </Wrapper>
            {isOpen &&
                <Modal onClickClose={() => setIsOpen(false)}>
                    <Sellers 
                        data={data}
                        dateRange={dateRange}
                    />
                </Modal>
            }
        </>
    )
}

export default Row