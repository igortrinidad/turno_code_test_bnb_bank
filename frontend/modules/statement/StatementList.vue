<template>
  <div class="w-full flex flex-col divide-y divide-gray-300/20">
    <template v-if="isLoading">
      <div 
        class="w-full flex justify-between items-center text-blue-500 text-sm py-2"
        v-for="index in 6"
        :key="`statement_shimmer_${ index }`"
      >
        <div class="flex flex-col gap-1">
          <span class="font-semibold w-12 h-4 shimmer" />
          <span class="text-xs w-24 h-4 shimmer" />
        </div>
        <div class="font-semibold w-12 h-4 shimmer" />
      </div>
    </template>
    <template v-else>
      <NuxtLink 
        class="w-full flex justify-between items-center text-blue-500 text-sm py-2"
        v-for="statement in props.statements"
        :key="statement.id"
        :to="useUserStore().loggedUser?.role === 'admin' ? `/admin/check/approve/${ statement.id }` : null"
      >
        <div class="flex flex-col gap-1">
          <span class="font-semibold">{{ statement.description }}</span>
          <span class="text-xs">{{ useDayJs(statement.created_at).format('MM/DD/YYYY, hh:mm a') }}</span>
        </div>
        <div class="font-medium" :class="{'text-red-500' : statement.value < 0}">
          {{ useFormatCurrency(statement.value, { isInteger: true }) }}
        </div>
      </NuxtLink>
    </template>
  </div>
</template>
<script setup>

  const props = defineProps({
    statements: {
      type: Array,
      required: true,
      default: []
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: true
    }
  })


</script>