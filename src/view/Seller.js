import React, { useState, useEffect } from 'react'
import { parseISO, format }from "date-fns";
import styled, { css } from 'styled-components'
import Card from '../component/data-display/Card'
import Icon from '../component/data-display/Icon'
import Orders from '../component/data-display/Orders'
import Products from '../component/data-display/Products'
import Button from '../component/inputs/Button'
import { COLOR } from '../constants/color'
import Skeleton from '../component/data-display/Skeleton';
import { ordersMockData, productsMockData, sellerDetailMockData } from '../util/mockData';

const TOSS ={
    WAIT_FOR_REVIEW : "신청 완료",
    TERMINATED : "계약 종료",
    READY : "신청서 작성 중",
    DONE : "심사 완료",
}

const Wrapper = styled.div`
    max-width: 960px;
    padding: 0 20px;
    margin: auto;
`
const HeaderWrapper = styled.div`
    position: absolute;
    width: 100%;
    padding: 24px 0;
    z-index: 1;
    > div{
        background-color: transparent;
    }
`
const GoBack = styled.div`
    display: inline-flex;
    padding: 3px;
    cursor: pointer;
`
const CoverWrapper = styled.div`
    height: 240px;
    background-color: ${COLOR.gray1};
    overflow: hidden;
`
const Cover = styled.div`
    width: 110%;
    height: 120%;
    ${props => props.url ? 
        css`
            background-image: url(${props.url});
            background-size: cover;
            filter: blur(16px);
            background-position: center;
        `:
        css`
            background-image: url("https://selleree.shop/landing/img/img-character-pink.png"), url("https://selleree.shop/landing/img/img-character-green.png"), url("https://selleree.shop/landing/img/img-character-yellow.png");
            background-size: 100px, 80px, 90px;
            background-position: 40% center, 50% center, 60% center;
        `
    }
    background-repeat: no-repeat;
    margin: -30px;
`
const TitleWrapper = styled.div`
    margin: 40px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 425px) {
        flex-direction: column;
        gap: 20px;
        margin: 40px 0;
        > button{
            width: 100%;
        }
    }
`
const Title = styled.p`
    font-size: 30px;
    line-height: 40px;
    font-weight: bold;
    color: ${COLOR.black};
`
const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
const Navs = styled.div`
    display: flex;
    gap: 6px;
`
const Nav = styled.div`
    ${props => props.select ? 
    css`
        background-color: ${COLOR.main1};
        font-weight: bold;
        color: ${COLOR.main};
        &:hover{
            background-color: ${COLOR.main2};
        }
    `:
    css`
        background-color: ${COLOR.white};
        font-weight: 400;
        color: ${COLOR.gray6};
        &:hover{
            background-color: ${COLOR.gray1};
        }
    `}
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    gap: 6px;
    cursor: pointer;
`
const Contents = styled.div`
    ${props => props.select ? 
        css`
            display: block;
        `:
        css`
            display: none;
        `
    }
    flex: 1;
    margin-bottom: 160px;
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    > *{
        width: 100%;
    }
`



