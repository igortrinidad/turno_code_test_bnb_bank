<template>
  <div class="w-full flex flex-col">

    <div class="w-full bg-blue-200/80 flex justify-between items-center text-white p-2 px-3">
      <div class="flex flex-col">
        <span class="text-xs font-semibold">Current balance</span>
        <span class="text-2xl" v-if="!useBalanceStore().isLoading">{{ useFormatCurrency(useBalanceStore().available) }}</span>
        <span class="w-16 h-7 shimmer" v-else></span>
      </div>
      <div 
        class="flex flex-col items-center justify-center text-sm whitespace-nowrap truncate cursor-not-allowed"
        title="Feature not yet implement."
      >
        <span>{{ useDayJs().format('MMMM, YYYY') }}</span>
      </div>
    </div>

    <div class="w-full bg-blue-200/60 flex justify-between items-center text-blue-500 p-2 px-3">
      <div class="flex flex-col">
        <span class="text-xs font-semibold">Incomes</span>
        <span v-if="!useBalanceStore().isLoading">{{ useFormatCurrency(useBalanceStore().incomes) }}</span>
        <span class="w-16 h-5 shimmer" v-else></span>
      </div>

      <div class="w-[80px] flex flex-col items-center justify-center">
        <NuxtLink to="/deposit/create" class="flex flex-col items-center justify-center text-sm font-base">
          <Icon name="material-symbols:add-rounded" class="text-2xl" />
          <span class="text-[8px] truncate max-w-full">DEPOSIT A CHECK</span>
        </NuxtLink>
      </div>
    </div>
    
    <div class="w-full bg-blue-200/40 flex justify-between items-center text-blue-500 p-2 px-3">
      <div class="flex flex-col">
        <span class="text-xs font-semibold">Expenses</span>
        <span v-if="!useBalanceStore().isLoading">{{ useFormatCurrency(useBalanceStore().expenses) }}</span>
        <span class="w-16 h-5 shimmer" v-else></span>
      </div>

      <div class="w-[80px] flex flex-col">
        <NuxtLink to="/expense/create" class="flex flex-col items-center justify-center text-sm font-base">
          <Icon name="material-symbols:add-rounded" class="text-2xl" />
          <span class="text-[8px]">PURCHASE</span>
        </NuxtLink>
      </div>
    </div>

    <div class="flex flex-col gap-2 p-3">
      <h5 class="text-blue-500">TRANSACTIONS</h5>
      <StatementCard />
    </div>

  </div>
</template>
<script setup>

  import StatementCard from '@/modules/statement/StatementCard.vue'

  definePageMeta({
    middleware: 'check-auth'
  })

  useSetSeoTags({ title: 'BNB BANK', navColor: 'bg-blue-200/80 text-white font-bold shadow-none' })

</script>