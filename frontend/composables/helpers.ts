import emitter from "@/util/emitter"
export const useEmitter = () => {
  return emitter
}

import axios from "@/util/axios"
export const useApi = (crossOrigin = false) => {
  return axios(crossOrigin)
}

import dayjs from "@/util/dayjs"
export const useDayJs = dayjs

export const useToast = ({ title = '', message = '', type = 'warning' }) => {
  const emitter = useEmitter()
  emitter.emit('addToast', { title, message, type })
}

export const useWait = (time = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
