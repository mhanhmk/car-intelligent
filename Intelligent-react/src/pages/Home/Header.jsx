import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import UserNav from './UserNav'
import { classNames } from '../../utils/tool'
import { GlobalState } from '../../App'

const pages = [
  { name: '首页', href: '/' },
  { name: '买车', href: '/buycar' },
  { name: '卖车', href: '/salecar' },
  { name: '预测', href: '/forecast' },
]

function LoginRegister() {
  return (
    <div className="flex flex-1 items-center justify-end space-x-6">
      <Link to="/login" className="text-sm font-medium">
        登入
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <Link to="/register" className="text-sm font-medium">
        注册
      </Link>
    </div>
  )
}

export default function Header() {
  // 记录登入状态
  // const [loginState, _setLoginState] = React.useState(true)
  const [globalState] = React.useContext(GlobalState)

  const [backdropStyle, setBackdropStyle] = React.useState({
    '--tds-animate-backdrop-transition': 'opacity .5s ease, visibility 0s .5s',
    '--tds-animate-backdrop-opacity': '0',
    '--tds-animate-backdrop-visibility': 'hidden',
    '--tds-animate-backdrop-top': '12px',
    '--tds-animate-backdrop-left': '782px',
    '--tds-animate-backdrop-height': '32px',
    '--tds-animate-backdrop-width': '110px',
  })

  const handleMouseEnter = _event => {
    setBackdropStyle(preValue => ({
      ...preValue,
      '--tds-animate-backdrop-opacity': '1',
      '--tds-animate-backdrop-visibility': 'visible',
    }))
  }

  const handleMouseLeave = _event => {
    setBackdropStyle({
      ...backdropStyle,
      '--tds-animate-backdrop-visibility': 'hidden',
      '--tds-animate-backdrop-opacity': '0',
      '--tds-animate-backdrop-transition': 'opacity .5s ease, visibility 0s .5s',
    })
  }

  const handleMouseMove = event => {
    const element = document.elementFromPoint(event.clientX, event.clientY)
    const listItem = element.closest('li')
    if (listItem) {
      setBackdropStyle({
        ...backdropStyle,
        '--tds-animate-backdrop-transition': '.5s cubic-bezier(.75,0,0,1)',
        '--tds-animate-backdrop-height': `${listItem.offsetHeight}px`,
        '--tds-animate-backdrop-width': `${listItem.offsetWidth}px`,
        '--tds-animate-backdrop-top': `${listItem.offsetTop}px`,
        '--tds-animate-backdrop-left': `${listItem.offsetLeft}px`,
      })
    }
  }

  // 获取当前页面地址
  const { pathname } = useLocation()

  return (
    <div className="bg-transparent">
      <header
        className={classNames(
          pathname === '/' ? ' text-gray-50' : 'text-gray-950',
          'relative z-10 flex items-center justify-center bg-transparent w-full h-14'
        )}
        style={backdropStyle}
      >
        <div className="tds-animate--backdrop-backdrop"></div>
        <h1 className="basis-0 font-bold text-2xl flex-grow pl-12">{'智 能 汽 车'}</h1>
        <ol
          className="flex space-x-4 h-full items-center bg-transparent"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {pages.map(page => (
            <li key={page.name} className="px-2 py-1">
              <Link className="px-2 py-2" to={page.href}>
                <span className="mx-2 font-medium tracking-widest transition-colors duration-300 ease-in-out">{page.name}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="basis-0 flex-grow pr-12">{globalState.isLogin ? <UserNav /> : <LoginRegister />}</div>
      </header>
    </div>
  )
}
