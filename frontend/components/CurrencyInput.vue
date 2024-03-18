<template>
  <input
    v-model="childValue"
    inputmode="numeric"
    @focus="onFocus"
  >
</template>

<script setup>

  import { setCursor, defaultOptions } from '@/util/vueNumberFormat'
  import { NumberFormat } from '@igortrindade/lazyfy'

  const props = defineProps({
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Object,
      default: () => {},
    }
  })

  const options = props.options || {}

  const emit = defineEmits(['update:value'])

  const mergedOptions = computed(() => {
    return { ...defaultOptions, ...options }
  })

  const childValue = computed({
    get: () => {
      return NumberFormat.formatNumber(props.value, mergedOptions.value)
    },
    set: (value) => {
      const newValue = NumberFormat.unformatNumber(value, mergedOptions.value)
      emit('update:value', newValue)
    }
  })

  const onFocus = ($event) => {
    setCursor($event.target, ($event.target.value.length - mergedOptions.value.suffix.length))
  }


</script>