import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'
import { getCache, setCache } from "@/util/cacheRequest"

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  minTime?: number;
}

const setAuthorizationHeader = (request: any, crossOrigin = false) => {

  if(!crossOrigin &&  useUserStore().loggedUserToken) {
    const token = useUserStore().loggedUserToken
    request.headers["Authorization"] = `Bearer ${ token }`
  }

}


// const checkServerInvalidateCache = (request: any) => {
//   if(request.url.includes('update') || request.url.includes('store') || request.url.includes('delete')) {
//     useSharedStore().invalidateCache = true
//     setTimeout(() => {
//       useSharedStore().invalidateCache = false
//     }, 8000)
//   }

//   if(useSharedStore().invalidateCache) {
//     request.headers['cache-invalidate'] = 'true'
//   }
// }

export default (crossOrigin = false) => {

  const config = useRuntimeConfig()

  const axiosInstance = axios.create({ baseURL: config.public.API_BASE_URL })

  // Laravel Sanctum CSRF Protection
  axiosInstance.defaults.withCredentials = true
  axiosInstance.defaults.withXSRFToken = true

  if (!crossOrigin) {

    axiosInstance.interceptors.request.use(
      function (request: any) {
        getCache(request)
        setAuthorizationHeader(request, crossOrigin)
        return request
      },
      function (error: any) {
        return Promise.reject(error)
      }
    )

    axiosInstance.interceptors.response.use(
      async function (response: any) {
        setCache(response)
        if ((response.config as Partial<CustomAxiosRequestConfig>).minTime) {
          const minTime = response.config.minTime as number
          await useWait(minTime)
        }

        if(response.data.message) {
          typeof(response.data.message) === 'string' ? useToast({ type: 'info', message: response.data.message }) : useToast({ ...response.data.message })
        }

        return response
      },
      function (error: any) {
        if(error?.response?.data?.errors?.length) {
          error.response.firstError = error?.response?.data?.errors?.[0]
          useToast({ type: 'error', message: error.response.firstError })
        }

        if(error?.response?.data?.message) {
          typeof(error?.response?.data?.message) === 'string' ? useToast({ type: 'error', message: error?.response?.data?.message }) : useToast({ ...error?.response?.data?.message, type: 'error' })
        }

        return Promise.reject(error)
      }
    )
  }

  return axiosInstance
}
