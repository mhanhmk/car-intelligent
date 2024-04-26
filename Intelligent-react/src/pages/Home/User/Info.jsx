import React from 'react'
import { ImageIcon, UserCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { GlobalState } from '../../../App'
import sendRequest from '../../../plugins/axios'
import { handleResponse, saveToSessionStorage } from '../../../utils/tool'
import { useToast } from '../../../components/ui/use-toast'

export default function Info() {
  const [globalState, setGlobalState] = React.useContext(GlobalState)
  const [userInfo, setUserInfo] = React.useState(globalState.userInfo)

  const handleChange = (event, propName) => {
    setUserInfo(preValue => ({
      ...preValue,
      [propName]: event.target.value,
    }))
  }

  const { toast } = useToast()
  const handleSave = () => {
    sendRequest({ url: '/user/update_info', method: 'post', data: userInfo }).then(resp => {
      handleResponse(toast, resp, '信息修改提示')
      if (resp.code === 200 || resp.code === 205) {
        const state = {
          isLogin: true,
          userInfo: userInfo,
        }
        setGlobalState(state)
        saveToSessionStorage('globalState', state)
      }
    })
  }

  const navigate = useNavigate()
  React.useEffect(() => {
    if (!globalState.isLogin) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" max-w-4xl p-6 mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                图片
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {userInfo?.imagePath ? (
                  <img className="h-8 w-8 rounded-full mr-2" src={userInfo.imagePath} />
                ) : (
                  <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  更改
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                封面图
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">个人信息</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">使用一个可以接收邮件的固定地址。</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                用户名
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userInfo?.userName ?? ''}
                    onChange={e => handleChange(e, 'userName')}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                邮箱
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo?.email ?? ''}
                  onChange={e => handleChange(e, 'email')}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                电话号码
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={userInfo?.phoneNumber ?? ''}
                  onChange={e => handleChange(e, 'phoneNumber')}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            setUserInfo(globalState)
          }}
        >
          取消
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSave}
        >
          保存
        </button>
      </div>
    </div>
  )
}
