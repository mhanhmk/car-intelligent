import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import UserMenu from './UserNav'
import { classNames } from '../../utils/tool'

const pages = [
  { name: '首页', href: '/' },
  { name: '买车', href: '/buycar' },
  { name: '卖车', href: '/salecar' },
  { name: '预测', href: '/forecast' },
]

function LoginRegister() {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
        登入
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <Link to="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
        注册
      </Link>
    </div>
  )
}

export default function Header() {
  // 记录登入状态
  const [loginState, _setLoginState] = React.useState(false)
  const [cuurent, setCurrent] = React.useState('none')

  // notify(`Current path ${pathname}`, 'info', { title: 'Header Message!' })
  // 获取当前页面地址
  const { pathname } = useLocation()
  React.useEffect(() => {
    // 在路径变化时更新状态
    const matchedPage = pages.find(page => page.href === pathname)
    if (matchedPage) {
      setCurrent(matchedPage.name)
    }
  }, [pathname])

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="font-bold text-2xl">智能汽车</span>
                  {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                </a>
              </div>

              {/* Flyout menus */}
              <div className="flex h-full space-x-8 ml-8 self-stretch">
                {pages.map(page => (
                  <div key={page.name} className="relative flex">
                    <Link
                      to={page.href}
                      className={classNames(
                        cuurent === page.name ? 'font-bold text-primary' : 'font-medium text-muted-foreground',
                        'flex items-center px-4 focus:outline-none'
                      )}
                      onClick={() => {
                        setCurrent(page.name)
                      }}
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="ml-auto flex items-center justify-between w-2/5">
                {/* Search */}
                {/* <form className="group relative w-64">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                  <Input type="text" className="pl-10" placeholder="搜索" />
                  {/* <input
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-1 pl-10 ring-1 ring-slate-200 shadow-sm"
                    type="text"
                    aria-label="搜索"
                    placeholder="搜索"
                  />
                </form> */}

                {/* User */}
                {loginState ? <UserMenu /> : <LoginRegister />}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
