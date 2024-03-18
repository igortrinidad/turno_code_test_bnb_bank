import InMemoryCache from '@/services/InMemoryCache'

export const getCache = (config: any) => {

  if(config.shouldCache && InMemoryCache) {

    const cacheKey = `${config.url}:${JSON.stringify(config.data)}`
    const hasCache = InMemoryCache.get(cacheKey)
  
    if (hasCache) {
      config.adapter = () => {
        return new Promise((resolve) => {
          const res = {
            data: hasCache,
            status: 200,
            statusText: "OK",
            headers: { "content-type": "application/json; charset=utf-8", "in-memory-cache": "true" },
            config: { ...config, cached: true }
          }
      
          return resolve(res)
        })
      }
    }
  }

  return
  
}

export const setCache = (response: any) => {

  if(response.config.shouldCache && response.headers['in-memory-cache'] !== 'true') {
    const cacheKey = `${response.config.url}:${response.config.data}`
    InMemoryCache.put(cacheKey, response.data, response.config.cacheTime || 1000 * 10)
  }
  
}
