export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function handleResponse(toast, resp, title) {
  if (resp?.code === 205) {
    toast({
      title,
      description: resp.message,
    })
  } else if (resp?.code === 505) {
    toast({
      variant: 'destructive',
      title,
      description: resp.message,
    })
  }
}

export function saveToSessionStorage(key, value) {
  // 将数据转换为 JSON 字符串
  const json = JSON.stringify(value)

  // 存储到 Session Storage
  sessionStorage.setItem(key, json)
}

export function getFromSessionStorage(key) {
  // 从 Session Storage 获取数据
  const json = sessionStorage.getItem(key)

  // 如果数据存在，则解析 JSON 并返回
  if (json) {
    return JSON.parse(json)
  }
  // 数据不存在时返回 null 或其他默认值
  return null
}

export function clearSessionStorage(key) {
  sessionStorage.removeItem(key)
}