function Seller ({history}) {
    const [isLoading, setIsLoading] = useState(true)
    const [selectNav, setSelectNav] = useState(0)
    const [sellerInfo] = useState(sellerDetailMockData)
    const navs = [
        {
            title: "기본 정보",
            component: <SellerInfo data={sellerInfo}/>
        },
        {
            title: "상품",
            count: sellerInfo && sellerInfo.item_count ? sellerInfo.item_count : 0,
            component: sellerInfo &&<ProductList id={sellerInfo.id}/>
        },
        {
            title: "주문",
            count: sellerInfo && sellerInfo.order_count ? sellerInfo.order_count : 0,
            component: sellerInfo &&<OrderList id={sellerInfo.id}/>
        }
    ]
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    return(
        <>
            <HeaderWrapper>
                <Wrapper>
                    <GoBack onClick={() => history.goBack()}>
                        <Icon name="arrow_left" size={24} color={COLOR.black}/>
                    </GoBack>
                </Wrapper>
            </HeaderWrapper>
            <CoverWrapper>
                <Cover url={`${process.env.PUBLIC_URL}/images/Cover.jpg`}/>
            </CoverWrapper>
            {!isLoading ? 
                <Wrapper>
                    <TitleWrapper>
                        <Title>{sellerInfo.store_name}</Title>
                        <Button onClick={() => window.open("https://editor.selleree.shop/templates/10004/themes/2")}>상점 바로가기<Icon name="new_tab16" size={16} color={COLOR.white}/></Button>
                    </TitleWrapper>
                    <ContentsWrapper>
                        <Navs>
                            {navs.map((nav, index) => (
                                <Nav 
                                    key={index} 
                                    select={selectNav === index}
                                    onClick={() => setSelectNav(index)}
                                >
                                    {nav.title}
                                    {nav.count >= 0 && <span>{nav.count}</span>}
                                </Nav>
                            ))}
                        </Navs>
                        {navs.map((nav, index) => (
                                <Contents
                                    key={index} 
                                    select={selectNav === index}
                                >
                                    {nav.component}
                                </Contents>
                            ))}
                        
                    </ContentsWrapper>
                </Wrapper>:
                <Wrapper>
                    <TitleWrapper>
                        <Title><Skeleton width={180} height={40}/></Title>
                        <Button isLoading>상점 바로가기<Icon name="new_tab16" size={16} color={COLOR.white}/></Button>
                    </TitleWrapper>
                    <ContentsWrapper>
                        <Navs>
                            <Skeleton width={90} height={45} rounded/>
                            <Skeleton width={90} height={45} rounded/>
                            <Skeleton width={90} height={45} rounded/>
                        </Navs>
                        <Contents select>
                            <SellerInfo isLoading/>
                        </Contents>
                    </ContentsWrapper>
                </Wrapper>
            }
        </>
    )
}

export default Seller

const CardWrapper = styled(Card)`
    margin-bottom: 20px;
    display: flex;
    padding: 30px;
    @media screen and (max-width: 425px) {
        flex-direction: column;
        padding: 20px;
        gap: 20px;
    }
`
const CardTitle = styled.p`
    width: 220px;
    font-size: 16px;
    font-weight: bold;
    color: ${COLOR.black};
`
const InfoWrapper = styled.div`
    margin-top: 6px;
    flex: 1;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2,1fr);
`
const CardInfo = styled.div`
    display: inline-block;
    vertical-align: top;
`
const Label = styled.p`
    font-size: 13px;
    color: ${COLOR.gray5};
    margin-bottom: 4px;
`
const Para = styled.p`
    font-size: 15px;
    color: ${COLOR.black};
    line-height: 1.6;
`

