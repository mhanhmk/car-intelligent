import { z } from 'zod'

const userTaskSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  password: z.string(),
  email: z.string(),
  phoneNumber: z.string().nullable(),
  imagePath: z.string().nullable(),
  permission: z.number(),
})

const brandTaskSchema = z.object({
  brandId: z.number(),
  brandName: z.string(),
})

const subBrandTaskSchema = z.object({
  subBrandId: z.number(),
  subBrandName: z.string(),
  brandId: z.number(),
})

const modelTaskSchema = z.object({
  modelId: z.number(),
  modelName: z.string(),
  subBrandId: z.number(),
  maxPrice: z.number(),
  minPrice: z.number(),
  isNewCar: z.number(),
  modelType: z.string(),
  saleStatus: z.string(),
  imgPath: z.string(),
})

const carInfoTaskScheam = z.object({
  id: z.number(),
  modelId: z.number(),
  name: z.string(),
  type: z.string(),
  displacement: z.number().nullable(),
  horsepower: z.number(),
  price: z.number(),
  info: z.string(),
})

const carSaleTaskSchema = z.object({
  saleId: z.number(),
  userId: z.number(),
  carId: z.number(),
  saleDate: z.date(),
})

const carStarTaskSchema = z.object({
  userId: z.number(),
  carId: z.number(),
  starDate: z.date(),
})

const getTaskSchema = tableName => {
  switch (tableName) {
    case 'user':
      return userTaskSchema
    case 'brand':
      return brandTaskSchema
    case 'sub_brand':
      return subBrandTaskSchema
    case 'car_model':
      return modelTaskSchema
    case 'car_info':
      return carInfoTaskScheam
    case 'car_sale':
      return carSaleTaskSchema
    case 'car_star':
      return carStarTaskSchema
    default:
      return userTaskSchema
  }
}

export {
  userTaskSchema,
  brandTaskSchema,
  subBrandTaskSchema,
  modelTaskSchema,
  carInfoTaskScheam,
  carSaleTaskSchema,
  carStarTaskSchema,
  getTaskSchema,
}
