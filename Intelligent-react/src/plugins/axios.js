import axios from 'axios'

const sendRequest = async ({ url, method = 'get', data = null, params = null, target = 'api', headers = null }) => {
  try {
    const response = await axios({ url: `/${target}${url}`, method, data, params, ...(headers && { headers }) })
    return response.data
  } catch (error) {
    // 处理错误
    return null
  }
}

export default sendRequest
