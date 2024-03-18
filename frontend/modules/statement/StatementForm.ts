import BaseForm from "@/util/forms/BaseForm"
import FileInfo from '@/util/forms/FileInfo'
import StatementApiService from '@/services/StatementApiService'

export default class StatementForm extends BaseForm {
  
  id: string | null = null
  value: number = 0
  date: string  = ''
  description: string = ''
  type: string = 'purchase'
  file = new FileInfo('checks_images')
  url: string = '/api/statement/store'

  constructor(data: any = {}) {
    super(data)
    this.setFillableKeys(data)
  }

  public get fillable() {
    return [
      'value',
      'date',
      'description',
      'type',
    ]
  }

  protected get getValue() {
    return this.type === 'purchase' ? (0 - this.value) : this.value
  }

  protected get getFilePath() {
    return this.type === 'purchase' ? null : this.file.getFilePath
  }

  public get requireds() {
    return [
      {
        item: 'value',
        label: 'amount',
        description: 'Please, add a value',
        validator: (value: number) => !Boolean(value > 0)
      },
      {
        item: 'date',
        label: 'date',
        description: 'Please, add a date',
        validator: (value: any, instance: this) => {
          if(instance.type === 'check') return false
          //@ts-expect-error
          const parsed = useDayJs().customParse(value)
          return Boolean(!parsed?.isValid || !parsed.isValid())
        }
      },
      {
        item: 'description',
        label: 'description',
        description: 'Please, add a description',
      },
      {
        item: 'file',
        label: 'check file',
        description:'Please, add a check image.',
        validator:(value: any, instance: this) => {
          return this.type === 'check' && !value.name
        },
      },
    ]
  }

  public checkFormErrors() {
    if(this.hasError) {
      this.tried = true
      useToast({ message: 'Verify required items.', type: 'error' })
      console.warn('Errors on fields: ', this.errors.map((error: any) => error.item).join(', '))
      throw new Error('Formulário inválido')
    }
  }

  public async store() {

    if(this.isLoading) return

    try {

      this.isLoading = true
      this.checkFormErrors()

      if(useBalanceStore().available < this.value) {
        useToast({ type: 'error', message: `You don't have enough money to buy it.`})
        throw new Error('Unsuficient balance.')
      }

      if(this.type === 'check') {
        await this.file.upload()
      }

      const data = {
        description: this.description,
        date: this.date,
        type: this.type,
        value: this.getValue,
        file_path: this.getFilePath
      }

      await StatementApiService.store(data)

    } catch (error:any) {
      throw new Error('Error on StatementApiService.store')
    } finally {
      this.isLoading = false
    }
  }

}