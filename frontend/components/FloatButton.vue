<template>
  <div class="absolute bottom-4 right-4 z-20">
    <button class="p-1 bg-blue-500 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-150">
      <Icon name="material-symbols:add-rounded" class="text-4xl font-bold" />
    </button>
  </div>
</template>
<script setup>
  defineEmits('click')
</script>