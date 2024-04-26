const cellForPrice = accessorKey => {
  const cell = ({ row }) => {
    const amount = parseFloat(row.getValue(accessorKey))
    const formatted = new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(amount)

    return <div className="text-left font-medium">{formatted}w</div>
  }

  return cell
}

const user = [
  {
    accessorKey: 'userId',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'userName',
    title: '用户名',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'email',
    title: '邮箱',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'password',
    title: '密码',
    enableSorting: false,
    cell: ({ row }) => <div className="max-w-[150px] truncate">{row.getValue('password')}</div>,
    enableHiding: true,
  },
  {
    accessorKey: 'phoneNumber',
    title: '电话号码',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'imagePath',
    title: '头像地址',
    cell: ({ row }) => <div className="max-w-[100px] truncate">{row.getValue('imagePath')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'permission',
    title: '权限',
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('permission') === 1 ? '管理员' : '普通用户'}</div>,
    enableSorting: false,
    enableHiding: true,
  },
]

const brand = [
  {
    accessorKey: 'brandId',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'brandName',
    title: '品牌名',
    enableSorting: true,
    enableHiding: true,
  },
]

const subBrand = [
  {
    accessorKey: 'subBrandId',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'subBrandName',
    title: '子品牌名',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'brandId',
    title: '品牌编号',
    enableSorting: true,
    enableHiding: true,
  },
]

const model = [
  {
    accessorKey: 'modelId',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'modelName',
    title: '车系',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'subBrandId',
    title: '品牌编号',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'minPrice',
    title: '最高价',
    cell: cellForPrice('minPrice'),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'maxPrice',
    title: '最低价',
    cell: cellForPrice('maxPrice'),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'isNewCar',
    title: '新车',
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('isNewCar') === 1 ? '是' : '否'}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'modelType',
    title: '车型',
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'saleStatus',
    title: '在售',
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('saleStatus') === 1 ? '在售' : '停售'}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'imgPath',
    title: '图片地址',
    enableSorting: false,
    enableHiding: true,
  },
]

const carInfo = [
  {
    accessorKey: 'id',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    title: '车名',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'modelId',
    title: '车系编号',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'type',
    title: '类型',
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'displacement',
    title: '排量',
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('displacement') ?? 0}L</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'horsepower',
    title: '马力',
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('horsepower')}HP</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    title: '价格',
    cell: cellForPrice('price'),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'info',
    title: '信息',
    cell: ({ row }) => <div className="max-w-[100px] truncate">{row.getValue('info')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
]

const carSale = [
  {
    accessorKey: 'saleId',
    title: '编号',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'userId',
    title: '用户编号',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'carId',
    title: '汽车编号',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'saleDate',
    title: '销售日期',
    enableSorting: true,
    enableHiding: true,
  },
]

const carStar = [
  {
    accessorKey: 'starId',
    title: '收藏编号',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'userId',
    title: '用户编号',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'modelId',
    title: '车型编号',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'starDate',
    title: '收藏日期',
    enableSorting: true,
    enableHiding: true,
  },
]

const getColumnsModel = tableName => {
  switch (tableName) {
    case 'user':
      return user
    case 'brand':
      return brand
    case 'sub_brand':
      return subBrand
    case 'car_model':
      return model
    case 'car_info':
      return carInfo
    case 'car_sale':
      return carSale
    case 'car_star':
      return carStar
    default:
      return user
  }
}

export { user, brand, subBrand, model, carInfo, carSale, carStar, getColumnsModel }
