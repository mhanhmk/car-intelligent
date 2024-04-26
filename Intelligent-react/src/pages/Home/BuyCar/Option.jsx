import React from 'react'
import PropTypes from 'prop-types'
import { Popover, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

import { Button } from '../../../components/ui/button'
import sendRequest from '../../../plugins/axios'
import { getAllBrand, getModel, getSubBrand } from '../../../utils/api'

const condition = [
  {
    id: 'brand',
    name: '品牌',
  },
  {
    id: 'subBrand',
    name: '子品牌',
  },
  {
    id: 'model',
    name: '车系',
  },
  {
    id: 'type',
    name: '车型',
  },
  {
    id: 'dynamicType',
    name: '驱动类型',
  },
]

// const featured = [
//   {
//     name: 'New Arrivals',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//     imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
//   },
// ]

const priceItem = [
  {
    id: 'minPrice',
    name: '最低价',
  },
  {
    id: 'maxPrice',
    name: '最高价',
  },
]

// 定义属性类型
ScrollMenu.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }),
  handleClick: PropTypes.func,
}

function ScrollMenu({ section, handleClick }) {
  return (
    <div>
      <p id={`${section.name}-heading`} className="font-medium text-gray-900">
        {section.name}
      </p>
      <div className="mt-4 space-y-6 max-h-80 overflow-hidden hover:overflow-y-auto scroll-smooth hover:scroll-auto relative snap-proximity snap-y">
        {section.items.map(item => (
          <div key={item.id} className="flex snap-center">
            <button onClick={() => handleClick(section.id, item.name)} className="hover:text-gray-800">
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

Option.propTypes = {
  option: PropTypes.any.isRequired,
  setOption: PropTypes.func.isRequired,
}

export default function Option({ option, setOption }) {
  const [sections, setSections] = React.useState([
    {
      id: 'brand',
      name: '品牌',
      items: [],
    },
    {
      id: 'subBrand',
      name: '子品牌',
      items: [],
    },
    {
      id: 'model',
      name: '车系',
      items: [],
    },
    {
      id: 'type',
      name: '车型',
      items: [
        { id: 1, name: 'sedan' },
        { id: 2, name: 'mpv' },
        { id: 3, name: 'sports' },
        { id: 4, name: 'suv' },
        { id: 5, name: 'other' },
      ],
    },
    {
      id: 'dynamicType',
      name: '驱动类型',
      items: [
        { id: 1, name: '电动' },
        { id: 2, name: '自然吸气' },
        { id: 3, name: '涡轮增压' },
        { id: 4, name: '增程式' },
        { id: 5, name: '双涡轮增压' },
        { id: 6, name: '机械增压' },
        { id: 7, name: '涡轮增压+电动增压' },
      ],
    },
  ])

  const handleClick = React.useCallback(
    (tag, value) => {
      if (tag === 'brand' || tag === 'subBrand' || (tag === 'model' && option.subBrand === null)) {
        const disposeResp = (tag_list, resps) => {
          tag_list.forEach((it, index) => {
            setSections(sections => {
              // 使用 map 方法创建一个新的数组，更新指定对象的属性
              return sections.map(item => {
                if (item.id === it) {
                  // 返回一个新的对象，只更新 quantity 属性
                  return { ...item, items: resps[index].data }
                }
                return item // 保持其他对象不变
              })
            })
          })
        }

        const updateOption = async () => {
          let params = {
            brand: option.brand,
            subBrand: option.subBrand,
            model: option.model,
            [tag]: value,
          }
          if (tag === 'brand') {
            params.subBrand = null
            params.model = null
          }
          if (tag === 'subBrand') {
            params.model = null
          }
          const resp = await sendRequest({ url: '/car/check_option', params: params })
          if (resp.data != null) {
            setOption(preOption => ({ ...preOption, ...resp.data }))

            if (tag === 'brand') {
              Promise.all([getSubBrand(resp.data.brand), getModel(resp.data.brand)]).then(function (results) {
                disposeResp(['subBrand', 'model'], results)
              })
            }
            if (tag === 'subBrand' || tag === 'model') {
              Promise.all([getSubBrand(resp.data.brand), getModel(null, resp.data.subBrand)]).then(function (results) {
                disposeResp(['subBrand', 'model'], results)
              })
            }
          }
        }

        updateOption()
      } else {
        setOption(prevOption => ({
          ...prevOption,
          [tag]: value,
        }))
      }
    },
    [option, setOption, setSections]
  )

  // 初始化选项数据
  React.useEffect(() => {
    Promise.all([getAllBrand(), getSubBrand(), getModel()]).then(function (results) {
      const list = ['brand', 'subBrand', 'model']
      list.forEach((it, index) => {
        setSections(sections => {
          // 使用 map 方法创建一个新的数组，更新指定对象的属性
          return sections.map(item => {
            if (item.id === it) {
              // 返回一个新的对象，只更新 quantity 属性
              return { ...item, items: results[index]?.data ?? [] }
            }
            return item // 保持其他对象不变
          })
        })
      })
    })
  }, [])

  function onPrice(e, mode) {
    // console.log(e, mode)
    // 应该间断更新
    e.target.value = e.target.value.replace(/[^0-9.]/g, '')
    setOption(prevOption => ({
      ...prevOption,
      [mode]: e.target.value,
    }))
  }

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Flyout menus */}
            <Popover>
              <Popover.Button as="div" className="flex h-full space-x-8">
                {condition.map(cond => (
                  <p
                    key={cond.id}
                    className="cursor-pointer text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center pt-px text-sm font-medium"
                  >
                    {cond.name}
                    {option[cond.id] === null ? '' : `: ${option[cond.id]}`}
                  </p>
                ))}
                <p className="cursor-pointer text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center pt-px text-sm font-medium">
                  价格: {option.minPrice === null ? '\u221E' : option.minPrice} -{' '}
                  {option.maxPrice === null ? '\u221E' : option.maxPrice} w
                </p>
              </Popover.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-8">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
                        {/* <div className="col-start-5 grid grid-cols-2 gap-x-8">
                          {featured.map(item => (
                            <div key={item.name} className="group relative text-base sm:text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div> */}
                        <div className="row-start-1 grid grid-cols-6 gap-x-8 gap-y-10 text-sm">
                          {sections.map(section => (
                            <ScrollMenu key={section.id} section={section} handleClick={handleClick} />
                          ))}
                          <div className="space-y-8">
                            {priceItem.map(item => (
                              <div key={item.id}>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                  {item.name}
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500">￥</span>
                                  </div>
                                  <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="block w-full rounded-md border-0 pl-8 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    placeholder="0.00"
                                    onInput={e => {
                                      onPrice(e, item.id)
                                    }}
                                  />
                                  <div className="absolute inset-y-0 right-2 flex items-center">
                                    <span className="text-gray-500">W</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <Button
              variant="ghost"
              onClick={() => {
                const clearedOption = Object.keys(option).reduce((acc, key) => {
                  acc[key] = null
                  return acc
                }, {})

                setOption(clearedOption)
              }}
              className="ml-6 h-8 px-2 lg:px-3"
            >
              重置
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>
    </div>
  )
}
