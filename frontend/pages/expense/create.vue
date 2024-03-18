<template>
  <div class="w-full flex flex-col">
    <div class="w-full bg-blue-100/50 flex justify-between items-center text-blue-500 p-2 px-3">
      <div class="flex flex-col">
        <span class="text-2xs font-semibold tracking-wide text-blue-500/50">CURRENT BALANCE</span>
        <span class="font-semibold " v-if="!useBalanceStore().isLoading">{{ useFormatCurrency(useBalanceStore().available) }}</span>
        <span class="w-16 h-5 shimmer" v-else></span>
      </div>
    </div>

    <div class="w-full flex flex-col gap-4 p-3 mt-4">

      <InputWithIcon
        v-model:value="purchaseForm.value"
        icon="material-symbols:universal-currency-outline-rounded"
        label="Amount"
        id_input="amount"
        :money="{ prefix: '$', decimals: 2, isInteger: true }"
        :has-error="purchaseForm.validate('value')"
      />

      <InputWithIcon
        v-model:value="purchaseForm.date"
        icon="material-symbols:calendar-month-outline-rounded"
        label="Date"
        id_input="date"
        mask="##/##/####"
        :has-error="purchaseForm.validate('date')"
      />

      <InputWithIcon
        v-model:value="purchaseForm.description"
        icon="material-symbols:star-rounded"
        label="Description"
        id_input="description"
        :has-error="purchaseForm.validate('description')"
      />

      <button class="btn btn-primary mt-4" @click="storeStatement()">
        <Icon 
          v-if="purchaseForm.isLoading"
          name="svg-spinners:90-ring-with-bg"
          class="absolute top-2 left-6"
        />
        <span>ADD PURCHASE</span>
      </button>
    </div>
  </div>
</template>
<script setup>

  import StatementForm from '@/modules/statement/StatementForm'

  useSetSeoTags({ title: 'PURCHASE', navColor: 'bg-blue-100/50 text-blue-500 font-bold shadow-none' })

  const purchaseForm = ref(new StatementForm({ type: 'purchase' }))

  const storeStatement = async () => {
    try {
      await purchaseForm.value.store()
      useRouter().push('/statement')
    } catch (error) {
      
    }
  }

</script>