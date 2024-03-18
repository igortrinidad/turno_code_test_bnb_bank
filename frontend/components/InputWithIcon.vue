<template>
  <div :class="column">
    <label class="group">
      <div class="flex items-center space-x-1 w-fit cursor-pointer">
        <div class="input-label">
          <span>{{ label }}</span>
          <span v-if="hasError !== null" class="text-red-400 ml-1">*</span>
        </div>
      </div>

      <div class="relative">
          <CurrencyInput
            v-if="money"
            :id="id_input"
            v-model:value="childValue"
            :type="type"
            :placeholder="placeholder || label"
            class="input peer"
            :class="getInputClass"
            :disabled="disabled"
            :options="getVueNumberFormatOptions"
            @keydown.enter="onKeyDownEnter($event.target.value)"
            @blur="onBlur($event.target.value)"
            @focus="onFocus($event.target.value)"
          />
        <input
          v-else-if="!mask"
          :id="id_input"
          :type="type"
          :placeholder="placeholder || label"
          :value="value"
          class="input peer"
          :class="getInputClass"
          :disabled="disabled"
          @input="onChange($event.target.value)"
          @keydown.enter="onKeyDownEnter($event.target.value)"
          @blur="onBlur($event.target.value)"
          @focus="onFocus($event.target.value)"
        >
        <input
          v-else
          :id="id_input"
          v-mask="mask"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          class="input peer"
          :class="getInputClass"
          :disabled="disabled"
          @input="onChange($event.target.value)"
          @keydown.enter="onKeyDownEnter($event.target.value)"
          @blur="onBlur($event.target.value)"
          @focus="onFocus($event.target.value)"
        >
        <Icon
          v-if="icon"
          :name="icon"
          class="input-icon"
        />
      </div>
    </label>

    <p v-if="hasError" class="text-red-600 h-4 text-sm mt-1">
      {{ hasError.description || 'Campo obrigatório' }}
    </p>
  </div>
</template>

<script setup>

  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    id_input: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    mask: {
      type: [String, Array, Boolean],
      default() {
        return false
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    hasError: {
      type: [Boolean, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: 'rounded-md border'
    },
    bg: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    },
    column: {
      type: String,
      default: 'w-full'
    },
    money: {
      type: Object,
      default() {
        return null
      }
    }
  })

  const emit = defineEmits(['update:value', 'keydown_enter', 'change', 'blur', 'focus'])

  const onKeyDownEnter = (value) => {
    emit('keydown_enter', value)
  }

  const onChange = (value) => {
    emit('update:value', value)
    emit('change', value)
  }

  const onBlur = (value) => {
    emit('blur', value)
  }

  const onFocus = (value) => {
    emit('focus', value)
  }

  const getInputClass = computed(() => {
    let classes = []

    if (props.icon) {
      classes.push('pl-10')
    }

    classes.push(props.border, props.bg, props.text)
    classes.push(`input-${props.size}`)

    if (props.hasError) {
      classes.push('border-rose-300')
    }

    return classes
  })

  const childValue = computed({
    get() {
      return props.value
    },
    set(val) {
      emit('update:value', val)
      emit('change', val)
    }
  })

  const defaultNumberFormatOptions = {
    prefix: '',
    thousand: '.',
    decimal: ',',
  }

  const getVueNumberFormatOptions = computed(() => {
    return Object.assign({}, defaultNumberFormatOptions, props.money)
  })

</script>