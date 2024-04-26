import React from 'react'

import sendRequest from '../../../plugins/axios'
import { useToast } from '../../../components/ui/use-toast'
import { handleResponse } from '../../../utils/tool'
import { Link } from 'react-router-dom'

// const carInfos = [
//   {
//     brandId: 1,
//     brandName: '法拉利',
//     subBrandName: '法拉利',
//     modelId: 1,
//     modelName: 'SF90',
//     maxPrice: 510.8,
//     minPrice: 498.8,
//     imgPath: 'https://m2.auto.itc.cn/logo/model/3973.jpg',
//   },
// ]

export default function Star() {
  const [carInfos, setCarInfos] = React.useState([])

  const { toast } = useToast()

  React.useEffect(() => {
    sendRequest({ url: '/user/user_stars', method: 'post' }).then(resp => {
      handleResponse(toast, resp, '用户提示')
      if (resp?.data) {
        setCarInfos(resp.data.list)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteStar = modelId => {
    sendRequest({ url: `/user/cancel_star/${modelId}`, method: 'post' }).then(resp => {
      if (resp.code === 200) {
        toast({ title: '我的收藏', description: '删除成功!!' })
        setCarInfos(preValue => {
          const index = preValue.findIndex(carInfo => carInfo.modelId === modelId)
          if (index !== -1) {
            preValue.splice(index, 1)
          }
          return preValue
        })
      }
    })
  }

  return (
    <div className="flow-root max-w-6xl mx-auto p-12">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900">我的收藏</h3>
      <ul role="list" className="-my-6 divide-y divide-gray-200 mt-6">
        {carInfos.length ? (
          carInfos.map(info => (
            <li key={info.modelId} className="flex py-6">
              <div className="h-28 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={info.imgPath} className="h-full w-full object-cover object-center" />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/cardetail/${info.modelId}`}>{info.modelName}</Link>
                    </h3>
                    <p className="ml-4">
                      ￥{info.minPrice} - {info.maxPrice}w
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{info.brandName}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleDeleteStar(info.modelId)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center font-semibold text-2xl text-gray-500 mt-16">暂无数据，快去收藏吧 ~~~</p>
        )}
      </ul>
    </div>
  )
}
