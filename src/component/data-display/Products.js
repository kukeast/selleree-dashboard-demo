import React, { useState, useEffect } from 'react'
import useAsync from '../../hooks/useAsync';
import styled from 'styled-components';
import Product from './Product'
import Button from '../inputs/Button';
import { getProducts } from '../../hooks/api';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.column}, 1fr);
    gap: 40px 20px;
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    *{
        width: 100%;
    }
`

function Products ({column, repatch}) {
    const [limit, setLimit] = useState(20)
    const [productList, setProductList] = useState([])
    const [products, repatchProducts] = useAsync(() => getProducts(limit),[limit])
    
    useEffect(() => {
        if(products.data){
            setProductList(products.data.data)
        }
    }, [products])

    useEffect(() => {
        repatchProducts()
        // eslint-disable-next-line
    }, [repatch])

    return(
        <>
            <Wrapper column={column}>
                {productList.map((product) => (
                    <Product
                        key={product["item-id"]}
                        url={product["url"]}
                        storeName={product["store-name"]}
                        itemName={product["item-name"]}
                        price={product["price"]}
                        imageCount={product["image-count"]}
                        visibility={product["visibility"]}
                        deleted={product["deleted"]}
                        href= {"https://" + product["store-id"] + ".selleree.shop/products/" + product["item-id"]}
                    />
                ))}
            </Wrapper>
            <ButtonWrapper>
                <Button onClick={() => setLimit(prev => prev + 20)}>더 보기</Button>
            </ButtonWrapper>
        </>
    )
}

Products.defaultProps = {
    column: 4,
}

export default Products
