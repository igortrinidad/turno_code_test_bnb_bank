<template>
  <div class="absolute bottom-0 right-0 mb-6 mr-6 ml-6 z-[100]">
    <TransitionGroup name="list" tag="div">
      <div
        v-for="(instance, index) in instances"
        :id="instance.id"
        :key="instance"
        class="shadow-lg mb-6 flex max-w-screen rounded-lg border border-gray-400/10"
        @click="instances.splice(index, 1)"
        @mouseenter="stopTimeout(instance)"
        @mouseleave="resumeTimeout(instance)"
      >
        <div class="flex flex-col px-4 py-6 bg-white/90 w-full rounded-l-lg">
          <h4 v-if="instance.title" class="w-full text-left font-bold leading-none mb-2">
            {{ instance.title }}
          </h4>
          <p v-if="instance.message" class="w-full text-left text-xs font-semi-bold text-yellow leading-none">
            {{ instance.message }}
          </p>
        </div>
        <div class="w-3 min-h-full block rounded-r-lg" :class="[TYPES_BORDERS[instance.type]]" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>

  import { StringHelpers, ArrayHelpers } from '@igortrindade/lazyfy'

  const emitter = useEmitter()

  const DEFAULT_TIMEOUT = 4000

  const TYPES_BORDERS = ref({
    'warning': 'bg-yellow-300',
    'info': 'bg-blue-500',
    'success': 'bg-lime-500',
    'error': 'bg-pink-700',
  })

  const instances = ref([])

  onMounted(() => {
    emitter.on('addToast', ({ title, message, type, timeout }) => {
      addToastInstance({ title, message, type, timeout })
    })
  })

  onBeforeUnmount(() => {
    emitter.off('addToast')
  })

  const addToastInstance = ({ title = '', message = '', type = 'warning', timeout = DEFAULT_TIMEOUT }) => {

    const alreadyAdded = ArrayHelpers.find(instances.value, { message })
    if (!alreadyAdded) {
      const id = StringHelpers.randomString(64)
      const timeoutId = setTimeout(() => {
        ArrayHelpers.remove(instances.value, { id })
      }, timeout)
      instances.value.unshift({ id, title, message, type, timeout, timeoutId, started: new Date().getTime(), timeRemain: 0 })
      defineInstanceMinWidth(id)
    }
  }

  const stopTimeout = (instance) => {
    instance.timeRemain = instance.timeout - (new Date().getTime() - instance.started)
    clearTimeout(instance.timeoutId)
  }

  const defineInstanceMinWidth = (instanceId) => {
    setTimeout(() => {
      const instanceElement = document.getElementById(instanceId)
      if (instanceElement) {
        instanceElement.style.minWidth = `${instanceElement.offsetWidth}px`
      }
    }, 100)
  }

  const resumeTimeout = (instance) => {
    instance.timeout = instance.timeRemain + 100
    instance.started = new Date().getTime()
    instance.timeoutId = setTimeout(() => {
      ArrayHelpers.remove(instances.value, { id: instance.id })
    }, instance.timeout)
  }

</script>


<style lang="scss" scoped>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(20vw);
  }

  .list-leave-active {
    position: absolute;
  }
</style>

