<template>
  <div class="w-full flex gap-2">
    <div class="flex-none">
      <Icon :name="icon" class="text-blue-500/50 text-2xl" />
    </div>
    <div class="flex flex-col">
      <span class="text-blue-500/50 text-2xs">{{ label }}</span>
      <span class="text-blue-500 text-sm">{{ value }}</span>
    </div>
  </div>
</template>
<script setup>

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
  })
</script>