import React, { useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { COLOR } from '../constants/color';

import Container from '../component/layout/Container'
import useAsync from '../hooks/useAsync';
import { useEffect } from 'react/cjs/react.development';
import * as dateFns from "date-fns";
import Products from '../component/data-display/Products';
import Shopggus from '../component/data-display/Shopggus';

const UpdateTime = styled.p`
    margin: 30px 0 0;
    text-align: center;
    color: ${COLOR.gray5};
`
const Wrapper = styled.div`
    h2{
        margin: 20px 0;
        font-size: 20px;
    }
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 30px;
`

async function getProduct() {
    const response = await axios.get(`http://localhost:8080/api/products/20`);
    return response.data;
}

async function getShopggu() {
    const response = await axios.get('http://localhost:8080/api/shopggus');
    return response.data;
}

function Dashboard () {
    const [shopggus, repatchShopggus] = useAsync(() => getShopggu())
    const [products, repatchProducts] = useAsync(() => getProduct())
    const [updateTime, setUpdateTime] = useState(dateFns.format(new Date(), 'H시 m분 s초'))

    useEffect(() => {
        const interval = setInterval(()=>{
            repatchProducts()
            repatchShopggus()
            setUpdateTime(dateFns.format(new Date(), 'H시 m분 s초'))
        },600000)
        return(
            ()=>clearInterval(interval)
        )
    }, [repatchProducts, repatchShopggus])

    return(
        <Container>
            <UpdateTime>최근 업데이트 {updateTime}</UpdateTime>
            <Wrapper>
                <div>
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    {products.data && <Products productsData={products.data.data}/>}
                    {/* <button onClick={() => setLimit(prev => prev + 20)}>dd</button> */}
                </div>
                <div>
                    <h2>🙋‍♂️ 여기 샵꾸 발행했어요</h2>
                    {shopggus.data && <Shopggus shopggusData={shopggus.data.data}/>}
                </div>
            </Wrapper>
        </Container>
    )
}

export default Dashboard
