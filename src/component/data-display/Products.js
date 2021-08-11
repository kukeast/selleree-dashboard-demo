import React from 'react'
import Product from './Product'

function Products ({productsData}) {
    return(
        <div className="Products">
            {productsData.map(
                (product, index) => (
                    <Product
                        key={index}
                        url={product["url"]}
                        storeName={product["store-name"]}
                        itemName={product["item-name"]}
                        price={product["price"]}
                        imageCount={product["image-count"]}
                        visibility={product["visibility"]}
                        deleted={product["deleted"]}
                        href= {"https://" + product["store-id"] + ".selleree.shop/products/" + product["item-id"]}
                    />
                )
            )}
        </div>
    )
}

export default Products
