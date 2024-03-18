<template>
  <div class="w-full flex justify-around gap-2">
    <div 
      class="" 
      v-for="(item, index) in items" 
      :key="`tab_${ index }`"
    >
      <button 
        class="text-xs font-medium text-blue-500 pb-2 border-b-2 hover:border-blue-400 transition-all duration-300 ease-in-out" 
        :class="[item.value == selected.value ? 'border-blue-500' : 'border-transparent']"
        @click="setSelected(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup>

  const emit = defineEmits(['update:selected'])

  const props = defineProps({
    items: {
      type: Array,
      required: true,
      default: []
    },
    selected: {
      type: Object,
      required: false,
      default: null
    }
  })

  const setSelected = (item) => {
    emit('update:selected', item)
  }
  
</script>