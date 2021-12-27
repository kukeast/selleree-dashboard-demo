import React, { useEffect, useState } from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../constants/color'
import Icon from '../component/data-display/Icon';
import Card from '../component/data-display/Card';
import Skeleton from '../component/data-display/Skeleton';
import { Link } from 'react-router-dom';
const FinancialStatus ={
    WAITING : {
        color: COLOR.yellow,
        text: '결제 대기'
    },
    COMPLETE : {
        color: COLOR.blue,
        text: '결제 완료'
    },
    CANCELED : {
        color: COLOR.gray4,
        text: '주문 취소'
    }
}
const FulfillmentStatus ={
    WAITING : {
        color: COLOR.yellow,
        text: '배송 대기'
    },
    COMPLETE : {
        color: COLOR.green,
        text: '배송 완료'
    },
    WILL_NOT : {
        color: COLOR.gray4,
        text: '배송 안 함'
    }
}
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
const StoreName = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    font-weight: bold;
    color: ${COLOR.black};
`
const LinkWrapper = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;
    font-weight: bold;
    color: ${COLOR.main};
    transition: 0.3s;
    padding: 0 2px;
    border-radius: 4px;
    :hover{
        background-color: ${COLOR.main2};
    }
`
const AnchorWrapper = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;
    font-weight: bold;
    color: ${COLOR.main};
    transition: 0.3s;
    padding: 0 2px;
    border-radius: 4px;
    :hover{
        background-color: ${COLOR.main2};
    }
`
const OrderTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: ${COLOR.black};
    margin: 8px 0;
`
const OrderDate = styled.p`
    font-size: 15px;
    color: ${COLOR.gray6};
`
const CardWrapper = styled(Card)`
    margin-bottom: 20px;
`
const ItemCard = styled(CardWrapper)`
    display: flex;
    align-items: center;
`
const Image = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
`
const Para = styled.p`
    font-size: 15px;
    color: ${COLOR.black};
    line-height: 1.6;
`
const ItemName = styled(Para)`
    flex: 3;
    margin-left: 16px;
`
const Price = styled(Para)`
    flex: 1;
    display: flex;
    justify-content: end;
`
const Title = styled(Para)`
    font-weight: bold;
`
const CardInfo = styled.div`
    display: inline-block;
    width: 50%;
    margin-top: 20px;
    vertical-align: top;
    @media screen and (max-width: 425px) {
        width: 100%;
    }
`
const Label = styled.p`
    font-size: 13px;
    color: ${COLOR.gray5};
    margin-bottom: 4px;
`
const Financial = styled(Para)`
    font-weight: bold;
    color: ${props => FinancialStatus[props.status].color};
`
const Fulfillment = styled(Para)`
    font-weight: bold;
    color: ${props => FulfillmentStatus[props.status].color};
