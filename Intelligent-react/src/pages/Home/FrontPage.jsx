import React from 'react'
import { createSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import sendRequest from '../../plugins/axios'
import { ListItem } from './BuyCar'
import CarSelect from './CarSelect'

export default function FrontPage() {
  const [selectItems, setSelectItems] = React.useState({
    brand: [],
    subBrand: [],
    model: [],
  })
  const [recommendCar, setRecommendCar] = React.useState([])

  const [field, setFiled] = React.useState({
    brand: undefined,
    subBrand: undefined,
    model: undefined,
  })

  const searchLink = React.useMemo(() => {
    return `/buycar?${createSearchParams({
      ...(field.brand && { brand: field.brand.name }),
      ...(field.subBrand && { subBrand: field.subBrand.name }),
      ...(field.model && { model: field.model.name }),
    }).toString()}`
  }, [field])

  React.useEffect(() => {
    // getAllBrand().then(resp => {
    //   setSelectItems({
    //     brand: resp?.data ?? [],
    //     subBrand: [],
    //     model: [],
    //   })
    // })

    sendRequest({ url: '/car/car_condition', params: { pageIndex: 1, pageSize: 3 } }).then(resp => {
      setRecommendCar(resp?.data.list ?? [])
    })
  }, [])

  return (
    <div className="absolute top-0 w-full h-full">
      <div id="hreo" className="relative bg-transparent w-full h-full pt-32">
        <div className="relative max-w-4xl mx-auto z-10">
          <div id="select-bar" className="flex items-center space-x-4 text-white font-medium">
            <CarSelect
              selectItems={selectItems}
              setSelectItems={setSelectItems}
              field={field}
              setFiled={setFiled}
              selectItemWidth="w-[256px]"
            />
            <Link
              to={searchLink}
              className="w-24 text-center leading-10 rounded border-2 hover:bg-white hover:text-gray-900 transition-colors duration-500 ease-in-out delay-1000"
            >
              搜索
            </Link>
          </div>
        </div>
        <div id="recommended" className="relative max-w-5xl mx-auto z-10">
          <h1 className="text-center text-white text-3xl font-bold my-8">今日推荐</h1>
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            {recommendCar.map(car => (
              <ListItem key={car.modelId} carInfo={car} hasShadow={false} />
            ))}
          </div>
        </div>
        <div className="video-container">
          <video
            className="h-full w-full"
            preload="auto"
            data-autoplay-desktop="true"
            data-autoplay-portrait="true"
            data-autoplay-mobile="true"
            data-play-on-hover="false"
            muted
            loop
            data-src-desktop="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Homepage-Test_Drive-NA-Desktop.mp4"
            data-object-fit="true"
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Homepage-Test_Drive-NA-Desktop.mp4"
            data-loaded="true"
            autoPlay
          />
        </div>
      </div>
    </div>
  )
}
