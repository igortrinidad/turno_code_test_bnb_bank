<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full bg-blue-100/50 flex flex-col gap-2 items-start text-blue-500 px-3">
      <div 
        class="text-sm whitespace-nowrap truncate cursor-not-allowed pb-2"
        title="Feature not yet implement."
      >
        <span>{{ useDayJs().format('MMMM, YYYY') }}</span>
      </div>
      <Tabs 
        :items="tabsItems" 
        v-model:selected="selected" 
      />
    </div>
    
    <StatementCard 
      type="check" 
      class="px-3 mt-2"
      :status="selected.value"
    />
  </div>
</template>
<script setup>

  import StatementCard from '@/modules/statement/StatementCard.vue'

  const tabsItems = [
    { label: 'PENDING', value: 'pending' },
    { label: 'ACCEPTED', value: 'approved' },
    { label: 'REJECTED', value: 'rejected' },
  ]

  const selected = ref(tabsItems[1])

  definePageMeta({
    middleware: 'check-admin-auth'
  })

  useSetSeoTags({ title: 'CHECKS', navColor: 'bg-blue-100/50 text-blue-500 font-bold shadow-none'})

</script>