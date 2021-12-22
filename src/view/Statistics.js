import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as dateFns from "date-fns";
import Chart from '../component/data-display/Chart'
import TodayCard from '../component/data-display/TodayCard';
import { COLOR } from '../constants/color';
import { chartMockData, todayMockData } from '../util/mockData';

const CardWrapper = styled.div`
    display: grid;
    gap: 20px;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(4, 1fr);
`

function Statistics ({ repatch }) {
    const [isLoading, setIsLoading] = useState(true)
    const [todayData] = useState(todayMockData)
    const [chartData, setChartData] = useState(chartMockData[0])
    const [select, setSelect] = useState(0)
    const cards = [
        {
            icon: 'home',
            title: '오늘 상점 개설',
            dataName: 'store',
            color: COLOR.main,
        },
        {
            icon: 'tag',
            title: '오늘 상품 등록',
            dataName: 'item',
            color: COLOR.green
        },
        {
            icon: 'cart',
            title: '오늘 주문',
            dataName: 'order',
            color: COLOR.yellow
        },
        {
            icon: 'heart',
            title: '오늘 샵꾸 발행',
            dataName: 'published',
            color: COLOR.red
        }
    ]
    useEffect(() => {
        setIsLoading(true)
        setChartData(chartMockData[select])
        setTimeout(() => setIsLoading(false), 500);
    }, [select, repatch])
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])

    const getTodayCount = (data, index) => {
        var result = []
        result.push(data[index][0].count)
        result.push(data[index][0].count - data[index][1].count)
        return result
    }

    return(
        <>
            <CardWrapper>
                {cards.map( (Card, index) => (
                    <TodayCard
                        key={Card.title}
                        icon={Card.icon}
                        title={Card.title}
                        color={Card.color}
                        count={getTodayCount(todayData, index)[0]}
                        growthCount={getTodayCount(todayData, index)[1]}
                        select={select === index && true}
                        onClick={() => setSelect(index)}
                    />
                ))}
            </CardWrapper>
            <Chart 
                data={chartData.data}
                categories={chartData.categories}
                color={[cards[select].color]}
                isLoading={isLoading}
                width={1080}
                height={380}
                type="line"
            />
        </>
    )
}

export default Statistics
