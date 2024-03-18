import { getBrowserInfo } from '@/util/getBrowserInfo'
import { getOsInfo } from '@/util/getOsInfo'

export const useBrowserInfo = () => {
  return getBrowserInfo()
}

export const useOsInfo = () => {
  return getOsInfo()
}