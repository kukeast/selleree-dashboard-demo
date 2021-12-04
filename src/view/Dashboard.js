import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { format } from "date-fns";
import { COLOR } from '../constants/color';
import Container from '../component/layout/Container'
import Shopggus from '../component/data-display/Shopggus';
import Products from '../component/data-display/Products';
import Statistics from './Statistics';
import TextButton from '../component/inputs/TextButton';
import Card from '../component/data-display/Card';

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
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

function Dashboard () {
    const [repatch, setRepatch] = useState(0)
    const [updateTime, setUpdateTime] = useState(format(new Date(), 'H시 m분 s초'))
    useEffect(() => {
        const interval = setInterval(()=>{
            refresh()
        },600000)
        return(
            ()=>clearInterval(interval)
        )
    })
    const refresh = () => {
        setRepatch(prev => prev + 1)
        setUpdateTime(format(new Date(), 'H시 m분 s초'))
    }
    return(
        <Container>
            <UpdateTime>
                <TextButton 
                    icon="refresh"
                    onClick={() => refresh()}
                >
                    최근 업데이트 {updateTime}
                </TextButton>
            </UpdateTime>
            <Statistics repatch={repatch}/>
            <Wrapper>
                <div>
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    <Card>
                        <Products repatch={repatch}/>
                    </Card>
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
