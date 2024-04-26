import React from 'react'

import sendRequest from '../../../plugins/axios'
import { useToast } from '../../../components/ui/use-toast'
import { handleResponse } from '../../../utils/tool'
// const saleInfos = [
//   {
//     brandId: 1,
//     brandName: '法拉利',
//     subBrandId: 2,
//     subBrandName: '法拉利',
//     modelId: 3,
//     modelName: 'SF90',
//     modelType: 'sports',
//     name: '2021款 3.9T V8 Spider',
//     displacement: '6.0',
//     dynamicType: '涡轮增压',
//     horsepower: 1000,
//     price: 800,
//     info: '无级变速 前置前驱',
//     imgPath: 'https://m2.auto.itc.cn/logo/model/3973.jpg',
//   },
// ]

export default function Sale() {
  const [saleInfo, setSaleInfo] = React.useState([])

  const { toast } = useToast()
  React.useEffect(() => {
    const fetchData = async () => {
      const resp = await sendRequest({ url: '/user/user_orders', method: 'post', params: { pageSize: 40 } })
      handleResponse(toast, resp, '用户提示')
      if (resp?.data) {
        setSaleInfo(resp.data.list)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flow-root max-w-6xl mx-auto p-12">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900">已购买</h3>
      <ul className="max-w-6xl mx-auto py-6 divide-y divide-slate-100">
        {saleInfo.length ? (
          saleInfo.map(info => (
            <article key={info.modelId} className="flex items-start space-x-6 p-6">
              <div className="h-28 w-48 flex-shrink-0 overflow-hidden">
                <img src={info.imgPath} className="h-full w-full object-cover object-center" />
              </div>
              <div className="min-w-0 relative flex-auto justify-between">
                <h2 className="font-semibold text-slate-900 truncate pr-20">
                  {info.modelName} {info.name}
                </h2>
                <dl className="mt-4 flex flex-wrap text-sm leading-6 font-medium">
                  <div className="absolute top-0 right-0 flex items-center space-x-1">
                    <dt className="text-sky-500">
                      <span className="sr-only">价格</span>
                    </dt>
                    <dd>￥ {info.price}w</dd>
                  </div>
                  <div className="flex space-x-5">
                    {info.modelType != '' && <dd className="px-1.5 ring-1 ring-slate-200 rounded">{info.modelType}</dd>}
                    {info.displacement != '' && <dd className="px-1.5 ring-1 ring-slate-200 rounded">{info.displacement}L</dd>}
                    {info.dynamicType != '' && <dd className="px-1.5 ring-1 ring-slate-200 rounded">{info.dynamicType}</dd>}
                    {info.horsepower != '' && <dd className="px-1.5 ring-1 ring-slate-200 rounded">{info.horsepower}HP</dd>}
                    {info.info != '' && <dd className="px-1.5 ring-1 ring-slate-200 rounded">{info.info}</dd>}
                  </div>
                  <div className="flex-none w-full mt-4 font-normal">
                    <dd className="text-slate-400">{info.subBrandName}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center font-semibold text-2xl text-gray-500 mt-16">暂无数据，快去购买吧 ~~~</p>
        )}
      </ul>
    </div>
  )
}
