import React, {useState} from 'react'
import { DateRange } from 'react-date-range';
import * as dateFns from "date-fns";
import 'react-date-range/dist/styles.css'
import './DatePicker.scss'
import ko from 'date-fns/locale/ko'
import Button from './Button';
import Dim from './Dim';

function DatePicker ({callback}) {
    const [hide, setHide] = useState("hide")
    //submit date range
    const [submitDate, setSubmitDate] = useState([
        {
            startDate: new Date('2021.7.1'),
            endDate: new Date()
        }
    ]);
    //library date range
    const [date, setDate] = useState([
        {
            startDate: new Date('2021.7.1'),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const {startDate, endDate} = submitDate[0]
    const dateFormat = {
        ...submitDate[0],
        startDate : dateFns.format(startDate, 'yyyy.M.d'),
        endDate : dateFns.format(endDate, 'yyyy.M.d')
    }
    const createDateFormat = dateFormat =>{
        if (dateFormat.startDate === dateFormat.endDate){
            return dateFormat.startDate
        }else{
            return [dateFormat.startDate, "~" ,dateFormat.endDate].join(" ")
        }
    }
    //actions
    const openDateRange = () =>{
        setHide("")
        setDate([
            {
                ...date[0],
                startDate : submitDate[0].startDate,
                endDate: submitDate[0].endDate
            }
        ])
    }
    const closeDateRange = () =>{
        setHide("hide")
    }
    const submit = () =>{
        setSubmitDate([
            {
                ...submitDate[0],
                startDate : date[0].startDate,
                endDate: date[0].endDate
            }
        ])
        callback(date[0].startDate, date[0].endDate)
        setHide("hide")
    }
    return(
        <div className="DatePickerWrapper">
            <Button button={{
                title: createDateFormat(dateFormat),
                withIcon: true,
                iconSrc: "../../images/ic24-calendar.svg",
            }} onClick={openDateRange}/>
            <Dim hide={hide} onClick={closeDateRange}/>
            <div className={["DatePicker", hide].join(' ')}>
                <DateRange
                    editableDateInputs={false}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    locale={ko}
                    startDatePlaceholder="시작 일"
                    endDatePlaceholder="종료 일"
                    rangeColors={["#403DD5"]}
                    maxDate={new Date()}
                    minDate={new Date('2021/06/30')}
                    dateDisplayFormat="yyyy.M.d"
                />
                <Button button={{
                    title: "확인",
                    type: "primary"
                }} onClick={submit}/>
            </div>
        </div>
    )
}

export default DatePicker
