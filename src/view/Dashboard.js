import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { format } from "date-fns";
import { COLOR } from '../constants/color';
import Container from '../component/layout/Container'
import Shopggus from '../component/data-display/Shopggus';
import Products from '../component/data-display/Products';
import Statistics from './Statistics';
import Button from '../component/inputs/Button';
import Title from '../component/data-display/Title';
import Icon from '../component/data-display/Icon';
import { productsMockData } from '../util/mockData';

const UpdateTime = styled.p`
    font-size: 15px;
    color: ${COLOR.gray5};
`
const Wrapper = styled.div`
    h2{
        margin: 20px 0;
        font-size: 18px;
        color: ${COLOR.black};
    }
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 20px;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    > *{
        width: 100%;
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
            <Title 
                title="대시보드"
                icon="dashboard16"
                color={COLOR.main}
            >
                <UpdateTime>최근 업데이트 {updateTime}</UpdateTime>
                <Button
                    size="small"
                    type="line"
                    onClick={() => refresh()}
                >
                    <Icon name="refresh" size={16} color={COLOR.gray5}/>
                    새로고침
                </Button>
            </Title>
            <Statistics repatch={repatch}/>
            <Wrapper>
                <div>
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    <ProductList repatch={repatch}/>
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

function ProductList ({ repatch }) {
    const [isLoading, setIsLoading] = useState(true)
    const [productList] = useState(productsMockData)
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500);
    }, [repatch])
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    return(
        <>
            <Products
                data={productList}
                isLoading={isLoading}
            />
            <ButtonWrapper>
                <Button 
                    type="mono"
                    isLoading={isLoading}
                >
                    20개 더 보기
                </Button>
            </ButtonWrapper>
        </>
    )
}