function SellerInfo ({ data, isLoading }) {
    const validString = string => {
        if(string){
            return string
        }else{
            return "-"
        }
    }
    return(
        <>
            {!isLoading ? 
                <>
                    <CardWrapper>
                        <CardTitle>셀러 정보</CardTitle>
                        <InfoWrapper>
                            <CardInfo>
                                <Label>셀러 아이디</Label>
                                <Para>{data.id}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>아이디</Label>
                                <Para>{data.identifier}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>이름</Label>
                                <Para>{validString(data.seller_name)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>휴대폰 번호</Label>
                                <Para>{validString(data.cell_phone_number)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>가입일</Label>
                                <Para>{format(parseISO(data.created_at), 'yyyy년 M월 d일 H시 m분')}</Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                    <CardWrapper>
                        <CardTitle>상점 정보</CardTitle>
                        <InfoWrapper>
                            <CardInfo>
                                <Label>상점 아이디</Label>
                                <Para>{validString(data.store_id)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>상점 이름</Label>
                                <Para>{validString(data.store_name)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>카테고리</Label>
                                <Para>{validString(data.category)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>문의 채널</Label>
                                <Para>{validString(data.contacts)}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>상점 유형</Label>
                                <Para>{data.design_published === "\u0001" ? "샵꾸 상점" : "기본 상점"}</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>사업자 유형</Label>
                                <Para>{data.business_registration_number && data.business_registration_number !== "null" ? "사업자" : data.toss_status ? "비사업자" : "-"}</Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                    <CardWrapper>
                        <CardTitle>결제 설정</CardTitle>
                        <InfoWrapper>
                            <CardInfo>
                                <Label>입금 계좌</Label>
                                <Para>{data.bank_name ? data.bank_name + " / " + data.account_number + " / " + data.holder : "-" }</Para>
                            </CardInfo>
                            <CardInfo>
                                <Label>토스페이먼츠 상태</Label>
                                <Para>{data.toss_status ? TOSS[data.toss_status] : "미신청"}</Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                </> :
                <>
                    <CardWrapper>
                        <CardTitle><Skeleton width={90} height={21}/></CardTitle>
                        <InfoWrapper>
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
                            <CardInfo>
                                <Label><Skeleton width={60} height={17}/></Label>
                                <Para><Skeleton width={180} height={24}/></Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                    <CardWrapper>
                        <CardTitle><Skeleton width={90} height={21}/></CardTitle>
                        <InfoWrapper>
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
                            <CardInfo>
                                <Label><Skeleton width={60} height={17}/></Label>
                                <Para><Skeleton width={180} height={24}/></Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                    <CardWrapper>
                        <CardTitle><Skeleton width={90} height={21}/></CardTitle>
                        <InfoWrapper>
                            <CardInfo>
                                <Label><Skeleton width={60} height={17}/></Label>
                                <Para><Skeleton width={180} height={24}/></Para>
                            </CardInfo>
                            <CardInfo>
                                <Label><Skeleton width={60} height={17}/></Label>
                                <Para><Skeleton width={180} height={24}/></Para>
                            </CardInfo>
                        </InfoWrapper>
                    </CardWrapper>
                </>
            }
        </>
    )
}

const EmptyArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    font-size: 20px;
    font-weight: 400;
    color: ${COLOR.gray4};
    border: 2px dashed ${COLOR.gray3};
    border-radius: 8px;
`
function ProductList () {
    const [isLoading, setIsLoading] = useState(true)
    const [limit, setLimit] = useState(20)
    const [productList] = useState(productsMockData.filter(item => item.store_name === "ROCODAILY"))
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    return(
        <>
            {productList ?
                <Products
                    data={productList}
                    isLoading={isLoading}
                /> :
                <EmptyArea>상품이 없어요.</EmptyArea>
            }
            {productList && (productList.length === limit || isLoading) &&
                <ButtonWrapper>
                    <Button 
                        type="mono" 
                        onClick={() => setLimit(prev => prev + 20)} 
                        isLoading={isLoading}
                    >
                        20개 더 보기
                    </Button>
                </ButtonWrapper>
            }
        </>
    )
}
function OrderList () {
    const [isLoading, setIsLoading] = useState(true)
    const [limit, setLimit] = useState(20)
    const [orderList] = useState(ordersMockData.filter(item => item.name === "ROCODAILY"))
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])
    return(
        <>
            {orderList ?
                <Orders
                    data={orderList}
                    isLoading={isLoading}
                    size="small"
                />:
                <EmptyArea>주문이 없어요.</EmptyArea>
            }
            {orderList && (orderList.length === limit || isLoading) &&
                <ButtonWrapper>
                    <Button 
                        type="mono" 
                        onClick={() => setLimit(prev => prev + 20)} 
                        isLoading={isLoading}
                    >
                        20개 더 보기
                    </Button>
                </ButtonWrapper>
            }
        </>
    )
}