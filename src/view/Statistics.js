import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as dateFns from "date-fns";
import { getToday, getTodayChart } from '../util/api';
import useAsync from '../util/useAsync';

import Chart from '../component/data-display/Chart'
import TodayCard from '../component/data-display/TodayCard';
import { COLOR } from '../constants/color';

const CardWrapper = styled.div`
    display: grid;
    gap: 20px;
    margin-top: 20px;
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(4, 1fr);
`

function Statistics ({repatch}) {
    const [todayData, setTodayData] = useState([])
    const [chartData, setChartData] = useState({
        categories: [],
        data: [],
    })
    const [select, setSelect] = useState(0)

    const [today, repatchToday] = useAsync(() => getToday())
    const [chart, repatchChart] = useAsync(() => getTodayChart(cards[select].dataName), [select])

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
        if(today.data){
            setTodayData(today.data.data)
        }
    }, [today])

    useEffect(() => {
        if(chart.data){
            setChartData(chart.data.data)
        }
    }, [chart])
    
    useEffect(() => {
        if(repatch){
            repatchToday()
            repatchChart()
        }
        // eslint-disable-next-line
    }, [repatch])

    const getTodayCount = (data, index) => {
        var result = []
        if(data[index]){
            if(data[index][0].date === dateFns.format(new Date(), 'yyyy-MM-dd')){
                result.push(data[index][0].count)
                if(data[index][1]){
                    result.push(data[index][0].count - data[index][1].count)
                }else{
                    result.push(data[index][0].count)
                }
            }else{
                result.push(0)
                result.push(-data[index][0].count)
            }
        }
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
                color={cards[select].color}
                isLoading={chart.loading}
                width={1080}
                height={380}
                type="line"
            />
        </>
    )
}

export default Statistics
