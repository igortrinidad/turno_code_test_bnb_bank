<template>
  <div class="w-full flex flex-col p-3">
    <StatementCard type="check" />
    <FloatButton @click="useRouter().push('/deposit/create')"/>
  </div>
</template>
<script setup>

  import StatementCard from '@/modules/statement/StatementCard.vue'

  definePageMeta({
    middleware: 'check-auth'
  })

  useSetSeoTags({ title: 'INCOMES'})

</script>