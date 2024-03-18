// @ts-nocheck
import { ObjectHelpers, ArrayHelpers } from '@igortrindade/lazyfy'
import validators from '@/util/forms/validators'

export default class BaseForm {

  // [key: string]: any
  tried: boolean = false
  isLoading: boolean = false
  isTried: boolean = false
  id: string | null = null
  
  public get fillable (): Array<string> {
    return []
  }

  public get isEdit (): boolean {
    return this.id ? true : false
  }

  public getFillableKeys(data: any = null) {
    return ObjectHelpers.filterObjectKeys(this.fillable, data ?? this)
  }

  public setKeyValue(key: string, value: any) {
    this[key] = value
  }

  public toString() {
    return Object.keys(this).reduce((acc: any, key: string) => {
      acc[key] = this[key]
      return acc
    }, {})
  }

  constructor(data = {} as any) {
    this.setFillableKeys(data)
    if(data['tried'] !== undefined) this.tried = data['tried']
  }

  setFillableKeys(data: any = {}) {
    for(const key of this.fillable) {
      if(data[key] !== undefined) {
        this[key] = data[key]
      }
    }
  }

  get errors() {
    return this.requireds.filter((req: any) => {

      if (typeof (req.validator) === 'function') {
        return req.validator(this[req.item], this)
      } else if (typeof(req.validator) === 'string') {
        if(this.validateItemString(req.validator, this[req.item])) {
          return this.validateItemString(req.validator, this[req.item])
        }
      } else if (Array.isArray(req.validator)) {
        for(const validatorStringRefference of req.validator) {
          if(this.validateItemString(validatorStringRefference, this[req.item])) return true
        }
      }

      if (
        typeof (this[req.item]) == 'string' && !this[req.item].length
        || Array.isArray(this[req.item]) && !this[req.item].length
        || typeof (this[req.item]) == 'object' && !this[req.item]
      ) {
        return true
      }

      return false
    }).map((item: any) => {
      return item
    })
  }

  get hasError(){
    return (this.errors.length) ? true : false
  }

  get errorPhrase() {
    return {
      init: 'Por favor, verifique os itens ',
      end: ' para continuar.'
    }
  }

  public get requireds(): Array<{ item: any, validator?: Function | string, label?: string, description?: string }> {
    return []
  }

  get validationPhrase() {
    return this.errorPhrase.init + this.errors.map((erro: any) => erro.label ? erro.label : erro.item).join(', ') + this.errorPhrase.end
  }

  get validationPhraseHtml() {
    return `${this.errorPhrase.init} <b>${this.errors.map((erro: any) => erro.label).join(', ')}</b> ${this.errorPhrase.end}`
  }

  validateItemString(validatorStringRefference: string, itemValue: any) {
    const [value, arg] = validatorStringRefference.split(':')
    if(!validators[value]) {
      console.warn(`Validator method: ${value} not found!`)
      return false
    } else {
      if(!arg) return validators[value](itemValue)
      return validators[value](itemValue, arg)
    }
  }

  public validate(input: any) {
    if(!this.tried) return false
    return ArrayHelpers.find(this.errors, { item: input })
  }

  setFile(key: string, file: any) {
    console.log(this[key])
    this[key].setFile(file)
  }

}

