import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { DataTable } from './DataTable'

import MenuNav from './MenuNav'

const backstageRouter = {
  '/bk': 'user',
  '/bk/': 'user',
  '/bk/user': 'user',
  '/bk/brand': 'brand',
  '/bk/sub_brand': 'sub_brand',
  '/bk/car_model': 'car_model',
  '/bk/car_info': 'car_info',
  '/bk/car_sale': 'car_sale',
  '/bk/car_star': 'car_star',
}

export default function TaskPage() {
  const [tableName, setTableName] = React.useState('user')

  const { pathname } = useLocation()
  const { navigate } = useNavigate()
  React.useEffect(() => {
    // 在路径变化时更新状态
    if (backstageRouter[pathname] !== 'undefined') {
      setTableName(backstageRouter[pathname])
    } else {
      navigate('/404', { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className="flex p-6 w-full h-full">
      <div className="flex flex-col justify-center w-full max-w-[248px] h-full">
        <MenuNav tableName={tableName} />
      </div>
      <div className="h-full w-full overflow-y-auto">
        <section className="container relative pb-10">
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl ">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              {/* <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div> */}
              <DataTable tableName={tableName} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
