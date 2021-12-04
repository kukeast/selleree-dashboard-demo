import React, { useEffect, useState } from 'react'
import { parseISO, format }from "date-fns";
import styled from 'styled-components'
import { COLOR } from '../constants/color'
import { getOrderDetail } from '../util/api'
import useAsync from '../util/useAsync'
import Icon from '../component/data-display/Icon';
import Card from '../component/data-display/Card';
import Skeleton from '../component/data-display/Skeleton';
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
const StoreName = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 15px;
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

function OrderDetail ({orderId}) {
    const [response] = useAsync(() => getOrderDetail(orderId))
    const [detail, setDetail] = useState()

    const defaultShippingFee = detail && parseInt(detail.default_shipping_fee)
    const extraShippingFee = detail && parseInt(detail.extra_shipping_fee)
    const price = detail && parseInt(detail.price)
    const backgroundImage = detail && {
        backgroundImage: `url(${detail.image_url}?w=300)`
    };
    const StoreHref = detail && `https://${detail.identifier}.selleree.shop/`
    const ProductHref = detail && `https://${detail.identifier}.selleree.shop/products/${detail.item_id}`

    const formattingPrice = price => {
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(() => {
        if(response.data){
            setDetail(response.data.data)
        }
    }, [response])

    return(
        <Wrapper>
            {detail ? <>
                <Header>
                    <div>
                        <StoreName href={StoreHref} target="_blank" rel="noreferrer">
                            {detail.store_name}
                            <Icon name="new_tab" color={COLOR.main} size={16}/>
                        </StoreName>
                        <OrderTitle>{detail.buyer_name}님의 주문</OrderTitle>
                        <OrderDate>
                            {format(parseISO(detail.created_at), 'M월 d일 H시 m분 s초')}
                        </OrderDate>
                    </div>
                    <OrderTitle>{formattingPrice(defaultShippingFee + extraShippingFee + (price * detail.quantity))}원</OrderTitle>
                </Header>
                <ItemCard onClick={() => window.open(ProductHref, "_blank")}>
                    <Image style={backgroundImage}/>
                    <ItemName>{detail.item_name}</ItemName>
                    <Para>{detail.quantity}개</Para>
                    <Price>{formattingPrice(price)}원</Price>
                </ItemCard>
                <CardWrapper>
                    <Title>주문 정보</Title>
                    <CardInfo>
                        <Label>결제 상태</Label>
                        <Financial status={detail.financial_status}>{FinancialStatus[detail.financial_status].text}</Financial>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송 상태</Label>
                        <Fulfillment status={detail.fulfillment_status}>{FulfillmentStatus[detail.fulfillment_status].text}</Fulfillment>
                    </CardInfo>
                    <CardInfo>
                        <Label>메모</Label>
                        <Para>{detail.memo ? detail.memo : "-"}</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>최근 수정 시간</Label>
                        <Para>{detail.created_at !== detail.last_modified_at ? format(parseISO(detail.last_modified_at), 'M월 d일 H시 m분 s초') : "-"}</Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title>주문자</Title>
                    <CardInfo>
                        <Label>이름</Label>
                        <Para>{detail.buyer_name}</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>이메일</Label>
                        <Para>{detail.buyer_email}</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>휴대폰 번호</Label>
                        <Para>{detail.buyer_cell_phone_number}</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송지</Label>
                        <Para>
                            [{detail.zip_code}]
                            {detail.address_line}
                            {detail.address_detail_line && ", " + detail.address_detail_line}
                        </Para>
                    </CardInfo>
                </CardWrapper>
                <CardWrapper>
                    <Title>결제 정보</Title>
                    <CardInfo>
                        <Label>상품 합계</Label>
                        <Para>{formattingPrice(price * detail.quantity)}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>배송비</Label>
                        <Para>{formattingPrice(defaultShippingFee + extraShippingFee)}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>결제 금액</Label>
                        <Para>{formattingPrice(defaultShippingFee + extraShippingFee + (price * detail.quantity))}원</Para>
                    </CardInfo>
                    <CardInfo>
                        <Label>결제 방법</Label>
                        <Para>{detail.payment_method === "CASH" ? "무통장 입금" : "카드 · 간편결제"}</Para>
                    </CardInfo>
                </CardWrapper>
                {detail.payment_method === "CASH" &&
                    <CardWrapper>
                        <Title>입금 계좌</Title>
                        <CardInfo>
                            <Label>예금주</Label>
                            <Para>{detail.bank_account_holder}</Para>
                        </CardInfo>
                        <CardInfo>
                            <Label>은행</Label>
                            <Para>{detail.bank_name}</Para>
                        </CardInfo>
                        <CardInfo>
                            <Label>계좌번호</Label>
                            <Para>{detail.bank_account_number}</Para>
                        </CardInfo>
                    </CardWrapper>
                }
            </> : 
            <>
                <Header>
                    <div>
                        <StoreName><Skeleton width={60} height={19}/></StoreName>
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
