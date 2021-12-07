import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns"
import styled from 'styled-components';
import Orders from '../component/data-display/Orders';
import Container from '../component/layout/Container';
import TextButton from '../component/inputs/TextButton';
import Select from '../component/inputs/Select';
import useLocalStorage from '../util/useLocalStorage';
import useAsync from '../util/useAsync';
import { getOrders } from '../util/api';
import Button from '../component/inputs/Button';
const SortWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    > div{
        flex: 1;
    }
    > div:nth-child(2){
        text-align: center;
    }
    > div:nth-child(3){
        text-align: right;
    }
`
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
    const [unit, setUnit] = useLocalStorage("order_unit", 20)
    const [limit, setLimit] = useState(parseInt(unit))
    const [sortBy, setSortBy] = useState("created_at")
    const [orderList, setOrderList] = useState([])
    const [response] = useAsync(() => getOrders(limit, sortBy), [limit, sortBy])

    useEffect(() => {
        if(response.data){
            var newArr = []
            var items = []
            var stack = {}
            response.data.data.forEach((order, index) => {
                if(response.data.data[index+1] && order.name === response.data.data[index+1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(response.data.data[index+1][sortBy]), 'M월 d일')){
                    items.push(order)
                }else if(response.data.data[index-1] && order.name === response.data.data[index-1].name && format(parseISO(order[sortBy]), 'M월 d일') === format(parseISO(response.data.data[index-1][sortBy]), 'M월 d일')){
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
        }
    }, [response, sortBy])

    const switchOrderSort = () => {
        setSortBy(prev => prev === "created_at" ? "last_modified_at" : "created_at")
    }
    const selectCallback = value => {
        setUnit(value)
    }
    useEffect(() => {
        setOrderList([])
    }, [sortBy])
    return(
        <Container>
            <SortWrapper>
                <div></div>
                <div>
                    <TextButton icon='sort' onClick={switchOrderSort}>
                        {sortBy === "created_at" ? "최근 생성 순" : "최근 업데이트 순"}
                    </TextButton>
                </div>
                <div>
                    <Select 
                        options={options} 
                        defaultValue={unit} 
                        callback={selectCallback}
                    />
                </div>
            </SortWrapper>
            <Orders
                sortBy={sortBy}
                data={orderList}
                isLoading={response.loading}
            />
            <ButtonWrapper>
                <Button 
                    type="mono" 
                    onClick={() => setLimit(prev => prev + parseInt(unit))} 
                    isLoading={response.loading}
                >
                    {unit}개 더 보기
                </Button>
            </ButtonWrapper>
        </Container>
    )
}

export default OrderList
