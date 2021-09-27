import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

const Wrapper = styled.a`
    font-size: 16px;
    color: ${COLOR.black};
    transition: 0.2s;
    &:hover{
        transform: translateY(-10px);
    }
`

const Image = styled.div`
    width: 100%;
    padding-top: 100%;
    background-color: ${COLOR.gray2};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
`
const StoreName = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: ${COLOR.main};
    margin-top: 10px;
`
const ItemName = styled.p`
    margin-top: 6px;
`
const Price = styled.p`
    margin-top: 4px;
`
const Tags = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 10px;
    p{
        display: inline-block;
        padding: 4px 6px;
        font-size: 14px;
        border-radius: 8px;
    }
    .imageCount{
        background-color: rgba(66, 133, 244, 0.1);
        color: #4285F4;
    }
    .private{
        background-color: ${COLOR.gray1};
        color: ${COLOR.gray6};
    }
    .delete{
        background-color: rgba(246, 30, 82, 0.1);
        color: #F61E52;
    }
`

function Product ({url, storeName, itemName, price, imageCount, visibility, deleted, href}) {
    var backgroundImage = {
        backgroundImage: "url(" + url + ")"
    };
    return(
        <Wrapper className="Product" href={href} target="_blank" rel="noreferrer">
            <Image style={backgroundImage}/>
            <StoreName>{storeName}</StoreName>
            <ItemName>{itemName}</ItemName>
            <Price>{price.slice(0,-3) + "원"}</Price>
            <Tags>
                <p className="imageCount"><span>{imageCount}</span>장</p>
                {visibility === "PRIVATE" && <p className="private">비공개</p>}
                {deleted === "\u0001" && <p className="delete">삭제됨</p>}
            </Tags>
        </Wrapper>
    )
}

export default Product
