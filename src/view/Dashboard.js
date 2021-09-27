import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import * as dateFns from "date-fns";
import { COLOR } from '../constants/color';
import Container from '../component/layout/Container'
import Shopggus from '../component/data-display/Shopggus';
import Products from '../component/data-display/Products';

const UpdateTime = styled.p`
    margin: 30px 0 0;
    text-align: center;
    font-size: 15px;
    color: ${COLOR.gray6};
`
const Wrapper = styled.div`
    h2{
        margin: 20px 0;
        font-size: 20px;
        color: ${COLOR.black};
    }
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 30px;
`

function Dashboard () {
    const [repatch, setRepatch] = useState(true)
    const [updateTime, setUpdateTime] = useState(dateFns.format(new Date(), 'H시 m분 s초'))
    useEffect(() => {
        const interval = setInterval(()=>{
            setRepatch(prev => !prev)
            setUpdateTime(dateFns.format(new Date(), 'H시 m분 s초'))
        },600000)
        return(
            ()=>clearInterval(interval)
        )
    })
    return(
        <Container>
            <UpdateTime>최근 업데이트 {updateTime}</UpdateTime>
            <Wrapper>
                <div>
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    <Products repatch={repatch}/>
                </div>
                <div>
                    <h2>🙋‍♂️ 여기 샵꾸 발행했어요</h2>
                    <Shopggus repatch={repatch}/>
                </div>
            </Wrapper>
        </Container>
    )
}

export default Dashboard
