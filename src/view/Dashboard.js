import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {format} from "date-fns";
import { COLOR } from '../constants/color';
import Container from '../component/layout/Container'
import Shopggus from '../component/data-display/Shopggus';
import Products from '../component/data-display/Products';
import Statistics from './Statistics';
import TextButton from '../component/inputs/TextButton';

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
    gap: 20px;
`
const ProductWrapper = styled.div`
    background-color: ${COLOR.white};
    box-shadow: 0px 4px 24px 0px #22222215;
    border-radius: 8px;
    padding: 20px;
`

function Dashboard () {
    const [repatch, setRepatch] = useState(0)
    const [updateTime, setUpdateTime] = useState(format(new Date(), 'H시 m분 s초'))
    useEffect(() => {
        const interval = setInterval(()=>{
            reload()
        },600000)
        return(
            ()=>clearInterval(interval)
        )
    })
    const reload = () => {
        setRepatch(prev => prev + 1)
        setUpdateTime(format(new Date(), 'H시 m분 s초'))
    }
    return(
        <Container>
            <UpdateTime>
                <TextButton 
                    icon="refresh"
                    onClick={() => reload()}
                >
                    최근 업데이트 {updateTime}
                </TextButton>
            </UpdateTime>
            {/* <UpdateTime>최근 업데이트 {updateTime}</UpdateTime> */}
            <Statistics repatch={repatch}/>
            <Wrapper>
                <div>
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    <ProductWrapper>
                        <Products repatch={repatch}/>
                    </ProductWrapper>
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
