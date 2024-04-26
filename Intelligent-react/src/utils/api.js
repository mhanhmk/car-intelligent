import sendRequest from '../plugins/axios'

export function getAllBrand() {
  return sendRequest({ url: '/car/brand_names' })
}

export function getSubBrand(brandName = null) {
  return sendRequest({
    url: '/car/sub_brand_names',
    params: {
      ...(brandName && { brandName }),
    },
  })
}

export function getModel(brandName = null, subBrandName = null) {
  return sendRequest({
    url: '/car/model_names',
    params: {
      ...(brandName && { brandName }),
      ...(subBrandName && { subBrandName }),
    },
  })
}
