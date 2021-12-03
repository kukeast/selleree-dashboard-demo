import React, { useState } from 'react'
import styled from 'styled-components';
import Orders from '../component/data-display/Orders';
import Container from '../component/layout/Container';
import TextButton from '../component/inputs/TextButton';
import Select from '../component/inputs/Select';
import useLocalStorage from '../util/useLocalStorage';
const SortWrapper = styled.div`
    display: flex;
    justify-content: space-between;
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
const options = {
    20: "20개씩 보기",
    40: "40개씩 보기",
    60: "60개씩 보기",
}

function OrderList () {
    const [unit, setUnit] = useLocalStorage("order_unit", 20)
    const [sortBy, setSortBy] = useState("created_at")
    
    const switchOrderSort = () => {
        setSortBy(prev => prev === "created_at" ? "last_modified_at" : "created_at")
    }
    const SelectCallback = value => {
        setUnit(value)
    }
    return(
        <Container className='mt30'>
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
                        callback={SelectCallback}
                    />
                </div>
            </SortWrapper>
            <Orders
                sortBy={sortBy}
                unit={unit}
            />
        </Container>
    )
}

export default OrderList
