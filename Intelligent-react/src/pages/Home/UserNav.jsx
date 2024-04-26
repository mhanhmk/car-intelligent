import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, LogOut, BaggageClaim, User, Component, ChevronDownIcon, UserCircleIcon } from 'lucide-react'

import { classNames } from '../../utils/tool'
import { GlobalState } from '../../App'
import { clearSessionStorage } from '../../utils/tool'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function UserNav() {
  const [open, setOpen] = React.useState(false)
  const [globalState, setGlobalState] = React.useContext(GlobalState)

  const navigate = useNavigate()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex float-right items-center gap-x-1 text-sm font-semibold leading-6 pr-1 focus:outline-none">
          {globalState.userInfo?.imagePath ? (
            <img className="h-8 w-8 rounded-full mr-2" src={globalState.userInfo.imagePath} />
          ) : (
            <UserCircleIcon className="h-8 w-8 text-gray-300" aria-hidden="true" />
          )}

          <span>{globalState.userInfo.userName}</span>
          <ChevronDownIcon
            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 transform ease-in duration-200')}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" alignOffset={-80} sideOffset={15}>
        <DropdownMenuItem asChild>
          <Link to="/account/info" className="w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>个人中心</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/star" className="w-full flex items-center">
            <Star className="mr-2 h-4 w-4" />
            <span>我的收藏</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/sale" className="w-full flex items-center">
            <BaggageClaim className="mr-2 h-4 w-4" />
            <span>已购买</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        {globalState.userInfo?.permission === 1 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/bk/user" className="w-full flex items-center">
                <Component className="mr-2 h-4 w-4" />
                <span>系统管理</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            setGlobalState({
              isLogin: false,
              userInfo: null,
            })
            clearSessionStorage('globalState')
            navigate('/')
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
