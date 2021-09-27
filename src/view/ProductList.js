import React from 'react'
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import Products from '../component/data-display/Products';
import Container from '../component/layout/Container';

async function getProduct() {
    const response = await axios.get('http://localhost:8080/api/products');
    return response.data;
}

function ProductList () {
    // eslint-disable-next-line
    const [products, repatchProducts] = useAsync(() => getProduct())
    console.log(products)
    if(products.data){
        return(
            <Container className='mt20'>
                <Products 
                    productsData={products.data.data}
                    column='5'
                />
            </Container>
        )
    }
    if(products.loading){
        return(
            <p>로딩</p>
        )
    }
    return(
        <p>에러</p>
    )
}

export default ProductList
