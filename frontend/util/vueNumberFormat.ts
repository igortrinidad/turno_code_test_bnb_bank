import { NumberFormat } from "@igortrindade/lazyfy"

export const defaultOptions = {
  prefix: 'R$ ',
  suffix: '',
  decimal: ',',
  thousand: '.',
  precision: 2,
  acceptNegative: true,
  isInteger: true
}

export const setCursor = (el: any, position: number) => {
  var setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setTimeout(setSelectionRange, 1)
  }
}

export const setCursorPosition = (el: any, opt = defaultOptions) => {
  var positionFromEnd = el.value.length - el.selectionEnd
  el.value = NumberFormat.formatNumber(el.value, opt)
  positionFromEnd = Math.max(positionFromEnd, opt.suffix.length)
  positionFromEnd = el.value.length - positionFromEnd
  positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1)
  setCursor(el, positionFromEnd)
}