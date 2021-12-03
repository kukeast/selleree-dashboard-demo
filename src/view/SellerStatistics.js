import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import Container from '../component/layout/Container';
import DatePicker from '../component/not-used/DatePicker';
import ButtonGroup from '../component/not-used/ButtonGroup';
import Table from '../component/not-used/Table';
import * as dateFns from "date-fns";
import NewChart from '../component/not-used/NewChart';

async function getTable(dateRange) {
  const response = await axios.post('http://localhost:8080/table/seller', {
    startDate: dateFns.format(dateRange.startDate, 'yyyy.M.d'),
    endDate: dateFns.format(dateRange.endDate, 'yyyy.M.d'),
  });
  return response.data;
}

async function getChart(dateRange, dateCycle, segmentAndEvent) {
  const response = await axios.post('http://localhost:8080/chart/seller', {
    startDate: dateFns.format(dateRange.startDate, 'yyyy-MM-dd'),
    endDate: dateFns.format(dateRange.endDate, 'yyyy-MM-dd'),
    cycle: dateCycle,
    event: segmentAndEvent.event,
    segment: segmentAndEvent.segment,
  });

  return response.data;
}

function SellerStatistics() {
  //date
  const [dateRange, setDateRange] = useState({
    // startDate: new Date('2021.8.1'),
    startDate: new Date().setDate(new Date().getDate() - 13),
    endDate: new Date(),
  })
  const [dateCycle, setDateCycle] = useState("daily")

  //titles, headers
  const titles = ["계정 생성", "본인 인증", "상점 생성", "계좌 등록", "링크 등록", "샵꾸 연동", "샵꾸 발행"]
  const headers = ["전체", "남자", "여자", "20 ~ 24", "25 ~ 29", "30 ~ 34", "35 ~ 39", "40 ~", "패션", "뷰티", "팬시", "푸드", "아트", "주얼리", "건강 식품", "기타"]
  const [segmentAndEvent, setSegmentAndEvent] = useState({
    segment: "전체",
    event: "계정 생성"
  })

  const [selectedArr, setSelectedArr] = useState([0])
  const [refresh, setRefresh] = useState(false)
  //api
  const [table] = useAsync(() => getTable(dateRange), [dateRange])
  const [chart] = useAsync(() => getChart(dateRange, dateCycle, segmentAndEvent), [dateRange, dateCycle, segmentAndEvent])

  //table
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (table.data) {
      setTableData(table.data.data)
    }
  }, [table.data])

  //chart
  const [chartData, setChartData] = useState([])
  const [chartCategories, setChartCategories] = useState([])

  useEffect(() => {
    setChartData([])
    setChartCategories([])
    setRefresh(r => !r)
    setSelectedArr([0])
  }, [dateRange, dateCycle])

  useEffect(() => {
    if (chart.data) {
      setChartData(chartData.concat(chart.data.data.data[0]))
      setChartCategories(chart.data.data.categories)
    }
    // eslint-disable-next-line
  }, [chart.data])

  //button group
  const cycleButtons = [
    {
      id: 0,
      title: "일별"
    },
    {
      id: 1,
      title: "주별",
      //disabled: true,
    },
    {
      id: 2,
      title: "월별",
      //disabled: true,
    }
  ]

  //callback
  const callbackDateRange = (startDate, endDate) => {
    setDateRange({
      startDate: startDate,
      endDate: endDate,
    })
  }

  const callbackDateCycle = cycle => {
    if (cycle === 0) {
      setDateCycle("daily")
    } else if (cycle === 1) {
      setDateCycle("weekly")
    } else if (cycle === 2) {
      setDateCycle("monthly")
    }
  }

  const callbackSelectedCell = selected => {
    if(!selectedArr.includes(selected)){
      setSelectedArr(selectedArr.concat(selected))
      setSegmentAndEvent({
        segment: headers[parseInt(selected / 10)],
        event: titles[selected % 10]
      })
    }else{
      selectedArr.forEach((element, i) => {
        if(element === selected){
          setChartData(chartData.filter((num, j) => j !== i))
        }
      });
      setSelectedArr(selectedArr.filter(num => num !== selected))
    }
  }
  return (
    <>
      <Container className="setting-date">
        <DatePicker
          callback={callbackDateRange}
        />
        <ButtonGroup
          buttons={cycleButtons}
          callback={callbackDateCycle}
        />
      </Container>
      <Container className="mt20">
        <NewChart 
          data={chartData}
          categories={chartCategories}
        />
      </Container>
      <Container className="mt20">
        <Table
          titles={titles}
          refresh={refresh}
          dataSet={tableData}
          callback={callbackSelectedCell}
        />
      </Container>
    </>
  )
}

export default SellerStatistics
