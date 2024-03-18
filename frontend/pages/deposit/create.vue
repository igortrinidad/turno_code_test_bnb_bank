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
        v-model:value="depositCheckForm.value"
        icon="material-symbols:universal-currency-outline-rounded"
        label="Amount"
        id_input="amount"
        :money="{ prefix: '$', decimals: 2, isInteger: true }"
        :has-error="depositCheckForm.validate('value')"
      />

      <InputWithIcon
        v-model:value="depositCheckForm.description"
        icon="material-symbols:star-rounded"
        label="Description"
        id_input="description"
        :has-error="depositCheckForm.validate('description')"
      />

      <InputFileDrop
        :value="depositCheckForm.file"
        id_input="image"
        :has-error="depositCheckForm.validate('file')"
        @add-file="depositCheckForm.setFile('file', $event)"
      />

      <button class="btn btn-primary mt-4" @click="storeStatement()">
        <Icon 
          v-if="depositCheckForm.isLoading"
          name="svg-spinners:90-ring-with-bg"
          class="absolute top-2 left-6"
        />
        <span>DEPOSIT CHECK</span>
      </button>
    </div>
  </div>
</template>
<script setup>

  import StatementForm from '@/modules/statement/StatementForm'

  useSetSeoTags({ title: 'CHECK DEPOSIT', navColor: 'bg-blue-100/50 text-blue-500 font-bold shadow-none' })

  const depositCheckForm = ref(new StatementForm({ type: 'check' }))

  const storeStatement = async () => {
    try {
      await depositCheckForm.value.store()
      useRouter().push('/statement')
    } catch (error) {
      
    }
  }

</script>