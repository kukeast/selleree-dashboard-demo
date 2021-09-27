import React from 'react'
import Product from './Product'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.column}, 1fr);
    gap: 40px 20px;
`

function Products ({productsData, column='4'}) {
    return(
        <Wrapper column={column}>
            {productsData.map((product) => (
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
    )
}

export default Products
