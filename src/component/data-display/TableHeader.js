import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    font-size: 14px;
    color: ${COLOR.gray5};
    align-items: center;
    box-sizing: border-box;
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

function TableHeader ({type}) {
    return(
        <Wrapper>
            {type === "seller-funnel" &&
                <>
                    <Flex1>단계</Flex1>
                    <Flex2>이름</Flex2>
                    <Flex1Center>전환율</Flex1Center>
                    <Flex1Center>이탈율</Flex1Center>
                    <Flex1Center>이전 단계 전환율</Flex1Center>
                    <Flex1Center>이전 단계 이탈율</Flex1Center>
                    <Flex1Right>카운트</Flex1Right>
                </>
            }
            {type === "payment-setting" &&
                <>
                    <Flex2>이름</Flex2>
                    <Flex1Right>비율</Flex1Right>
                    <Flex1Right>카운트</Flex1Right>
                </>
            }
        </Wrapper>
    )
}

export default TableHeader