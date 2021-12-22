import React from 'react'
import styled from 'styled-components';
import Product from './Product'

const Wrapper = styled.div`
    display: grid;
    gap: 40px 20px;
    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 425px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(${props => props.column}, 1fr);
`


function Products ({data, column, isLoading}) {
    const skeleton = () => {
        const result = []
        for (let i = 0; i < 20; i++) {
            result.push(<Product isLoading key={i}/>)
        }
        return result
    }
    return(
        <>
            <Wrapper column={column}>
                {isLoading ?
                    skeleton() :
                    data.map(product => (
                        <Product
                            data={product}
                            key={product.item_id}
                        />
                    ))
                }
            </Wrapper>
            
        </>
    )
}

Products.defaultProps = {
    data: [],
    column: 4,
    isLoading: false,
}

export default Products
