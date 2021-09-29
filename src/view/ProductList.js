import React from 'react'
import Products from '../component/data-display/Products';
import Container from '../component/layout/Container';

function ProductList () {
    return(
        <Container className='mt20'>
            <Products 
                column='5'
            />
        </Container>
    )
}

export default ProductList
