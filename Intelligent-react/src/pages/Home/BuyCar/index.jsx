import React from 'react'
import { createSearchParams, useLocation } from 'react-router-dom'

import Option from './Option'
import List from './List'
import ListItem from './ListItem'
import sendRequest from '../../../plugins/axios'
import Pagination from './Pagination'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

function getOptionResult(option) {
  return sendRequest({ url: '/car/car_condition', params: option })
}

export default function BuyCar() {
  const { search } = useLocation()
  const searchParams = createSearchParams(search)
  const [option, setOption] = React.useState({
    brand: searchParams.get('brand') ?? null,
    subBrand: searchParams.get('subBrand') ?? null,
    model: searchParams.get('model') ?? null,
    type: null,
    dynamicType: null,
    minPrice: null,
    maxPrice: null,
  })

  const [carInfo, setCarInfo] = React.useState([])
  const total = React.useRef(0)
  const [searchKeyWord, setSearchKeyWord] = React.useState('')

  React.useEffect(() => {
    const getResult = async () => {
      const results = await getOptionResult({ ...option, pageIndex: 1, pageSize: 20 })
      console.log(results)
      if (results != null) {
        // 更新展示数据
        setCarInfo(results.data?.list ?? [])
        total.current = results.data?.total ?? 0
      }
    }

    setSearchKeyWord('')
    getResult()
  }, [option])

  const paginationHandle = (pageIndex, pageSize) => {
    if (searchKeyWord !== '') {
      sendRequest({
        url: '/search',
        target: 'fas',
        params: { keyword: searchKeyWord, page_index: pageIndex, page_size: pageSize },
      }).then(resp => {
        if (resp != null) {
          setCarInfo(resp.data.list)
          total.current = resp.data.total
        }
      })

      return
    }

    const getResult = async () => {
      const results = await getOptionResult({ ...option, pageIndex, pageSize })
      if (results != null) {
        // 更新展示数据
        setCarInfo(results.data.list)
        total.current = results.data.total
      }
    }

    getResult()
  }

  return (
    <>
      <div className="max-w-7xl mx-auto h-14 px-4 flex relative mt-4">
        <Input
          placeholder="搜索"
          className="w-full pl-[52px] bg-slate-100 hover:bg-slate-50"
          onChange={e => setSearchKeyWord(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') paginationHandle(1, 20)
          }}
          value={searchKeyWord}
        />
        <Button variant="ghost" className="absolute left-4 top-0" onClick={() => paginationHandle(1, 20)}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>
      </div>
      <Option option={option} setOption={setOption} />
      {carInfo.length ? (
        <List>
          {carInfo.map((car, index) => (
            <ListItem key={index} carInfo={car} hasShadow={false} />
          ))}
        </List>
      ) : (
        <p className="w-full text-center font-semibold text-2xl text-gray-500 mt-16">暂无数据 ( ╯□╰ )</p>
      )}
      <Pagination count={Math.ceil(total.current / 20)} onClick={paginationHandle} />
    </>
  )
}

export { List, ListItem }
