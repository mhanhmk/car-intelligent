import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import sendRequest from '../plugins/axios'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { handleResponse } from '../utils/tool'
import { useToast } from '../components/ui/use-toast'
import { GlobalState } from '../App'
import { saveToSessionStorage } from '../utils/tool'

export default function Login() {
  const [_, setGlobalState] = React.useContext(GlobalState)
  const [from, setFrom] = React.useState({
    username: '',
    passwd: '',
  })

  const { toast } = useToast()
  const navigate = useNavigate()
  const handleChange = e => {
    setFrom({
      ...from,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const forLogin = async () => {
      const resp = await sendRequest({
        url: '/user/login',
        method: 'post',
        data: from,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      handleResponse(toast, resp, '登录提示')
      if (resp.code === 200 || resp.code === 205) {
        const state = {
          isLogin: true,
          userInfo: resp.data,
        }
        setGlobalState(state)

        saveToSessionStorage('globalState', state)

        navigate('/', { replace: true })
      }
    }

    forLogin()
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-3xl font-bold leading-9 tracking-tight text-gray-900">登 录</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                账号
              </label>
              <div className="mt-2">
                <Input type="text" name="username" onChange={handleChange} placeholder="用户名/邮箱" value={from.username} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  密码
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-black hover:text-indigo-500">
                    忘记密码?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input type="password" name="passwd" onChange={handleChange} placeholder="密码" value={from.passwd} />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                登录
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            没有账号?{' '}
            <Link to="/register" className="font-semibold leading-6 text-black hover:text-indigo-500">
              注册
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
