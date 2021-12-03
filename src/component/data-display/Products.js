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
    const [response] = useAsync(() => getProducts(limit), [limit, repatch])
    
    useEffect(() => {
        if(response.data){
            setProductList(response.data.data)
        }
    }, [response])
    
    const skeleton = () => {
        const result = []
        for (let i = 0; i < 20; i++) {
            result.push(<SkeletonProduct key={i}/>)
        }
        return result
    }
    return(
        <>
            <Wrapper column={column}>
                {response.loading && productList.length === 0 ?
                    skeleton() :
                    productList.map(product => (
                        <Product
                            data={product}
                            key={product.item_id}
                        />
                    ))
                }
            </Wrapper>
            <ButtonWrapper>
                <Button 
                    type="mono" 
                    onClick={() => setLimit(prev => prev + 20)} 
                    isLoading={response.loading}
                >
                    20개 더 보기
                </Button>
            </ButtonWrapper>
        </>
    )
}

Products.defaultProps = {
    column: 4,
}

export default Products
