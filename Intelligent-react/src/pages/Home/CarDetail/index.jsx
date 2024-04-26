// import * as React from 'react'
import React from 'react'
import { MoveLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Carousel from './Carousel'
import { Button } from '../../../components/ui/button'
import sendRequest from '../../../plugins/axios'
import { GlobalState } from '../../../App'
import { useToast } from '../../../components/ui/use-toast'
import { handleResponse } from '../../../utils/tool'

export default function CarDetail() {
  const [carDetailInfo, setCarDetailInfo] = React.useState({
    imgStart: [],
    imgInside: [],
    imgBottom: [],
    carInfos: [],
    carModelInfo: {
      modelId: null,
      brandName: '',
      subBrandName: '',
      modelName: '',
      maxPrice: 0,
      minPrice: 0,
      imgPath: '',
    },
  })

  const [globalState] = React.useContext(GlobalState)
  const [isStar, setIsStar] = React.useState(false)

  const navigate = useNavigate()
  const { modelId } = useParams()
  const { toast } = useToast()

  React.useEffect(() => {
    if (isNaN(modelId)) {
      navigate('/404', { replace: true })
      return
    }
    const initData = async () => {
      const resp = await sendRequest({ url: `/car/car_detail/${modelId}` })
      if (resp === null) {
        navigate('/404', { replace: true })
        return
      }
      resp.data.imgStart = []
      setCarDetailInfo(resp.data)
    }

    initData()
    if (globalState.isLogin) {
      sendRequest({ url: `/star/if_star/${modelId}`, method: 'post' }).then(resp => {
        setIsStar(resp?.data ?? false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSale = carId => {
    if (!globalState.isLogin) {
      toast({
        title: '提示',
        description: '请先登录',
      })
      return
    }

    sendRequest({ url: `/sale/buy_car/${carId}`, method: 'post' }).then(resp => {
      handleResponse(toast, resp, '购买汽车')
    })
  }

  const handleStar = () => {
    if (!globalState.isLogin) {
      toast({
        title: '提示',
        description: '请先登录',
      })
      return
    }

    sendRequest({ url: `/user/${isStar ? 'cancel_star' : 'star'}/${modelId}`, method: 'post' }).then(resp => {
      handleResponse(toast, resp, '提示')
      if (resp.code === 200) {
        setIsStar(!isStar)
      }
    })
  }

  return (
    <div className="pb-8">
      <div className="max-w-7xl mx-auto mt-3">
        <div>
          <Link
            to="/buycar"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            {' '}
            <MoveLeft className="w-5 h-5 mr-3" />
            搜索
          </Link>
        </div>
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-3xl leading-6 tracking-widest my-2 text-blue-900 mt-2">{`${carDetailInfo.carModelInfo.subBrandName} ${carDetailInfo.carModelInfo.modelName}`}</h1>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
            type="button"
            aria-label="Like"
            onClick={handleStar}
          >
            <svg width="20" height="20" fill={isStar ? 'red' : 'currentColor'} aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
        <h2 className="flex font-bold text-xl leading-6 tracking-widest my-3">
          <span className="font-medium">
            ￥{`${carDetailInfo.carModelInfo.minPrice} - ${carDetailInfo.carModelInfo.maxPrice}`}w
          </span>
          <span className="border border-gray-300 mx-3 my-1" />
          <span>{carDetailInfo.carModelInfo.brandName}</span>
        </h2>
      </div>
      <div className="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2 px-4">
        <Carousel className="col-span-2 row-span-2 rounded-xl h-[494px]" images={carDetailInfo.imgStart} />
        {carDetailInfo.imgInside?.length ? (
          Array.from({ length: Math.min(4, carDetailInfo.imgInside.length) }, (_, index) => index)?.map(index => (
            <div key={index}>
              <img src={carDetailInfo.imgInside[index]} className="w-full h-full object-cover rounded" />
            </div>
          ))
        ) : (
          <p className="text-center font-semibold text-gray-500">暂无其他图片数据 ~~</p>
        )}
      </div>
      <div className="grid grid-cols-3 max-w-7xl mx-auto">
        <div className="col-span-2">
          <h1 className="my-6 text-xl">车型列表</h1>
          <ul className="space-y-3">
            {carDetailInfo.carInfos.length ? (
              carDetailInfo.carInfos.map(item => (
                <li key={item.id}>
                  <div className="grid px-5 py-3 bg-slate-200 rounded" style={{ gridTemplateColumns: '360px 1fr 1fr 172px' }}>
                    <span>{`${item.name.slice(0, 5)}-${item.displacement ?? 0}T / ${item.horsepower}HP`}</span>
                    <span>指导价</span>
                    <span>经销商报价</span>
                  </div>
                  <div
                    className="grid grid-rows-2 px-5 py-4 bg-slate-50 mt-2 font-medium hover:shadow-lg"
                    style={{ gridTemplateColumns: '360px 1fr 1fr 172px' }}
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-600">${item.price}万</span>
                    <span className="text-black">${item.price}万</span>
                    <Button className="w-20 h-8" onClick={() => handleSale(item.id)}>
                      购车
                    </Button>
                    <div className="col-span-4 flex space-x-3 mt-1 text-blue-500">
                      <span className="px-1 border text-sm rounded leading-7">{item.type}</span>
                      <span className="px-1 border text-sm rounded leading-7">{item.dynamicType}</span>
                      <span className="px-1 border text-sm rounded leading-7">{item.info}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center font-semibold text-1xl text-gray-500 mt-16">暂无可购买车型，看看其他车型吧 ~~~</p>
            )}
          </ul>
        </div>
        <div className="px-8">
          <h1 className="my-6 text-xl">汽车底盘图篇</h1>
          <ul className="space-y-4">
            {carDetailInfo.imgBottom?.map((imgPath, index) => (
              <li key={index}>
                <img src={imgPath} className="object-cover w-full rounded" />
              </li>
            )) ?? <p className="text-center font-semibold text-gray-500 mt-16">暂无图片数据 ~~</p>}
          </ul>
        </div>
      </div>
    </div>
  )
}
