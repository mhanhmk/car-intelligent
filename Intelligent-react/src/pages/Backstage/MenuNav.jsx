/* eslint-disable react/prop-types */
import React from 'react'
import { RadioGroup } from '@headlessui/react'
import { ChevronRightIcon } from 'lucide-react'

import { Link } from 'react-router-dom'

// const menus = ['用户', '收藏', '销售', '品牌', '子品牌', '车系', '车型']

const menus = [
  { name: '用户', value: 'user' },
  { name: '品牌', value: 'brand' },
  { name: '子品牌', value: 'sub_brand' },
  { name: '车系', value: 'car_model' },
  { name: '车型', value: 'car_info' },
  { name: '收藏', value: 'car_star' },
  { name: '销售', value: 'car_sale' },
]

export default function MenuNav({ tableName }) {
  const [selected, setSelected] = React.useState(menus.find(item => item.value === tableName)?.value ?? 'user')

  React.useEffect(() => {
    setSelected(menus.find(item => item.value === tableName)?.value ?? 'user')
  }, [tableName])

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[248px] p-6">
      <div className="w-full ">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {menus.map(menu => (
              <RadioGroup.Option
                key={menu.value}
                value={menu.value}
                className={({ active, checked }) =>
                  `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-black' : ''} ${
                    checked ? ' bg-black text-white' : 'bg-white'
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
                as={Link}
                to={`/bk/${menu.value}`}
              >
                {({ _active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                            {menu.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
