import React from 'react'

function Product ({url, storeName, itemName, price, imageCount, visibility, deleted, href}) {
    var backgroundImage = {
        backgroundImage: "url(" + url + ")"
    };
    return(
        <a className="Product" href={href} target="_blank" rel="noreferrer">
            <div className="image" style={backgroundImage}/>
            <p className="storeName">{storeName}</p>
            <p className="itemName">{itemName}</p>
            <p className="price">{price.slice(0,-3) + "원"}</p>
            <div className="tags">
                <p className="imageCount"><span>{imageCount}</span>장</p>
                {visibility === "PRIVATE" && <p className="private">비공개</p>}
                {deleted === "\u0001" && <p className="delete">삭제</p>}
            </div>
        </a>
    )
}

export default Product
