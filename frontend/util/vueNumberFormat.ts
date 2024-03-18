export const defaultOptions = {
  prefix: 'R$ ',
  suffix: '',
  decimal: ',',
  thousand: '.',
  precision: 2,
  acceptNegative: true,
  isInteger: false
}

export const format = (input: string | number = 0, opt = defaultOptions) => {
  if(input === null) input = 0
  const mergedOptions = Object.assign({}, defaultOptions, opt)
  if (typeof input === 'number' && !mergedOptions.isInteger) {
    input = input.toFixed(fixed(mergedOptions.precision))
  }
  const negative = isNegative(input, mergedOptions.acceptNegative)  ? '-' : ''
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, mergedOptions.precision)
  const parts = toStr(currency).split('.')
  var integer = parts[0]
  const decimal = parts[1]
  integer = addThousandSeparator(integer, mergedOptions.thousand)
  return negative + mergedOptions.prefix + joinIntegerAndDecimal(integer, decimal, mergedOptions.decimal) + mergedOptions.suffix
}

export const unformat = (input: string | number = 0, opt = { precision: 2, isInteger: false, acceptNegative: true}) => {
  if(input === null) input = 0
  const mergedOptions = Object.assign({}, defaultOptions, opt)
  var negative = (isNegative(input, mergedOptions.acceptNegative)) ? -1 : 1
  var numbers = onlyNumbers(input)
  var currency = numbersToCurrency(numbers, mergedOptions.precision)
  if(mergedOptions.isInteger) {
    return parseInt(`${isNegative(input, mergedOptions.acceptNegative) ? '-' : ''}${numbers.toString()}`)
  }
  return parseFloat(currency) * negative
}

export const setCursor = (el: any, position: number) => {
  var setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setTimeout(setSelectionRange, 1)
  }
}


export const setCursorPosition = (el: any, opt = defaultOptions) => {
  var positionFromEnd = el.value.length - el.selectionEnd
  el.value = format(el.value, opt)
  positionFromEnd = Math.max(positionFromEnd, opt.suffix.length)
  positionFromEnd = el.value.length - positionFromEnd
  positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1)
  setCursor(el, positionFromEnd)
}


function onlyNumbers (input: number | string) {
  return toStr(input).replace(/\D+/g, '') || '0'
}

// 123 RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed (precision: number) {
  return Math.max(0, Math.min(precision, 20))
}

function numbersToCurrency (numbers: string, precision: number) {
  var exp = Math.pow(10, precision)
  var float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

function addThousandSeparator (integer: string, separator: string) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function joinIntegerAndDecimal (integer: number | string, decimal: string, separator: string) {
  return decimal ? integer + separator + decimal : integer
}

function toStr (value: number | string) {
  return value ? value.toString() : ''
}

function isNegative(str: string |  number, acceptNegative = true) {
  if(!acceptNegative) return false
  if (typeof str != 'string') str = str.toString()
  const forcePositive = str.indexOf('+') >= 0
  const isNegative = (str != '0' && str.indexOf('-') >= 0 || str[str.length-1] == '-') ? true : false
  return (!forcePositive && isNegative) ? true : false
}