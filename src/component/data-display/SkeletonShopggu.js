import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Skeleton from './Skeleton';

const Wrapper = styled.a`
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    box-shadow: 0px 4px 24px 0px #22222215;
    border-radius: 8px;
    padding: 20px;
    & > div{
        display: flex;
        justify-content: space-between;
        .order{
            font-size: 15px;
            color: ${COLOR.gray6};
        }
        .date{
            font-size: 13px;
            color: ${COLOR.gray5};
        }
    }
    .store{
        font-size: 20px;
        font-weight: bold;
        color: ${COLOR.main};
        margin-top: 6px;
    }
`

function SkeletonShopggu ({href, storeName, order, date}) {
    return(
        <Wrapper href={href} target="_blank" rel="noreferrer">
            <div>
                <Skeleton 
                    style={{
                        width: "60px",
                        height: "19px",
                        borderRadius: "4px",
                    }}
                />
                <Skeleton 
                    style={{
                        width: "80px",
                        height: "16px",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <Skeleton 
                style={{
                    width: "180px",
                    height: "25px",
                    marginTop: "6px",
                    borderRadius: "4px",
                }}
            />
        </Wrapper>
    )
}

export default SkeletonShopggu
