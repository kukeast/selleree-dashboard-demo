import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../constants/color'
import Icon from '../component/data-display/Icon';
import Button from '../component/inputs/Button';
import Skeleton from '../component/data-display/Skeleton';
import Card from '../component/data-display/Card';
import { sellersMockData } from '../util/mockData';
const Wrapper = styled.div`
    max-width: 640px;
    margin: auto;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 30px;
`
const Subtitle = styled.p`
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
const CardWrapper = styled(Card)`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 425px) {
        > *{
            flex: auto !important;
        }
    }
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
    flex: 0.75;
`
const Emoji = styled(Para)`
    font-size: 20px;
`
const LinkWrapper = styled(Para)`
    flex: 1;
    display: flex;
    gap: 10px;
`
const LinkButton = styled(Link)`
    display: flex;
    padding: 8px;
    border-radius: 8px;
    :hover{
        background-color: ${COLOR.main2};
    }
    transition: 0.2s;
`
const SiteButton = styled.a`
    display: flex;
    padding: 8px;
    border-radius: 8px;
    :hover{
        background-color: ${COLOR.main2};
    }
    transition: 0.2s;
`
const Label = styled.p`
    font-size: 13px;
    color: ${COLOR.gray6};
`
const StoreWrapper = styled.div`
    flex: 1.5;
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
    font-weight: 500;
    color: ${COLOR.gray4};
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

function Seller ({ data, isLoading }) {
    if(isLoading){
        return(
            <CardWrapper>
                <StoreWrapper>
                    <Skeleton width={140} height={17}/>
                    <StoreName><Skeleton width={100} height={22}/></StoreName>
                </StoreWrapper>
                <Emoji></Emoji>
                <Para><Skeleton width={60} height={24}/></Para>
                <Para><Skeleton width={60} height={24}/></Para>
                <LinkWrapper>
                    <Skeleton width={80} height={24}/>
                </LinkWrapper>
            </CardWrapper>
        )
    }else{
        return(
            <CardWrapper>
                {data.name ? 
                    <>
                        <StoreWrapper>
                            <Label>{data.identifier}.selleree.shop</Label>
                            {data.name && <StoreName>{data.name}</StoreName>}
                        </StoreWrapper>
                        <Emoji>{data.businessRegistrationNumber && data.businessRegistrationNumber !== "null" && "💼"}</Emoji>
                        <Para><Icon size={20} name="tag20" color={COLOR.green}/>{data.item_count ? data.item_count : 0}개</Para>
                        <Para><Icon size={20} name="cart20" color={COLOR.yellow}/>{data.order_count ? data.order_count : 0}개</Para>
                        <LinkWrapper>
                            <LinkButton to={`/seller/${data.id}`}>
                                <Icon size={24} name="file" color={COLOR.main}/>
                            </LinkButton>
                            <SiteButton href={data.url} target="_blank" rel="noreferrer">
                                <Icon size={24} name="new_tab24" color={COLOR.main}/>
                            </SiteButton>
                        </LinkWrapper>
                    </>
                    :
                    <StoreWrapper>
                        <Label>{data.identifier}</Label>
                    </StoreWrapper>
                }
            </CardWrapper>
        )
    }
}

function SellerHeader ({ data, dateRange, isLoading }) {
    if(isLoading){
        return(
            <Header>
                <div>
                    <Subtitle>
                        <Skeleton width={60} height={19}/>
                    </Subtitle>
                    <Title>
                        <Skeleton width={150} height={25}/>
                    </Title>
                    <Description>
                        <Skeleton width={80} height={19}/>
                    </Description>
                </div>
                <Title>
                    <Skeleton width={150} height={25}/>
                </Title>
            </Header>
        )
    }else{
        return(
            <Header>
                <div>
                    <Subtitle>{data.subtitle}</Subtitle>
                    <Title>{data.title}</Title>
                    <Description>{formattingDate(dateRange)}</Description>
                </div>
                <Title>{data.count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}개</Title>
            </Header>
        )
    }
}

function Sellers ({data, dateRange}) {
    const [isLoading, setIsLoading] = useState(true)
    const [sellers] = useState(sellersMockData)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    const skeleton = () => {
        const result = []
        for (let i = 0; i < 10; i++) {
            result.push(<Seller isLoading key={i}/>)
        }
        return result
    }

    return(
        <Wrapper>
            {data && data.count === 0 ? 
                <>
                    <SellerHeader data={data} dateRange={dateRange}/>
                    <Empty>해당 조건의 판매자가 없어요..</Empty>
                </> :
            !isLoading ? 
                <>
                    <SellerHeader data={data} dateRange={dateRange}/>
                    {sellers.map( (seller, index) => (
                        <Seller key={index} data={seller}/>
                    ))}
                    {sellers.length % 10 === 0 && 
                        <ButtonWrapper>
                            <Button 
                                type="mono"
                                isLoading={isLoading}
                            >
                                10개 더 보기
                            </Button>
                        </ButtonWrapper>
                    }
                </> : 
                <>
                    <SellerHeader isLoading/>
                    {skeleton()}
                </>
            }
        </Wrapper>
    )
}

export default Sellers
