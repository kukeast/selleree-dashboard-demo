import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns"
import styled from 'styled-components';
import Orders from '../component/data-display/Orders';
import Container from '../component/layout/Container';
import Select from '../component/inputs/Select';
import Button from '../component/inputs/Button';
import Icon from '../component/data-display/Icon';
import Title from '../component/data-display/Title';
import { COLOR } from '../constants/color';
import { ordersMockData } from '../util/mockData';
const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
    > *{
        width: 100%;
    }
`
const options = {
    20: "20개씩 보기",
    40: "40개씩 보기",
    60: "60개씩 보기",
}

function OrderList () {
    const [isLoading, setIsLoading] = useState(true)
    const [unit, setUnit] = useState(20)
    const [sortBy, setSortBy] = useState("created_at")
    const [orderList, setOrderList] = useState(ordersMockData)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        var newArr = []
        var items = []
        var stack = {}
        ordersMockData.forEach((order, index) => {
            if(ordersMockData[index+1] && order.name === ordersMockData[index+1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(ordersMockData[index+1][sortBy]), 'M월 d일')){
                items.push(order)
            }else if(ordersMockData[index-1] && order.name === ordersMockData[index-1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(ordersMockData[index-1][sortBy]), 'M월 d일')){
                items.push(order)
                stack = {
                    id: order.id,
                    type : "stack",
                    items : items,
                    created_at : order.created_at,
                    last_modified_at : order.last_modified_at,
                }
                newArr.push(stack)
                items = []
            }else{
                newArr.push(order)
            }
        })
        setOrderList(newArr)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500);
    }, [sortBy])
    const switchOrderSort = () => {
        setSortBy(prev => prev === "created_at" ? "last_modified_at" : "created_at")
    }
    const selectCallback = value => {
        setUnit(value)
    }
    return(
        <Container>
            <Title 
                title="주문"
                icon="cart16"
                color={COLOR.yellow}
            >
                <Button
                    type="line"
                    size="small"
                    onClick={switchOrderSort}
                >
                    <Icon name="sort" size={16} color={COLOR.gray5}/>
                    {sortBy === "created_at" ? "최근 생성 순" : "최근 업데이트 순"}
                </Button>
                <Select 
                    options={options} 
                    defaultValue={unit} 
                    callback={selectCallback}
                />
            </Title>
            <Orders
                sortBy={sortBy}
                data={orderList}
                isLoading={isLoading}
            />
            <ButtonWrapper>
                <Button 
                    type="mono" 
                    isLoading={isLoading}
                >
                    {unit}개 더 보기
                </Button>
            </ButtonWrapper>
        </Container>
    )
}

export default OrderList
