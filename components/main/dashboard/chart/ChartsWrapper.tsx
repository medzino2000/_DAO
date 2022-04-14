import React, { useState, useEffect, useRef } from 'react'
import LineChart from './LineChart'
import CandlestickChart from './CandlestickChart'
import OhlcChart from '../OhlcChart'
import { MdOutlineStackedLineChart } from 'react-icons/md'
import { MdOutlineWaterfallChart } from 'react-icons/md'
import { RiArrowDownSLine } from 'react-icons/ri'
import { FiBarChart2 } from 'react-icons/fi'
import moment from 'moment'

import { getData } from '../../../../utils/chartData'

const styles = {
  date_input: 'rounded-lg border border-orange-FIDIS px-2 py-1',
}
const ChartsWrapper = ({ chartData }) => {
  // state for showing & hiding token type select dropdown
  const [tokenTypeOpen, setTokenTypeOpen] = useState(false)
  // state for showing & hiding custom range dropdown
  const [customRangeOpen, setCustomRangeOpen] = useState(false)
  // state for showing & hiding custom timeframee dropdown
  const [timeframeOpen, setTimeframeOpen] = useState(false)
  // state for giving user the ability to set chart interval by 15min,30min ...
  const [chartInterval, setChartInterval] = useState(1)
  // state for giving user the ability to set chart timeframe by month or week ...
  const [timeframe, setTimeframe] = useState('month')
  // state for showing current type of charts
  const [currentChart, setCurrentChart] = useState('line_chart')
  // state for start & end chart date values
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    chartData.length == 0
      ? ''
      : setStartDate(
          moment(
            chartData[chartData.length - 1].date.getTime() -
              24 * 60 * 60 * 1000 * 365
          ).format('YYYY-MM-DDThh:mm')
        )
    chartData.length == 0
      ? ''
      : setEndDate(
          moment(chartData[chartData.length - 1].date).format(
            'YYYY-MM-DDThh:mm'
          )
        )
  }, [chartData])
  const timeframeData = [
    { name: 'hour', text: '1H' },
    { name: 'day', text: '1D' },
    { name: 'week', text: '1W' },
    { name: 'month', text: '1M' },
    { name: 'year', text: '1Y' },
  ]

  // time aggregation logic (candle interval)
  const timeIntervalData = [
    { name: '5MIN', value: 1 },
    { name: '15MIN', value: 3 },
    { name: '30MIN', value: 6 },
    { name: '1H', value: 12 },
    { name: '3H', value: 36 },
    { name: '6H', value: 72 },
    { name: '1D', value: 288 },
    { name: '1W', value: 2016 },
    { name: '1M', value: 8640 },
  ]

  //give data an ohlc structure
  const ohlcData = chartData.map((data) => {
    const newDataObject = [
      data.date,
      data.low,
      data.open,
      data.close,
      data.high,
    ]
    return newDataObject
  })

  let finalData = []
  while (ohlcData.length > 0) {
    const intervalArray = ohlcData.splice(0, chartInterval)

    const newArr = [
      intervalArray[0][0],
      intervalArray[0][1],
      intervalArray[0][2],
      intervalArray[intervalArray.length - 1][3],
      intervalArray[intervalArray.length - 1][4],
    ]
    finalData.push(newArr)
  }

  //* rerenders when size changes (in order to chart fits automatically place when mininav clicked)

  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const resize_ob = new ResizeObserver(function (entries) {
      // since we are observing only a single element, so we access the first element in entries array
      let rect = entries[0].contentRect

      // current width & height
      let width = rect.width
      let height = rect.height
      setSize({ width, height })

      // console.log('Current Width : ' + width)
      // console.log('Current Height : ' + height)
    })

    // start observing for resize
    resize_ob.observe(document.querySelector('#chart_wrapper'))
  }, [size.width])
  return (
    <div
      // ref={ref}
      id="chart_wrapper"
      className="class__name relative col-span-9 flex h-full w-full flex-col bg-black/30"
    >
      {/* customization options */}
      <div className="flex w-full items-center justify-start gap-6  py-3 pl-6 xxl:gap-10 xxl:pl-4">
        {/* chart type buttons */}
        <div className="z-40 flex items-center gap-2">
          {[
            { name: 'line_chart', icon: MdOutlineStackedLineChart },
            { name: 'candlestick', icon: MdOutlineWaterfallChart },
            { name: 'ohlc', icon: FiBarChart2 },
          ].map((chart, index) => (
            <button
              key={index}
              className={`border-2 border-orange-FIDIS px-2 xxl:border-4
              ${
                currentChart == chart.name
                  ? 'bg-orange-FIDIS'
                  : 'bg-transaprent'
              }
            `}
              onClick={() => setCurrentChart(chart.name)}
            >
              <chart.icon
                color={currentChart == chart.name ? 'white' : '#f09d01'}
                className="h-6 w-6 xxl:h-12 xxl:w-12"
              />
            </button>
          ))}
        </div>

        {/* token type */}
        <div className="relative">
          <button
            onClick={() => {
              setTokenTypeOpen((p) => !p)
              setCustomRangeOpen(false)
              setTimeframeOpen(false)
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-orange-FIDIS px-2 py-1 text-white disabled:opacity-75"
            // disabled={currentChart == 'line_chart' ? false : true}
          >
            Crypto Index
            <RiArrowDownSLine
              className={`${
                currentChart == 'line_chart' ? 'cursor-pointer' : 'cursor-auto'
              }`}
            />
          </button>
          {tokenTypeOpen && (
            <div className="absolute top-10 right-0 z-40 flex flex-col rounded bg-black px-2 py-2 font-bold text-orange-FIDIS xxl:top-14">
              {['FI25', 'GoldFI', 'MetaFi', 'NFTFI', 'GameFI', 'DeFiFI'].map(
                (token, i) => (
                  <div className="flex items-center font-bold " key={i}>
                    <input
                      type={currentChart == 'line_chart' ? 'checkbox' : 'radio'}
                      name="token-checkbox"
                      id="token-checkbox"
                      className="mr-1.5 cursor-pointer"
                    />
                    <label htmlFor="token-checkbox">{token}</label>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* min & max dates inputes */}
        <div className="relative">
          <button
            onClick={() => {
              setCustomRangeOpen((p) => !p)
              setTimeframeOpen(false)
              setTokenTypeOpen(false)
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-orange-FIDIS px-2 py-1 text-white"
          >
            Time range <RiArrowDownSLine />
          </button>
          {customRangeOpen && (
            <div className="absolute top-10 right-0 z-40 flex flex-col rounded bg-black px-4 py-3 font-bold text-orange-FIDIS xxl:top-14">
              <h2>Custom range</h2>
              <div className="my-3 flex items-center gap-2">
                <label htmlFor="start-date" className="w-20">
                  From
                </label>
                {/* <input
                  type="time"
                  name="start-time"
                  id="start-time"
                  className={styles.date_input}
                /> */}
                <input
                  type="datetime-local"
                  name="start-date"
                  id="start-date"
                  className={styles.date_input}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="end-date" className="w-20">
                  To
                </label>
                {/* <input
                  type="time"
                  name="end-time"
                  id="end-time"
                  className={styles.date_input}
                /> */}
                <input
                  type="datetime-local"
                  name="end-date"
                  id="end-date"
                  className={styles.date_input}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        {/* timeframe options */}
        {/* <div className="z-40 flex items-center border-b-4 border-orange-FIDIS">
          {timeframeData.map((t, index) => (
            <button
              key={index}
              className={`px-2 py-1 text-center text-xs xxl:px-4 xxl:py-3  ${
                timeframe == t.name
                  ? 'bg-orange-FIDIS text-white'
                  : 'bg-transparent text-orange-FIDIS'
              }`}
              onClick={() => setTimeframe(t.name)}
            >
              {t.text}
            </button>
          ))}
        </div> */}

        {/* chart interval options */}
        <div className="relative">
          <button
            onClick={() => {
              setTimeframeOpen((p) => !p)
              setCustomRangeOpen(false)
              setTokenTypeOpen(false)
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-orange-FIDIS px-2 py-1 text-white"
          >
            Time Interval <RiArrowDownSLine />
          </button>
          {timeframeOpen && (
            <div className="absolute top-10 -left-24 z-40 flex items-center border-b-4 border-orange-FIDIS bg-black xxl:top-14">
              {timeIntervalData.map((t, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 text-center text-xs xxl:px-4 xxl:py-3  ${
                    chartInterval == t.value
                      ? 'bg-orange-FIDIS text-white'
                      : 'bg-transparent text-orange-FIDIS'
                  }`}
                  onClick={() => setChartInterval(t.value)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-8"></div>
      </div>

      {/* charts */}
      <div className="h-full w-full">
        {currentChart == 'line_chart' ? (
          <LineChart
            timeframe={timeframe}
            startDate={startDate}
            endDate={endDate}
            chartData={finalData}
          />
        ) : currentChart == 'candlestick' ? (
          <CandlestickChart
            chartData={finalData}
            startDate={startDate}
            endDate={endDate}
            chartInterval={chartInterval}
          />
        ) : currentChart == 'ohlc' ? (
          'Under Dev'
        ) : (
          // <OhlcChart
          //   chartData={finalData}
          //   startDate={startDate}
          //   endDate={endDate}
          // />
          ''
        )}
      </div>
    </div>
  )
}

export default ChartsWrapper
