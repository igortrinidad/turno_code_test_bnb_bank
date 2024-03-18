
import { NumberFormat } from '@igortrindade/lazyfy'

const defaultNumberFormatOptions = {
  prefix: '$',
  decimal: ',',
  thousand: '.',
  isInteger: true
}

export const useFormatCurrency = (value: string, options = {}) => {
  const mergedOptions = Object.assign({}, defaultNumberFormatOptions, options)
  return NumberFormat.formatNumber(value, mergedOptions)
}

export const useUnformatCurrency = (value: string, options = {}) => {
  const mergedOptions = Object.assign({}, defaultNumberFormatOptions, options)
  return NumberFormat.unformatNumber(value, mergedOptions)
}