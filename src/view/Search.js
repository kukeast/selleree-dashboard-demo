import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../component/data-display/Icon'
import Loading from '../component/data-display/Loading'
import { COLOR } from '../constants/color'
import { searchMockData } from '../util/mockData'
import Portal from '../util/Portal'
import useLocalStorage from '../util/useLocalStorage'

const Dim = styled.div`
    position: fixed;
    inset: 0;
    background-color: ${COLOR.dim};
    cursor: pointer;
    z-index: 9;
`
const Wrapper = styled.div`
    position: fixed;
    width: 600px;
    left: 0;
    right: 0;
    top: 10vh;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px #2222221A;
    background-color: ${COLOR.white};
    padding: 20px;
    z-index: 99;
    animation: slide 0.3s;
    @keyframes slide{
        0%{
            opacity: 0.6;
            transform: translateY(10px);
        }
        100%{
            opacity: 1;
            transform: translateY(0px);
        }
    }
    @media screen and (max-width: 425px) {
        top: 40px;
        bottom: 0;
        border-radius: 8px 8px 0 0;
        width: 100%;
        box-sizing: border-box;
    }
`
const SearchBar = styled.div`
    display: flex;
    align-items: end;
    gap: 12px;
`
const TextInput = styled.input`
    flex: 1;
    padding: 0;
    border: 0;
    outline: none;
    color: ${COLOR.black};
    font-size: 18px;
    font-weight: 400;
    &::placeholder{
        color: ${COLOR.gray4};
    }
`
const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${COLOR.gray2};
    max-height: 60vh;
    overflow: scroll;
    @media screen and (max-width: 425px) {
        max-height: calc(100% - 46px);
    }
`
const ResultCard = styled.div`

`
const ResultLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ResultLabel = styled.p`
    font-size: 13px;
    font-weight: 400;
    color: ${COLOR.gray5};
    margin-left: 8px;
`
const RecentSearchAllDelete = styled.p`
    font-size: 13px;
    font-weight: 400;
    color: ${COLOR.gray6};
    cursor: pointer;
    &:hover{
        color: ${COLOR.black};
    }
`
const ResultItemWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    margin-top: 8px;
`
const RecentSearch = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    background-color: ${COLOR.white};
    transition: 0.3s;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.gray1};
    }
`
const ResultStore = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    background-color: ${COLOR.white};
    transition: 0.3s;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.gray1};
    }
`
const ResultProduct = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    background-color: ${COLOR.white};
    transition: 0.3s;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.gray1};
    }
`
const Image = styled.div`
    width: 48px;
    padding-top: 48px;
    background-image: url(${props => props.url}?w=600);
    background-color: ${COLOR.gray2};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    border: 1px solid ${COLOR.gray2};
`
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`
const Title = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    color: ${COLOR.black};
    font-weight: 400;
`
const Des = styled.p`
    font-size: 13px;
    color: ${COLOR.gray5};
`
const RecentSearchDelete = styled.div`
    display: flex;
`
const Empty = styled.p`
    font-size: 15px;
    color: ${COLOR.gray4};
    font-weight: 400;
    margin: 20px 0;
    text-align: center;
`
const SearchTag = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: ${COLOR.gray6};
    padding: 4px 6px;
    background-color: ${COLOR.gray2};
    border-radius: 6px;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.gray3};
    }
`
function Search ({ callback }) {
    const searchInput = useRef()
    const [recentSearches, setRecentSearches] = useLocalStorage("recent-searches", [])
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState()
    const submit = () => {
        setLoading(true)
        setResults(searchMockData)
        setTimeout(() => setLoading(false), 500)
        setRecentSearches(prev => 
            prev.filter(keyword => keyword !== searchInput.current.value).concat(searchInput.current.value)
        )
    }
    const handleKeyUp = e => {
        if(e.key === "Enter"){
            if(text !== ""){
                submit()
            }
        }
        if(text === ""){
            setResults()
        }
    }
    const handleChange = e => {
        if(searchInput.current.value === " "){
            setText("")
        }else{
            setText(searchInput.current.value)
        }
    }
    const handleRecentClick = newKeyword => {
        setText(newKeyword)
        submit(newKeyword)
        setRecentSearches(prev => 
            prev.filter(keyword => keyword !== newKeyword).concat(newKeyword)
        )
    }
    const handleDelete = (e, newKeyword) => {
        e.stopPropagation()
        setRecentSearches(prev => 
            prev.filter(keyword => keyword !== newKeyword)
        )
    }
    return(
        <Portal>
            <Dim onClick={() => callback()}/>
            <Wrapper>
                <SearchBar>
                    {!loading ?
                        <Icon name="search24" size={24} color={COLOR.gray5}/> :
                        <Loading size="small" color={COLOR.gray5}/>
                    }
                    <TextInput
                        value={text}
                        placeholder="??????, ?????? ??????"
                        onKeyUp={handleKeyUp}
                        onChange={handleChange}
                        ref={searchInput}
                        autoFocus
                    />
                    {text !== "" && <SearchTag onClick={() => submit()}>?????? ???</SearchTag>}
                </SearchBar>
                {(!loading && !results && recentSearches[0]) ?
                    <ResultWrapper>
                        <ResultCard>
                            <ResultLabelWrapper>
                                <ResultLabel>?????? ?????????</ResultLabel>
                                <RecentSearchAllDelete onClick={() => setRecentSearches([])}>?????? ??????</RecentSearchAllDelete>
                            </ResultLabelWrapper>
                            <ResultItemWrapper>
                                {recentSearches.map(keyword => (
                                    <RecentSearch key={keyword} onClick={() => handleRecentClick(keyword)}>
                                        <Title><Icon name="time16" size={16} color={COLOR.gray4}/>{keyword}</Title>
                                        <RecentSearchDelete onClick={e => handleDelete(e, keyword)}>
                                            <Icon name="close16" size={16} color={COLOR.gray5}/>
                                        </RecentSearchDelete>
                                    </RecentSearch>
                                    ))
                                }
                            </ResultItemWrapper>
                        </ResultCard>
                    </ResultWrapper> :
                (!loading && results) &&
                    <ResultWrapper>
                        {results.store && 
                            <ResultCard>
                                <ResultLabelWrapper>
                                    <ResultLabel>??????</ResultLabel>
                                </ResultLabelWrapper>
                                <ResultItemWrapper>
                                    {results.store.map(store => (
                                        <ResultStore key={store.id} to={`/seller/${store.id}`}>
                                            <Title>{store.name}</Title>
                                            <Des>{store.identifier}</Des>
                                        </ResultStore>
                                        ))
                                    }
                                </ResultItemWrapper>
                            </ResultCard>
                        }
                        {results.products && 
                            <ResultCard>
                                <ResultLabelWrapper>
                                    <ResultLabel>??????</ResultLabel>
                                </ResultLabelWrapper>
                                <ResultItemWrapper>
                                    {results.products.map(product => (
                                        <ResultProduct key={product.item_id} href={product.url} target="_blank" rel="noreferrer">
                                            <Image url={product.image_url}/>
                                            <TitleWrapper>
                                                <Title>{product.item_name}</Title>
                                                <Des>{product.price.slice(0,-3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}???</Des>
                                            </TitleWrapper>
                                        </ResultProduct>
                                        ))
                                    }
                                </ResultItemWrapper>
                            </ResultCard>
                        }
                        {(!results.products && !results.store) && <Empty>?????? ????????? ?????????.</Empty>}
                    </ResultWrapper>
                }
            </Wrapper>
        </Portal>
    )
}

export default Search
