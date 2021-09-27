import React from 'react'
import Title from '../component/data-display/Title';
import Container from '../component/layout/Container';
import Tabs from '../component/navigation/Tabs';

function Header () {
    const tabs = [
        {
            id : 1,
            title : "대시보드",
            path : "/"
        },
        {
            id : 2,
            title : "상품",
            path : "/product"
        },
        // {
        //     id : 3,
        //     title : "셀러 & 상점 통계",
        //     path : "/statistics"
        // }
    ]
    return(
        <Container className="bottom-line">
            <Title
                iconSrc="../../images/ic24-chart-line.svg"
            />
            <Tabs tabs={tabs}/>
        </Container>
    )
}


export default Header
