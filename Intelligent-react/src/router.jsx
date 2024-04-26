import React from 'react'
import { useRoutes, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import BuyCar from './pages/Home/BuyCar'
import SaleCar from './pages/Home/SaleCar'
import Forecast from './pages/Home/Forecast'
import Account from './pages/Home/User'
import Info from './pages/Home/User/Info'
import Sale from './pages/Home/User/Sale'
import Star from './pages/Home/User/Star'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/404'
import Backstate from './pages/Backstage'
import CarDetail from './pages/Home/CarDetail'
import FrontPage from './pages/Home/FrontPage'
import { GlobalState } from './App'

const routers = [
  // 主视图
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '', element: <FrontPage /> },
      { path: 'buycar', element: <BuyCar /> },
      { path: 'salecar', element: <SaleCar /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'cardetail/:modelId', element: <CarDetail /> },
      {
        // 用户视图
        path: 'account/',
        element: <Account />,
        private: { authPrivate: true },
        children: [
          { path: 'info', element: <Info /> },
          { path: 'sale', element: <Sale /> },
          { path: 'star', element: <Star /> },
        ],
      },
    ],
  },
  { path: '/bk/*', private: { adminPrivate: true }, element: <Backstate /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/*', element: <NotFound /> },
]

function isPathMatched(path, pattern) {
  // /^/bk/.*$/
  const escapedRoute = pattern.replace(/\//g, '\\/')
  // console.log(pattern, ':', `^${escapedRoute.replace(/\*/g, '.*')}$`)
  const regexPattern = new RegExp(`^${escapedRoute.replace(/\*/g, '.*')}$`)
  return regexPattern.test(path)
}

const checkPrivate = (parentPath, routerItem, path) => {
  for (const routerData of routerItem) {
    // console.log('checkPrivate: ', path, 'pattern: ', parentPath + routerData.path)
    if (isPathMatched(path, parentPath + routerData.path, 1)) {
      return routerData?.private ?? null
    }
    if (
      routerData?.private &&
      isPathMatched(
        path,
        parentPath + (routerData.path.endsWith('*') ? routerData.path.replace(/\/\*/g, '*') : routerData.path + '*')
      )
    )
      return routerData.private
    if (routerData.children) {
      const res = checkPrivate(parentPath + routerData.path, routerData.children, path)
      if (res) return res
    }
  }
  return null
}

export function RouterBeforeEach() {
  const { pathname } = useLocation()
  const [globalState] = React.useContext(GlobalState)
  const [toElement, setToElement] = React.useState(<Outlet />)

  React.useEffect(() => {
    const privateInfo = checkPrivate('', routers, pathname)
    // console.log('path: ', pathname, 'private: ', privateInfo)
    // console.log(routers)
    if (privateInfo?.authPrivate) {
      if (!globalState.isLogin) {
        setToElement(<Navigate to="/login" />)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return toElement
}

export default function RouterView() {
  const { pathname } = useLocation()
  const [globalState] = React.useContext(GlobalState)
  const navigate = useNavigate()

  React.useEffect(() => {
    const privateInfo = checkPrivate('', routers, pathname)
    // console.log('path: ', pathname, 'private: ', privateInfo)
    // console.log(routers)
    if (privateInfo?.adminPrivate) {
      if (!globalState?.userInfo) {
        navigate('/')
        return
      }
      // console.log(globalState.userInfo.permission === 1)
      if (!(globalState.userInfo.permission === 1)) navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const routes = useRoutes(routers)

  return routes
}
