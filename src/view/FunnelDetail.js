import React, { useEffect, useState } from 'react'
import { format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../constants/color'
import { getFunnelDetail } from '../util/api'
import useAsync from '../util/useAsync'
import Icon from '../component/data-display/Icon';
import Button from '../component/inputs/Button';
import SkeletonFunnelDetail from '../component/data-display/SkeletonFunnelDetail';
const Wrapper = styled.div`
    width: 640px;
    margin: auto;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 30px;
`
const Step = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: ${COLOR.main};
`
const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: ${COLOR.black};
    margin: 8px 0;
`
const Description = styled.p`
    font-size: 15px;
    color: ${COLOR.gray6};
`
const CardWrapper = styled.a`
    padding: 20px;
    transition: 0.2s;
    background-color: ${COLOR.card};
    box-shadow: ${COLOR.shadow};
    border-radius: 8px;
    margin-bottom: 20px;
    &:hover{
        transform: translateY(-10px);
    }
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StoreName = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.main};
    margin-top: 6px;
`
const Para = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4px;
    font-size: 15px;
    color: ${COLOR.black};
    line-height: 1.6;
    flex: 1;
`
const Label = styled.p`
    font-size: 13px;
    color: ${COLOR.gray6};
`
const StoreWrapper = styled.div`
    flex: 2;
`
const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
    > *{
        width: 100%;
    }
`
const Empty = styled.p`
    margin-top: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.gray3};
`

const formattingDate = date => {
    const startDate = format(date.startDate, " M월 d일")
    const endDate = format(date.endDate, " M월 d일")
    if (startDate === endDate){
        return startDate
    }else {
        return [startDate, "~" ,endDate].join(" ")
    }
}

function Card ({data}) {
    return(
        <CardWrapper href={`https://${data.identifier}.selleree.shop`} target="_blank" rel="noreferrer">
            {data.name ? 
                <>
                    <StoreWrapper>
                        <Label>{data.identifier}.selleree.shop</Label>
                        {data.name && <StoreName>{data.name}</StoreName>}
                    </StoreWrapper>
                    <Para><Icon size={20} name="tag20" color={COLOR.green}/>{data.itemCount ? data.itemCount : 0}개</Para>
                    <Para><Icon size={20} name="cart20" color={COLOR.yellow}/>{data.orderCount ? data.orderCount : 0}개</Para>
                </>
                :
                <StoreWrapper>
                        <Label>{data.identifier}</Label>
                </StoreWrapper>
            }
        </CardWrapper>
    )
}

function FunnelDetail ({funnelData, dateRange}) {
    const [limit, setLimit] = useState(10)
    const [sellers, setSellers] = useState()
    const [response] = useAsync(() => getFunnelDetail(dateRange, funnelData.id, limit), [limit])
    const count = funnelData.count.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    useEffect(() => {
        if(response.data){
            setSellers(response.data.data)
        }
    }, [response])
    return(
        <Wrapper>
            <Header>
                <div>
                    <Step>{funnelData.step}</Step>
                    <Title>{funnelData.title}</Title>
                    <Description>{formattingDate(dateRange)}</Description>
                </div>
                <Title>{count}개</Title>
            </Header>
            {funnelData.count === "0" ? 
                <Empty>해당 조건의 판매자가 없어요..</Empty> : 
                sellers ? 
                <>
                    {sellers.map( (seller, index) => (
                        <Card key={index} data={seller}/>
                    ))}
                    {sellers.length % 10 === 0 && 
                        <ButtonWrapper>
                            <Button 
                                onClick={() => setLimit(prev => prev + 10)} 
                                isLoading={response.loading}
                            >
                                10개 더 보기
                            </Button>
                        </ButtonWrapper>
                    }
                </> : 
                <SkeletonFunnelDetail/>
            }
        </Wrapper>
    )
}

export default FunnelDetail
