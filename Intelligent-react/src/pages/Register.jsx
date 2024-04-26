import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import sendRequest from '../plugins/axios'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { handleResponse } from '../utils/tool'
import { useToast } from '../components/ui/use-toast'

export default function Register() {
  const [from, setFrom] = React.useState({
    username: '',
    email: '',
    passwd: '',
  })

  const navigate = useNavigate()
  const { toast } = useToast()

  const handleChange = e => {
    setFrom({
      ...from,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const forRegister = async () => {
      const resp = await sendRequest({
        url: '/user/register',
        method: 'post',
        data: from,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      handleResponse(toast, resp, '注册信息提示')

      if (resp.code === 205 || resp.code === 200) {
        navigate('/login', { replace: true })
      }
    }

    forRegister()
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-3xl font-bold leading-9 tracking-tight text-gray-900">注 册</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                用户名
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="用户名"
                  value={from.username}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                邮箱
              </label>
              <div className="mt-2">
                <Input id="email" type="email" name="email" onChange={handleChange} placeholder="邮箱" value={from.email} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  密码
                </label>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  type="password"
                  name="passwd"
                  onChange={handleChange}
                  placeholder="密码"
                  value={from.passwd}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                注册
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            已有账号?{' '}
            <Link to="/login" className="font-semibold leading-6 text-black hover:text-indigo-500">
              登录
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
