<template>
  <div class="w-full flex flex-col p-3">
    <StatementCard type="purchase" />
    <FloatButton @click="useRouter().push('/expense/create')"/>
  </div>
</template>
<script setup>

  import StatementCard from '@/modules/statement/StatementCard.vue'

  definePageMeta({
    middleware: 'check-auth'
  })

  useSetSeoTags({ title: 'EXPENSES'})

</script>