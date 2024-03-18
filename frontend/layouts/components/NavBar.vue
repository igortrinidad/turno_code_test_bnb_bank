<template>
  <div class="default-navbar shadow-md" :class="[useSharedStore().navColor ?? 'bg-blue-500']">
    <Icon 
      class="text-2xl cursor-pointer flex-none absolute top-5 left-4"
      name="solar:hamburger-menu-linear"
      @click="toggleMenuIsOpen()"
    />
    <h5 class="whitespace-nowrap truncate w-full text-center !text-sm" v-if="useSharedStore().pageTitle">
      {{ useSharedStore().pageTitle }}
    </h5>
  </div>
</template>

<script setup>

  const toggleMenuIsOpen = () => {
    useSharedStore().toggleMenuIsOpen()
  }

  const eventListenerAltArrowRight = (e) => {
    if (e.altKey && e.key === 'ArrowRight') {
      toggleMenuIsOpen()
    }
  }

  onMounted(() => {
    document.addEventListener('keyup', eventListenerAltArrowRight)
    useEmitter().on('routeChanged', () => {
      if (useSharedStore().menuIsOpen) {
        useSharedStore().toggleMenuIsOpen()
      }
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keyup', eventListenerAltArrowRight)
    useEmitter().off('routeChanged')
  })

</script>

<style lang="scss">
  .default-navbar {
    @apply w-full p-4 flex items-center justify-between gap-4 h-16 relative;
  }
</style>