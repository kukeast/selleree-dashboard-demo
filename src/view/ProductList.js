import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Products from '../component/data-display/Products';
import Title from '../component/data-display/Title';
import Button from '../component/inputs/Button';
import Select from '../component/inputs/Select';
import Container from '../component/layout/Container';
import { COLOR } from '../constants/color';
import { getProducts } from '../util/api';
import useAsync from '../util/useAsync';
import useLocalStorage from '../util/useLocalStorage';

const ButtonWrapper = styled.div`
    margin-top: 30px;
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
function ProductList () {
    const [unit, setUnit] = useLocalStorage("product_unit", 20)
    const [limit, setLimit] = useState(parseInt(unit))
    const [productList, setProductList] = useState([])
    const [response] = useAsync(() => getProducts(limit), [limit])

    useEffect(() => {
        if(response.data){
            setProductList(response.data.data)
        }
    }, [response])

    const selectCallback = value => {
        setUnit(value)
    }

    return(
        <Container>
            <Title 
                title="상품"
                icon="tag16"
                color={COLOR.green}
            >
                <Select 
                    options={options} 
                    defaultValue={unit} 
                    callback={selectCallback}
                />
            </Title>
        
            <Products 
                column='5'
                data={productList}
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

export default ProductList