`

function OrderDetail ({ data }) {
    const [isLoading, setIsLoading] = useState(true)
    const defaultShippingFee = parseInt(data.default_shipping_fee)
    const extraShippingFee = parseInt(data.extra_shipping_fee)
    const price = parseInt(data.price)
    const backgroundImage = {
        backgroundImage: `url(${data.image_url}?w=300)`
    };
    const formattingPrice = price => {
        return (price * 1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    return(
        <Wrapper>
            {!isLoading ? <>
                <Header>
                    <div>
                        <StoreName>
                            {data.name}
                            <LinkWrapper to={`/seller/1`}>
                                상점 정보<Icon name="file16" color={COLOR.main} size={16}/>
                            </LinkWrapper>
                            <AnchorWrapper href={data.url} target="_blank" rel="noreferrer">
                                바로가기<Icon name="new_tab16" color={COLOR.main} size={16}/>
                            </AnchorWrapper>
                        </StoreName>
                        <OrderTitle>이동국님의 주문</OrderTitle>
                        <OrderDate>
                            {format(parseISO(data.created_at), 'M월 d일 H시 m분 s초')}
                        </OrderDate>
                    </div>
                    <OrderTitle>
                        {(
                            parseInt(data.default_shipping_fee) 
                            + parseInt(data.extra_shipping_fee) 
                            + (parseInt(price) * data.quantity)
                        ).toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
                    </OrderTitle>
                </Header>
                <ItemCard onClick={() => window.open(data.url, "_blank")}>
                    <Image style={backgroundImage}/>
                    <ItemName>{data.title}</ItemName>
                    <Para>{data.quantity}개</Para>
                    <Price>{formattingPrice(data.price)}원</Price>
                </ItemCard>
                <CardWrapper>
                    <Title>주문 정보</Title>
                    <CardInfo>
                        <Label>결제 상태</Label>
                        <Financial status={data.financial_status}>{FinancialStatus[data.financial_status].text}</Financial>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송 상태</Label>
                        <Fulfillment status={data.fulfillment_status}>{FulfillmentStatus[data.fulfillment_status].text}</Fulfillment>
                    </CardInfo>
                    <CardInfo>
                        <Label>메모</Label>
                        <Para>-</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>최근 수정 시간</Label>
                        <Para>{data.created_at !== data.last_modified_at ? format(parseISO(data.last_modified_at), 'M월 d일 H시 m분 s초') : "-"}</Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title>주문자</Title>
                    <CardInfo>
                        <Label>이름</Label>
                        <Para>이동국</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>이메일</Label>
                        <Para>leedongguk@kakao.com</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>휴대폰 번호</Label>
                        <Para>010 1234 5678</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송지</Label>
                        <Para>[01234]서울특별시 중구 세종대로 110</Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title>결제 정보</Title>
                    <CardInfo>
                        <Label>상품 합계</Label>
                        <Para>{formattingPrice(data.price * data.quantity)}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송비</Label>
                        <Para>{formattingPrice(defaultShippingFee + extraShippingFee)}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>결제 금액</Label>
                        <Para>{formattingPrice(defaultShippingFee + extraShippingFee + (price * data.quantity))}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>결제 방법</Label>
                        <Para>{data.payment_method === "CASH" ? "무통장 입금" : "카드 · 간편결제"}</Para>
                    </CardInfo>
                </CardWrapper>
                {data.payment_method === "CASH" &&
                    <CardWrapper>
                        <Title>입금 계좌</Title>
                        <CardInfo>
                            <Label>예금주</Label>
                            <Para>박세호</Para>
                        </CardInfo>
                        <CardInfo>
                            <Label>은행</Label>
                            <Para>국민은행</Para>
                        </CardInfo>
                        <CardInfo>
                            <Label>계좌번호</Label>
                            <Para>11011010 04 201134</Para>
                        </CardInfo>
                    </CardWrapper>
                }
            </> : 
            <>
                <Header>
                    <div>
                        <StoreName to={"/"}><Skeleton width={60} height={19}/></StoreName>
                        <OrderTitle><Skeleton width={150} height={25}/></OrderTitle>
                        <OrderDate><Skeleton width={80} height={19}/></OrderDate>
                    </div>
                    <OrderTitle><Skeleton width={150} height={25}/></OrderTitle>
                </Header>
                <ItemCard>
                    <Skeleton width={60} height={60} rounded/>
                    <ItemName><Skeleton width={100} height={21}/></ItemName>
                    <Para><Skeleton width={20} height={21}/></Para>
                    <Price><Skeleton width={60} height={21}/></Price>
                </ItemCard>
                <CardWrapper>
                    <Title><Skeleton width={120} height={24}/></Title>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title><Skeleton width={120} height={24}/></Title>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title><Skeleton width={120} height={24}/></Title>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                    <CardInfo>
                        <Label><Skeleton width={60} height={17}/></Label>
                        <Para><Skeleton width={180} height={24}/></Para>
                    </CardInfo>
                </CardWrapper>
            </>}
        </Wrapper>
    )
}

export default OrderDetail
