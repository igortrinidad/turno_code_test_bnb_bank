<template>
  <input
    :value="formattedValue"
    inputmode="numeric"
    @input="onInput($event)"
    @focus="onFocus($event)"
  >
</template>

<script>

import { format, unformat, setCursor, setCursorPosition, defaultOptions } from '@/util/vueNumberFormat'

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Object,
      default: () => {},
    }
  },
  emits: ['update:value'],
  computed: {
    mergedOptions() {
      const options = defaultOptions
      if(this.options) {
        return Object.assign({}, options, this.options)
      }
      return options
    },
    formattedValue() {
      return format(this.value, this.mergedOptions)
    }
  },

  created() {
    if(!this.$vueNumberFormatOptions) this.$vueNumberFormatOptions = defaultOptions
  },

  methods: {

    onFocus($event) {
      setCursor($event.target, ($event.target.value.length - this.mergedOptions.suffix.length))
    },

    onInput($event) {
      setCursorPosition($event.target, this.mergedOptions)
      const value = unformat($event.target.value, this.mergedOptions)
      this.updateValue(value)
    },

    updateValue(value) {
      this.$emit('update:value', value)
    }

  }
}
</script>