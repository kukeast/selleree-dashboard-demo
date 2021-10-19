import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import './DatePicker.scss'
import ko from 'date-fns/locale/ko'
import {sub, format} from "date-fns";
import styled, { css } from 'styled-components';
import { COLOR } from '../../constants/color';
import TextButton from './TextButton';
import Button from './Button';
import { useEffect } from 'react/cjs/react.development';

const Wrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-align: center;
    z-index: 999;
`
const PickerWrapper = styled.div`
    position: absolute;
    top: 50px;
    display: ${props => props.isShow ? "inline-block" : "none"};
    border-radius: 16px;
    background-color: ${COLOR.white};
    box-shadow: 0px 4px 24px 0px rgba(34, 34, 34, 0.1);
`
const Dim = styled.div`
    position: fixed;
    inset: 0;
    display: ${props => props.isShow ? "block" : "none"};
`
const ButtonWrapper = styled.div`
    > *{
        width: 100%;
    }
    margin: 0 12px 12px 12px;
`
const DateRangeWrapper = styled.div`
    display: flex;
`
const RangeWrapper = styled.div`
    width: 160px;
    margin: 12px 0;
`
const RangeItem = styled.div`
    margin: 6px 12px;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.3s;
    ${props => props.select 
        ? css`
            font-weight: bold;
            color: ${COLOR.main};
            :hover{
                background-color: ${COLOR.main2};
            }
            :active{
                background-color: ${COLOR.main3};
            }
        `
        :css`
            color: ${COLOR.gray6};
            :hover{
                background-color: ${COLOR.gray1};
            }
            :active{
                background-color: ${COLOR.gray2};
            }
        `
    }
    cursor: pointer;
`
const rangeItems = [
    {
        title: "오늘",
        days: 0
    },
    {
        title: "최근 7일",
        days: 6
    },
    {
        title: "최근 14일",
        days: 13
    },
    {
        title: "최근 30일",
        days: 29
    },
    {
        title: "최근 60일",
        days: 59
    },
    {
        title: "최근 90일",
        days: 89
    },
]

function DatePicker ({ callback }) {
    const [select, setSelect] = useState(3)
    const [isShow, setIsShow] = useState(false)
    const [date, setDate] = useState({
        startDate: sub(new Date(), {days: 29}),
        endDate: new Date(),
        key: 'selection'
    })
    const [submitDate, setSubmitDate] = useState({
        startDate: date.startDate,
        endDate: date.endDate,
    })
    const formattingDate = date => {
        const startDate = format(date.startDate, " M월 d일")
        const endDate = format(date.endDate, " M월 d일")
        if (startDate === endDate){
            return startDate
        }else {
            return [startDate, "~" ,endDate].join(" ")
        }
    }
    const openModal = () => {
        setIsShow(true)
        setDate({
            ...date,
            startDate : submitDate.startDate,
            endDate: submitDate.endDate
        })
    }
    const closeModal = () => {
        setIsShow(false)
        setSubmitDate({
            ...submitDate,
            startDate : date.startDate,
            endDate: date.endDate
        })
    }
    const changeDate = date => {
        setDate(date)
        setSelect(-1)
    }
    const setDefinedRange = (days, index) => {
        setDate({
            ...date,
            startDate: sub(new Date(), {days: days}),
            endDate: new Date()
        })
        setSelect(index)
    }
    useEffect(() => {
        callback(submitDate)
    }, [submitDate, callback])
    return(
        <Wrapper>
            <TextButton 
                icon="calendar" 
                onClick={openModal}
            >
                {formattingDate(submitDate)}
            </TextButton>
            <Dim isShow={isShow} onClick={() => setIsShow(false)}/>
            <PickerWrapper isShow={isShow}>
                <DateRangeWrapper>
                    <RangeWrapper>
                        {rangeItems.map((item, index) => (
                            <RangeItem 
                                key={index}
                                onClick={() => setDefinedRange(item.days, index)}
                                select={select === index}
                            >
                                {item.title}
                            </RangeItem>
                        ))}
                    </RangeWrapper>
                    <DateRange
                        editableDateInputs={false}
                        onChange={(item) => changeDate(item.selection)}
                        moveRangeOnFirstSelection={false}
                        ranges={[date]}
                        locale={ko}
                        rangeColors={["#403DD5"]}
                        maxDate={new Date()}
                        minDate={new Date('2021/06/30')}
                        dateDisplayFormat="yyyy.M.d"
                    />
                </DateRangeWrapper>
                <ButtonWrapper>
                    <Button onClick={closeModal}>확인</Button>
                </ButtonWrapper>
            </PickerWrapper>
        </Wrapper>
    )
}

export default DatePicker
