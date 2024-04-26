import React from 'react'
import { X } from 'lucide-react'
import { Chart, Tooltip, Line, Annotation, Slider } from 'bizcharts'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import CarSelect from '../CarSelect'
import { Button } from '../../../components/ui/button'
import sendRequest from '../../../plugins/axios'
import { useToast } from '../../../components/ui/use-toast'

// const _dataTemplate = [
//   { date: '2020-05', retail_sales: 3892 },
//   { date: '2020-06', retail_sales: 3695 },
//   { date: '2020-07', retail_sales: 3685 },
//   { date: '2020-08', retail_sales: 4071 },
//   { date: '2020-09', retail_sales: 4548 },
//   { date: '2020-10', retail_sales: 4630 },
//   { date: '2020-11', retail_sales: 5084 },
//   { date: '2020-12', retail_sales: 5397 },
//   { date: '2021-01', retail_sales: 6092 },
//   { date: '2021-02', retail_sales: 2724 },
//   { date: '2021-03', retail_sales: 5738 },
//   { date: '2021-04', retail_sales: 5077 },
//   { date: '2021-05', retail_sales: 6752 },
//   { date: '2021-06', retail_sales: 5916 },
//   { date: '2021-07', retail_sales: 5502 },
//   { date: '2021-08', retail_sales: 5742 },
//   { date: '2021-09', retail_sales: 6599 },
//   { date: '2021-10', retail_sales: 8020 },
//   { date: '2021-11', retail_sales: 7884 },
//   { date: '2021-12', retail_sales: 7807 },
//   { date: '2022-01', retail_sales: 7049 },
//   { date: '2022-02', retail_sales: 3380 },
//   { date: '2022-03', retail_sales: 6798 },
//   { date: '2022-04', retail_sales: 3968 },
//   { date: '2022-05', retail_sales: 10503 },
//   { date: '2022-06', retail_sales: 8903 },
//   { date: '2022-07', retail_sales: 6864 },
//   { date: '2022-08', retail_sales: 11683 },
//   { date: '2022-09', retail_sales: 13522 },
//   { date: '2022-10', retail_sales: 14507 },
//   { date: '2022-11', retail_sales: 15323 },
//   { date: '2022-12', retail_sales: 13832 },
//   { date: '2023-01', retail_sales: 5091 },
//   { date: '2023-02', retail_sales: 16827 },
//   { date: '2023-03', retail_sales: 26392 },
//   { date: '2023-04', retail_sales: 19569 },
// ]
const scaleTemplate = {
  retail_sales: {
    min: 0,
    tickCount: 10,
    alias: '销量',
    type: 'linear-strict',
  },
}

const initData = [{ date: '2023-06', retail_sales: undefined }]

export default function Forecast() {
  const [ifForecast, setIfForecast] = React.useState(false)
  const [forecastNum, setForecastNum] = React.useState(3)
  const [data, setData] = React.useState(initData)

  const [field, setFiled] = React.useState({
    brand: undefined,
    subBrand: undefined,
    model: undefined,
  })

  const [selectItems, setSelectItems] = React.useState({
    brand: [],
    subBrand: [],
    model: [],
  })

  const getAllSales = () => {
    sendRequest({ url: '/all_sales', target: 'fas' }).then(resp => {
      setData(resp?.data ?? initData)
    })
  }

  const { toast } = useToast()

  const handleSearchSale = () => {
    if (!field.model) {
      toast({
        title: '销量查询提示',
        description: '请选择相应的车型!!',
      })
      return
    }

    sendRequest({ url: '/predict', target: 'fas', params: { model_id: field.model.id } }).then(resp => {
      if (!resp || !(resp?.data ?? []).length) {
        setData(initData)
        toast({
          title: '预测提示',
          description: '未查询到销量数据/(ㄒoㄒ)/~~',
        })
      } else setData(resp.data)

      if (ifForecast) {
        setIfForecast(false)
      }
    })
  }

  const handleForecast = () => {
    if (!field.model) {
      toast({
        title: '预测提示',
        description: '请选择相应的车型!!',
      })
      return
    }

    sendRequest({ url: '/predict', target: 'fas', params: { model_id: field.model.id, number: forecastNum } }).then(resp => {
      if (!resp || !(resp?.data ?? []).length) {
        setData(initData)
        toast({
          title: '预测提示',
          description: '未查询到销量数据/(ㄒoㄒ)/~~',
        })
        return
      }
      setData(resp.data)
      if (resp.data[0].retail_sales) {
        setTimeout(() => {
          setIfForecast(true)
        }, 500)
      }
    })
  }

  const handleReset = () => {
    setFiled({
      brand: undefined,
      subBrand: undefined,
      model: undefined,
    })

    setSelectItems(preValue => ({
      ...preValue,
      subBrand: [],
      model: [],
    }))

    setForecastNum(3)
    setIfForecast(false)

    getAllSales()
  }

  React.useEffect(() => {
    getAllSales()
  }, [])

  const colors = ['#6394f9', '#62daaa']
  const forecastNums = [3, 4, 5]
  let flag = false
  return (
    <div className="w-auto mx-auto mt-6">
      <div className="max-w-5xl mx-auto">
        <div id="select-menu" className="w-[924px] flex items-center space-x-4 text-gray-950 font-medium mb-5 mx-auto">
          <CarSelect
            selectItems={selectItems}
            setSelectItems={setSelectItems}
            field={field}
            setFiled={setFiled}
            selectItemWidth="w-[172px]"
          />
          <Button onClick={handleSearchSale}>查询销量</Button>
          <Select value={forecastNum} defaultValue={forecastNum} onValueChange={value => setForecastNum(value)}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="预测月数" />
            </SelectTrigger>
            <SelectContent className="SelectContent" position="popper">
              {forecastNums.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleForecast}>预测</Button>
          <Button variant="ghost" onClick={handleReset}>
            <X className="mr-2 h-4 w-4" />
            重置
          </Button>
        </div>
        <h2 className="mb-2">{field.model ? `${field.subBrand.name} ${field.model.name}销量数据` : '总销量数据'}</h2>
        <Chart
          scale={scaleTemplate}
          autoFit
          height={500}
          data={data}
          onGetG2Instance={c => {
            const slider = c.getController('slider').slider.component
            // slider.on('sliderchange', console.log)
            c.on('afterrender', () => {
              // 获取设置的slider padding
              if (slider.cfg.padding) {
                const [_paddingTop, _paddingRight, _paddingBottom, paddingLeft] = slider.cfg.padding
                // 重新计算slider宽度，并更新配置重绘
                slider.update({
                  ...slider.cfg,
                  width: slider.cfg.width - paddingLeft,
                })
                slider.render()
              }
            })
          }}
        >
          <Tooltip shared />
          <Line position="date*retail_sales" color={colors[0]} size={3} shape="smooth" />
          {ifForecast ? (
            <Annotation.RegionFilter
              top
              start={[data[data.length - 1 - forecastNum].date, 'min']}
              end={[data[data.length - 1].date, 'max']}
              color={colors[1]}
              animate={true}
            />
          ) : (
            <></>
          )}
          <Slider
            padding={[10, 50, 0, 0]}
            formatter={(v, _d, _i) => {
              flag = !flag
              const [year, month] = v?.split('-') ?? ['2023', '06']
              const formattedMonth = parseInt(month, 10)
              const formattedDate = year + '年' + formattedMonth + '月'
              return `${formattedDate}年${flag ? '开始' : '结束'}`
            }}
          />
        </Chart>
      </div>
    </div>
  )
}
