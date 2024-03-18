<template>
  <div class="w-full h-full flex flex-col gap-6 p-3 mt-4">

    <template v-if="isLoading && !statement">
      <div 
        class="w-full flex justify-between items-center text-blue-500 text-sm py-2"
        v-for="index in 4"
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
      <StatementShowItem
        icon="material-symbols:person"
        label="CUSTOMER"
        :value="statement.user.name"
      />
  
      <StatementShowItem
        icon="material-symbols:mail"
        label="CUSTOMER EMAIL"
        :value="statement.user.username"
      />
  
      <StatementShowItem
        icon="material-symbols:heap-snapshot-multiple-outline-rounded"
        label="ACCOUNT"
        :value="statement.user.id"
      />
  
      <StatementShowItem
        icon="material-symbols:universal-currency-outline-rounded"
        label="REPORTED AMOUNT"
        :value="useFormatCurrency(statement.value, { suffix: ' USD'})"
      />

      <div class="w-full block">
        <img class="w-full aspect-video object-cover" :src="statement.file_url" />
      </div>

      <div class="w-full flex gap-2">
        <button class="w-full btn btn-ghost" @click="updateStatement('rejected')">
          <Icon name="material-symbols:cancel-outline-rounded" />
          <span>REJECT</span>
        </button>
        <button class="w-full btn btn-secondary" @click="updateStatement('approved')">
          <Icon name="material-symbols:check-circle-outline-rounded" />
          <span>ACCEPT</span>
        </button>
      </div>
    </template>

  </div>
</template>
<script setup>

  import StatementApiService from '@/services/StatementApiService'

  definePageMeta({
    middleware: 'check-admin-auth'
  })

  useSetSeoTags({ title: 'CHECK DETAILS', navColor: 'bg-blue-100/50 text-blue-500 font-bold shadow-none'})

  const statement = ref(null)
  const isLoading = ref(true)

  onMounted(() => {
    getStatement()
  })

  const getStatement = async () => {
    try {
      isLoading.value = true
      const response = await StatementApiService.show(useRoute().params.statement_id)
      statement.value = response.data
    } catch (error) {
      console.error(error)  
    } finally {
      isLoading.value = false
    }
  }

  const updateStatement = async (status) => {
    try {
      await StatementApiService.update(useRoute().params.statement_id, status)
      useRouter().push('/admin/check')
    } catch (error) {
      console.error(error)
    }
  }

</script>