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
    border: 1px solid ${COLOR.gray2};
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
    .delete{
        background-color: rgba(246, 30, 82, 0.1);
        color: #F61E52;
    }
`
const ImageCount = styled.p`
    background-color: rgba(66, 133, 244, 0.1);
    color: #4285F4;
`
const Private = styled.p`
    background-color: ${COLOR.gray1};
    color: ${COLOR.gray6};
`
const Delete = styled.p`
    background-color: rgba(246, 30, 82, 0.1);
    color: #F61E52;
`

function Product ({ data }) {
    var backgroundImage = {
        backgroundImage: "url(" + data.url + "?w=600)"
    };
    return(
        <Wrapper href={`https://${data.store_id}.selleree.shop/products/${data.item_id}`} target="_blank" rel="noreferrer">
            <Image style={backgroundImage}/>
            <StoreName>{data.store_name}</StoreName>
            <ItemName>{data.item_name}</ItemName>
            <Price>{data.price.slice(0,-3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"}</Price>
            <Tags>
                <ImageCount>{data.image_count}장</ImageCount>
                {data.visibility === "PRIVATE" && <Private>비공개</Private>}
                {data.deleted === "\u0001" && <Delete>삭제됨</Delete>}
            </Tags>
        </Wrapper>
    )
}

export default React.memo(Product)
