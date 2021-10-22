import React from 'react'
import styled from 'styled-components';
import { parseISO, format }from "date-fns";
import { COLOR } from '../../constants/color';

const Wrapper = styled.a`
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
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

function Shopggu ({href, storeName, order, date}) {
    return(
        <Wrapper href={href} target="_blank" rel="noreferrer">
            <div>
                <p className="order">{order + 1}번째 발행</p>
                <p className="date">{format(parseISO(date), 'M월 d일 H시 m분 s초')}</p>
            </div>
            <p className="store">{storeName}</p>
        </Wrapper>
    )
}

export default Shopggu
