import React, { useState } from 'react'
import axios from 'axios';
import Container from '../component/layout/Container'
import useAsync from '../hooks/useAsync';
import { useEffect } from 'react/cjs/react.development';
import * as dateFns from "date-fns";
import Products from '../component/data-display/Products';
import Shopggus from '../component/data-display/Shopggus';

async function getProduct() {
    const response = await axios.get('http://localhost:8080/products');
    return response.data;
}

async function getShopggu() {
    const response = await axios.get('http://localhost:8080/shopggus');
    return response.data;
}



function RecentProcucts () {
    const [shopggus, repatchShopggus] = useAsync(() => getShopggu())
    const [products, repatchProducts] = useAsync(() => getProduct())
    const [productsData , setProductsData] = useState([])
    const [shopggusData , setShopggusData] = useState([])
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

    useEffect(() => {
        if(products.data){
            setProductsData(products.data.data)
        }
        if(shopggus.data){
            setShopggusData(shopggus.data.data)
        }
    }, [products.data, shopggus.data])

    return(
        <Container>
            <p className="updateTime">최근 업데이트 {updateTime}</p>
            <div className="dashboard">
                <div className="product">
                    <h2>🙋‍♀️ 여기 상품 등록했어요</h2>
                    <Products productsData={productsData}/>
                </div>
                <div className="shopggu">
                    <h2>🙋‍♂️ 여기 샵꾸 발행했어요</h2>
                    <Shopggus shopggusData={shopggusData}/>
                </div>
            </div>
        </Container>
    )
}

export default RecentProcucts
