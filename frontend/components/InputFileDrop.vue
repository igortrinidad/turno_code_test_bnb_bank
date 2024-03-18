<template>
  <div class="w-full block">

    <div v-if="label" class="input-label">
      <span>{{ label }}</span>
      <span v-if="hasError !== null" class="text-red-400 ml-1">*</span>
    </div>

    <label
      class="input-file-drop"
      :class="[
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        value?.name ? 'border-primary' : 'glass-default',
        hasError ? 'border-red-600 text-red-600' : 'border-blue-400/50 text-blue-400/50'
      ]"
    >
      <Icon :name="icon" class="mr-2 flex-shrink-0 block" />

      <span class="ellipsis block" :class="value && value.name ? 'font-semibold' : ''">
        {{ value.name ? value.name : placeholder }}
      </span>

      <input
        tabindex="0"
        type="file"
        class="hidden-input-file"
        :accept="accept"
        :disabled="disabled"
        name="file"
        :data-title="placeholder"
        :multiple="multiple"
        @change="addFile($event)"
      >
    </label>
    <p v-if="hasError" class="text-red-600 h-4">
      <slot />
    </p>
  </div>
</template>

<script setup>

  const props = defineProps({
    value: {
      type: [Object, String],
      default() {
        return {
          name: '',
          type: ''
        }
      }
    },
    accept: {
      type: String,
      default: 'image/jpeg, image/png'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'UPLOAD CHECK PICTURE'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: [Boolean, Object],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'material-symbols:upload-file'
    }
  })
  
  const filename = ref('')

  const emit = defineEmits(['update:value', 'change', 'addFile','removeFile'])

  const addFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      filename.value = event.target.files[0].name
      emit('update:value', event.target.files[0])
      emit('addFile', event.target.files[0])
      emit('change', event)
      return
    }

    filename.value = ''
  }

  const removeFile = () => {
    filename.value = ''
    return emit('removeFile')
  }
</script>

<style lang="scss" scoped>

.hidden-input-file {
  opacity: 0 !important;
  /* z-index: -1; */
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.input-file-drop {
  @apply 
    w-full
    mt-1
    p-4 py-12
    rounded-lg
    border-2
    box-border
    transition-all
    duration-200
    border-dashed
    flex
    items-center
    justify-center
    relative
    text-xs
    space-x-2 ;
}
</style>