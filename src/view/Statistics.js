import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as dateFns from "date-fns";
import { getToday, getTodayChart } from '../hooks/api';
import useAsync from '../hooks/useAsync';

import NewChart from '../component/data-display/NewChart'
import TodayCard from '../component/data-display/TodayCard';

const CardWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
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
        },
        {
            icon: 'tag',
            title: '오늘 상품 등록',
            dataName: 'item',
        },
        {
            icon: 'cart',
            title: '오늘 주문',
            dataName: 'order',
        },
        {
            icon: 'heart',
            title: '오늘 샵꾸 발행',
            dataName: 'published',
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
        repatchToday()
        repatchChart()
        // eslint-disable-next-line
    }, [repatch])

    const getTodayCount = (data, index) => {
        var result = []
        if(data[index]){
            if(data[index][0].date === dateFns.format(new Date(), 'yyyy-MM-d')){
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
                        count={getTodayCount(todayData, index)[0]}
                        growthCount={getTodayCount(todayData, index)[1]}
                        select={select === index && true}
                        onClick={() => setSelect(index)}
                    />
                ))}
            </CardWrapper>
            <NewChart 
                data={chartData.data}
                categories={chartData.categories}
            />
        </>
    )
}

export default Statistics
