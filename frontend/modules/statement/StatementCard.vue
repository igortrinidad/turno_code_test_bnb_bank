<template>
  <div class="w-full h-full flex flex-col">
    <div class="h-full flex flex-col gap-2">
      <Transition name="fade" mode="out-in">
        <StatementList v-if="viewState === 'list'" :statements="statements" :is-loading="isLoadingStatements" />
        <div v-else class="w-full h-full flex flex-col gap-4 items-center justify-center">
          <img src="/images/banking.svg" class="w-2/3" />
          <p class="text-xs">We didn't find transactions.</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>

  import StatementList from '@/modules/statement/StatementList.vue'
  import StatementApiService from '@/services/StatementApiService'

  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: null
    },
    status: {
      type: String,
      required: false,
      default: null
    },
  })

  const statements = ref([])
  const isLoadingStatements = ref(true)
  const isFinishedRequest = ref(false)

  const viewState = computed(() => {
    if(isFinishedRequest.value && statements.value.length === 0) return 'empty'
    return 'list'
  })

  onMounted(() => {
    getStatements()
    useBalanceStore().getBalance()
  })

  watch([() => props.type, () => props.status], () => {
    getStatements()
  })

  const getStatements = async () => {
    try {
      isLoadingStatements.value = true
      isFinishedRequest.value = false
      const start = useDayJs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      const end = useDayJs().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      const response = await StatementApiService.get({ start, end, type: props.type, status: props.status })
      statements.value = response.data
    } catch (error) {
      console.error(error)  
    } finally {
      isLoadingStatements.value = false
      isFinishedRequest.value = true
    }
  }

</script>