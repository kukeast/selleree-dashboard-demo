import React, { useState, useEffect } from 'react'
import useAsync from '../../util/useAsync';
import styled from 'styled-components';
import Product from './Product'
import Button from '../inputs/Button';
import { getProducts } from '../../util/api';
import SkeletonProduct from './SkeletonProduct';

const Wrapper = styled.div`
    display: grid;
    gap: 40px 20px;
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 425px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(${props => props.column}, 1fr);
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    > *{
        width: 100%;
    }
`

function Products ({column, repatch}) {
    const [limit, setLimit] = useState(20)
    const [productList, setProductList] = useState([])
    const [response, repatchResponse] = useAsync(() => getProducts(limit),[limit])
    
    useEffect(() => {
        if(response.data){
            setProductList(response.data.data)
        }
    }, [response])

    useEffect(() => {
        if(repatch){
            repatchResponse()
        }
        // eslint-disable-next-line
    }, [repatch])
    
    const skeleton = () => {
        const result = [];
        for (let i = 0; i < 20; i++) {
            result.push(<SkeletonProduct key={i}/>);
        }
        return result;
    };
    
    return(
        <>
            <Wrapper column={column}>
                {productList[0] ? productList.map((product) => (
                    <Product
                        key={product["item-id"]}
                        url={product["url"]}
                        storeName={product["store-name"]}
                        itemName={product["item-name"]}
                        price={product["price"]}
                        imageCount={product["image-count"]}
                        visibility={product["visibility"]}
                        deleted={product["deleted"]}
                        href={`https://${product["store-id"]}.selleree.shop/products/${product["item-id"]}`}
                    />
                )): skeleton()}
            </Wrapper>
            {productList.length % 10 === 0 &&
                <ButtonWrapper>
                    <Button onClick={() => setLimit(prev => prev + 20)} isLoading={response.loading}>20개 더 보기</Button>
                </ButtonWrapper>
            }
        </>
    )
}

Products.defaultProps = {
    column: 4,
}

export default Products
